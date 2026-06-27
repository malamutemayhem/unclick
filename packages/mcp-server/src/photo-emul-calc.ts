export type PhotoEmulType =
  | "diazo_emulsion_standard"
  | "sbq_emulsion_fast"
  | "dual_cure_hybrid"
  | "capillary_film_precise"
  | "water_resist_plastisol";

const specs: Record<PhotoEmulType, {
  exposureSpeed: number; detailResolve: number; durability: number;
  reclaimEase: number; cost: number; waterResist: boolean; filmBased: boolean;
  sensitizer: string; use: string;
}> = {
  diazo_emulsion_standard: {
    exposureSpeed: 70, detailResolve: 80, durability: 85,
    reclaimEase: 82, cost: 5, waterResist: false, filmBased: false,
    sensitizer: "diazo_powder_mix", use: "general_water_based_ink",
  },
  sbq_emulsion_fast: {
    exposureSpeed: 92, detailResolve: 88, durability: 82,
    reclaimEase: 85, cost: 8, waterResist: false, filmBased: false,
    sensitizer: "sbq_pre_sensitized", use: "fast_exposure_production",
  },
  dual_cure_hybrid: {
    exposureSpeed: 80, detailResolve: 85, durability: 92,
    reclaimEase: 75, cost: 9, waterResist: true, filmBased: false,
    sensitizer: "dual_cure_diazo_sbq", use: "solvent_plastisol_print",
  },
  capillary_film_precise: {
    exposureSpeed: 85, detailResolve: 95, durability: 80,
    reclaimEase: 88, cost: 12, waterResist: false, filmBased: true,
    sensitizer: "pre_coated_film_sheet", use: "precision_halftone_detail",
  },
  water_resist_plastisol: {
    exposureSpeed: 75, detailResolve: 82, durability: 95,
    reclaimEase: 70, cost: 10, waterResist: true, filmBased: false,
    sensitizer: "hardener_additive_mix", use: "long_run_plastisol_print",
  },
};

export function exposureSpeed(t: PhotoEmulType): number { return specs[t].exposureSpeed; }
export function detailResolve(t: PhotoEmulType): number { return specs[t].detailResolve; }
export function durability(t: PhotoEmulType): number { return specs[t].durability; }
export function reclaimEase(t: PhotoEmulType): number { return specs[t].reclaimEase; }
export function emulCost(t: PhotoEmulType): number { return specs[t].cost; }
export function waterResist(t: PhotoEmulType): boolean { return specs[t].waterResist; }
export function filmBased(t: PhotoEmulType): boolean { return specs[t].filmBased; }
export function sensitizer(t: PhotoEmulType): string { return specs[t].sensitizer; }
export function bestUse(t: PhotoEmulType): string { return specs[t].use; }
export function photoEmuls(): PhotoEmulType[] { return Object.keys(specs) as PhotoEmulType[]; }
