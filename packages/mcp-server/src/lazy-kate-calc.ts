export type LazyKateType = "horizontal_peg_simple" | "tensioned_brake_spring" | "vertical_stand_tower" | "clamp_on_table_mount" | "electric_kate_motor";

export function tensionControl(t: LazyKateType): number {
  const m: Record<LazyKateType, number> = {
    horizontal_peg_simple: 3, tensioned_brake_spring: 10, vertical_stand_tower: 5, clamp_on_table_mount: 7, electric_kate_motor: 9,
  };
  return m[t];
}

export function bobbinCapacity(t: LazyKateType): number {
  const m: Record<LazyKateType, number> = {
    horizontal_peg_simple: 6, tensioned_brake_spring: 7, vertical_stand_tower: 10, clamp_on_table_mount: 5, electric_kate_motor: 8,
  };
  return m[t];
}

export function stability(t: LazyKateType): number {
  const m: Record<LazyKateType, number> = {
    horizontal_peg_simple: 5, tensioned_brake_spring: 8, vertical_stand_tower: 9, clamp_on_table_mount: 10, electric_kate_motor: 7,
  };
  return m[t];
}

export function portability(t: LazyKateType): number {
  const m: Record<LazyKateType, number> = {
    horizontal_peg_simple: 10, tensioned_brake_spring: 7, vertical_stand_tower: 4, clamp_on_table_mount: 6, electric_kate_motor: 3,
  };
  return m[t];
}

export function kateCost(t: LazyKateType): number {
  const m: Record<LazyKateType, number> = {
    horizontal_peg_simple: 1, tensioned_brake_spring: 3, vertical_stand_tower: 3, clamp_on_table_mount: 2, electric_kate_motor: 5,
  };
  return m[t];
}

export function hasBrake(t: LazyKateType): boolean {
  const m: Record<LazyKateType, boolean> = {
    horizontal_peg_simple: false, tensioned_brake_spring: true, vertical_stand_tower: false, clamp_on_table_mount: false, electric_kate_motor: true,
  };
  return m[t];
}

export function freestanding(t: LazyKateType): boolean {
  const m: Record<LazyKateType, boolean> = {
    horizontal_peg_simple: true, tensioned_brake_spring: true, vertical_stand_tower: true, clamp_on_table_mount: false, electric_kate_motor: true,
  };
  return m[t];
}

export function mountStyle(t: LazyKateType): string {
  const m: Record<LazyKateType, string> = {
    horizontal_peg_simple: "horizontal_dowel_peg",
    tensioned_brake_spring: "spring_brake_axle",
    vertical_stand_tower: "vertical_stacked_peg",
    clamp_on_table_mount: "c_clamp_table_edge",
    electric_kate_motor: "motorized_feed_drive",
  };
  return m[t];
}

export function bestPlying(t: LazyKateType): string {
  const m: Record<LazyKateType, string> = {
    horizontal_peg_simple: "casual_two_ply_basic",
    tensioned_brake_spring: "even_tension_navajo",
    vertical_stand_tower: "multi_bobbin_cable",
    clamp_on_table_mount: "stable_chain_ply",
    electric_kate_motor: "production_speed_ply",
  };
  return m[t];
}

export function lazyKates(): LazyKateType[] {
  return ["horizontal_peg_simple", "tensioned_brake_spring", "vertical_stand_tower", "clamp_on_table_mount", "electric_kate_motor"];
}
