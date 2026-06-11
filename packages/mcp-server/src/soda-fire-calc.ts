export type SodaFireType =
  | "soda_ash_standard"
  | "baking_soda_mild"
  | "salt_soda_blend"
  | "borax_soda_flux"
  | "soda_spray_even";

const specs: Record<SodaFireType, {
  glazeDepth: number; colorFlash: number; surfaceTexture: number;
  controlEven: number; cost: number; sprayed: boolean; blended: boolean;
  sodaSource: string; use: string;
}> = {
  soda_ash_standard: {
    glazeDepth: 88, colorFlash: 85, surfaceTexture: 82,
    controlEven: 80, cost: 12, sprayed: false, blended: false,
    sodaSource: "pure_soda_ash", use: "general_soda_fire",
  },
  baking_soda_mild: {
    glazeDepth: 78, colorFlash: 75, surfaceTexture: 80,
    controlEven: 85, cost: 5, sprayed: false, blended: false,
    sodaSource: "sodium_bicarbonate", use: "mild_surface_glaze",
  },
  salt_soda_blend: {
    glazeDepth: 85, colorFlash: 92, surfaceTexture: 88,
    controlEven: 75, cost: 10, sprayed: false, blended: true,
    sodaSource: "salt_soda_mix", use: "rich_flash_surface",
  },
  borax_soda_flux: {
    glazeDepth: 92, colorFlash: 88, surfaceTexture: 85,
    controlEven: 78, cost: 15, sprayed: false, blended: true,
    sodaSource: "borax_soda_powder", use: "deep_glaze_flux",
  },
  soda_spray_even: {
    glazeDepth: 82, colorFlash: 80, surfaceTexture: 78,
    controlEven: 92, cost: 20, sprayed: true, blended: false,
    sodaSource: "dissolved_soda_spray", use: "even_coverage_spray",
  },
};

export function glazeDepth(t: SodaFireType): number { return specs[t].glazeDepth; }
export function colorFlash(t: SodaFireType): number { return specs[t].colorFlash; }
export function surfaceTexture(t: SodaFireType): number { return specs[t].surfaceTexture; }
export function controlEven(t: SodaFireType): number { return specs[t].controlEven; }
export function sodaCost(t: SodaFireType): number { return specs[t].cost; }
export function sprayed(t: SodaFireType): boolean { return specs[t].sprayed; }
export function blended(t: SodaFireType): boolean { return specs[t].blended; }
export function sodaSource(t: SodaFireType): string { return specs[t].sodaSource; }
export function bestUse(t: SodaFireType): string { return specs[t].use; }
export function sodaFires(): SodaFireType[] { return Object.keys(specs) as SodaFireType[]; }
