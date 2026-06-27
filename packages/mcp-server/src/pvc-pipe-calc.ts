export type PvcPipeType = "schedule_40_pressure" | "schedule_80_heavy" | "dwv_drain_thin" | "cpvc_hot_water" | "furniture_grade_smooth";

export function pressureRating(t: PvcPipeType): number {
  const m: Record<PvcPipeType, number> = {
    schedule_40_pressure: 7, schedule_80_heavy: 10, dwv_drain_thin: 3, cpvc_hot_water: 8, furniture_grade_smooth: 2,
  };
  return m[t];
}

export function wallThickness(t: PvcPipeType): number {
  const m: Record<PvcPipeType, number> = {
    schedule_40_pressure: 6, schedule_80_heavy: 10, dwv_drain_thin: 3, cpvc_hot_water: 7, furniture_grade_smooth: 4,
  };
  return m[t];
}

export function cutEase(t: PvcPipeType): number {
  const m: Record<PvcPipeType, number> = {
    schedule_40_pressure: 8, schedule_80_heavy: 4, dwv_drain_thin: 10, cpvc_hot_water: 7, furniture_grade_smooth: 9,
  };
  return m[t];
}

export function chemicalResist(t: PvcPipeType): number {
  const m: Record<PvcPipeType, number> = {
    schedule_40_pressure: 8, schedule_80_heavy: 9, dwv_drain_thin: 7, cpvc_hot_water: 10, furniture_grade_smooth: 6,
  };
  return m[t];
}

export function pipeCost(t: PvcPipeType): number {
  const m: Record<PvcPipeType, number> = {
    schedule_40_pressure: 4, schedule_80_heavy: 8, dwv_drain_thin: 3, cpvc_hot_water: 6, furniture_grade_smooth: 7,
  };
  return m[t];
}

export function hotWaterSafe(t: PvcPipeType): boolean {
  const m: Record<PvcPipeType, boolean> = {
    schedule_40_pressure: false, schedule_80_heavy: false, dwv_drain_thin: false, cpvc_hot_water: true, furniture_grade_smooth: false,
  };
  return m[t];
}

export function uvResistant(t: PvcPipeType): boolean {
  const m: Record<PvcPipeType, boolean> = {
    schedule_40_pressure: false, schedule_80_heavy: false, dwv_drain_thin: false, cpvc_hot_water: false, furniture_grade_smooth: true,
  };
  return m[t];
}

export function jointMethod(t: PvcPipeType): string {
  const m: Record<PvcPipeType, string> = {
    schedule_40_pressure: "solvent_cement_primer",
    schedule_80_heavy: "solvent_cement_threaded",
    dwv_drain_thin: "hub_spigot_cement",
    cpvc_hot_water: "cpvc_specific_cement",
    furniture_grade_smooth: "friction_fit_no_glue",
  };
  return m[t];
}

export function bestSystem(t: PvcPipeType): string {
  const m: Record<PvcPipeType, string> = {
    schedule_40_pressure: "cold_water_supply",
    schedule_80_heavy: "industrial_chemical_feed",
    dwv_drain_thin: "drain_waste_vent",
    cpvc_hot_water: "hot_cold_potable",
    furniture_grade_smooth: "diy_frame_structure",
  };
  return m[t];
}

export function pvcPipes(): PvcPipeType[] {
  return ["schedule_40_pressure", "schedule_80_heavy", "dwv_drain_thin", "cpvc_hot_water", "furniture_grade_smooth"];
}
