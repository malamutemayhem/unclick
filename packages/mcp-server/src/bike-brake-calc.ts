export type BikeBrake = "rim_caliper" | "disc_mechanical" | "disc_hydraulic" | "coaster_hub" | "v_brake_linear";

export function stoppingPower(b: BikeBrake): number {
  const m: Record<BikeBrake, number> = {
    rim_caliper: 5, disc_mechanical: 7, disc_hydraulic: 10, coaster_hub: 3, v_brake_linear: 6,
  };
  return m[b];
}

export function wetPerformance(b: BikeBrake): number {
  const m: Record<BikeBrake, number> = {
    rim_caliper: 3, disc_mechanical: 8, disc_hydraulic: 10, coaster_hub: 7, v_brake_linear: 4,
  };
  return m[b];
}

export function modulation(b: BikeBrake): number {
  const m: Record<BikeBrake, number> = {
    rim_caliper: 6, disc_mechanical: 7, disc_hydraulic: 10, coaster_hub: 2, v_brake_linear: 5,
  };
  return m[b];
}

export function maintenanceEase(b: BikeBrake): number {
  const m: Record<BikeBrake, number> = {
    rim_caliper: 8, disc_mechanical: 6, disc_hydraulic: 4, coaster_hub: 9, v_brake_linear: 7,
  };
  return m[b];
}

export function brakeCost(b: BikeBrake): number {
  const m: Record<BikeBrake, number> = {
    rim_caliper: 3, disc_mechanical: 5, disc_hydraulic: 8, coaster_hub: 2, v_brake_linear: 3,
  };
  return m[b];
}

export function requiresFluid(b: BikeBrake): boolean {
  const m: Record<BikeBrake, boolean> = {
    rim_caliper: false, disc_mechanical: false, disc_hydraulic: true, coaster_hub: false, v_brake_linear: false,
  };
  return m[b];
}

export function handLever(b: BikeBrake): boolean {
  const m: Record<BikeBrake, boolean> = {
    rim_caliper: true, disc_mechanical: true, disc_hydraulic: true, coaster_hub: false, v_brake_linear: true,
  };
  return m[b];
}

export function brakeSystem(b: BikeBrake): string {
  const m: Record<BikeBrake, string> = {
    rim_caliper: "dual_pivot_pad_on_rim", disc_mechanical: "cable_actuated_disc_pad",
    disc_hydraulic: "fluid_piston_disc_rotor", coaster_hub: "backpedal_internal_hub_brake",
    v_brake_linear: "linear_pull_cantilever_arm",
  };
  return m[b];
}

export function bestUse(b: BikeBrake): string {
  const m: Record<BikeBrake, string> = {
    rim_caliper: "road_lightweight_racing", disc_mechanical: "touring_commute_reliable",
    disc_hydraulic: "mountain_all_weather_power", coaster_hub: "cruiser_kids_simple",
    v_brake_linear: "hybrid_city_budget",
  };
  return m[b];
}

export function bikeBrakes(): BikeBrake[] {
  return ["rim_caliper", "disc_mechanical", "disc_hydraulic", "coaster_hub", "v_brake_linear"];
}
