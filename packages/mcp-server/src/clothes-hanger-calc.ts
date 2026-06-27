export type ClothesHangerType = "wire_thin_basic" | "wooden_contoured_suit" | "velvet_slim_nonslip" | "padded_satin_delicate" | "clip_trouser_skirt";

export function holdStrength(t: ClothesHangerType): number {
  const m: Record<ClothesHangerType, number> = {
    wire_thin_basic: 4, wooden_contoured_suit: 10, velvet_slim_nonslip: 6, padded_satin_delicate: 3, clip_trouser_skirt: 7,
  };
  return m[t];
}

export function garmentCare(t: ClothesHangerType): number {
  const m: Record<ClothesHangerType, number> = {
    wire_thin_basic: 2, wooden_contoured_suit: 8, velvet_slim_nonslip: 9, padded_satin_delicate: 10, clip_trouser_skirt: 6,
  };
  return m[t];
}

export function spaceEfficiency(t: ClothesHangerType): number {
  const m: Record<ClothesHangerType, number> = {
    wire_thin_basic: 8, wooden_contoured_suit: 3, velvet_slim_nonslip: 10, padded_satin_delicate: 4, clip_trouser_skirt: 7,
  };
  return m[t];
}

export function nonSlip(t: ClothesHangerType): number {
  const m: Record<ClothesHangerType, number> = {
    wire_thin_basic: 2, wooden_contoured_suit: 5, velvet_slim_nonslip: 10, padded_satin_delicate: 8, clip_trouser_skirt: 7,
  };
  return m[t];
}

export function hangerCost(t: ClothesHangerType): number {
  const m: Record<ClothesHangerType, number> = {
    wire_thin_basic: 1, wooden_contoured_suit: 5, velvet_slim_nonslip: 3, padded_satin_delicate: 4, clip_trouser_skirt: 3,
  };
  return m[t];
}

export function hasClips(t: ClothesHangerType): boolean {
  const m: Record<ClothesHangerType, boolean> = {
    wire_thin_basic: false, wooden_contoured_suit: false, velvet_slim_nonslip: false, padded_satin_delicate: false, clip_trouser_skirt: true,
  };
  return m[t];
}

export function shapeRetaining(t: ClothesHangerType): boolean {
  const m: Record<ClothesHangerType, boolean> = {
    wire_thin_basic: false, wooden_contoured_suit: true, velvet_slim_nonslip: false, padded_satin_delicate: true, clip_trouser_skirt: false,
  };
  return m[t];
}

export function hangerMaterial(t: ClothesHangerType): string {
  const m: Record<ClothesHangerType, string> = {
    wire_thin_basic: "galvanized_steel_wire",
    wooden_contoured_suit: "cedar_maple_contoured",
    velvet_slim_nonslip: "abs_core_velvet_flocked",
    padded_satin_delicate: "cotton_padded_satin_cover",
    clip_trouser_skirt: "chrome_steel_rubber_clip",
  };
  return m[t];
}

export function bestGarment(t: ClothesHangerType): string {
  const m: Record<ClothesHangerType, string> = {
    wire_thin_basic: "dry_cleaner_temporary",
    wooden_contoured_suit: "suit_jacket_coat_heavy",
    velvet_slim_nonslip: "blouse_dress_camisole",
    padded_satin_delicate: "silk_lingerie_vintage",
    clip_trouser_skirt: "trousers_skirt_hanging",
  };
  return m[t];
}

export function clothesHangers(): ClothesHangerType[] {
  return ["wire_thin_basic", "wooden_contoured_suit", "velvet_slim_nonslip", "padded_satin_delicate", "clip_trouser_skirt"];
}
