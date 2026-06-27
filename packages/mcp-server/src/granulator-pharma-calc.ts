export type GranulatorPharmaType =
  | "high_shear_wet"
  | "fluid_bed_granulate"
  | "roller_compactor"
  | "oscillating_granulate"
  | "twin_screw_granulate";

interface GranulatorPharmaData {
  granuleUniformity: number;
  throughput: number;
  densityControl: number;
  bindingEfficiency: number;
  gpCost: number;
  continuous: boolean;
  forDry: boolean;
  granulatorConfig: string;
  bestUse: string;
}

const DATA: Record<GranulatorPharmaType, GranulatorPharmaData> = {
  high_shear_wet: {
    granuleUniformity: 9, throughput: 8, densityControl: 9, bindingEfficiency: 10, gpCost: 8,
    continuous: false, forDry: false,
    granulatorConfig: "high_shear_wet_granulator_impeller_chopper_binder_spray_dense",
    bestUse: "pharma_tablet_high_shear_wet_granulation_dense_uniform_granule",
  },
  fluid_bed_granulate: {
    granuleUniformity: 8, throughput: 7, densityControl: 7, bindingEfficiency: 8, gpCost: 9,
    continuous: false, forDry: false,
    granulatorConfig: "fluid_bed_granulator_fluidize_spray_binder_agglomerate_dry",
    bestUse: "pharma_fluid_bed_granulation_porous_granule_fast_dissolve_od",
  },
  roller_compactor: {
    granuleUniformity: 8, throughput: 9, densityControl: 10, bindingEfficiency: 7, gpCost: 7,
    continuous: true, forDry: true,
    granulatorConfig: "roller_compactor_dry_granulator_press_ribbon_mill_granule",
    bestUse: "pharma_moisture_sensitive_roller_compactor_dry_granulation_api",
  },
  oscillating_granulate: {
    granuleUniformity: 7, throughput: 6, densityControl: 6, bindingEfficiency: 6, gpCost: 4,
    continuous: false, forDry: false,
    granulatorConfig: "oscillating_granulator_rotor_bar_screen_size_reduce_wet_mass",
    bestUse: "pharma_lab_oscillating_granulator_wet_mass_screen_size_reduce",
  },
  twin_screw_granulate: {
    granuleUniformity: 9, throughput: 10, densityControl: 9, bindingEfficiency: 9, gpCost: 10,
    continuous: true, forDry: false,
    granulatorConfig: "twin_screw_granulator_continuous_feed_knead_granulate_inline",
    bestUse: "continuous_pharma_twin_screw_granulator_inline_real_time_qbd",
  },
};

function get(t: GranulatorPharmaType): GranulatorPharmaData {
  return DATA[t];
}

export const granuleUniformity = (t: GranulatorPharmaType) => get(t).granuleUniformity;
export const throughput = (t: GranulatorPharmaType) => get(t).throughput;
export const densityControl = (t: GranulatorPharmaType) => get(t).densityControl;
export const bindingEfficiency = (t: GranulatorPharmaType) => get(t).bindingEfficiency;
export const gpCost = (t: GranulatorPharmaType) => get(t).gpCost;
export const continuous = (t: GranulatorPharmaType) => get(t).continuous;
export const forDry = (t: GranulatorPharmaType) => get(t).forDry;
export const granulatorConfig = (t: GranulatorPharmaType) => get(t).granulatorConfig;
export const bestUse = (t: GranulatorPharmaType) => get(t).bestUse;
export const granulatorPharmaTypes = (): GranulatorPharmaType[] =>
  Object.keys(DATA) as GranulatorPharmaType[];
