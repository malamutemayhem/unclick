export type ChuckWheelType =
  | "coil_chuck_standard"
  | "foam_chuck_soft"
  | "bisque_chuck_custom"
  | "tap_chuck_center"
  | "vacuum_chuck_grip";

const specs: Record<ChuckWheelType, {
  holdSecure: number; centerTrue: number; adjustRange: number;
  markFree: number; cost: number; custom: boolean; vacuum: boolean;
  mountMethod: string; use: string;
}> = {
  coil_chuck_standard: {
    holdSecure: 82, centerTrue: 78, adjustRange: 85,
    markFree: 80, cost: 5, custom: false, vacuum: false,
    mountMethod: "coil_clay_ring", use: "general_trim_chuck",
  },
  foam_chuck_soft: {
    holdSecure: 75, centerTrue: 80, adjustRange: 88,
    markFree: 92, cost: 8, custom: false, vacuum: false,
    mountMethod: "foam_pad_friction", use: "gentle_trim_hold",
  },
  bisque_chuck_custom: {
    holdSecure: 90, centerTrue: 92, adjustRange: 60,
    markFree: 85, cost: 15, custom: true, vacuum: false,
    mountMethod: "fired_bisque_form", use: "specific_form_trim",
  },
  tap_chuck_center: {
    holdSecure: 85, centerTrue: 90, adjustRange: 78,
    markFree: 82, cost: 10, custom: false, vacuum: false,
    mountMethod: "tap_center_clay", use: "quick_center_trim",
  },
  vacuum_chuck_grip: {
    holdSecure: 95, centerTrue: 88, adjustRange: 82,
    markFree: 90, cost: 45, custom: false, vacuum: true,
    mountMethod: "vacuum_suction_pad", use: "hands_free_trim",
  },
};

export function holdSecure(t: ChuckWheelType): number { return specs[t].holdSecure; }
export function centerTrue(t: ChuckWheelType): number { return specs[t].centerTrue; }
export function adjustRange(t: ChuckWheelType): number { return specs[t].adjustRange; }
export function markFree(t: ChuckWheelType): number { return specs[t].markFree; }
export function chuckCost(t: ChuckWheelType): number { return specs[t].cost; }
export function custom(t: ChuckWheelType): boolean { return specs[t].custom; }
export function vacuum(t: ChuckWheelType): boolean { return specs[t].vacuum; }
export function mountMethod(t: ChuckWheelType): string { return specs[t].mountMethod; }
export function bestUse(t: ChuckWheelType): string { return specs[t].use; }
export function chuckWheels(): ChuckWheelType[] { return Object.keys(specs) as ChuckWheelType[]; }
