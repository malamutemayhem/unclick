export type BikeHelmetType = "road_aero" | "mountain_enduro" | "commuter_urban" | "full_face_downhill" | "kids_youth";

export function impactProtection(t: BikeHelmetType): number {
  const m: Record<BikeHelmetType, number> = {
    road_aero: 7, mountain_enduro: 9, commuter_urban: 7, full_face_downhill: 10, kids_youth: 8,
  };
  return m[t];
}

export function ventilation(t: BikeHelmetType): number {
  const m: Record<BikeHelmetType, number> = {
    road_aero: 10, mountain_enduro: 7, commuter_urban: 6, full_face_downhill: 4, kids_youth: 7,
  };
  return m[t];
}

export function helmetWeight(t: BikeHelmetType): number {
  const m: Record<BikeHelmetType, number> = {
    road_aero: 9, mountain_enduro: 5, commuter_urban: 6, full_face_downhill: 2, kids_youth: 8,
  };
  return m[t];
}

export function coverage(t: BikeHelmetType): number {
  const m: Record<BikeHelmetType, number> = {
    road_aero: 5, mountain_enduro: 8, commuter_urban: 6, full_face_downhill: 10, kids_youth: 7,
  };
  return m[t];
}

export function helmetCost(t: BikeHelmetType): number {
  const m: Record<BikeHelmetType, number> = {
    road_aero: 9, mountain_enduro: 7, commuter_urban: 4, full_face_downhill: 8, kids_youth: 2,
  };
  return m[t];
}

export function mipsEquipped(t: BikeHelmetType): boolean {
  const m: Record<BikeHelmetType, boolean> = {
    road_aero: true, mountain_enduro: true, commuter_urban: false, full_face_downhill: true, kids_youth: false,
  };
  return m[t];
}

export function visorIncluded(t: BikeHelmetType): boolean {
  const m: Record<BikeHelmetType, boolean> = {
    road_aero: false, mountain_enduro: true, commuter_urban: true, full_face_downhill: true, kids_youth: false,
  };
  return m[t];
}

export function shellType(t: BikeHelmetType): string {
  const m: Record<BikeHelmetType, string> = {
    road_aero: "in_mold_polycarbonate", mountain_enduro: "eps_extended_rear",
    commuter_urban: "abs_hard_shell", full_face_downhill: "fiberglass_carbon_composite",
    kids_youth: "in_mold_lightweight_abs",
  };
  return m[t];
}

export function bestRiding(t: BikeHelmetType): string {
  const m: Record<BikeHelmetType, string> = {
    road_aero: "road_racing_time_trial", mountain_enduro: "trail_enduro_all_mountain",
    commuter_urban: "city_commute_casual_ride", full_face_downhill: "downhill_bike_park",
    kids_youth: "neighborhood_learning_ride",
  };
  return m[t];
}

export function bikeHelmets(): BikeHelmetType[] {
  return ["road_aero", "mountain_enduro", "commuter_urban", "full_face_downhill", "kids_youth"];
}
