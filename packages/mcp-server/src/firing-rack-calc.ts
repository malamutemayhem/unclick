export type FiringRackType = "mesh_screen_flat" | "trivets_star_point" | "stilts_three_point" | "firing_fork_lift" | "ceramic_post_stack";

export function airFlow(t: FiringRackType): number {
  const m: Record<FiringRackType, number> = {
    mesh_screen_flat: 10, trivets_star_point: 8, stilts_three_point: 9, firing_fork_lift: 6, ceramic_post_stack: 5,
  };
  return m[t];
}

export function markFree(t: FiringRackType): number {
  const m: Record<FiringRackType, number> = {
    mesh_screen_flat: 5, trivets_star_point: 7, stilts_three_point: 9, firing_fork_lift: 8, ceramic_post_stack: 10,
  };
  return m[t];
}

export function heatEven(t: FiringRackType): number {
  const m: Record<FiringRackType, number> = {
    mesh_screen_flat: 9, trivets_star_point: 7, stilts_three_point: 6, firing_fork_lift: 5, ceramic_post_stack: 8,
  };
  return m[t];
}

export function stability(t: FiringRackType): number {
  const m: Record<FiringRackType, number> = {
    mesh_screen_flat: 10, trivets_star_point: 7, stilts_three_point: 6, firing_fork_lift: 5, ceramic_post_stack: 9,
  };
  return m[t];
}

export function rackCost(t: FiringRackType): number {
  const m: Record<FiringRackType, number> = {
    mesh_screen_flat: 2, trivets_star_point: 1, stilts_three_point: 1, firing_fork_lift: 3, ceramic_post_stack: 2,
  };
  return m[t];
}

export function reusable(t: FiringRackType): boolean {
  const m: Record<FiringRackType, boolean> = {
    mesh_screen_flat: true, trivets_star_point: true, stilts_three_point: false, firing_fork_lift: true, ceramic_post_stack: true,
  };
  return m[t];
}

export function stackable(t: FiringRackType): boolean {
  const m: Record<FiringRackType, boolean> = {
    mesh_screen_flat: true, trivets_star_point: false, stilts_three_point: false, firing_fork_lift: false, ceramic_post_stack: true,
  };
  return m[t];
}

export function rackMaterial(t: FiringRackType): string {
  const m: Record<FiringRackType, string> = {
    mesh_screen_flat: "stainless_mesh_wire",
    trivets_star_point: "nichrome_wire_formed",
    stilts_three_point: "ceramic_point_tip",
    firing_fork_lift: "steel_handle_fork",
    ceramic_post_stack: "high_alumina_post",
  };
  return m[t];
}

export function bestUse(t: FiringRackType): string {
  const m: Record<FiringRackType, string> = {
    mesh_screen_flat: "flat_piece_support",
    trivets_star_point: "small_piece_elevate",
    stilts_three_point: "glazed_bottom_fire",
    firing_fork_lift: "hot_piece_transfer",
    ceramic_post_stack: "multi_shelf_stack",
  };
  return m[t];
}

export function firingRacks(): FiringRackType[] {
  return ["mesh_screen_flat", "trivets_star_point", "stilts_three_point", "firing_fork_lift", "ceramic_post_stack"];
}
