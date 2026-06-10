export type TentType = "backpacking_dome" | "tunnel" | "cabin" | "ultralight_tarp" | "rooftop_vehicle";

export function weatherRating(t: TentType): number {
  const m: Record<TentType, number> = {
    backpacking_dome: 8, tunnel: 9, cabin: 6, ultralight_tarp: 4, rooftop_vehicle: 7,
  };
  return m[t];
}

export function interiorSpace(t: TentType): number {
  const m: Record<TentType, number> = {
    backpacking_dome: 5, tunnel: 7, cabin: 10, ultralight_tarp: 3, rooftop_vehicle: 6,
  };
  return m[t];
}

export function setupSpeed(t: TentType): number {
  const m: Record<TentType, number> = {
    backpacking_dome: 7, tunnel: 6, cabin: 3, ultralight_tarp: 9, rooftop_vehicle: 10,
  };
  return m[t];
}

export function packSize(t: TentType): number {
  const m: Record<TentType, number> = {
    backpacking_dome: 7, tunnel: 6, cabin: 2, ultralight_tarp: 10, rooftop_vehicle: 1,
  };
  return m[t];
}

export function tentCost(t: TentType): number {
  const m: Record<TentType, number> = {
    backpacking_dome: 5, tunnel: 7, cabin: 6, ultralight_tarp: 4, rooftop_vehicle: 10,
  };
  return m[t];
}

export function freestanding(t: TentType): boolean {
  const m: Record<TentType, boolean> = {
    backpacking_dome: true, tunnel: false, cabin: true, ultralight_tarp: false, rooftop_vehicle: true,
  };
  return m[t];
}

export function fourSeason(t: TentType): boolean {
  const m: Record<TentType, boolean> = {
    backpacking_dome: false, tunnel: true, cabin: false, ultralight_tarp: false, rooftop_vehicle: false,
  };
  return m[t];
}

export function frameMaterial(t: TentType): string {
  const m: Record<TentType, string> = {
    backpacking_dome: "aluminum_dac_featherlite", tunnel: "aluminum_alloy_pre_bent",
    cabin: "steel_straight_leg_pole", ultralight_tarp: "trekking_pole_guyline",
    rooftop_vehicle: "aluminum_gas_strut_hinge",
  };
  return m[t];
}

export function bestCamping(t: TentType): string {
  const m: Record<TentType, string> = {
    backpacking_dome: "trail_backpacking_general", tunnel: "basecamp_expedition_wind",
    cabin: "family_car_camping_festival", ultralight_tarp: "thru_hike_fast_light",
    rooftop_vehicle: "overlanding_road_trip",
  };
  return m[t];
}

export function tentTypes(): TentType[] {
  return ["backpacking_dome", "tunnel", "cabin", "ultralight_tarp", "rooftop_vehicle"];
}
