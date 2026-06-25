/**
 * MockDataService — in-memory mock CRUD for admin missions.
 *
 * Provides typed async functions that simulate real API calls
 * with a 300ms delay. Swappable for real API later without
 * changing the reducer or component interface.
 */

import type { AdminMission, MissionStep } from "@shared/types";

/* ── Helpers ── */

let nextId = 1;
const genId = (): string => `mission_${nextId++}_${Date.now()}`;

const daysAgo = (d: number): string => {
  const dt = new Date();
  dt.setDate(dt.getDate() - d);
  return dt.toISOString();
};

const missionStep = (
  id: string,
  title: string,
  order: number,
): MissionStep => ({
  id,
  title,
  verificationType: "submit_text",
  order,
});

/* ── Sample data ── */

const SAMPLE_MISSIONS: AdminMission[] = [
  // ── Inactive (3) ──
  {
    id: "sample_01",
    title: "Daily Login Streak",
    description:
      "Inicia sesión por 7 días consecutivos y reclama tu bonus diario.",
    tokenReward: 50,
    bonusPercent: 5,
    xpReward: 100,
    category: "daily",
    status: "inactive",
    steps: [missionStep("s01", "Inicia sesión el día 1", 1)],
    participants: 0,
    createdAt: daysAgo(5),
  },
  {
    id: "sample_02",
    title: "Weekly Leaderboard Push",
    description: "Sube al top 10 del ranking semanal.",
    tokenReward: 200,
    bonusPercent: 10,
    xpReward: 500,
    category: "weekly",
    status: "inactive",
    steps: [
      missionStep("s02a", "Gana 3 partidas", 1),
      missionStep("s02b", "Alcanza el top 10", 2),
    ],
    participants: 0,
    createdAt: daysAgo(3),
  },
  {
    id: "sample_03",
    title: "Conquista el Castillo",
    description:
      "Completa todas las misiones del evento especial 'Castillo Olvidado'.",
    tokenReward: 1000,
    bonusPercent: 25,
    xpReward: 2500,
    category: "fixed",
    status: "inactive",
    steps: [
      missionStep("s03a", "Explora la mazmorra", 1),
      missionStep("s03b", "Derrota al guardián", 2),
      missionStep("s03c", "Reclama el cofre", 3),
    ],
    participants: 0,
    createdAt: daysAgo(10),
  },
  // ── Active (3) ──
  {
    id: "sample_04",
    title: "Misión Diaria: 3 Partidas",
    description: "Juega 3 partidas hoy y gana recompensas extra.",
    tokenReward: 25,
    bonusPercent: 0,
    xpReward: 75,
    category: "daily",
    status: "active",
    steps: [
      missionStep("s04a", "Juega 1 partida", 1),
      missionStep("s04b", "Juega 2 partidas", 2),
      missionStep("s04c", "Juega 3 partidas", 3),
    ],
    participants: 42,
    createdAt: daysAgo(1),
    startedAt: daysAgo(0),
  },
  {
    id: "sample_05",
    title: "Semanal: Invita Amigos",
    description: "Invita a 5 amigos a unirse a la plataforma esta semana.",
    tokenReward: 150,
    bonusPercent: 15,
    xpReward: 300,
    category: "weekly",
    status: "active",
    steps: [
      missionStep("s05a", "Invita 1 amigo", 1),
      missionStep("s05b", "Invita 3 amigos", 2),
      missionStep("s05c", "Invita 5 amigos", 3),
    ],
    participants: 18,
    createdAt: daysAgo(3),
    startedAt: daysAgo(2),
  },
  {
    id: "sample_06",
    title: "Evento: Torneo Relámpago",
    description: "Evento especial de fin de semana con recompensas triples.",
    tokenReward: 500,
    bonusPercent: 50,
    xpReward: 1200,
    category: "special_event",
    status: "active",
    steps: [
      missionStep("s06a", "Regístrate en el torneo", 1),
      missionStep("s06b", "Completa la fase clasificatoria", 2),
      missionStep("s06c", "Gana la final", 3),
    ],
    participants: 87,
    createdAt: daysAgo(7),
    startedAt: daysAgo(6),
  },
  // ── Completed (2) ──
  {
    id: "sample_07",
    title: "Tutorial de Bienvenida",
    description:
      "Completa el tutorial inicial para familiarizarte con la plataforma.",
    tokenReward: 10,
    bonusPercent: 0,
    xpReward: 50,
    category: "fixed",
    status: "completed",
    steps: [missionStep("s07a", "Completa el tutorial", 1)],
    participants: 256,
    createdAt: daysAgo(30),
    startedAt: daysAgo(30),
    completedAt: daysAgo(28),
  },
  {
    id: "sample_08",
    title: "Logro: Primer Login",
    description: "Recompensa por iniciar sesión por primera vez en el mes.",
    tokenReward: 5,
    bonusPercent: 0,
    xpReward: 25,
    category: "daily",
    status: "completed",
    steps: [missionStep("s08a", "Inicia sesión", 1)],
    participants: 512,
    createdAt: daysAgo(45),
    startedAt: daysAgo(45),
    completedAt: daysAgo(45),
  },
  // ── Cancelled (2) ──
  {
    id: "sample_09",
    title: "Maratón de Fin de Semana",
    description: "Completa 10 misiones durante el fin de semana.",
    tokenReward: 300,
    bonusPercent: 20,
    xpReward: 750,
    category: "special_event",
    status: "cancelled",
    steps: [
      missionStep("s09a", "Completa 3 misiones el sábado", 1),
      missionStep("s09b", "Completa 7 misiones el domingo", 2),
    ],
    participants: 5,
    createdAt: daysAgo(20),
    startedAt: daysAgo(18),
    completedAt: daysAgo(15),
    cancelReason: "Baja participación detectada",
  },
  {
    id: "sample_10",
    title: "Desafío de la Comunidad",
    description: "Alcanza 1000 interacciones comunitarias en equipo.",
    tokenReward: 750,
    bonusPercent: 30,
    xpReward: 1800,
    category: "weekly",
    status: "cancelled",
    steps: [
      missionStep("s10a", "500 interacciones", 1),
      missionStep("s10b", "1000 interacciones", 2),
    ],
    participants: 0,
    createdAt: daysAgo(14),
    startedAt: daysAgo(12),
    completedAt: daysAgo(10),
    cancelReason: "Reemplazada por nuevo evento semanal",
  },
];

/* ── Simulated latency ── */

const delay = (ms = 300) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/* ── Service ── */

class MockDataServiceClass {
  private missions: AdminMission[];

  constructor() {
    this.missions = SAMPLE_MISSIONS.map((m) => ({ ...m }));
  }

  /** Return a shallow clone so callers can't mutate internal state. */
  private cloneList(): AdminMission[] {
    return this.missions.map((m) => ({ ...m, steps: [...m.steps] }));
  }

  /** Return all missions. */
  async getMissions(): Promise<AdminMission[]> {
    await delay();
    return this.cloneList();
  }

  /** Create a mission and return it with a generated ID. */
  async createMission(
    data: Omit<AdminMission, "id" | "createdAt" | "participants">,
  ): Promise<AdminMission> {
    await delay();
    const mission: AdminMission = {
      ...data,
      id: genId(),
      participants: 0,
      createdAt: new Date().toISOString(),
    };
    this.missions.push(mission);
    return { ...mission, steps: [...mission.steps] };
  }

  /** Update fields of an existing mission. Returns the updated mission. */
  async updateMission(
    id: string,
    data: Partial<AdminMission>,
  ): Promise<AdminMission> {
    await delay();
    const idx = this.missions.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error(`Mission ${id} not found`);
    this.missions[idx] = { ...this.missions[idx], ...data };
    return { ...this.missions[idx], steps: [...this.missions[idx].steps] };
  }

  /** Activate an inactive mission. */
  async activateMission(id: string): Promise<AdminMission> {
    await delay();
    const idx = this.missions.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error(`Mission ${id} not found`);
    if (this.missions[idx].status !== "inactive") {
      throw new Error(
        `Cannot activate mission with status ${this.missions[idx].status}`,
      );
    }
    this.missions[idx].status = "active";
    this.missions[idx].startedAt = new Date().toISOString();
    return { ...this.missions[idx], steps: [...this.missions[idx].steps] };
  }

  /** Cancel an active mission with a required reason. */
  async cancelMission(id: string, reason: string): Promise<AdminMission> {
    await delay();
    const idx = this.missions.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error(`Mission ${id} not found`);
    if (this.missions[idx].status !== "active") {
      throw new Error(
        `Cannot cancel mission with status ${this.missions[idx].status}`,
      );
    }
    this.missions[idx].status = "cancelled";
    this.missions[idx].completedAt = new Date().toISOString();
    this.missions[idx].cancelReason = reason;
    return { ...this.missions[idx], steps: [...this.missions[idx].steps] };
  }

  /** Delete a mission by ID. Only allowed for inactive missions. */
  async deleteMission(id: string): Promise<void> {
    await delay();
    const idx = this.missions.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error(`Mission ${id} not found`);
    if (this.missions[idx].status !== "inactive") {
      throw new Error("Only inactive missions can be deleted");
    }
    this.missions.splice(idx, 1);
  }
}

/** Singleton instance used throughout the app. */
export const MockDataService = new MockDataServiceClass();
