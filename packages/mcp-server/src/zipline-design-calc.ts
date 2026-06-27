export type ZiplineDesign = "gravity" | "spring_brake" | "trolley" | "pendulum" | "dual_cable";

export function maxSpeed(z: ZiplineDesign): number {
  const m: Record<ZiplineDesign, number> = {
    gravity: 8, spring_brake: 6, trolley: 7, pendulum: 5, dual_cable: 9,
  };
  return m[z];
}

export function safetyRating(z: ZiplineDesign): number {
  const m: Record<ZiplineDesign, number> = {
    gravity: 5, spring_brake: 8, trolley: 7, pendulum: 6, dual_cable: 10,
  };
  return m[z];
}

export function installCost(z: ZiplineDesign): number {
  const m: Record<ZiplineDesign, number> = {
    gravity: 3, spring_brake: 5, trolley: 6, pendulum: 4, dual_cable: 10,
  };
  return m[z];
}

export function maintenanceFrequency(z: ZiplineDesign): number {
  const m: Record<ZiplineDesign, number> = {
    gravity: 3, spring_brake: 6, trolley: 5, pendulum: 4, dual_cable: 8,
  };
  return m[z];
}

export function riderCapacity(z: ZiplineDesign): number {
  const m: Record<ZiplineDesign, number> = {
    gravity: 4, spring_brake: 4, trolley: 5, pendulum: 3, dual_cable: 8,
  };
  return m[z];
}

export function selfBraking(z: ZiplineDesign): boolean {
  const m: Record<ZiplineDesign, boolean> = {
    gravity: false, spring_brake: true, trolley: false, pendulum: true, dual_cable: false,
  };
  return m[z];
}

export function allWeatherOperation(z: ZiplineDesign): boolean {
  const m: Record<ZiplineDesign, boolean> = {
    gravity: true, spring_brake: true, trolley: true, pendulum: false, dual_cable: true,
  };
  return m[z];
}

export function brakingMethod(z: ZiplineDesign): string {
  const m: Record<ZiplineDesign, string> = {
    gravity: "gravity_upslope_arrival", spring_brake: "spring_loaded_bumper",
    trolley: "hand_brake_glove", pendulum: "pendulum_arc_deceleration",
    dual_cable: "magnetic_eddy_current",
  };
  return m[z];
}

export function bestVenue(z: ZiplineDesign): string {
  const m: Record<ZiplineDesign, string> = {
    gravity: "backyard_recreational", spring_brake: "adventure_park_tour",
    trolley: "canopy_eco_tour", pendulum: "canyon_swing_combo",
    dual_cable: "extreme_mountain_resort",
  };
  return m[z];
}

export function ziplineDesigns(): ZiplineDesign[] {
  return ["gravity", "spring_brake", "trolley", "pendulum", "dual_cable"];
}
