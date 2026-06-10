export type SwiftSkeinType = "umbrella_swift_fold" | "amish_swift_floor" | "tabletop_ball_wind" | "yarn_meter_count" | "nostepinne_stick";

export function skeinSpeed(t: SwiftSkeinType): number {
  const m: Record<SwiftSkeinType, number> = {
    umbrella_swift_fold: 9, amish_swift_floor: 7, tabletop_ball_wind: 10, yarn_meter_count: 6, nostepinne_stick: 3,
  };
  return m[t];
}

export function holdCapacity(t: SwiftSkeinType): number {
  const m: Record<SwiftSkeinType, number> = {
    umbrella_swift_fold: 8, amish_swift_floor: 10, tabletop_ball_wind: 6, yarn_meter_count: 7, nostepinne_stick: 4,
  };
  return m[t];
}

export function portability(t: SwiftSkeinType): number {
  const m: Record<SwiftSkeinType, number> = {
    umbrella_swift_fold: 8, amish_swift_floor: 3, tabletop_ball_wind: 7, yarn_meter_count: 5, nostepinne_stick: 10,
  };
  return m[t];
}

export function yarnGentle(t: SwiftSkeinType): number {
  const m: Record<SwiftSkeinType, number> = {
    umbrella_swift_fold: 8, amish_swift_floor: 9, tabletop_ball_wind: 6, yarn_meter_count: 7, nostepinne_stick: 10,
  };
  return m[t];
}

export function swiftCost(t: SwiftSkeinType): number {
  const m: Record<SwiftSkeinType, number> = {
    umbrella_swift_fold: 2, amish_swift_floor: 4, tabletop_ball_wind: 3, yarn_meter_count: 3, nostepinne_stick: 1,
  };
  return m[t];
}

export function makesBall(t: SwiftSkeinType): boolean {
  const m: Record<SwiftSkeinType, boolean> = {
    umbrella_swift_fold: false, amish_swift_floor: false, tabletop_ball_wind: true, yarn_meter_count: false, nostepinne_stick: true,
  };
  return m[t];
}

export function countsYardage(t: SwiftSkeinType): boolean {
  const m: Record<SwiftSkeinType, boolean> = {
    umbrella_swift_fold: false, amish_swift_floor: false, tabletop_ball_wind: false, yarn_meter_count: true, nostepinne_stick: false,
  };
  return m[t];
}

export function mechanism(t: SwiftSkeinType): string {
  const m: Record<SwiftSkeinType, string> = {
    umbrella_swift_fold: "collapsible_umbrella_rib",
    amish_swift_floor: "rotating_cage_frame",
    tabletop_ball_wind: "geared_winding_cone",
    yarn_meter_count: "click_counter_wheel",
    nostepinne_stick: "handheld_wood_stick",
  };
  return m[t];
}

export function bestTask(t: SwiftSkeinType): string {
  const m: Record<SwiftSkeinType, string> = {
    umbrella_swift_fold: "hank_to_ball_hold",
    amish_swift_floor: "large_skein_unwind",
    tabletop_ball_wind: "center_pull_ball",
    yarn_meter_count: "measure_skein_yardage",
    nostepinne_stick: "travel_wind_ball",
  };
  return m[t];
}

export function swiftSkeins(): SwiftSkeinType[] {
  return ["umbrella_swift_fold", "amish_swift_floor", "tabletop_ball_wind", "yarn_meter_count", "nostepinne_stick"];
}
