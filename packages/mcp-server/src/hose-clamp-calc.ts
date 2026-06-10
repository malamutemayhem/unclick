export type HoseClampType = "worm_gear_screw" | "spring_wire_squeeze" | "t_bolt_heavy_duty" | "ear_crimp_pinch" | "constant_tension_auto";

export function clampForce(t: HoseClampType): number {
  const m: Record<HoseClampType, number> = {
    worm_gear_screw: 7, spring_wire_squeeze: 5, t_bolt_heavy_duty: 10, ear_crimp_pinch: 6, constant_tension_auto: 8,
  };
  return m[t];
}

export function adjustability(t: HoseClampType): number {
  const m: Record<HoseClampType, number> = {
    worm_gear_screw: 10, spring_wire_squeeze: 3, t_bolt_heavy_duty: 8, ear_crimp_pinch: 2, constant_tension_auto: 7,
  };
  return m[t];
}

export function installSpeed(t: HoseClampType): number {
  const m: Record<HoseClampType, number> = {
    worm_gear_screw: 7, spring_wire_squeeze: 9, t_bolt_heavy_duty: 5, ear_crimp_pinch: 8, constant_tension_auto: 6,
  };
  return m[t];
}

export function vibrationResist(t: HoseClampType): number {
  const m: Record<HoseClampType, number> = {
    worm_gear_screw: 5, spring_wire_squeeze: 7, t_bolt_heavy_duty: 9, ear_crimp_pinch: 6, constant_tension_auto: 10,
  };
  return m[t];
}

export function clampCost(t: HoseClampType): number {
  const m: Record<HoseClampType, number> = {
    worm_gear_screw: 3, spring_wire_squeeze: 2, t_bolt_heavy_duty: 8, ear_crimp_pinch: 4, constant_tension_auto: 7,
  };
  return m[t];
}

export function reusable(t: HoseClampType): boolean {
  const m: Record<HoseClampType, boolean> = {
    worm_gear_screw: true, spring_wire_squeeze: true, t_bolt_heavy_duty: true, ear_crimp_pinch: false, constant_tension_auto: true,
  };
  return m[t];
}

export function tamperProof(t: HoseClampType): boolean {
  const m: Record<HoseClampType, boolean> = {
    worm_gear_screw: false, spring_wire_squeeze: false, t_bolt_heavy_duty: false, ear_crimp_pinch: true, constant_tension_auto: false,
  };
  return m[t];
}

export function bandMaterial(t: HoseClampType): string {
  const m: Record<HoseClampType, string> = {
    worm_gear_screw: "stainless_perforated_band",
    spring_wire_squeeze: "spring_steel_wire_ring",
    t_bolt_heavy_duty: "solid_stainless_t_bolt",
    ear_crimp_pinch: "zinc_plated_ear_band",
    constant_tension_auto: "spring_loaded_band",
  };
  return m[t];
}

export function bestUse(t: HoseClampType): string {
  const m: Record<HoseClampType, string> = {
    worm_gear_screw: "general_plumbing_hose",
    spring_wire_squeeze: "automotive_oem_factory",
    t_bolt_heavy_duty: "turbo_intercooler_boost",
    ear_crimp_pinch: "fuel_line_crimp_seal",
    constant_tension_auto: "coolant_heater_thermal",
  };
  return m[t];
}

export function hoseClamps(): HoseClampType[] {
  return ["worm_gear_screw", "spring_wire_squeeze", "t_bolt_heavy_duty", "ear_crimp_pinch", "constant_tension_auto"];
}
