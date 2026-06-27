export type ResinPolishType =
  | "wet_sand_progressive"
  | "polishing_compound_cream"
  | "micro_mesh_pad"
  | "buffing_wheel_power"
  | "uv_topcoat_spray";

const specs: Record<ResinPolishType, {
  clarityFinal: number; speedFinish: number; controlEven: number;
  gritRange: number; cost: number; powered: boolean; sprayApply: boolean;
  abrasiveType: string; use: string;
}> = {
  wet_sand_progressive: {
    clarityFinal: 85, speedFinish: 70, controlEven: 88,
    gritRange: 92, cost: 5, powered: false, sprayApply: false,
    abrasiveType: "silicon_carbide_paper", use: "general_surface_smooth",
  },
  polishing_compound_cream: {
    clarityFinal: 90, speedFinish: 82, controlEven: 85,
    gritRange: 80, cost: 7, powered: false, sprayApply: false,
    abrasiveType: "alumina_oxide_cream", use: "high_gloss_hand_polish",
  },
  micro_mesh_pad: {
    clarityFinal: 92, speedFinish: 78, controlEven: 90,
    gritRange: 95, cost: 8, powered: false, sprayApply: false,
    abrasiveType: "cushioned_abrasive_cloth", use: "precision_clarity_finish",
  },
  buffing_wheel_power: {
    clarityFinal: 88, speedFinish: 95, controlEven: 78,
    gritRange: 75, cost: 10, powered: true, sprayApply: false,
    abrasiveType: "cotton_muslin_wheel", use: "fast_production_polish",
  },
  uv_topcoat_spray: {
    clarityFinal: 82, speedFinish: 90, controlEven: 80,
    gritRange: 60, cost: 9, powered: false, sprayApply: true,
    abrasiveType: "uv_resin_clear_coat", use: "quick_protective_finish",
  },
};

export function clarityFinal(t: ResinPolishType): number { return specs[t].clarityFinal; }
export function speedFinish(t: ResinPolishType): number { return specs[t].speedFinish; }
export function controlEven(t: ResinPolishType): number { return specs[t].controlEven; }
export function gritRange(t: ResinPolishType): number { return specs[t].gritRange; }
export function polishCost(t: ResinPolishType): number { return specs[t].cost; }
export function powered(t: ResinPolishType): boolean { return specs[t].powered; }
export function sprayApply(t: ResinPolishType): boolean { return specs[t].sprayApply; }
export function abrasiveType(t: ResinPolishType): string { return specs[t].abrasiveType; }
export function bestUse(t: ResinPolishType): string { return specs[t].use; }
export function resinPolishs(): ResinPolishType[] { return Object.keys(specs) as ResinPolishType[]; }
