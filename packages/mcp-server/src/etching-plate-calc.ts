export type EtchingPlateType = "copper_traditional_fine" | "zinc_affordable_soft" | "aluminum_light_easy" | "steel_durable_hard" | "photopolymer_light_safe";

export function detailResolution(t: EtchingPlateType): number {
  const m: Record<EtchingPlateType, number> = {
    copper_traditional_fine: 10, zinc_affordable_soft: 7, aluminum_light_easy: 6, steel_durable_hard: 8, photopolymer_light_safe: 9,
  };
  return m[t];
}

export function etchEase(t: EtchingPlateType): number {
  const m: Record<EtchingPlateType, number> = {
    copper_traditional_fine: 6, zinc_affordable_soft: 9, aluminum_light_easy: 10, steel_durable_hard: 4, photopolymer_light_safe: 8,
  };
  return m[t];
}

export function printEditions(t: EtchingPlateType): number {
  const m: Record<EtchingPlateType, number> = {
    copper_traditional_fine: 10, zinc_affordable_soft: 5, aluminum_light_easy: 4, steel_durable_hard: 9, photopolymer_light_safe: 6,
  };
  return m[t];
}

export function inkHold(t: EtchingPlateType): number {
  const m: Record<EtchingPlateType, number> = {
    copper_traditional_fine: 10, zinc_affordable_soft: 8, aluminum_light_easy: 6, steel_durable_hard: 7, photopolymer_light_safe: 8,
  };
  return m[t];
}

export function plateCost(t: EtchingPlateType): number {
  const m: Record<EtchingPlateType, number> = {
    copper_traditional_fine: 5, zinc_affordable_soft: 2, aluminum_light_easy: 2, steel_durable_hard: 3, photopolymer_light_safe: 4,
  };
  return m[t];
}

export function nonToxic(t: EtchingPlateType): boolean {
  const m: Record<EtchingPlateType, boolean> = {
    copper_traditional_fine: false, zinc_affordable_soft: false, aluminum_light_easy: true, steel_durable_hard: false, photopolymer_light_safe: true,
  };
  return m[t];
}

export function reusable(t: EtchingPlateType): boolean {
  const m: Record<EtchingPlateType, boolean> = {
    copper_traditional_fine: true, zinc_affordable_soft: true, aluminum_light_easy: true, steel_durable_hard: true, photopolymer_light_safe: false,
  };
  return m[t];
}

export function plateMetal(t: EtchingPlateType): string {
  const m: Record<EtchingPlateType, string> = {
    copper_traditional_fine: "pure_copper_polished",
    zinc_affordable_soft: "zinc_alloy_rolled",
    aluminum_light_easy: "aluminum_sheet_soft",
    steel_durable_hard: "mild_steel_ground",
    photopolymer_light_safe: "polymer_uv_sensitive",
  };
  return m[t];
}

export function bestUse(t: EtchingPlateType): string {
  const m: Record<EtchingPlateType, string> = {
    copper_traditional_fine: "fine_art_intaglio",
    zinc_affordable_soft: "student_practice_etch",
    aluminum_light_easy: "drypoint_easy_start",
    steel_durable_hard: "large_edition_durable",
    photopolymer_light_safe: "photo_transfer_safe",
  };
  return m[t];
}

export function etchingPlates(): EtchingPlateType[] {
  return ["copper_traditional_fine", "zinc_affordable_soft", "aluminum_light_easy", "steel_durable_hard", "photopolymer_light_safe"];
}
