export type TrunkOrganizerType = "collapsible_multi" | "cargo_net_stretch" | "rigid_bin_divider" | "hanging_seat_back" | "cooler_combo_insulated";

export function storageCapacity(t: TrunkOrganizerType): number {
  const m: Record<TrunkOrganizerType, number> = {
    collapsible_multi: 8, cargo_net_stretch: 5, rigid_bin_divider: 9, hanging_seat_back: 4, cooler_combo_insulated: 7,
  };
  return m[t];
}

export function spaceWhenEmpty(t: TrunkOrganizerType): number {
  const m: Record<TrunkOrganizerType, number> = {
    collapsible_multi: 9, cargo_net_stretch: 10, rigid_bin_divider: 2, hanging_seat_back: 8, cooler_combo_insulated: 5,
  };
  return m[t];
}

export function spillContain(t: TrunkOrganizerType): number {
  const m: Record<TrunkOrganizerType, number> = {
    collapsible_multi: 6, cargo_net_stretch: 1, rigid_bin_divider: 8, hanging_seat_back: 3, cooler_combo_insulated: 10,
  };
  return m[t];
}

export function itemSecurity(t: TrunkOrganizerType): number {
  const m: Record<TrunkOrganizerType, number> = {
    collapsible_multi: 7, cargo_net_stretch: 6, rigid_bin_divider: 9, hanging_seat_back: 5, cooler_combo_insulated: 7,
  };
  return m[t];
}

export function organizerCost(t: TrunkOrganizerType): number {
  const m: Record<TrunkOrganizerType, number> = {
    collapsible_multi: 4, cargo_net_stretch: 2, rigid_bin_divider: 7, hanging_seat_back: 4, cooler_combo_insulated: 6,
  };
  return m[t];
}

export function washable(t: TrunkOrganizerType): boolean {
  const m: Record<TrunkOrganizerType, boolean> = {
    collapsible_multi: true, cargo_net_stretch: true, rigid_bin_divider: true, hanging_seat_back: true, cooler_combo_insulated: true,
  };
  return m[t];
}

export function insulated(t: TrunkOrganizerType): boolean {
  const m: Record<TrunkOrganizerType, boolean> = {
    collapsible_multi: false, cargo_net_stretch: false, rigid_bin_divider: false, hanging_seat_back: false, cooler_combo_insulated: true,
  };
  return m[t];
}

export function baseMaterial(t: TrunkOrganizerType): string {
  const m: Record<TrunkOrganizerType, string> = {
    collapsible_multi: "oxford_polyester_fold",
    cargo_net_stretch: "elastic_nylon_mesh",
    rigid_bin_divider: "molded_abs_plastic",
    hanging_seat_back: "stitched_canvas_pocket",
    cooler_combo_insulated: "peva_lined_poly_foam",
  };
  return m[t];
}

export function bestCar(t: TrunkOrganizerType): string {
  const m: Record<TrunkOrganizerType, string> = {
    collapsible_multi: "suv_grocery_general",
    cargo_net_stretch: "sedan_trunk_quick",
    rigid_bin_divider: "work_truck_tool_sort",
    hanging_seat_back: "family_car_kid_stuff",
    cooler_combo_insulated: "road_trip_picnic_cold",
  };
  return m[t];
}

export function trunkOrganizers(): TrunkOrganizerType[] {
  return ["collapsible_multi", "cargo_net_stretch", "rigid_bin_divider", "hanging_seat_back", "cooler_combo_insulated"];
}
