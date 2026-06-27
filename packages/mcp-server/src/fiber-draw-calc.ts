export type FiberDrawType =
  | "single_mode_draw"
  | "multi_mode_draw"
  | "specialty_fiber"
  | "polymer_fiber"
  | "photonic_crystal";

interface FiberDrawData {
  diameterControl: number;
  throughput: number;
  attenuation: number;
  concentricity: number;
  fdCost: number;
  highPurity: boolean;
  forTelecom: boolean;
  drawConfig: string;
  bestUse: string;
}

const DATA: Record<FiberDrawType, FiberDrawData> = {
  single_mode_draw: {
    diameterControl: 10, throughput: 8, attenuation: 10, concentricity: 10, fdCost: 9,
    highPurity: true, forTelecom: true,
    drawConfig: "single_mode_fiber_draw_tower_preform_melt_125um_cladding_coat",
    bestUse: "telecom_single_mode_fiber_draw_long_haul_low_attenuation_9um",
  },
  multi_mode_draw: {
    diameterControl: 9, throughput: 9, attenuation: 7, concentricity: 9, fdCost: 7,
    highPurity: true, forTelecom: false,
    drawConfig: "multi_mode_fiber_draw_tower_preform_melt_50um_62um_core_coat",
    bestUse: "data_center_multi_mode_fiber_draw_short_reach_50um_high_bw",
  },
  specialty_fiber: {
    diameterControl: 10, throughput: 4, attenuation: 9, concentricity: 10, fdCost: 10,
    highPurity: true, forTelecom: false,
    drawConfig: "specialty_fiber_draw_tower_rare_earth_doped_pm_active_custom",
    bestUse: "laser_sensor_specialty_fiber_draw_erbium_doped_pm_active",
  },
  polymer_fiber: {
    diameterControl: 7, throughput: 7, attenuation: 4, concentricity: 7, fdCost: 4,
    highPurity: false, forTelecom: false,
    drawConfig: "polymer_fiber_draw_extrude_pmma_large_core_flexible_illumine",
    bestUse: "lighting_display_polymer_fiber_draw_pmma_large_core_flexible",
  },
  photonic_crystal: {
    diameterControl: 10, throughput: 3, attenuation: 8, concentricity: 9, fdCost: 10,
    highPurity: true, forTelecom: false,
    drawConfig: "photonic_crystal_fiber_draw_stack_draw_hollow_core_microstruc",
    bestUse: "research_photonic_crystal_fiber_draw_hollow_core_supercontinuum",
  },
};

function get(t: FiberDrawType): FiberDrawData {
  return DATA[t];
}

export const diameterControl = (t: FiberDrawType) => get(t).diameterControl;
export const throughput = (t: FiberDrawType) => get(t).throughput;
export const attenuation = (t: FiberDrawType) => get(t).attenuation;
export const concentricity = (t: FiberDrawType) => get(t).concentricity;
export const fdCost = (t: FiberDrawType) => get(t).fdCost;
export const highPurity = (t: FiberDrawType) => get(t).highPurity;
export const forTelecom = (t: FiberDrawType) => get(t).forTelecom;
export const drawConfig = (t: FiberDrawType) => get(t).drawConfig;
export const bestUse = (t: FiberDrawType) => get(t).bestUse;
export const fiberDrawTypes = (): FiberDrawType[] =>
  Object.keys(DATA) as FiberDrawType[];
