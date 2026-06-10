export type PlantSaucerType = "plastic_round_basic" | "ceramic_glazed_decorative" | "terra_cotta_natural" | "clear_vinyl_drip_tray" | "self_watering_reservoir";

export function waterCapacity(t: PlantSaucerType): number {
  const m: Record<PlantSaucerType, number> = {
    plastic_round_basic: 6, ceramic_glazed_decorative: 7, terra_cotta_natural: 5, clear_vinyl_drip_tray: 4, self_watering_reservoir: 10,
  };
  return m[t];
}

export function aesthetics(t: PlantSaucerType): number {
  const m: Record<PlantSaucerType, number> = {
    plastic_round_basic: 3, ceramic_glazed_decorative: 10, terra_cotta_natural: 8, clear_vinyl_drip_tray: 2, self_watering_reservoir: 5,
  };
  return m[t];
}

export function durability(t: PlantSaucerType): number {
  const m: Record<PlantSaucerType, number> = {
    plastic_round_basic: 7, ceramic_glazed_decorative: 5, terra_cotta_natural: 4, clear_vinyl_drip_tray: 3, self_watering_reservoir: 8,
  };
  return m[t];
}

export function surfaceProtect(t: PlantSaucerType): number {
  const m: Record<PlantSaucerType, number> = {
    plastic_round_basic: 8, ceramic_glazed_decorative: 7, terra_cotta_natural: 4, clear_vinyl_drip_tray: 9, self_watering_reservoir: 9,
  };
  return m[t];
}

export function saucerCost(t: PlantSaucerType): number {
  const m: Record<PlantSaucerType, number> = {
    plastic_round_basic: 1, ceramic_glazed_decorative: 4, terra_cotta_natural: 2, clear_vinyl_drip_tray: 1, self_watering_reservoir: 3,
  };
  return m[t];
}

export function leakProof(t: PlantSaucerType): boolean {
  const m: Record<PlantSaucerType, boolean> = {
    plastic_round_basic: true, ceramic_glazed_decorative: true, terra_cotta_natural: false, clear_vinyl_drip_tray: true, self_watering_reservoir: true,
  };
  return m[t];
}

export function selfWatering(t: PlantSaucerType): boolean {
  const m: Record<PlantSaucerType, boolean> = {
    plastic_round_basic: false, ceramic_glazed_decorative: false, terra_cotta_natural: false, clear_vinyl_drip_tray: false, self_watering_reservoir: true,
  };
  return m[t];
}

export function saucerMaterial(t: PlantSaucerType): string {
  const m: Record<PlantSaucerType, string> = {
    plastic_round_basic: "injection_molded_pp",
    ceramic_glazed_decorative: "kiln_fired_stoneware",
    terra_cotta_natural: "unglazed_clay_earthen",
    clear_vinyl_drip_tray: "flexible_pvc_clear",
    self_watering_reservoir: "abs_wicking_chamber",
  };
  return m[t];
}

export function bestUse(t: PlantSaucerType): string {
  const m: Record<PlantSaucerType, string> = {
    plastic_round_basic: "outdoor_deck_patio",
    ceramic_glazed_decorative: "indoor_display_table",
    terra_cotta_natural: "garden_herb_cluster",
    clear_vinyl_drip_tray: "carpet_floor_protect",
    self_watering_reservoir: "vacation_auto_water",
  };
  return m[t];
}

export function plantSaucers(): PlantSaucerType[] {
  return ["plastic_round_basic", "ceramic_glazed_decorative", "terra_cotta_natural", "clear_vinyl_drip_tray", "self_watering_reservoir"];
}
