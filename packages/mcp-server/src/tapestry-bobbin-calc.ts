export type TapestryBobbinType = "flute_bobbin_wood" | "butterfly_finger_wrap" | "netting_shuttle_flat" | "cop_tube_wind" | "pirn_stick_point";

export function yarnFeed(t: TapestryBobbinType): number {
  const m: Record<TapestryBobbinType, number> = {
    flute_bobbin_wood: 9, butterfly_finger_wrap: 5, netting_shuttle_flat: 7, cop_tube_wind: 8, pirn_stick_point: 10,
  };
  return m[t];
}

export function compactSize(t: TapestryBobbinType): number {
  const m: Record<TapestryBobbinType, number> = {
    flute_bobbin_wood: 7, butterfly_finger_wrap: 10, netting_shuttle_flat: 6, cop_tube_wind: 5, pirn_stick_point: 8,
  };
  return m[t];
}

export function yarnHold(t: TapestryBobbinType): number {
  const m: Record<TapestryBobbinType, number> = {
    flute_bobbin_wood: 8, butterfly_finger_wrap: 4, netting_shuttle_flat: 7, cop_tube_wind: 10, pirn_stick_point: 9,
  };
  return m[t];
}

export function colorSwapSpeed(t: TapestryBobbinType): number {
  const m: Record<TapestryBobbinType, number> = {
    flute_bobbin_wood: 7, butterfly_finger_wrap: 10, netting_shuttle_flat: 5, cop_tube_wind: 4, pirn_stick_point: 6,
  };
  return m[t];
}

export function bobbinCost(t: TapestryBobbinType): number {
  const m: Record<TapestryBobbinType, number> = {
    flute_bobbin_wood: 2, butterfly_finger_wrap: 0, netting_shuttle_flat: 1, cop_tube_wind: 1, pirn_stick_point: 2,
  };
  return m[t];
}

export function noToolNeeded(t: TapestryBobbinType): boolean {
  const m: Record<TapestryBobbinType, boolean> = {
    flute_bobbin_wood: false, butterfly_finger_wrap: true, netting_shuttle_flat: false, cop_tube_wind: false, pirn_stick_point: false,
  };
  return m[t];
}

export function pointedTip(t: TapestryBobbinType): boolean {
  const m: Record<TapestryBobbinType, boolean> = {
    flute_bobbin_wood: true, butterfly_finger_wrap: false, netting_shuttle_flat: false, cop_tube_wind: false, pirn_stick_point: true,
  };
  return m[t];
}

export function windStyle(t: TapestryBobbinType): string {
  const m: Record<TapestryBobbinType, string> = {
    flute_bobbin_wood: "groove_channel_wind",
    butterfly_finger_wrap: "figure_eight_finger",
    netting_shuttle_flat: "flat_tongue_wrap",
    cop_tube_wind: "cone_tube_spiral",
    pirn_stick_point: "tapered_stick_wind",
  };
  return m[t];
}

export function bestWeave(t: TapestryBobbinType): string {
  const m: Record<TapestryBobbinType, string> = {
    flute_bobbin_wood: "gobelin_tapestry_weft",
    butterfly_finger_wrap: "small_area_color_fill",
    netting_shuttle_flat: "net_lace_knotwork",
    cop_tube_wind: "production_shuttle_fill",
    pirn_stick_point: "fine_detail_hatching",
  };
  return m[t];
}

export function tapestryBobbins(): TapestryBobbinType[] {
  return ["flute_bobbin_wood", "butterfly_finger_wrap", "netting_shuttle_flat", "cop_tube_wind", "pirn_stick_point"];
}
