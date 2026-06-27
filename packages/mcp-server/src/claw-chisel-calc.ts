export type ClawChiselType =
  | "four_tooth_medium"
  | "six_tooth_fine"
  | "two_tooth_coarse"
  | "carbide_tip_hard"
  | "pneumatic_power_fast";

const specs: Record<ClawChiselType, {
  textureBite: number; surfaceControl: number; speedCarve: number;
  edgeLife: number; cost: number; powered: boolean; forFinish: boolean;
  toothPattern: string; use: string;
}> = {
  four_tooth_medium: {
    textureBite: 78, surfaceControl: 82, speedCarve: 70,
    edgeLife: 75, cost: 45, powered: false, forFinish: false,
    toothPattern: "even_four_row", use: "general_texture_work",
  },
  six_tooth_fine: {
    textureBite: 65, surfaceControl: 92, speedCarve: 55,
    edgeLife: 68, cost: 55, powered: false, forFinish: true,
    toothPattern: "fine_six_row", use: "finish_surface_blend",
  },
  two_tooth_coarse: {
    textureBite: 95, surfaceControl: 60, speedCarve: 85,
    edgeLife: 80, cost: 35, powered: false, forFinish: false,
    toothPattern: "wide_two_row", use: "rough_waste_remove",
  },
  carbide_tip_hard: {
    textureBite: 88, surfaceControl: 75, speedCarve: 72,
    edgeLife: 95, cost: 120, powered: false, forFinish: false,
    toothPattern: "carbide_four_row", use: "hard_stone_carve",
  },
  pneumatic_power_fast: {
    textureBite: 82, surfaceControl: 68, speedCarve: 95,
    edgeLife: 70, cost: 350, powered: true, forFinish: false,
    toothPattern: "rapid_four_row", use: "production_speed_carve",
  },
};

export function textureBite(t: ClawChiselType): number { return specs[t].textureBite; }
export function surfaceControl(t: ClawChiselType): number { return specs[t].surfaceControl; }
export function speedCarve(t: ClawChiselType): number { return specs[t].speedCarve; }
export function edgeLife(t: ClawChiselType): number { return specs[t].edgeLife; }
export function chiselCost(t: ClawChiselType): number { return specs[t].cost; }
export function powered(t: ClawChiselType): boolean { return specs[t].powered; }
export function forFinish(t: ClawChiselType): boolean { return specs[t].forFinish; }
export function toothPattern(t: ClawChiselType): string { return specs[t].toothPattern; }
export function bestUse(t: ClawChiselType): string { return specs[t].use; }
export function clawChisels(): ClawChiselType[] { return Object.keys(specs) as ClawChiselType[]; }
