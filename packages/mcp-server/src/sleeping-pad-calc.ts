export type SleepingPadType = "closed_cell_foam" | "self_inflating_combo" | "air_pad_ultralight" | "insulated_winter_four" | "double_wide_camp";

export function comfort(t: SleepingPadType): number {
  const m: Record<SleepingPadType, number> = {
    closed_cell_foam: 4, self_inflating_combo: 7, air_pad_ultralight: 8, insulated_winter_four: 7, double_wide_camp: 10,
  };
  return m[t];
}

export function insulation(t: SleepingPadType): number {
  const m: Record<SleepingPadType, number> = {
    closed_cell_foam: 5, self_inflating_combo: 7, air_pad_ultralight: 4, insulated_winter_four: 10, double_wide_camp: 6,
  };
  return m[t];
}

export function packSize(t: SleepingPadType): number {
  const m: Record<SleepingPadType, number> = {
    closed_cell_foam: 3, self_inflating_combo: 5, air_pad_ultralight: 10, insulated_winter_four: 6, double_wide_camp: 2,
  };
  return m[t];
}

export function durability(t: SleepingPadType): number {
  const m: Record<SleepingPadType, number> = {
    closed_cell_foam: 10, self_inflating_combo: 7, air_pad_ultralight: 4, insulated_winter_four: 6, double_wide_camp: 8,
  };
  return m[t];
}

export function padCost(t: SleepingPadType): number {
  const m: Record<SleepingPadType, number> = {
    closed_cell_foam: 2, self_inflating_combo: 6, air_pad_ultralight: 8, insulated_winter_four: 9, double_wide_camp: 7,
  };
  return m[t];
}

export function needsInflation(t: SleepingPadType): boolean {
  const m: Record<SleepingPadType, boolean> = {
    closed_cell_foam: false, self_inflating_combo: false, air_pad_ultralight: true, insulated_winter_four: true, double_wide_camp: true,
  };
  return m[t];
}

export function punctureProof(t: SleepingPadType): boolean {
  const m: Record<SleepingPadType, boolean> = {
    closed_cell_foam: true, self_inflating_combo: false, air_pad_ultralight: false, insulated_winter_four: false, double_wide_camp: false,
  };
  return m[t];
}

export function padConstruction(t: SleepingPadType): string {
  const m: Record<SleepingPadType, string> = {
    closed_cell_foam: "dense_eva_foam_roll",
    self_inflating_combo: "open_cell_foam_valve",
    air_pad_ultralight: "ripstop_nylon_baffle",
    insulated_winter_four: "primaloft_synthetic_fill",
    double_wide_camp: "tpu_coated_wide_air",
  };
  return m[t];
}

export function bestTrip(t: SleepingPadType): string {
  const m: Record<SleepingPadType, string> = {
    closed_cell_foam: "thru_hike_budget",
    self_inflating_combo: "car_camp_backpack",
    air_pad_ultralight: "ultralight_fast_pack",
    insulated_winter_four: "winter_alpine_snow",
    double_wide_camp: "car_camp_couple",
  };
  return m[t];
}

export function sleepingPads(): SleepingPadType[] {
  return ["closed_cell_foam", "self_inflating_combo", "air_pad_ultralight", "insulated_winter_four", "double_wide_camp"];
}
