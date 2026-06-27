export type BikePumpType = "floor_stand_gauge" | "mini_frame_mount" | "co2_cartridge_inflator" | "electric_portable_auto" | "track_high_pressure";

export function maxPressure(t: BikePumpType): number {
  const m: Record<BikePumpType, number> = {
    floor_stand_gauge: 8, mini_frame_mount: 5, co2_cartridge_inflator: 7, electric_portable_auto: 6, track_high_pressure: 10,
  };
  return m[t];
}

export function inflationSpeed(t: BikePumpType): number {
  const m: Record<BikePumpType, number> = {
    floor_stand_gauge: 8, mini_frame_mount: 3, co2_cartridge_inflator: 10, electric_portable_auto: 9, track_high_pressure: 9,
  };
  return m[t];
}

export function portability(t: BikePumpType): number {
  const m: Record<BikePumpType, number> = {
    floor_stand_gauge: 2, mini_frame_mount: 9, co2_cartridge_inflator: 10, electric_portable_auto: 7, track_high_pressure: 1,
  };
  return m[t];
}

export function accuracy(t: BikePumpType): number {
  const m: Record<BikePumpType, number> = {
    floor_stand_gauge: 9, mini_frame_mount: 4, co2_cartridge_inflator: 5, electric_portable_auto: 8, track_high_pressure: 10,
  };
  return m[t];
}

export function pumpCost(t: BikePumpType): number {
  const m: Record<BikePumpType, number> = {
    floor_stand_gauge: 5, mini_frame_mount: 4, co2_cartridge_inflator: 3, electric_portable_auto: 8, track_high_pressure: 9,
  };
  return m[t];
}

export function hasGauge(t: BikePumpType): boolean {
  const m: Record<BikePumpType, boolean> = {
    floor_stand_gauge: true, mini_frame_mount: false, co2_cartridge_inflator: false, electric_portable_auto: true, track_high_pressure: true,
  };
  return m[t];
}

export function dualValve(t: BikePumpType): boolean {
  const m: Record<BikePumpType, boolean> = {
    floor_stand_gauge: true, mini_frame_mount: true, co2_cartridge_inflator: true, electric_portable_auto: true, track_high_pressure: false,
  };
  return m[t];
}

export function pumpMechanism(t: BikePumpType): string {
  const m: Record<BikePumpType, string> = {
    floor_stand_gauge: "piston_barrel_stand",
    mini_frame_mount: "telescoping_hand_pump",
    co2_cartridge_inflator: "threaded_co2_release",
    electric_portable_auto: "rechargeable_compressor",
    track_high_pressure: "large_bore_steel_barrel",
  };
  return m[t];
}

export function bestRider(t: BikePumpType): string {
  const m: Record<BikePumpType, string> = {
    floor_stand_gauge: "home_garage_regular",
    mini_frame_mount: "commuter_touring_backup",
    co2_cartridge_inflator: "racer_emergency_quick",
    electric_portable_auto: "casual_multi_use",
    track_high_pressure: "bike_shop_professional",
  };
  return m[t];
}

export function bikePumps(): BikePumpType[] {
  return ["floor_stand_gauge", "mini_frame_mount", "co2_cartridge_inflator", "electric_portable_auto", "track_high_pressure"];
}
