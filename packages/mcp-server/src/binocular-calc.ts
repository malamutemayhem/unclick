export type BinocularType = "compact_8x25_pocket" | "standard_10x42_allround" | "image_stabilized_marine" | "wide_angle_birding" | "zoom_10_30x_variable";

export function magnification(t: BinocularType): number {
  const m: Record<BinocularType, number> = {
    compact_8x25_pocket: 4, standard_10x42_allround: 7, image_stabilized_marine: 8, wide_angle_birding: 6, zoom_10_30x_variable: 10,
  };
  return m[t];
}

export function fieldOfView(t: BinocularType): number {
  const m: Record<BinocularType, number> = {
    compact_8x25_pocket: 6, standard_10x42_allround: 7, image_stabilized_marine: 6, wide_angle_birding: 10, zoom_10_30x_variable: 4,
  };
  return m[t];
}

export function lowLightPerf(t: BinocularType): number {
  const m: Record<BinocularType, number> = {
    compact_8x25_pocket: 3, standard_10x42_allround: 8, image_stabilized_marine: 9, wide_angle_birding: 7, zoom_10_30x_variable: 5,
  };
  return m[t];
}

export function portability(t: BinocularType): number {
  const m: Record<BinocularType, number> = {
    compact_8x25_pocket: 10, standard_10x42_allround: 6, image_stabilized_marine: 3, wide_angle_birding: 5, zoom_10_30x_variable: 4,
  };
  return m[t];
}

export function binocularCost(t: BinocularType): number {
  const m: Record<BinocularType, number> = {
    compact_8x25_pocket: 3, standard_10x42_allround: 5, image_stabilized_marine: 9, wide_angle_birding: 7, zoom_10_30x_variable: 6,
  };
  return m[t];
}

export function waterproof(t: BinocularType): boolean {
  const m: Record<BinocularType, boolean> = {
    compact_8x25_pocket: false, standard_10x42_allround: true, image_stabilized_marine: true, wide_angle_birding: true, zoom_10_30x_variable: false,
  };
  return m[t];
}

export function needsBattery(t: BinocularType): boolean {
  const m: Record<BinocularType, boolean> = {
    compact_8x25_pocket: false, standard_10x42_allround: false, image_stabilized_marine: true, wide_angle_birding: false, zoom_10_30x_variable: false,
  };
  return m[t];
}

export function prismType(t: BinocularType): string {
  const m: Record<BinocularType, string> = {
    compact_8x25_pocket: "roof_bak4_compact",
    standard_10x42_allround: "roof_bak4_phase_coated",
    image_stabilized_marine: "porro_gyro_stabilized",
    wide_angle_birding: "roof_ed_extra_low_disp",
    zoom_10_30x_variable: "porro_bk7_zoom_barrel",
  };
  return m[t];
}

export function bestActivity(t: BinocularType): string {
  const m: Record<BinocularType, string> = {
    compact_8x25_pocket: "travel_concert_hiking_light",
    standard_10x42_allround: "general_wildlife_sports",
    image_stabilized_marine: "boating_long_range_steady",
    wide_angle_birding: "bird_watching_forest_scan",
    zoom_10_30x_variable: "surveillance_distant_detail",
  };
  return m[t];
}

export function binoculars(): BinocularType[] {
  return ["compact_8x25_pocket", "standard_10x42_allround", "image_stabilized_marine", "wide_angle_birding", "zoom_10_30x_variable"];
}
