export type RoofRackType = "crossbar_universal" | "cargo_box_aero" | "bike_mount_fork" | "kayak_saddle" | "basket_open";

export function loadCapacity(t: RoofRackType): number {
  const m: Record<RoofRackType, number> = {
    crossbar_universal: 8, cargo_box_aero: 7, bike_mount_fork: 4, kayak_saddle: 5, basket_open: 9,
  };
  return m[t];
}

export function aeroDrag(t: RoofRackType): number {
  const m: Record<RoofRackType, number> = {
    crossbar_universal: 7, cargo_box_aero: 9, bike_mount_fork: 5, kayak_saddle: 4, basket_open: 3,
  };
  return m[t];
}

export function installEase(t: RoofRackType): number {
  const m: Record<RoofRackType, number> = {
    crossbar_universal: 7, cargo_box_aero: 4, bike_mount_fork: 8, kayak_saddle: 6, basket_open: 5,
  };
  return m[t];
}

export function securityLevel(t: RoofRackType): number {
  const m: Record<RoofRackType, number> = {
    crossbar_universal: 6, cargo_box_aero: 10, bike_mount_fork: 7, kayak_saddle: 5, basket_open: 3,
  };
  return m[t];
}

export function rackCost(t: RoofRackType): number {
  const m: Record<RoofRackType, number> = {
    crossbar_universal: 4, cargo_box_aero: 10, bike_mount_fork: 6, kayak_saddle: 5, basket_open: 3,
  };
  return m[t];
}

export function lockable(t: RoofRackType): boolean {
  const m: Record<RoofRackType, boolean> = {
    crossbar_universal: true, cargo_box_aero: true, bike_mount_fork: true, kayak_saddle: false, basket_open: false,
  };
  return m[t];
}

export function fitsRails(t: RoofRackType): boolean {
  const m: Record<RoofRackType, boolean> = {
    crossbar_universal: true, cargo_box_aero: false, bike_mount_fork: false, kayak_saddle: false, basket_open: true,
  };
  return m[t];
}

export function mountSystem(t: RoofRackType): string {
  const m: Record<RoofRackType, string> = {
    crossbar_universal: "clamp_fit_rain_gutter", cargo_box_aero: "t_slot_crossbar_mount",
    bike_mount_fork: "fork_mount_quick_release", kayak_saddle: "j_cradle_strap_down",
    basket_open: "universal_crossbar_bolt",
  };
  return m[t];
}

export function bestCargo(t: RoofRackType): string {
  const m: Record<RoofRackType, string> = {
    crossbar_universal: "general_foundation_base", cargo_box_aero: "ski_luggage_weather_protect",
    bike_mount_fork: "road_mountain_bike_transport", kayak_saddle: "kayak_canoe_paddleboard",
    basket_open: "camping_gear_overland",
  };
  return m[t];
}

export function roofRacks(): RoofRackType[] {
  return ["crossbar_universal", "cargo_box_aero", "bike_mount_fork", "kayak_saddle", "basket_open"];
}
