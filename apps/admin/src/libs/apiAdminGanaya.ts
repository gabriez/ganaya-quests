import axios from "axios";
import { sileo } from "sileo";

import HttpClient, { handleApiError } from "@shared/libs/httpClient";
import type {
  ApiResponse,
  HttpClientInterface,
  LoginResponse,
} from "@shared/types/http";
import type { BackendCreateMissionPayload, BackendMission, BackendMissionStatus } from "@shared/types/admin";

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
      const { data } = await this.httpClient.post({
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

  // 1.7 & 1.8 API Methods on ApiAdminGanaya
  // 1.9 URL Paths: Use prefix `/api/admin/missions`

  async createMission(payload: BackendCreateMissionPayload): Promise<BackendMission> {
    const { data } = await this.httpClient.post({
      url: "/api/admin/missions",
      body: payload,
    });
    const response = data as ApiResponse<BackendMission>;
    if (!response.data) throw new Error("Empty response from server");
    return response.data;
  }

  async getMissions(params?: { take?: number; skip?: number }): Promise<BackendMission[]> {
    let url = "/api/admin/missions";
    if (params?.take !== undefined || params?.skip !== undefined) {
      const searchParams = new URLSearchParams();
      if (params.take !== undefined) searchParams.append("take", params.take.toString());
      if (params.skip !== undefined) searchParams.append("skip", params.skip.toString());
      if (searchParams.toString()) url += `?${searchParams.toString()}`;
    }
    const { data } = await this.httpClient.get({ url });
    const response = data as ApiResponse<BackendMission[]>;
    if (!response.data) throw new Error("Empty response from server");
    return response.data;
  }

  async getMissionById(id: number): Promise<BackendMission> {
    const { data } = await this.httpClient.get({ url: `/api/admin/missions/${id}` });
    const response = data as ApiResponse<BackendMission>;
    if (!response.data) throw new Error("Empty response from server");
    return response.data;
  }

  async updateMission(id: number, payload: Partial<BackendCreateMissionPayload>): Promise<BackendMission> {
    const { data } = await this.httpClient.patch({
      url: `/api/admin/missions/${id}`,
      body: payload,
    });
    const response = data as ApiResponse<BackendMission>;
    if (!response.data) throw new Error("Empty response from server");
    return response.data;
  }

  async activateMission(id: number): Promise<BackendMission> {
    const { data } = await this.httpClient.post({
      url: `/api/admin/missions/${id}/activate`,
    });
    const response = data as ApiResponse<BackendMission>;
    if (!response.data) throw new Error("Empty response from server");
    return response.data;
  }

  async updateMissionStatus(id: number, status: BackendMissionStatus): Promise<BackendMission> {
    const { data } = await this.httpClient.patch({
      url: `/api/admin/missions/${id}/status`,
      body: { status },
    });
    const response = data as ApiResponse<BackendMission>;
    if (!response.data) throw new Error("Empty response from server");
    return response.data;
  }
}

export const apiAdminGanaya = new ApiAdminGanaya(httpClient);
