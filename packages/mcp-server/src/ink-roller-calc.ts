export type InkRollerType = "rubber_soft_brayer" | "gelatin_smooth_proof" | "polyurethane_hard_even" | "foam_sponge_texture" | "silicone_release_clean";

export function inkTransfer(t: InkRollerType): number {
  const m: Record<InkRollerType, number> = {
    rubber_soft_brayer: 8, gelatin_smooth_proof: 10, polyurethane_hard_even: 7, foam_sponge_texture: 5, silicone_release_clean: 6,
  };
  return m[t];
}

export function evenCoverage(t: InkRollerType): number {
  const m: Record<InkRollerType, number> = {
    rubber_soft_brayer: 7, gelatin_smooth_proof: 10, polyurethane_hard_even: 9, foam_sponge_texture: 4, silicone_release_clean: 8,
  };
  return m[t];
}

export function durability(t: InkRollerType): number {
  const m: Record<InkRollerType, number> = {
    rubber_soft_brayer: 8, gelatin_smooth_proof: 3, polyurethane_hard_even: 9, foam_sponge_texture: 2, silicone_release_clean: 7,
  };
  return m[t];
}

export function cleanEase(t: InkRollerType): number {
  const m: Record<InkRollerType, number> = {
    rubber_soft_brayer: 6, gelatin_smooth_proof: 4, polyurethane_hard_even: 7, foam_sponge_texture: 3, silicone_release_clean: 10,
  };
  return m[t];
}

export function rollerCost(t: InkRollerType): number {
  const m: Record<InkRollerType, number> = {
    rubber_soft_brayer: 1, gelatin_smooth_proof: 3, polyurethane_hard_even: 2, foam_sponge_texture: 1, silicone_release_clean: 2,
  };
  return m[t];
}

export function forProof(t: InkRollerType): boolean {
  const m: Record<InkRollerType, boolean> = {
    rubber_soft_brayer: false, gelatin_smooth_proof: true, polyurethane_hard_even: false, foam_sponge_texture: false, silicone_release_clean: false,
  };
  return m[t];
}

export function textured(t: InkRollerType): boolean {
  const m: Record<InkRollerType, boolean> = {
    rubber_soft_brayer: false, gelatin_smooth_proof: false, polyurethane_hard_even: false, foam_sponge_texture: true, silicone_release_clean: false,
  };
  return m[t];
}

export function rollerMaterial(t: InkRollerType): string {
  const m: Record<InkRollerType, string> = {
    rubber_soft_brayer: "natural_rubber_soft",
    gelatin_smooth_proof: "animal_gelatin_cast",
    polyurethane_hard_even: "polyurethane_firm",
    foam_sponge_texture: "open_cell_foam",
    silicone_release_clean: "food_grade_silicone",
  };
  return m[t];
}

export function bestUse(t: InkRollerType): string {
  const m: Record<InkRollerType, string> = {
    rubber_soft_brayer: "general_relief_ink",
    gelatin_smooth_proof: "fine_art_proof",
    polyurethane_hard_even: "even_flat_ink",
    foam_sponge_texture: "texture_background",
    silicone_release_clean: "easy_clean_mono",
  };
  return m[t];
}

export function inkRollers(): InkRollerType[] {
  return ["rubber_soft_brayer", "gelatin_smooth_proof", "polyurethane_hard_even", "foam_sponge_texture", "silicone_release_clean"];
}
