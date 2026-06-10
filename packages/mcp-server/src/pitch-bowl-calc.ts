export type PitchBowlType = "cast_iron_heavy" | "wood_base_light" | "steel_hemisphere_pro" | "rubber_ring_pad" | "leather_sandbag_flex";

export function holdForce(t: PitchBowlType): number {
  const m: Record<PitchBowlType, number> = {
    cast_iron_heavy: 10, wood_base_light: 6, steel_hemisphere_pro: 9, rubber_ring_pad: 5, leather_sandbag_flex: 4,
  };
  return m[t];
}

export function tiltControl(t: PitchBowlType): number {
  const m: Record<PitchBowlType, number> = {
    cast_iron_heavy: 9, wood_base_light: 6, steel_hemisphere_pro: 10, rubber_ring_pad: 8, leather_sandbag_flex: 7,
  };
  return m[t];
}

export function portability(t: PitchBowlType): number {
  const m: Record<PitchBowlType, number> = {
    cast_iron_heavy: 3, wood_base_light: 8, steel_hemisphere_pro: 4, rubber_ring_pad: 9, leather_sandbag_flex: 10,
  };
  return m[t];
}

export function heatRetain(t: PitchBowlType): number {
  const m: Record<PitchBowlType, number> = {
    cast_iron_heavy: 9, wood_base_light: 5, steel_hemisphere_pro: 8, rubber_ring_pad: 4, leather_sandbag_flex: 3,
  };
  return m[t];
}

export function bowlCost(t: PitchBowlType): number {
  const m: Record<PitchBowlType, number> = {
    cast_iron_heavy: 3, wood_base_light: 1, steel_hemisphere_pro: 3, rubber_ring_pad: 1, leather_sandbag_flex: 2,
  };
  return m[t];
}

export function needsPitch(t: PitchBowlType): boolean {
  const m: Record<PitchBowlType, boolean> = {
    cast_iron_heavy: true, wood_base_light: true, steel_hemisphere_pro: true, rubber_ring_pad: false, leather_sandbag_flex: false,
  };
  return m[t];
}

export function freeform(t: PitchBowlType): boolean {
  const m: Record<PitchBowlType, boolean> = {
    cast_iron_heavy: false, wood_base_light: false, steel_hemisphere_pro: false, rubber_ring_pad: false, leather_sandbag_flex: true,
  };
  return m[t];
}

export function bowlMaterial(t: PitchBowlType): string {
  const m: Record<PitchBowlType, string> = {
    cast_iron_heavy: "grey_cast_iron",
    wood_base_light: "turned_hardwood_maple",
    steel_hemisphere_pro: "spun_steel_shell",
    rubber_ring_pad: "vulcanized_rubber_ring",
    leather_sandbag_flex: "cowhide_sand_fill",
  };
  return m[t];
}

export function bestUse(t: PitchBowlType): string {
  const m: Record<PitchBowlType, string> = {
    cast_iron_heavy: "heavy_repousse_chase",
    wood_base_light: "light_emboss_work",
    steel_hemisphere_pro: "precision_chase_detail",
    rubber_ring_pad: "quick_shape_support",
    leather_sandbag_flex: "freeform_hammer_shape",
  };
  return m[t];
}

export function pitchBowls(): PitchBowlType[] {
  return ["cast_iron_heavy", "wood_base_light", "steel_hemisphere_pro", "rubber_ring_pad", "leather_sandbag_flex"];
}
