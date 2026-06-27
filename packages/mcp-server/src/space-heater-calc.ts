export type SpaceHeaterType = "ceramic_tower" | "oil_filled_radiator" | "infrared_quartz" | "fan_forced_compact" | "mica_panel_flat";

export function heatOutput(t: SpaceHeaterType): number {
  const m: Record<SpaceHeaterType, number> = {
    ceramic_tower: 7, oil_filled_radiator: 9, infrared_quartz: 8, fan_forced_compact: 6, mica_panel_flat: 5,
  };
  return m[t];
}

export function energyEfficiency(t: SpaceHeaterType): number {
  const m: Record<SpaceHeaterType, number> = {
    ceramic_tower: 7, oil_filled_radiator: 8, infrared_quartz: 9, fan_forced_compact: 5, mica_panel_flat: 8,
  };
  return m[t];
}

export function noiseLevel(t: SpaceHeaterType): number {
  const m: Record<SpaceHeaterType, number> = {
    ceramic_tower: 5, oil_filled_radiator: 10, infrared_quartz: 9, fan_forced_compact: 3, mica_panel_flat: 10,
  };
  return m[t];
}

export function portability(t: SpaceHeaterType): number {
  const m: Record<SpaceHeaterType, number> = {
    ceramic_tower: 7, oil_filled_radiator: 4, infrared_quartz: 6, fan_forced_compact: 10, mica_panel_flat: 8,
  };
  return m[t];
}

export function heaterCost(t: SpaceHeaterType): number {
  const m: Record<SpaceHeaterType, number> = {
    ceramic_tower: 4, oil_filled_radiator: 6, infrared_quartz: 7, fan_forced_compact: 2, mica_panel_flat: 5,
  };
  return m[t];
}

export function tipOverShutoff(t: SpaceHeaterType): boolean {
  const m: Record<SpaceHeaterType, boolean> = {
    ceramic_tower: true, oil_filled_radiator: true, infrared_quartz: true, fan_forced_compact: true, mica_panel_flat: false,
  };
  return m[t];
}

export function wallMountable(t: SpaceHeaterType): boolean {
  const m: Record<SpaceHeaterType, boolean> = {
    ceramic_tower: false, oil_filled_radiator: false, infrared_quartz: true, fan_forced_compact: false, mica_panel_flat: true,
  };
  return m[t];
}

export function heatMethod(t: SpaceHeaterType): string {
  const m: Record<SpaceHeaterType, string> = {
    ceramic_tower: "ptc_ceramic_element_fan",
    oil_filled_radiator: "diathermic_oil_convection",
    infrared_quartz: "quartz_tube_radiant",
    fan_forced_compact: "nichrome_coil_fan_blow",
    mica_panel_flat: "mica_thermic_panel_silent",
  };
  return m[t];
}

export function bestRoom(t: SpaceHeaterType): string {
  const m: Record<SpaceHeaterType, string> = {
    ceramic_tower: "home_office_medium",
    oil_filled_radiator: "bedroom_overnight_quiet",
    infrared_quartz: "living_room_spot_heat",
    fan_forced_compact: "under_desk_personal",
    mica_panel_flat: "bathroom_wall_mount",
  };
  return m[t];
}

export function spaceHeaters(): SpaceHeaterType[] {
  return ["ceramic_tower", "oil_filled_radiator", "infrared_quartz", "fan_forced_compact", "mica_panel_flat"];
}
