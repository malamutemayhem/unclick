export type PortableAcType = "single_hose_basic" | "dual_hose_efficient" | "evaporative_swamp" | "spot_cooler_industrial" | "window_kit_slide";

export function coolingPower(t: PortableAcType): number {
  const m: Record<PortableAcType, number> = {
    single_hose_basic: 6, dual_hose_efficient: 9, evaporative_swamp: 4, spot_cooler_industrial: 10, window_kit_slide: 7,
  };
  return m[t];
}

export function energyEfficiency(t: PortableAcType): number {
  const m: Record<PortableAcType, number> = {
    single_hose_basic: 4, dual_hose_efficient: 8, evaporative_swamp: 10, spot_cooler_industrial: 3, window_kit_slide: 6,
  };
  return m[t];
}

export function noiseLevel(t: PortableAcType): number {
  const m: Record<PortableAcType, number> = {
    single_hose_basic: 4, dual_hose_efficient: 5, evaporative_swamp: 7, spot_cooler_industrial: 2, window_kit_slide: 6,
  };
  return m[t];
}

export function portability(t: PortableAcType): number {
  const m: Record<PortableAcType, number> = {
    single_hose_basic: 7, dual_hose_efficient: 5, evaporative_swamp: 8, spot_cooler_industrial: 3, window_kit_slide: 6,
  };
  return m[t];
}

export function acCost(t: PortableAcType): number {
  const m: Record<PortableAcType, number> = {
    single_hose_basic: 3, dual_hose_efficient: 6, evaporative_swamp: 2, spot_cooler_industrial: 9, window_kit_slide: 5,
  };
  return m[t];
}

export function noVentNeeded(t: PortableAcType): boolean {
  const m: Record<PortableAcType, boolean> = {
    single_hose_basic: false, dual_hose_efficient: false, evaporative_swamp: true, spot_cooler_industrial: false, window_kit_slide: false,
  };
  return m[t];
}

export function dehumidifies(t: PortableAcType): boolean {
  const m: Record<PortableAcType, boolean> = {
    single_hose_basic: true, dual_hose_efficient: true, evaporative_swamp: false, spot_cooler_industrial: true, window_kit_slide: true,
  };
  return m[t];
}

export function compressorType(t: PortableAcType): string {
  const m: Record<PortableAcType, string> = {
    single_hose_basic: "rotary_single_exhaust",
    dual_hose_efficient: "rotary_intake_exhaust",
    evaporative_swamp: "no_compressor_water_pad",
    spot_cooler_industrial: "scroll_high_capacity",
    window_kit_slide: "reciprocating_bracket_mount",
  };
  return m[t];
}

export function bestRoom(t: PortableAcType): string {
  const m: Record<PortableAcType, string> = {
    single_hose_basic: "bedroom_small_studio",
    dual_hose_efficient: "living_room_large_open",
    evaporative_swamp: "dry_climate_garage",
    spot_cooler_industrial: "server_room_workshop",
    window_kit_slide: "rental_no_permanent_install",
  };
  return m[t];
}

export function portableAcs(): PortableAcType[] {
  return ["single_hose_basic", "dual_hose_efficient", "evaporative_swamp", "spot_cooler_industrial", "window_kit_slide"];
}
