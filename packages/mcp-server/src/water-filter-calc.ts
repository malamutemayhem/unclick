export type WaterFilterType = "pump_mechanical" | "gravity_bag" | "squeeze_inline" | "uv_purifier" | "straw_personal";

export function flowRate(t: WaterFilterType): number {
  const m: Record<WaterFilterType, number> = {
    pump_mechanical: 8, gravity_bag: 6, squeeze_inline: 7, uv_purifier: 10, straw_personal: 5,
  };
  return m[t];
}

export function filterLifespan(t: WaterFilterType): number {
  const m: Record<WaterFilterType, number> = {
    pump_mechanical: 9, gravity_bag: 8, squeeze_inline: 7, uv_purifier: 4, straw_personal: 5,
  };
  return m[t];
}

export function packSize(t: WaterFilterType): number {
  const m: Record<WaterFilterType, number> = {
    pump_mechanical: 3, gravity_bag: 5, squeeze_inline: 8, uv_purifier: 9, straw_personal: 10,
  };
  return m[t];
}

export function groupCapacity(t: WaterFilterType): number {
  const m: Record<WaterFilterType, number> = {
    pump_mechanical: 8, gravity_bag: 10, squeeze_inline: 4, uv_purifier: 3, straw_personal: 1,
  };
  return m[t];
}

export function filterCost(t: WaterFilterType): number {
  const m: Record<WaterFilterType, number> = {
    pump_mechanical: 7, gravity_bag: 6, squeeze_inline: 3, uv_purifier: 8, straw_personal: 1,
  };
  return m[t];
}

export function removesViruses(t: WaterFilterType): boolean {
  const m: Record<WaterFilterType, boolean> = {
    pump_mechanical: false, gravity_bag: false, squeeze_inline: false, uv_purifier: true, straw_personal: false,
  };
  return m[t];
}

export function needsBattery(t: WaterFilterType): boolean {
  const m: Record<WaterFilterType, boolean> = {
    pump_mechanical: false, gravity_bag: false, squeeze_inline: false, uv_purifier: true, straw_personal: false,
  };
  return m[t];
}

export function mechanism(t: WaterFilterType): string {
  const m: Record<WaterFilterType, string> = {
    pump_mechanical: "ceramic_carbon_hand_pump", gravity_bag: "hollow_fiber_gravity_feed",
    squeeze_inline: "hollow_fiber_squeeze_force", uv_purifier: "ultraviolet_light_sterilize",
    straw_personal: "micro_filter_direct_sip",
  };
  return m[t];
}

export function bestScenario(t: WaterFilterType): string {
  const m: Record<WaterFilterType, string> = {
    pump_mechanical: "base_camp_reliable_volume", gravity_bag: "group_camp_hands_free",
    squeeze_inline: "solo_backpacking_fast", uv_purifier: "international_travel_virus_risk",
    straw_personal: "emergency_kit_day_hike",
  };
  return m[t];
}

export function waterFilters(): WaterFilterType[] {
  return ["pump_mechanical", "gravity_bag", "squeeze_inline", "uv_purifier", "straw_personal"];
}
