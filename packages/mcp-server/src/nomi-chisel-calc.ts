export type NomiChiselType =
  | "oire_nomi_bench"
  | "tataki_nomi_strike"
  | "shinogi_nomi_paring"
  | "mukoumachi_mortise"
  | "kote_nomi_cranked";

const specs: Record<NomiChiselType, {
  cutClean: number; controlFine: number; powerStrike: number;
  edgeHold: number; cost: number; forMortise: boolean; cranked: boolean;
  grindProfile: string; use: string;
}> = {
  oire_nomi_bench: {
    cutClean: 88, controlFine: 85, powerStrike: 82,
    edgeHold: 85, cost: 50, forMortise: false, cranked: false,
    grindProfile: "hollow_ground_bevel", use: "general_bench_work",
  },
  tataki_nomi_strike: {
    cutClean: 85, controlFine: 78, powerStrike: 95,
    edgeHold: 88, cost: 45, forMortise: false, cranked: false,
    grindProfile: "heavy_duty_bevel", use: "heavy_mallet_strike",
  },
  shinogi_nomi_paring: {
    cutClean: 92, controlFine: 95, powerStrike: 65,
    edgeHold: 80, cost: 60, forMortise: false, cranked: false,
    grindProfile: "thin_paring_bevel", use: "fine_paring_cut",
  },
  mukoumachi_mortise: {
    cutClean: 82, controlFine: 80, powerStrike: 90,
    edgeHold: 92, cost: 55, forMortise: true, cranked: false,
    grindProfile: "thick_mortise_bevel", use: "deep_mortise_cut",
  },
  kote_nomi_cranked: {
    cutClean: 85, controlFine: 88, powerStrike: 72,
    edgeHold: 82, cost: 65, forMortise: false, cranked: true,
    grindProfile: "cranked_offset_blade", use: "inside_corner_clean",
  },
};

export function cutClean(t: NomiChiselType): number { return specs[t].cutClean; }
export function controlFine(t: NomiChiselType): number { return specs[t].controlFine; }
export function powerStrike(t: NomiChiselType): number { return specs[t].powerStrike; }
export function edgeHold(t: NomiChiselType): number { return specs[t].edgeHold; }
export function chiselCost(t: NomiChiselType): number { return specs[t].cost; }
export function forMortise(t: NomiChiselType): boolean { return specs[t].forMortise; }
export function cranked(t: NomiChiselType): boolean { return specs[t].cranked; }
export function grindProfile(t: NomiChiselType): string { return specs[t].grindProfile; }
export function bestUse(t: NomiChiselType): string { return specs[t].use; }
export function nomiChisels(): NomiChiselType[] { return Object.keys(specs) as NomiChiselType[]; }
