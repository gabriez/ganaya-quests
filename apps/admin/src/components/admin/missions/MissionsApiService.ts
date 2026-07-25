/**
 * MissionsApiService — service layer for admin mission operations.
 *
 * Three-layer call chain:
 *   MissionsReducer → MissionsApiService → ApiAdminGanaya → HttpClient → Backend
 *                                         ↓ (on network error)
 *                                     MockDataService
 *
 * Network errors (TypeError / Failed to fetch) fall back to MockDataService.
 * HTTP 4xx/5xx errors are re-thrown for UI toast handling.
 */

import type { AdminMission } from "@shared/types";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import {
  mapAdminToBackend,
  mapBackendToAdmin,
} from "@/types/missions/api-mappers";
import { MockDataService } from "./MockDataService";

class MissionsApiServiceClass {
  /**
   * Fetch all missions from the backend.
   * Falls back to MockDataService on network error.
   */
  async getMissions(): Promise<AdminMission[]> {
    try {
      const backendMissions = await apiAdminGanaya.getMissions();
      return backendMissions.map(mapBackendToAdmin);
    } catch (error) {
      if (isNetworkError(error)) {
        return MockDataService.getMissions();
      }
      throw error;
    }
  }

  /**
   * Create a new mission.
   * Falls back to MockDataService on network error.
   */
  async createMission(
    data: Omit<AdminMission, "id" | "createdAt" | "participants">,
  ): Promise<AdminMission> {
    try {
      const payload = mapAdminToBackend(data);
      const backendMission = await apiAdminGanaya.createMission(payload);
      return mapBackendToAdmin(backendMission);
    } catch (error) {
      if (isNetworkError(error)) {
        return MockDataService.createMission(data);
      }
      throw error;
    }
  }

  /**
   * Update an existing mission.
   * Falls back to MockDataService on network error.
   */
  async updateMission(
    id: string,
    data: Partial<AdminMission>,
  ): Promise<AdminMission> {
    try {
      const payload = mapAdminToBackend(data as Parameters<typeof mapAdminToBackend>[0]);
      const backendMission = await apiAdminGanaya.updateMission(Number(id), payload);
      return mapBackendToAdmin(backendMission);
    } catch (error) {
      if (isNetworkError(error)) {
        return MockDataService.updateMission(id, data);
      }
      throw error;
    }
  }

  /**
   * Activate an inactive mission.
   * Falls back to MockDataService on network error.
   */
  async activateMission(id: string): Promise<AdminMission> {
    try {
      const backendMission = await apiAdminGanaya.activateMission(Number(id));
      return mapBackendToAdmin(backendMission);
    } catch (error) {
      if (isNetworkError(error)) {
        return MockDataService.activateMission(id);
      }
      throw error;
    }
  }

  /**
   * Cancel an active mission with a required reason.
   * Falls back to MockDataService on network error.
   */
  async cancelMission(id: string, reason: string): Promise<AdminMission> {
    try {
      const backendMission = await apiAdminGanaya.updateMissionStatus(
        Number(id),
        "CANCELLED",
      );
      return mapBackendToAdmin(backendMission);
    } catch (error) {
      if (isNetworkError(error)) {
        return MockDataService.cancelMission(id, reason);
      }
      throw error;
    }
  }

  /**
   * Delete a mission (soft delete via status=CANCELLED since backend has no DELETE).
   * Falls back to MockDataService on network error.
   */
  async deleteMission(id: string): Promise<void> {
    try {
      await apiAdminGanaya.updateMissionStatus(Number(id), "CANCELLED");
    } catch (error) {
      if (isNetworkError(error)) {
        return MockDataService.deleteMission(id);
      }
      throw error;
    }
  }
}

/**
 * Detect network-level errors (connection refused, DNS failure, timeout).
 * These trigger MockDataService fallback.
 */
function isNetworkError(error: unknown): boolean {
  return (
    error instanceof TypeError ||
    (error instanceof Error &&
      (error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError") ||
        error.message.includes("Network request failed") ||
        error.message.includes("ERR_CONNECTION")))
  );
}

/** Singleton instance. */
export const MissionsApiService = new MissionsApiServiceClass();
