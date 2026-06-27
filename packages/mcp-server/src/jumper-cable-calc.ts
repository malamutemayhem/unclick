export type JumperCableType = "standard_copper_10ga" | "heavy_duty_4ga" | "smart_reverse_protect" | "lithium_jump_pack" | "commercial_1ga_truck";

export function peakAmps(t: JumperCableType): number {
  const m: Record<JumperCableType, number> = {
    standard_copper_10ga: 4, heavy_duty_4ga: 7, smart_reverse_protect: 6, lithium_jump_pack: 8, commercial_1ga_truck: 10,
  };
  return m[t];
}

export function cableLength(t: JumperCableType): number {
  const m: Record<JumperCableType, number> = {
    standard_copper_10ga: 6, heavy_duty_4ga: 8, smart_reverse_protect: 7, lithium_jump_pack: 2, commercial_1ga_truck: 10,
  };
  return m[t];
}

export function portability(t: JumperCableType): number {
  const m: Record<JumperCableType, number> = {
    standard_copper_10ga: 7, heavy_duty_4ga: 5, smart_reverse_protect: 6, lithium_jump_pack: 10, commercial_1ga_truck: 2,
  };
  return m[t];
}

export function safetyFeatures(t: JumperCableType): number {
  const m: Record<JumperCableType, number> = {
    standard_copper_10ga: 3, heavy_duty_4ga: 5, smart_reverse_protect: 10, lithium_jump_pack: 9, commercial_1ga_truck: 4,
  };
  return m[t];
}

export function cableCost(t: JumperCableType): number {
  const m: Record<JumperCableType, number> = {
    standard_copper_10ga: 2, heavy_duty_4ga: 4, smart_reverse_protect: 6, lithium_jump_pack: 8, commercial_1ga_truck: 5,
  };
  return m[t];
}

export function needsSecondCar(t: JumperCableType): boolean {
  const m: Record<JumperCableType, boolean> = {
    standard_copper_10ga: true, heavy_duty_4ga: true, smart_reverse_protect: true, lithium_jump_pack: false, commercial_1ga_truck: true,
  };
  return m[t];
}

export function surgeProtect(t: JumperCableType): boolean {
  const m: Record<JumperCableType, boolean> = {
    standard_copper_10ga: false, heavy_duty_4ga: false, smart_reverse_protect: true, lithium_jump_pack: true, commercial_1ga_truck: false,
  };
  return m[t];
}

export function conductorType(t: JumperCableType): string {
  const m: Record<JumperCableType, string> = {
    standard_copper_10ga: "stranded_copper_10awg",
    heavy_duty_4ga: "stranded_copper_4awg",
    smart_reverse_protect: "copper_clad_aluminum_6awg",
    lithium_jump_pack: "internal_lithium_cell",
    commercial_1ga_truck: "pure_copper_1awg_flex",
  };
  return m[t];
}

export function bestVehicle(t: JumperCableType): string {
  const m: Record<JumperCableType, string> = {
    standard_copper_10ga: "compact_sedan_daily",
    heavy_duty_4ga: "suv_full_size_truck",
    smart_reverse_protect: "new_driver_first_car",
    lithium_jump_pack: "solo_emergency_portable",
    commercial_1ga_truck: "diesel_fleet_heavy_duty",
  };
  return m[t];
}

export function jumperCables(): JumperCableType[] {
  return ["standard_copper_10ga", "heavy_duty_4ga", "smart_reverse_protect", "lithium_jump_pack", "commercial_1ga_truck"];
}
