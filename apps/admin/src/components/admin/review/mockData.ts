import type { ReviewSubmission, VerificationCriterion } from "@shared/types";

export interface MockSubmission extends ReviewSubmission {
  verificationCriteria: VerificationCriterion[];
}

const now = Date.now();

function hoursAgo(h: number): string {
  return new Date(now - h * 3600_000).toISOString();
}

export const mockPendingSubmissions: MockSubmission[] = [
  {
    id: "rev-001",
    missionId: "m-001",
    userId: "u-001",
    userName: "Martina López",
    missionTitle: "Primera recarga del día",
    missionCategory: "daily",
    submittedAt: hoursAgo(0.5),
    images: [],
    userNote: "¡Listo! Ya hice mi primera recarga de hoy.",
    status: "pending",
    verificationCriteria: [
      { label: "La recarga se realizó hoy", passed: true, id: crypto.randomUUID() },
      { label: "El monto mínimo se cumple", passed: true, id: crypto.randomUUID() },
      { label: "Captura de pantalla visible", passed: false, id: crypto.randomUUID() },
      { label: "Fecha y hora coinciden", passed: true, id: crypto.randomUUID() },
    ],
  },
  {
    id: "rev-002",
    missionId: "m-003",
    userId: "u-002",
    userName: "Santiago Ríos",
    missionTitle: "Compartí en redes sociales",
    missionCategory: "weekly",
    submittedAt: hoursAgo(2),
    images: ["https://picsum.photos/seed/rev002/400/400"],
    userNote: undefined,
    status: "pending",
    verificationCriteria: [
      { label: "Publicación visible en el perfil", passed: true, id: crypto.randomUUID() },
      { label: "Incluye el hashtag oficial", passed: true, id: crypto.randomUUID() },
      { label: "La cuenta es pública", passed: false, id: crypto.randomUUID() },
      { label: "Contenido apropiado", passed: true, id: crypto.randomUUID() },
    ],
  },
  {
    id: "rev-003",
    missionId: "m-007",
    userId: "u-003",
    userName: "Camila Fernández",
    missionTitle: "Ganá 3 manos de Blackjack",
    missionCategory: "fixed",
    submittedAt: hoursAgo(5),
    images: [
      "https://picsum.photos/seed/rev003a/400/400",
      "https://picsum.photos/seed/rev003b/400/400",
    ],
    userNote: "Adjunto capturas de las 3 manos ganadoras. La tercera fue blackjack natural 🃏",
    status: "pending",
    verificationCriteria: [
      { label: "Mínimo 3 manos ganadoras", passed: true, id: crypto.randomUUID() },
      { label: "Capturas de cada mano", passed: true, id: crypto.randomUUID() },
      { label: "Apuesta mínima cumplida", passed: true, id: crypto.randomUUID() },
      { label: "Misma sesión de juego", passed: false, id: crypto.randomUUID() },
    ],
  },
  {
    id: "rev-004",
    missionId: "m-012",
    userId: "u-004",
    userName: "Facundo Molina",
    missionTitle: "Torneo de fin de semana",
    missionCategory: "special_event",
    submittedAt: hoursAgo(12),
    images: [],
    userNote: undefined,
    status: "pending",
    verificationCriteria: [
      { label: "Participación registrada en el torneo", passed: true, id: crypto.randomUUID() },
      { label: "Jugó al menos 10 rondas", passed: true, id: crypto.randomUUID() },
      { label: "Puntuación final visible", passed: true, id: crypto.randomUUID() },
      { label: "No usó asistencia externa", passed: true, id: crypto.randomUUID() },
    ],
  },
  {
    id: "rev-005",
    missionId: "m-015",
    userId: "u-005",
    userName: "Valentina Paz",
    missionTitle: "Depósito acumulado semanal",
    missionCategory: "weekly",
    submittedAt: hoursAgo(24),
    images: ["https://picsum.photos/seed/rev005/400/400"],
    userNote: "Deposité $150 durante la semana. Adjunto resumen de transacciones.",
    status: "pending",
    verificationCriteria: [
      { label: "Depósito total ≥ $100 semanal", passed: true, id: crypto.randomUUID() },
      { label: "Mínimo 2 depósitos separados", passed: false, id: crypto.randomUUID() },
      { label: "Fechas dentro de la semana", passed: true, id: crypto.randomUUID() },
      { label: "Método de pago verificado", passed: true, id: crypto.randomUUID() },
    ],
  },
  {
    id: "rev-006",
    missionId: "m-020",
    userId: "u-006",
    userName: "Benjamín Torres",
    missionTitle: "Jugá 50 manos de póker",
    missionCategory: "daily",
    submittedAt: hoursAgo(3),
    images: [],
    userNote: undefined,
    status: "pending",
    verificationCriteria: [
      { label: "50 manos jugadas en el día", passed: true, id: crypto.randomUUID() },
      { label: "Apuesta promedio ≥ $5", passed: true, id: crypto.randomUUID() },
      { label: "Historial de manos visible", passed: true, id: crypto.randomUUID() },
      { label: "Sin uso de auto-play", passed: false, id: crypto.randomUUID() },
    ],
  },
];

export const mockApprovedSubmissions: MockSubmission[] = [
  {
    id: "rev-010",
    missionId: "m-002",
    userId: "u-007",
    userName: "Agustina Díaz",
    missionTitle: "Primer depósito del mes",
    missionCategory: "fixed",
    submittedAt: hoursAgo(48),
    images: ["https://picsum.photos/seed/rev010/400/400"],
    userNote: "Deposité $200 usando transferencia bancaria.",
    status: "approved",
    verificationCriteria: [
      { label: "Depósito mínimo $100", passed: true, id: crypto.randomUUID() },
      { label: "Comprobante de transferencia", passed: true, id: crypto.randomUUID() },
      { label: "Cuenta verificada", passed: true, id: crypto.randomUUID() },
    ],
  },
  {
    id: "rev-011",
    missionId: "m-005",
    userId: "u-008",
    userName: "Luciana Méndez",
    missionTitle: "Jugá 100 manos de ruleta",
    missionCategory: "daily",
    submittedAt: hoursAgo(72),
    images: [],
    userNote: undefined,
    status: "approved",
    verificationCriteria: [
      { label: "100 manos jugadas", passed: true, id: crypto.randomUUID() },
      { label: "Apuesta mínima $1 por mano", passed: true, id: crypto.randomUUID() },
      { label: "Sesión continua", passed: true, id: crypto.randomUUID() },
    ],
  },
  {
    id: "rev-012",
    missionId: "m-008",
    userId: "u-009",
    userName: "Tomás Herrera",
    missionTitle: "Evento de slots de oro",
    missionCategory: "special_event",
    submittedAt: hoursAgo(96),
    images: [
      "https://picsum.photos/seed/rev012a/400/400",
      "https://picsum.photos/seed/rev012b/400/400",
    ],
    userNote: "Participé en el evento de slots. Hice 200 tiradas y llegué al nivel 3.",
    status: "approved",
    verificationCriteria: [
      { label: "Participación en el evento", passed: true, id: crypto.randomUUID() },
      { label: "200 tiradas realizadas", passed: true, id: crypto.randomUUID() },
      { label: "Nivel 3 alcanzado", passed: true, id: crypto.randomUUID() },
    ],
  },
];

export const mockRejectedSubmissions: MockSubmission[] = [
  {
    id: "rev-020",
    missionId: "m-010",
    userId: "u-010",
    userName: "Ignacio Vargas",
    missionTitle: "Completá tu perfil",
    missionCategory: "fixed",
    submittedAt: hoursAgo(36),
    images: [],
    userNote: "Ya completé todos los datos de mi perfil.",
    status: "rejected",
    verificationCriteria: [
      { label: "Foto de perfil cargada", passed: false, id: crypto.randomUUID() },
      { label: "Teléfono verificado", passed: true, id: crypto.randomUUID() },
      { label: "Datos personales completos", passed: true, id: crypto.randomUUID() },
    ],
  },
  {
    id: "rev-021",
    missionId: "m-018",
    userId: "u-011",
    userName: "Emilia Roldán",
    missionTitle: "Recomendá a un amigo",
    missionCategory: "weekly",
    submittedAt: hoursAgo(60),
    images: ["https://picsum.photos/seed/rev021/400/400"],
    userNote: "Mi amigo Juan se registró con mi código.",
    status: "rejected",
    verificationCriteria: [
      { label: "Amigo registrado con código", passed: true, id: crypto.randomUUID() },
      { label: "Amigo hizo depósito inicial", passed: false, id: crypto.randomUUID() },
      { label: "Captura de confirmación", passed: false, id: crypto.randomUUID() },
    ],
  },
];

export function getAllMockSubmissions(): MockSubmission[] {
  return [
    ...mockPendingSubmissions,
    ...mockApprovedSubmissions,
    ...mockRejectedSubmissions,
  ];
}
