export type FloorLampType = "torchiere_uplight" | "arc_overreach_curve" | "tripod_mid_century" | "reading_adjustable_arm" | "tree_multi_branch";

export function brightness(t: FloorLampType): number {
  const m: Record<FloorLampType, number> = {
    torchiere_uplight: 9, arc_overreach_curve: 7, tripod_mid_century: 6, reading_adjustable_arm: 8, tree_multi_branch: 10,
  };
  return m[t];
}

export function ambiance(t: FloorLampType): number {
  const m: Record<FloorLampType, number> = {
    torchiere_uplight: 9, arc_overreach_curve: 8, tripod_mid_century: 10, reading_adjustable_arm: 5, tree_multi_branch: 7,
  };
  return m[t];
}

export function taskLight(t: FloorLampType): number {
  const m: Record<FloorLampType, number> = {
    torchiere_uplight: 3, arc_overreach_curve: 7, tripod_mid_century: 4, reading_adjustable_arm: 10, tree_multi_branch: 6,
  };
  return m[t];
}

export function footprint(t: FloorLampType): number {
  const m: Record<FloorLampType, number> = {
    torchiere_uplight: 9, arc_overreach_curve: 4, tripod_mid_century: 5, reading_adjustable_arm: 8, tree_multi_branch: 6,
  };
  return m[t];
}

export function lampCost(t: FloorLampType): number {
  const m: Record<FloorLampType, number> = {
    torchiere_uplight: 2, arc_overreach_curve: 5, tripod_mid_century: 5, reading_adjustable_arm: 3, tree_multi_branch: 4,
  };
  return m[t];
}

export function dimmable(t: FloorLampType): boolean {
  const m: Record<FloorLampType, boolean> = {
    torchiere_uplight: true, arc_overreach_curve: true, tripod_mid_century: true, reading_adjustable_arm: true, tree_multi_branch: true,
  };
  return m[t];
}

export function adjustableHead(t: FloorLampType): boolean {
  const m: Record<FloorLampType, boolean> = {
    torchiere_uplight: false, arc_overreach_curve: false, tripod_mid_century: false, reading_adjustable_arm: true, tree_multi_branch: true,
  };
  return m[t];
}

export function shadeStyle(t: FloorLampType): string {
  const m: Record<FloorLampType, string> = {
    torchiere_uplight: "glass_bowl_upward",
    arc_overreach_curve: "drum_shade_hanging",
    tripod_mid_century: "fabric_drum_tripod",
    reading_adjustable_arm: "metal_cone_swing_arm",
    tree_multi_branch: "multi_shade_flexible",
  };
  return m[t];
}

export function bestRoom(t: FloorLampType): string {
  const m: Record<FloorLampType, string> = {
    torchiere_uplight: "living_room_ambient_fill",
    arc_overreach_curve: "sofa_side_reading_nook",
    tripod_mid_century: "mid_century_style_room",
    reading_adjustable_arm: "desk_side_craft_corner",
    tree_multi_branch: "large_room_multi_zone",
  };
  return m[t];
}

export function floorLamps(): FloorLampType[] {
  return ["torchiere_uplight", "arc_overreach_curve", "tripod_mid_century", "reading_adjustable_arm", "tree_multi_branch"];
}
