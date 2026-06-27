export type RecordCleanerType = "velvet_brush_dry" | "spin_clean_wet" | "ultrasonic_bath" | "vacuum_rcm" | "spray_microfiber";

export function cleaningDepth(t: RecordCleanerType): number {
  const m: Record<RecordCleanerType, number> = {
    velvet_brush_dry: 3, spin_clean_wet: 7, ultrasonic_bath: 10, vacuum_rcm: 9, spray_microfiber: 5,
  };
  return m[t];
}

export function easeOfUse(t: RecordCleanerType): number {
  const m: Record<RecordCleanerType, number> = {
    velvet_brush_dry: 10, spin_clean_wet: 7, ultrasonic_bath: 6, vacuum_rcm: 5, spray_microfiber: 9,
  };
  return m[t];
}

export function batchSpeed(t: RecordCleanerType): number {
  const m: Record<RecordCleanerType, number> = {
    velvet_brush_dry: 10, spin_clean_wet: 5, ultrasonic_bath: 7, vacuum_rcm: 6, spray_microfiber: 8,
  };
  return m[t];
}

export function grooveSafe(t: RecordCleanerType): number {
  const m: Record<RecordCleanerType, number> = {
    velvet_brush_dry: 9, spin_clean_wet: 7, ultrasonic_bath: 10, vacuum_rcm: 8, spray_microfiber: 6,
  };
  return m[t];
}

export function cleanerCost(t: RecordCleanerType): number {
  const m: Record<RecordCleanerType, number> = {
    velvet_brush_dry: 1, spin_clean_wet: 3, ultrasonic_bath: 9, vacuum_rcm: 10, spray_microfiber: 2,
  };
  return m[t];
}

export function removesStatic(t: RecordCleanerType): boolean {
  const m: Record<RecordCleanerType, boolean> = {
    velvet_brush_dry: true, spin_clean_wet: false, ultrasonic_bath: true, vacuum_rcm: true, spray_microfiber: false,
  };
  return m[t];
}

export function usesFluid(t: RecordCleanerType): boolean {
  const m: Record<RecordCleanerType, boolean> = {
    velvet_brush_dry: false, spin_clean_wet: true, ultrasonic_bath: true, vacuum_rcm: true, spray_microfiber: true,
  };
  return m[t];
}

export function cleanMethod(t: RecordCleanerType): string {
  const m: Record<RecordCleanerType, string> = {
    velvet_brush_dry: "antistatic_velvet_sweep",
    spin_clean_wet: "manual_spin_bath_rinse",
    ultrasonic_bath: "cavitation_bubble_deep",
    vacuum_rcm: "suction_fluid_extract",
    spray_microfiber: "spray_wipe_air_dry",
  };
  return m[t];
}

export function bestCollection(t: RecordCleanerType): string {
  const m: Record<RecordCleanerType, string> = {
    velvet_brush_dry: "daily_dust_before_play",
    spin_clean_wet: "thrift_store_used_haul",
    ultrasonic_bath: "rare_audiophile_archive",
    vacuum_rcm: "large_collection_restore",
    spray_microfiber: "quick_occasional_wipe",
  };
  return m[t];
}

export function recordCleaners(): RecordCleanerType[] {
  return ["velvet_brush_dry", "spin_clean_wet", "ultrasonic_bath", "vacuum_rcm", "spray_microfiber"];
}
