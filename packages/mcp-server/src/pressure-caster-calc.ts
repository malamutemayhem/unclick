export type PressureCasterType =
  | "high_pressure_die"
  | "low_pressure_die"
  | "squeeze_cast"
  | "vacuum_die"
  | "gravity_tilt";

interface PressureCasterData {
  surfaceFinish: number;
  throughput: number;
  porosity: number;
  wallThickness: number;
  prCost: number;
  highPressure: boolean;
  forStructural: boolean;
  casterConfig: string;
  bestUse: string;
}

const DATA: Record<PressureCasterType, PressureCasterData> = {
  high_pressure_die: {
    surfaceFinish: 8, throughput: 10, porosity: 6, wallThickness: 9, prCost: 8,
    highPressure: true, forStructural: false,
    casterConfig: "high_pressure_die_caster_cold_chamber_inject_fast_fill_thin",
    bestUse: "auto_housing_high_pressure_die_caster_fast_fill_thin_wall",
  },
  low_pressure_die: {
    surfaceFinish: 8, throughput: 7, porosity: 8, wallThickness: 7, prCost: 6,
    highPressure: false, forStructural: true,
    casterConfig: "low_pressure_die_caster_riser_tube_slow_fill_sound_wheel_hub",
    bestUse: "alloy_wheel_low_pressure_die_caster_riser_tube_slow_fill",
  },
  squeeze_cast: {
    surfaceFinish: 9, throughput: 6, porosity: 10, wallThickness: 8, prCost: 9,
    highPressure: true, forStructural: true,
    casterConfig: "squeeze_caster_high_pressure_solidify_forge_quality_dense_part",
    bestUse: "suspension_arm_squeeze_caster_forge_quality_dense_structural",
  },
  vacuum_die: {
    surfaceFinish: 9, throughput: 8, porosity: 9, wallThickness: 8, prCost: 9,
    highPressure: true, forStructural: true,
    casterConfig: "vacuum_die_caster_evacuate_cavity_porosity_free_heat_treatable",
    bestUse: "structural_auto_vacuum_die_caster_porosity_free_heat_treat",
  },
  gravity_tilt: {
    surfaceFinish: 7, throughput: 5, porosity: 7, wallThickness: 6, prCost: 5,
    highPressure: false, forStructural: false,
    casterConfig: "gravity_tilt_caster_permanent_mold_rotate_pour_smooth_fill",
    bestUse: "cylinder_head_gravity_tilt_caster_permanent_mold_smooth_fill",
  },
};

function get(t: PressureCasterType): PressureCasterData {
  return DATA[t];
}

export const surfaceFinish = (t: PressureCasterType) => get(t).surfaceFinish;
export const throughput = (t: PressureCasterType) => get(t).throughput;
export const porosity = (t: PressureCasterType) => get(t).porosity;
export const wallThickness = (t: PressureCasterType) => get(t).wallThickness;
export const prCost = (t: PressureCasterType) => get(t).prCost;
export const highPressure = (t: PressureCasterType) => get(t).highPressure;
export const forStructural = (t: PressureCasterType) => get(t).forStructural;
export const casterConfig = (t: PressureCasterType) => get(t).casterConfig;
export const bestUse = (t: PressureCasterType) => get(t).bestUse;
export const pressureCasterTypes = (): PressureCasterType[] =>
  Object.keys(DATA) as PressureCasterType[];
