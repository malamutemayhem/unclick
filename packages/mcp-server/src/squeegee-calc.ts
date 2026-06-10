export type SqueegeeType = "window_pro_channel" | "shower_daily_compact" | "floor_foam_wide" | "auto_silicone_flex" | "magnetic_double_sided";

export function streakFree(t: SqueegeeType): number {
  const m: Record<SqueegeeType, number> = {
    window_pro_channel: 10, shower_daily_compact: 7, floor_foam_wide: 5, auto_silicone_flex: 8, magnetic_double_sided: 6,
  };
  return m[t];
}

export function waterRemoval(t: SqueegeeType): number {
  const m: Record<SqueegeeType, number> = {
    window_pro_channel: 9, shower_daily_compact: 7, floor_foam_wide: 10, auto_silicone_flex: 6, magnetic_double_sided: 5,
  };
  return m[t];
}

export function easeOfUse(t: SqueegeeType): number {
  const m: Record<SqueegeeType, number> = {
    window_pro_channel: 6, shower_daily_compact: 10, floor_foam_wide: 7, auto_silicone_flex: 8, magnetic_double_sided: 4,
  };
  return m[t];
}

export function bladeLife(t: SqueegeeType): number {
  const m: Record<SqueegeeType, number> = {
    window_pro_channel: 7, shower_daily_compact: 6, floor_foam_wide: 5, auto_silicone_flex: 9, magnetic_double_sided: 8,
  };
  return m[t];
}

export function squeegeeCost(t: SqueegeeType): number {
  const m: Record<SqueegeeType, number> = {
    window_pro_channel: 5, shower_daily_compact: 2, floor_foam_wide: 4, auto_silicone_flex: 3, magnetic_double_sided: 7,
  };
  return m[t];
}

export function replaceBlade(t: SqueegeeType): boolean {
  const m: Record<SqueegeeType, boolean> = {
    window_pro_channel: true, shower_daily_compact: false, floor_foam_wide: true, auto_silicone_flex: false, magnetic_double_sided: true,
  };
  return m[t];
}

export function hangsUp(t: SqueegeeType): boolean {
  const m: Record<SqueegeeType, boolean> = {
    window_pro_channel: false, shower_daily_compact: true, floor_foam_wide: false, auto_silicone_flex: true, magnetic_double_sided: false,
  };
  return m[t];
}

export function bladeType(t: SqueegeeType): string {
  const m: Record<SqueegeeType, string> = {
    window_pro_channel: "brass_channel_rubber_edge",
    shower_daily_compact: "silicone_flex_suction_hook",
    floor_foam_wide: "dual_foam_neoprene_blade",
    auto_silicone_flex: "medical_grade_silicone",
    magnetic_double_sided: "neodymium_magnet_pair",
  };
  return m[t];
}

export function bestSurface(t: SqueegeeType): string {
  const m: Record<SqueegeeType, string> = {
    window_pro_channel: "exterior_window_cleaning",
    shower_daily_compact: "glass_shower_door_daily",
    floor_foam_wide: "garage_warehouse_floor",
    auto_silicone_flex: "car_windshield_detail",
    magnetic_double_sided: "high_rise_double_pane",
  };
  return m[t];
}

export function squeegees(): SqueegeeType[] {
  return ["window_pro_channel", "shower_daily_compact", "floor_foam_wide", "auto_silicone_flex", "magnetic_double_sided"];
}
