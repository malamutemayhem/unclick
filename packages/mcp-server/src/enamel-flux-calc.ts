export type EnamelFluxType =
  | "soft_flux_low"
  | "medium_flux_standard"
  | "hard_flux_high"
  | "opalescent_flux_glow"
  | "leaded_flux_traditional";

const specs: Record<EnamelFluxType, {
  clarity: number; flowSmooth: number; tempRange: number;
  colorEffect: number; cost: number; opalescent: boolean; leadFree: boolean;
  fireTemp: string; use: string;
}> = {
  soft_flux_low: {
    clarity: 90, flowSmooth: 92, tempRange: 75,
    colorEffect: 78, cost: 7, opalescent: false, leadFree: true,
    fireTemp: "low_1350f_fire", use: "over_glaze_clear_coat",
  },
  medium_flux_standard: {
    clarity: 88, flowSmooth: 88, tempRange: 85,
    colorEffect: 82, cost: 6, opalescent: false, leadFree: true,
    fireTemp: "medium_1450f_fire", use: "general_transparent_base",
  },
  hard_flux_high: {
    clarity: 85, flowSmooth: 82, tempRange: 92,
    colorEffect: 80, cost: 8, opalescent: false, leadFree: true,
    fireTemp: "high_1550f_fire", use: "undercoat_base_layer",
  },
  opalescent_flux_glow: {
    clarity: 78, flowSmooth: 85, tempRange: 80,
    colorEffect: 92, cost: 10, opalescent: true, leadFree: true,
    fireTemp: "medium_1450f_fire", use: "milky_opal_effect",
  },
  leaded_flux_traditional: {
    clarity: 92, flowSmooth: 90, tempRange: 70,
    colorEffect: 85, cost: 9, opalescent: false, leadFree: false,
    fireTemp: "low_1250f_fire", use: "traditional_jewelry_enamel",
  },
};

export function clarity(t: EnamelFluxType): number { return specs[t].clarity; }
export function flowSmooth(t: EnamelFluxType): number { return specs[t].flowSmooth; }
export function tempRange(t: EnamelFluxType): number { return specs[t].tempRange; }
export function colorEffect(t: EnamelFluxType): number { return specs[t].colorEffect; }
export function fluxCost(t: EnamelFluxType): number { return specs[t].cost; }
export function opalescent(t: EnamelFluxType): boolean { return specs[t].opalescent; }
export function leadFree(t: EnamelFluxType): boolean { return specs[t].leadFree; }
export function fireTemp(t: EnamelFluxType): string { return specs[t].fireTemp; }
export function bestUse(t: EnamelFluxType): string { return specs[t].use; }
export function enamelFluxs(): EnamelFluxType[] { return Object.keys(specs) as EnamelFluxType[]; }
