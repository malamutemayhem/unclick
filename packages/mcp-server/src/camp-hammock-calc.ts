export type CampHammockType = "parachute_nylon_double" | "ultralight_single_layer" | "bridge_flat_lay" | "gathered_end_classic" | "hammock_tent_bug_net";

export function sleepComfort(t: CampHammockType): number {
  const m: Record<CampHammockType, number> = {
    parachute_nylon_double: 8, ultralight_single_layer: 5, bridge_flat_lay: 10, gathered_end_classic: 7, hammock_tent_bug_net: 8,
  };
  return m[t];
}

export function packWeight(t: CampHammockType): number {
  const m: Record<CampHammockType, number> = {
    parachute_nylon_double: 5, ultralight_single_layer: 10, bridge_flat_lay: 3, gathered_end_classic: 7, hammock_tent_bug_net: 4,
  };
  return m[t];
}

export function setupEase(t: CampHammockType): number {
  const m: Record<CampHammockType, number> = {
    parachute_nylon_double: 8, ultralight_single_layer: 9, bridge_flat_lay: 5, gathered_end_classic: 8, hammock_tent_bug_net: 6,
  };
  return m[t];
}

export function weatherProtect(t: CampHammockType): number {
  const m: Record<CampHammockType, number> = {
    parachute_nylon_double: 4, ultralight_single_layer: 2, bridge_flat_lay: 6, gathered_end_classic: 3, hammock_tent_bug_net: 9,
  };
  return m[t];
}

export function hammockCost(t: CampHammockType): number {
  const m: Record<CampHammockType, number> = {
    parachute_nylon_double: 1, ultralight_single_layer: 2, bridge_flat_lay: 3, gathered_end_classic: 1, hammock_tent_bug_net: 3,
  };
  return m[t];
}

export function hasBugNet(t: CampHammockType): boolean {
  const m: Record<CampHammockType, boolean> = {
    parachute_nylon_double: false, ultralight_single_layer: false, bridge_flat_lay: false, gathered_end_classic: false, hammock_tent_bug_net: true,
  };
  return m[t];
}

export function flatLay(t: CampHammockType): boolean {
  const m: Record<CampHammockType, boolean> = {
    parachute_nylon_double: false, ultralight_single_layer: false, bridge_flat_lay: true, gathered_end_classic: false, hammock_tent_bug_net: false,
  };
  return m[t];
}

export function suspensionType(t: CampHammockType): string {
  const m: Record<CampHammockType, string> = {
    parachute_nylon_double: "tree_strap_carabiner",
    ultralight_single_layer: "dyneema_whoopie_sling",
    bridge_flat_lay: "spreader_bar_strap",
    gathered_end_classic: "rope_knot_toggle",
    hammock_tent_bug_net: "integrated_strap_ridge",
  };
  return m[t];
}

export function bestUse(t: CampHammockType): string {
  const m: Record<CampHammockType, string> = {
    parachute_nylon_double: "casual_park_hang",
    ultralight_single_layer: "thru_hike_fast_light",
    bridge_flat_lay: "side_sleeper_overnight",
    gathered_end_classic: "backyard_relax_nap",
    hammock_tent_bug_net: "tropical_forest_camp",
  };
  return m[t];
}

export function campHammocks(): CampHammockType[] {
  return ["parachute_nylon_double", "ultralight_single_layer", "bridge_flat_lay", "gathered_end_classic", "hammock_tent_bug_net"];
}
