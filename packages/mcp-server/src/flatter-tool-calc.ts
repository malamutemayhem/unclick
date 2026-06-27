export type FlatterToolType =
  | "flat_face_standard"
  | "crowned_face_light"
  | "wide_face_large"
  | "narrow_face_detail"
  | "spring_handle_vibrate";

const specs: Record<FlatterToolType, {
  surfaceSmooth: number; coverageArea: number; controlStrike: number;
  weightBalance: number; cost: number; springHandle: boolean; crowned: boolean;
  faceSize: string; use: string;
}> = {
  flat_face_standard: {
    surfaceSmooth: 88, coverageArea: 82, controlStrike: 85,
    weightBalance: 80, cost: 30, springHandle: false, crowned: false,
    faceSize: "three_inch_square", use: "general_surface_flat",
  },
  crowned_face_light: {
    surfaceSmooth: 82, coverageArea: 78, controlStrike: 88,
    weightBalance: 85, cost: 28, springHandle: false, crowned: true,
    faceSize: "two_inch_round", use: "light_planish_smooth",
  },
  wide_face_large: {
    surfaceSmooth: 85, coverageArea: 95, controlStrike: 75,
    weightBalance: 72, cost: 40, springHandle: false, crowned: false,
    faceSize: "five_inch_square", use: "large_plate_flatten",
  },
  narrow_face_detail: {
    surfaceSmooth: 90, coverageArea: 65, controlStrike: 92,
    weightBalance: 82, cost: 25, springHandle: false, crowned: false,
    faceSize: "one_inch_rect", use: "detail_surface_true",
  },
  spring_handle_vibrate: {
    surfaceSmooth: 85, coverageArea: 80, controlStrike: 80,
    weightBalance: 90, cost: 45, springHandle: true, crowned: false,
    faceSize: "three_inch_spring", use: "vibration_free_flat",
  },
};

export function surfaceSmooth(t: FlatterToolType): number { return specs[t].surfaceSmooth; }
export function coverageArea(t: FlatterToolType): number { return specs[t].coverageArea; }
export function controlStrike(t: FlatterToolType): number { return specs[t].controlStrike; }
export function weightBalance(t: FlatterToolType): number { return specs[t].weightBalance; }
export function flatterCost(t: FlatterToolType): number { return specs[t].cost; }
export function springHandle(t: FlatterToolType): boolean { return specs[t].springHandle; }
export function crowned(t: FlatterToolType): boolean { return specs[t].crowned; }
export function faceSize(t: FlatterToolType): string { return specs[t].faceSize; }
export function bestUse(t: FlatterToolType): string { return specs[t].use; }
export function flatterTools(): FlatterToolType[] { return Object.keys(specs) as FlatterToolType[]; }
