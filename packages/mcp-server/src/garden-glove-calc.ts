export type GardenGloveType = "cotton_jersey_light" | "leather_cowhide_heavy" | "nitrile_coated_grip" | "thorn_proof_gauntlet" | "bamboo_breathable_eco";

export function dexterity(t: GardenGloveType): number {
  const m: Record<GardenGloveType, number> = {
    cotton_jersey_light: 9, leather_cowhide_heavy: 5, nitrile_coated_grip: 8, thorn_proof_gauntlet: 3, bamboo_breathable_eco: 7,
  };
  return m[t];
}

export function protection(t: GardenGloveType): number {
  const m: Record<GardenGloveType, number> = {
    cotton_jersey_light: 3, leather_cowhide_heavy: 9, nitrile_coated_grip: 6, thorn_proof_gauntlet: 10, bamboo_breathable_eco: 4,
  };
  return m[t];
}

export function gripStrength(t: GardenGloveType): number {
  const m: Record<GardenGloveType, number> = {
    cotton_jersey_light: 4, leather_cowhide_heavy: 7, nitrile_coated_grip: 10, thorn_proof_gauntlet: 6, bamboo_breathable_eco: 5,
  };
  return m[t];
}

export function breathability(t: GardenGloveType): number {
  const m: Record<GardenGloveType, number> = {
    cotton_jersey_light: 10, leather_cowhide_heavy: 4, nitrile_coated_grip: 6, thorn_proof_gauntlet: 3, bamboo_breathable_eco: 9,
  };
  return m[t];
}

export function gloveCost(t: GardenGloveType): number {
  const m: Record<GardenGloveType, number> = {
    cotton_jersey_light: 2, leather_cowhide_heavy: 7, nitrile_coated_grip: 4, thorn_proof_gauntlet: 8, bamboo_breathable_eco: 5,
  };
  return m[t];
}

export function waterproof(t: GardenGloveType): boolean {
  const m: Record<GardenGloveType, boolean> = {
    cotton_jersey_light: false, leather_cowhide_heavy: false, nitrile_coated_grip: true, thorn_proof_gauntlet: false, bamboo_breathable_eco: false,
  };
  return m[t];
}

export function touchScreenTip(t: GardenGloveType): boolean {
  const m: Record<GardenGloveType, boolean> = {
    cotton_jersey_light: false, leather_cowhide_heavy: false, nitrile_coated_grip: true, thorn_proof_gauntlet: false, bamboo_breathable_eco: true,
  };
  return m[t];
}

export function gloveMaterial(t: GardenGloveType): string {
  const m: Record<GardenGloveType, string> = {
    cotton_jersey_light: "cotton_polyester_knit",
    leather_cowhide_heavy: "split_cowhide_canvas",
    nitrile_coated_grip: "nylon_liner_nitrile_dip",
    thorn_proof_gauntlet: "goatskin_kevlar_lined",
    bamboo_breathable_eco: "bamboo_viscose_latex",
  };
  return m[t];
}

export function bestTask(t: GardenGloveType): string {
  const m: Record<GardenGloveType, string> = {
    cotton_jersey_light: "light_weeding_planting",
    leather_cowhide_heavy: "heavy_digging_hauling",
    nitrile_coated_grip: "wet_muddy_transplant",
    thorn_proof_gauntlet: "rose_cactus_bramble",
    bamboo_breathable_eco: "all_day_comfort_general",
  };
  return m[t];
}

export function gardenGloves(): GardenGloveType[] {
  return ["cotton_jersey_light", "leather_cowhide_heavy", "nitrile_coated_grip", "thorn_proof_gauntlet", "bamboo_breathable_eco"];
}
