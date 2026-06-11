export type ClothBeamType =
  | "friction_brake_standard"
  | "ratchet_pawl_click"
  | "weighted_cord_tension"
  | "sectional_beam_even"
  | "sandpaper_wrap_grip";

const specs: Record<ClothBeamType, {
  tensionEven: number; windSmooth: number; adjustEase: number;
  fabricRange: number; cost: number; sectional: boolean; ratchet: boolean;
  brakeType: string; use: string;
}> = {
  friction_brake_standard: {
    tensionEven: 80, windSmooth: 82, adjustEase: 85,
    fabricRange: 88, cost: 30, sectional: false, ratchet: false,
    brakeType: "friction_band_wrap", use: "general_cloth_wind",
  },
  ratchet_pawl_click: {
    tensionEven: 85, windSmooth: 80, adjustEase: 78,
    fabricRange: 82, cost: 35, sectional: false, ratchet: true,
    brakeType: "ratchet_gear_pawl", use: "precise_click_advance",
  },
  weighted_cord_tension: {
    tensionEven: 82, windSmooth: 78, adjustEase: 90,
    fabricRange: 80, cost: 25, sectional: false, ratchet: false,
    brakeType: "hanging_weight_cord", use: "adjustable_tension_wind",
  },
  sectional_beam_even: {
    tensionEven: 92, windSmooth: 88, adjustEase: 72,
    fabricRange: 85, cost: 50, sectional: true, ratchet: false,
    brakeType: "pegged_section_divide", use: "even_warp_section",
  },
  sandpaper_wrap_grip: {
    tensionEven: 78, windSmooth: 85, adjustEase: 82,
    fabricRange: 78, cost: 20, sectional: false, ratchet: false,
    brakeType: "sandpaper_surface_grip", use: "no_slip_cloth_wind",
  },
};

export function tensionEven(t: ClothBeamType): number { return specs[t].tensionEven; }
export function windSmooth(t: ClothBeamType): number { return specs[t].windSmooth; }
export function adjustEase(t: ClothBeamType): number { return specs[t].adjustEase; }
export function fabricRange(t: ClothBeamType): number { return specs[t].fabricRange; }
export function beamCost(t: ClothBeamType): number { return specs[t].cost; }
export function sectional(t: ClothBeamType): boolean { return specs[t].sectional; }
export function ratchet(t: ClothBeamType): boolean { return specs[t].ratchet; }
export function brakeType(t: ClothBeamType): string { return specs[t].brakeType; }
export function bestUse(t: ClothBeamType): string { return specs[t].use; }
export function clothBeams(): ClothBeamType[] { return Object.keys(specs) as ClothBeamType[]; }
