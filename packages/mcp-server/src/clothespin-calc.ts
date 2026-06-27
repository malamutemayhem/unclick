export type ClothespinType = "spring_wood" | "clip_plastic" | "dolly_peg_slot" | "stainless_steel_wire" | "soft_grip_silicone";

export function gripStrength(t: ClothespinType): number {
  const m: Record<ClothespinType, number> = {
    spring_wood: 7, clip_plastic: 5, dolly_peg_slot: 4, stainless_steel_wire: 9, soft_grip_silicone: 6,
  };
  return m[t];
}

export function durability(t: ClothespinType): number {
  const m: Record<ClothespinType, number> = {
    spring_wood: 6, clip_plastic: 4, dolly_peg_slot: 8, stainless_steel_wire: 10, soft_grip_silicone: 7,
  };
  return m[t];
}

export function fabricGentle(t: ClothespinType): number {
  const m: Record<ClothespinType, number> = {
    spring_wood: 6, clip_plastic: 7, dolly_peg_slot: 5, stainless_steel_wire: 3, soft_grip_silicone: 10,
  };
  return m[t];
}

export function weatherResist(t: ClothespinType): number {
  const m: Record<ClothespinType, number> = {
    spring_wood: 3, clip_plastic: 7, dolly_peg_slot: 4, stainless_steel_wire: 10, soft_grip_silicone: 8,
  };
  return m[t];
}

export function pinCost(t: ClothespinType): number {
  const m: Record<ClothespinType, number> = {
    spring_wood: 1, clip_plastic: 1, dolly_peg_slot: 2, stainless_steel_wire: 4, soft_grip_silicone: 3,
  };
  return m[t];
}

export function rustProof(t: ClothespinType): boolean {
  const m: Record<ClothespinType, boolean> = {
    spring_wood: false, clip_plastic: true, dolly_peg_slot: false, stainless_steel_wire: true, soft_grip_silicone: true,
  };
  return m[t];
}

export function leavesMarks(t: ClothespinType): boolean {
  const m: Record<ClothespinType, boolean> = {
    spring_wood: true, clip_plastic: false, dolly_peg_slot: true, stainless_steel_wire: true, soft_grip_silicone: false,
  };
  return m[t];
}

export function pinMaterial(t: ClothespinType): string {
  const m: Record<ClothespinType, string> = {
    spring_wood: "birch_coil_spring",
    clip_plastic: "polypropylene_hinge",
    dolly_peg_slot: "solid_hardwood_slot",
    stainless_steel_wire: "marine_grade_304_wire",
    soft_grip_silicone: "silicone_coated_plastic",
  };
  return m[t];
}

export function bestUse(t: ClothespinType): string {
  const m: Record<ClothespinType, string> = {
    spring_wood: "backyard_clothesline_basic",
    clip_plastic: "indoor_rack_lightweight",
    dolly_peg_slot: "craft_display_vintage",
    stainless_steel_wire: "coastal_outdoor_heavy",
    soft_grip_silicone: "delicate_fabric_gentle",
  };
  return m[t];
}

export function clothespins(): ClothespinType[] {
  return ["spring_wood", "clip_plastic", "dolly_peg_slot", "stainless_steel_wire", "soft_grip_silicone"];
}
