export type SinterProcessType =
  | "conventional_strand_ore"
  | "spark_plasma_sps"
  | "hot_isostatic_hip"
  | "microwave_sinter"
  | "selective_laser_sls";

interface SinterProcessData {
  density: number;
  temperature: number;
  speed: number;
  precision: number;
  spCost: number;
  pressureAssist: boolean;
  forPowderMetal: boolean;
  atmosphere: string;
  bestUse: string;
}

const DATA: Record<SinterProcessType, SinterProcessData> = {
  conventional_strand_ore: {
    density: 7, temperature: 7, speed: 9, precision: 4, spCost: 5,
    pressureAssist: false, forPowderMetal: false,
    atmosphere: "air_coke_breeze_strand_ignition",
    bestUse: "iron_ore_sinter_blast_furnace_feed",
  },
  spark_plasma_sps: {
    density: 10, temperature: 10, speed: 10, precision: 9, spCost: 10,
    pressureAssist: true, forPowderMetal: true,
    atmosphere: "vacuum_pulsed_dc_graphite_die",
    bestUse: "advanced_ceramic_nano_composite",
  },
  hot_isostatic_hip: {
    density: 10, temperature: 9, speed: 4, precision: 8, spCost: 9,
    pressureAssist: true, forPowderMetal: true,
    atmosphere: "argon_high_pressure_vessel_uniform",
    bestUse: "titanium_superalloy_defect_close",
  },
  microwave_sinter: {
    density: 8, temperature: 8, speed: 8, precision: 7, spCost: 7,
    pressureAssist: false, forPowderMetal: true,
    atmosphere: "microwave_cavity_volumetric_heat",
    bestUse: "ceramic_cermet_rapid_uniform_heat",
  },
  selective_laser_sls: {
    density: 8, temperature: 8, speed: 6, precision: 10, spCost: 9,
    pressureAssist: false, forPowderMetal: true,
    atmosphere: "nitrogen_argon_laser_scan_layer",
    bestUse: "complex_prototype_nylon_metal_am",
  },
};

function get(t: SinterProcessType): SinterProcessData {
  return DATA[t];
}

export const density = (t: SinterProcessType) => get(t).density;
export const temperature = (t: SinterProcessType) => get(t).temperature;
export const speed = (t: SinterProcessType) => get(t).speed;
export const precision = (t: SinterProcessType) => get(t).precision;
export const spCost_ = (t: SinterProcessType) => get(t).spCost;
export const pressureAssist = (t: SinterProcessType) => get(t).pressureAssist;
export const forPowderMetal = (t: SinterProcessType) => get(t).forPowderMetal;
export const atmosphere = (t: SinterProcessType) => get(t).atmosphere;
export const bestUse = (t: SinterProcessType) => get(t).bestUse;
export const sinterProcessTypes = (): SinterProcessType[] =>
  Object.keys(DATA) as SinterProcessType[];
