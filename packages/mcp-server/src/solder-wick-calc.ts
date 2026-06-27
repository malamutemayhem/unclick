export type SolderWickType =
  | "standard_copper_braid"
  | "no_clean_flux_braid"
  | "rosin_flux_braid"
  | "fine_pitch_narrow"
  | "heavy_duty_wide";

const DATA: Record<SolderWickType, {
  absorption: number; precision: number; cleanness: number;
  flexibility: number; wickCost: number; fluxLoaded: boolean;
  forFine: boolean; braidWidth: string; bestUse: string;
}> = {
  standard_copper_braid: { absorption: 7, precision: 6, cleanness: 5, flexibility: 7, wickCost: 2, fluxLoaded: false, forFine: false, braidWidth: "2mm_standard", bestUse: "general_solder_removal" },
  no_clean_flux_braid: { absorption: 8, precision: 7, cleanness: 10, flexibility: 7, wickCost: 4, fluxLoaded: true, forFine: false, braidWidth: "2mm_no_clean", bestUse: "no_wash_board_rework" },
  rosin_flux_braid: { absorption: 9, precision: 7, cleanness: 6, flexibility: 7, wickCost: 3, fluxLoaded: true, forFine: false, braidWidth: "2_5mm_rosin", bestUse: "fast_wick_heavy_solder" },
  fine_pitch_narrow: { absorption: 5, precision: 10, cleanness: 7, flexibility: 9, wickCost: 4, fluxLoaded: true, forFine: true, braidWidth: "0_8mm_ultra_fine", bestUse: "smd_fine_pitch_cleanup" },
  heavy_duty_wide: { absorption: 10, precision: 3, cleanness: 5, flexibility: 4, wickCost: 3, fluxLoaded: true, forFine: false, braidWidth: "5mm_extra_wide", bestUse: "large_joint_bulk_remove" },
};

const get = (t: SolderWickType) => DATA[t];

export const absorption = (t: SolderWickType) => get(t).absorption;
export const precision = (t: SolderWickType) => get(t).precision;
export const cleanness = (t: SolderWickType) => get(t).cleanness;
export const flexibility = (t: SolderWickType) => get(t).flexibility;
export const wickCost = (t: SolderWickType) => get(t).wickCost;
export const fluxLoaded = (t: SolderWickType) => get(t).fluxLoaded;
export const forFine = (t: SolderWickType) => get(t).forFine;
export const braidWidth = (t: SolderWickType) => get(t).braidWidth;
export const bestUse = (t: SolderWickType) => get(t).bestUse;
export const solderWicks = (): SolderWickType[] => Object.keys(DATA) as SolderWickType[];
