export type MoldReleaseType = "spray_silicone_quick" | "paste_wax_buff" | "pva_water_film" | "ptfe_dry_film" | "natural_oil_plant";

export function releaseEase(t: MoldReleaseType): number {
  const m: Record<MoldReleaseType, number> = {
    spray_silicone_quick: 9, paste_wax_buff: 7, pva_water_film: 8, ptfe_dry_film: 10, natural_oil_plant: 6,
  };
  return m[t];
}

export function surfaceFinish(t: MoldReleaseType): number {
  const m: Record<MoldReleaseType, number> = {
    spray_silicone_quick: 7, paste_wax_buff: 9, pva_water_film: 8, ptfe_dry_film: 10, natural_oil_plant: 6,
  };
  return m[t];
}

export function applicationEase(t: MoldReleaseType): number {
  const m: Record<MoldReleaseType, number> = {
    spray_silicone_quick: 10, paste_wax_buff: 5, pva_water_film: 7, ptfe_dry_film: 8, natural_oil_plant: 9,
  };
  return m[t];
}

export function moldLife(t: MoldReleaseType): number {
  const m: Record<MoldReleaseType, number> = {
    spray_silicone_quick: 7, paste_wax_buff: 9, pva_water_film: 6, ptfe_dry_film: 10, natural_oil_plant: 5,
  };
  return m[t];
}

export function releaseCost(t: MoldReleaseType): number {
  const m: Record<MoldReleaseType, number> = {
    spray_silicone_quick: 2, paste_wax_buff: 3, pva_water_film: 2, ptfe_dry_film: 5, natural_oil_plant: 1,
  };
  return m[t];
}

export function foodSafe(t: MoldReleaseType): boolean {
  const m: Record<MoldReleaseType, boolean> = {
    spray_silicone_quick: false, paste_wax_buff: false, pva_water_film: true, ptfe_dry_film: false, natural_oil_plant: true,
  };
  return m[t];
}

export function waterBased(t: MoldReleaseType): boolean {
  const m: Record<MoldReleaseType, boolean> = {
    spray_silicone_quick: false, paste_wax_buff: false, pva_water_film: true, ptfe_dry_film: false, natural_oil_plant: false,
  };
  return m[t];
}

export function releaseBase(t: MoldReleaseType): string {
  const m: Record<MoldReleaseType, string> = {
    spray_silicone_quick: "dimethyl_silicone_aerosol",
    paste_wax_buff: "carnauba_wax_blend",
    pva_water_film: "polyvinyl_alcohol_film",
    ptfe_dry_film: "ptfe_fluoropolymer",
    natural_oil_plant: "coconut_oil_refined",
  };
  return m[t];
}

export function bestUse(t: MoldReleaseType): string {
  const m: Record<MoldReleaseType, string> = {
    spray_silicone_quick: "quick_spray_general",
    paste_wax_buff: "high_gloss_casting",
    pva_water_film: "fiberglass_layup",
    ptfe_dry_film: "precision_mold_detail",
    natural_oil_plant: "soap_candle_natural",
  };
  return m[t];
}

export function moldReleases(): MoldReleaseType[] {
  return ["spray_silicone_quick", "paste_wax_buff", "pva_water_film", "ptfe_dry_film", "natural_oil_plant"];
}
