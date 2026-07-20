import axios from "axios";
import { sileo } from "sileo";

import HttpClient, { handleApiError } from "@shared/libs/httpClient";
import type {
  ApiResponse,
  HttpClientInterface,
  LoginResponse,
} from "@shared/types/http";

import { API_URL, LOCAL_STORAGE_KEYS, ROUTES } from "@/constant";
import type { AdminUser } from "@/types/auth";

const httpClient = new HttpClient(API_URL, axios, LOCAL_STORAGE_KEYS);

let isRedirecting = false;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url as string;

      if (url.includes("/auth/login")) {
        return Promise.reject(error);
      }
      if (!isRedirecting) {
        isRedirecting = true;
        localStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
        sileo.error({
          title: "Sesión expirada",
          description:
            "Tu sesión ha expirado, por favor inicia sesión de nuevo",
          duration: 5000,
        });
        window.location.href = ROUTES.index;
        setTimeout(() => {
          isRedirecting = false;
        }, 100);
      }
    }
    return Promise.reject(error);
  },
);

export default class ApiAdminGanaya {
  constructor(private readonly httpClient: HttpClientInterface) {}

  async login(username: string, password: string) {
    const result: ApiResponse<LoginResponse> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await httpClient.post({
        url: "/auth/login",
        body: { username, password },
      });

      // Backend now returns raw shape: { access_token, token_type, expires_in }
      // NOT wrapped in { status, data } structure
      const rawResponse = data as ApiResponse<LoginResponse>;

      if (rawResponse?.status) {
        result.status = true;
      }
      result.data = rawResponse.data;

      result.message = rawResponse.message; // No message from raw response
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async getMe(): Promise<ApiResponse<AdminUser>> {
    let result: ApiResponse<AdminUser> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({ url: "/auth/me" });
      const response = data as ApiResponse<AdminUser>;
      result = response;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.httpClient.post({ url: "/auth/logout" });
    } catch {
      // Best-effort: cleanup proceeds regardless
    }
  }
}

export const apiAdminGanaya = new ApiAdminGanaya(httpClient);
