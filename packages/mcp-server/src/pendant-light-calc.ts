export type PendantLightType = "drum_shade_fabric" | "glass_globe_clear" | "industrial_metal_cage" | "cluster_multi_drop" | "linear_island_bar";

export function lightSpread(t: PendantLightType): number {
  const m: Record<PendantLightType, number> = {
    drum_shade_fabric: 8, glass_globe_clear: 9, industrial_metal_cage: 5, cluster_multi_drop: 10, linear_island_bar: 9,
  };
  return m[t];
}

export function styleImpact(t: PendantLightType): number {
  const m: Record<PendantLightType, number> = {
    drum_shade_fabric: 7, glass_globe_clear: 9, industrial_metal_cage: 8, cluster_multi_drop: 10, linear_island_bar: 8,
  };
  return m[t];
}

export function installEase(t: PendantLightType): number {
  const m: Record<PendantLightType, number> = {
    drum_shade_fabric: 8, glass_globe_clear: 7, industrial_metal_cage: 9, cluster_multi_drop: 4, linear_island_bar: 5,
  };
  return m[t];
}

export function heightAdjust(t: PendantLightType): number {
  const m: Record<PendantLightType, number> = {
    drum_shade_fabric: 7, glass_globe_clear: 8, industrial_metal_cage: 9, cluster_multi_drop: 6, linear_island_bar: 7,
  };
  return m[t];
}

export function pendantCost(t: PendantLightType): number {
  const m: Record<PendantLightType, number> = {
    drum_shade_fabric: 3, glass_globe_clear: 4, industrial_metal_cage: 3, cluster_multi_drop: 7, linear_island_bar: 6,
  };
  return m[t];
}

export function dimmable(t: PendantLightType): boolean {
  const m: Record<PendantLightType, boolean> = {
    drum_shade_fabric: true, glass_globe_clear: true, industrial_metal_cage: true, cluster_multi_drop: true, linear_island_bar: true,
  };
  return m[t];
}

export function multiBulb(t: PendantLightType): boolean {
  const m: Record<PendantLightType, boolean> = {
    drum_shade_fabric: false, glass_globe_clear: false, industrial_metal_cage: false, cluster_multi_drop: true, linear_island_bar: true,
  };
  return m[t];
}

export function shadeMaterial(t: PendantLightType): string {
  const m: Record<PendantLightType, string> = {
    drum_shade_fabric: "linen_cotton_drum",
    glass_globe_clear: "blown_glass_sphere",
    industrial_metal_cage: "iron_wire_cage_open",
    cluster_multi_drop: "mixed_glass_multi_cord",
    linear_island_bar: "metal_frame_glass_panel",
  };
  return m[t];
}

export function bestRoom(t: PendantLightType): string {
  const m: Record<PendantLightType, string> = {
    drum_shade_fabric: "bedroom_hallway_soft_glow",
    glass_globe_clear: "dining_room_entryway",
    industrial_metal_cage: "kitchen_loft_workshop",
    cluster_multi_drop: "stairwell_high_ceiling",
    linear_island_bar: "kitchen_island_bar_counter",
  };
  return m[t];
}

export function pendantLights(): PendantLightType[] {
  return ["drum_shade_fabric", "glass_globe_clear", "industrial_metal_cage", "cluster_multi_drop", "linear_island_bar"];
}
