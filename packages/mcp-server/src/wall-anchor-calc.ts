export type WallAnchorType = "plastic_expansion_ribbed" | "toggle_bolt_spring" | "molly_bolt_sleeve" | "self_drilling_zinc" | "concrete_wedge_sleeve";

export function pullOutStrength(t: WallAnchorType): number {
  const m: Record<WallAnchorType, number> = {
    plastic_expansion_ribbed: 4, toggle_bolt_spring: 10, molly_bolt_sleeve: 8, self_drilling_zinc: 6, concrete_wedge_sleeve: 9,
  };
  return m[t];
}

export function installEase(t: WallAnchorType): number {
  const m: Record<WallAnchorType, number> = {
    plastic_expansion_ribbed: 9, toggle_bolt_spring: 5, molly_bolt_sleeve: 6, self_drilling_zinc: 10, concrete_wedge_sleeve: 3,
  };
  return m[t];
}

export function removability(t: WallAnchorType): number {
  const m: Record<WallAnchorType, number> = {
    plastic_expansion_ribbed: 7, toggle_bolt_spring: 4, molly_bolt_sleeve: 3, self_drilling_zinc: 6, concrete_wedge_sleeve: 2,
  };
  return m[t];
}

export function wallDamage(t: WallAnchorType): number {
  const m: Record<WallAnchorType, number> = {
    plastic_expansion_ribbed: 8, toggle_bolt_spring: 4, molly_bolt_sleeve: 5, self_drilling_zinc: 7, concrete_wedge_sleeve: 3,
  };
  return m[t];
}

export function anchorCost(t: WallAnchorType): number {
  const m: Record<WallAnchorType, number> = {
    plastic_expansion_ribbed: 2, toggle_bolt_spring: 6, molly_bolt_sleeve: 5, self_drilling_zinc: 3, concrete_wedge_sleeve: 7,
  };
  return m[t];
}

export function needsPreDrill(t: WallAnchorType): boolean {
  const m: Record<WallAnchorType, boolean> = {
    plastic_expansion_ribbed: true, toggle_bolt_spring: true, molly_bolt_sleeve: true, self_drilling_zinc: false, concrete_wedge_sleeve: true,
  };
  return m[t];
}

export function hollowWallOk(t: WallAnchorType): boolean {
  const m: Record<WallAnchorType, boolean> = {
    plastic_expansion_ribbed: true, toggle_bolt_spring: true, molly_bolt_sleeve: true, self_drilling_zinc: true, concrete_wedge_sleeve: false,
  };
  return m[t];
}

export function anchorMaterial(t: WallAnchorType): string {
  const m: Record<WallAnchorType, string> = {
    plastic_expansion_ribbed: "nylon_ribbed_sleeve",
    toggle_bolt_spring: "steel_spring_wing_toggle",
    molly_bolt_sleeve: "zinc_plated_expanding_sleeve",
    self_drilling_zinc: "zinc_threaded_self_tap",
    concrete_wedge_sleeve: "hardened_steel_wedge_clip",
  };
  return m[t];
}

export function bestWall(t: WallAnchorType): string {
  const m: Record<WallAnchorType, string> = {
    plastic_expansion_ribbed: "drywall_light_duty",
    toggle_bolt_spring: "hollow_wall_heavy_mount",
    molly_bolt_sleeve: "hollow_door_medium_load",
    self_drilling_zinc: "drywall_quick_no_drill",
    concrete_wedge_sleeve: "concrete_masonry_block",
  };
  return m[t];
}

export function wallAnchors(): WallAnchorType[] {
  return ["plastic_expansion_ribbed", "toggle_bolt_spring", "molly_bolt_sleeve", "self_drilling_zinc", "concrete_wedge_sleeve"];
}
