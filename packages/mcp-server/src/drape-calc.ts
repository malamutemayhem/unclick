export type DrapeType = "sheer_voile_light" | "linen_semi_sheer" | "velvet_heavy_blackout" | "thermal_insulated_layer" | "grommet_modern_panel";

export function lightFilter(t: DrapeType): number {
  const m: Record<DrapeType, number> = {
    sheer_voile_light: 2, linen_semi_sheer: 4, velvet_heavy_blackout: 10, thermal_insulated_layer: 9, grommet_modern_panel: 7,
  };
  return m[t];
}

export function insulation(t: DrapeType): number {
  const m: Record<DrapeType, number> = {
    sheer_voile_light: 1, linen_semi_sheer: 3, velvet_heavy_blackout: 8, thermal_insulated_layer: 10, grommet_modern_panel: 5,
  };
  return m[t];
}

export function drapeFlow(t: DrapeType): number {
  const m: Record<DrapeType, number> = {
    sheer_voile_light: 10, linen_semi_sheer: 9, velvet_heavy_blackout: 6, thermal_insulated_layer: 4, grommet_modern_panel: 7,
  };
  return m[t];
}

export function washability(t: DrapeType): number {
  const m: Record<DrapeType, number> = {
    sheer_voile_light: 9, linen_semi_sheer: 7, velvet_heavy_blackout: 3, thermal_insulated_layer: 5, grommet_modern_panel: 8,
  };
  return m[t];
}

export function drapeCost(t: DrapeType): number {
  const m: Record<DrapeType, number> = {
    sheer_voile_light: 2, linen_semi_sheer: 4, velvet_heavy_blackout: 8, thermal_insulated_layer: 5, grommet_modern_panel: 3,
  };
  return m[t];
}

export function machineWash(t: DrapeType): boolean {
  const m: Record<DrapeType, boolean> = {
    sheer_voile_light: true, linen_semi_sheer: true, velvet_heavy_blackout: false, thermal_insulated_layer: true, grommet_modern_panel: true,
  };
  return m[t];
}

export function blackout(t: DrapeType): boolean {
  const m: Record<DrapeType, boolean> = {
    sheer_voile_light: false, linen_semi_sheer: false, velvet_heavy_blackout: true, thermal_insulated_layer: true, grommet_modern_panel: false,
  };
  return m[t];
}

export function fabricWeight(t: DrapeType): string {
  const m: Record<DrapeType, string> = {
    sheer_voile_light: "polyester_voile_sheer",
    linen_semi_sheer: "linen_cotton_blend_light",
    velvet_heavy_blackout: "velvet_triple_weave_heavy",
    thermal_insulated_layer: "polyester_foam_backed",
    grommet_modern_panel: "polyester_textured_medium",
  };
  return m[t];
}

export function bestRoom(t: DrapeType): string {
  const m: Record<DrapeType, string> = {
    sheer_voile_light: "sunlit_room_privacy_veil",
    linen_semi_sheer: "casual_living_airy_feel",
    velvet_heavy_blackout: "theater_bedroom_luxury",
    thermal_insulated_layer: "cold_climate_energy_save",
    grommet_modern_panel: "modern_easy_slide_daily",
  };
  return m[t];
}

export function drapes(): DrapeType[] {
  return ["sheer_voile_light", "linen_semi_sheer", "velvet_heavy_blackout", "thermal_insulated_layer", "grommet_modern_panel"];
}
