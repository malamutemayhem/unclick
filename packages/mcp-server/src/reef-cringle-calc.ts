export type ReefCringleType =
  | "hand_worked_standard"
  | "pressed_ring_fast"
  | "hydraulic_press_heavy"
  | "seized_thimble_strong"
  | "soft_eye_splice";

const specs: Record<ReefCringleType, {
  holdStrength: number; chafResist: number; speedMake: number;
  loadRange: number; cost: number; pressed: boolean; handWorked: boolean;
  ringStyle: string; use: string;
}> = {
  hand_worked_standard: {
    holdStrength: 90, chafResist: 88, speedMake: 55,
    loadRange: 85, cost: 5, pressed: false, handWorked: true,
    ringStyle: "hand_sewn_ring", use: "traditional_reef_eye",
  },
  pressed_ring_fast: {
    holdStrength: 82, chafResist: 80, speedMake: 92,
    loadRange: 78, cost: 8, pressed: true, handWorked: false,
    ringStyle: "machine_press_ring", use: "quick_production_eye",
  },
  hydraulic_press_heavy: {
    holdStrength: 88, chafResist: 85, speedMake: 85,
    loadRange: 95, cost: 12, pressed: true, handWorked: false,
    ringStyle: "heavy_press_ring", use: "heavy_load_cringle",
  },
  seized_thimble_strong: {
    holdStrength: 95, chafResist: 92, speedMake: 60,
    loadRange: 90, cost: 10, pressed: false, handWorked: true,
    ringStyle: "thimble_seize_wrap", use: "high_load_corner",
  },
  soft_eye_splice: {
    holdStrength: 78, chafResist: 75, speedMake: 70,
    loadRange: 72, cost: 3, pressed: false, handWorked: true,
    ringStyle: "soft_rope_loop", use: "light_lash_point",
  },
};

export function holdStrength(t: ReefCringleType): number { return specs[t].holdStrength; }
export function chafResist(t: ReefCringleType): number { return specs[t].chafResist; }
export function speedMake(t: ReefCringleType): number { return specs[t].speedMake; }
export function loadRange(t: ReefCringleType): number { return specs[t].loadRange; }
export function cringleCost(t: ReefCringleType): number { return specs[t].cost; }
export function pressed(t: ReefCringleType): boolean { return specs[t].pressed; }
export function handWorked(t: ReefCringleType): boolean { return specs[t].handWorked; }
export function ringStyle(t: ReefCringleType): string { return specs[t].ringStyle; }
export function bestUse(t: ReefCringleType): string { return specs[t].use; }
export function reefCringles(): ReefCringleType[] { return Object.keys(specs) as ReefCringleType[]; }
