export type CycloneSeparatorType =
  | "standard_tangential_entry"
  | "high_efficiency_long_cone"
  | "high_throughput_short_cone"
  | "multi_clone_parallel_array"
  | "hydrocyclone_liquid_solid";

interface CycloneData {
  cutSize: number;
  efficiency: number;
  throughput: number;
  pressureDrop: number;
  cyCost: number;
  wet: boolean;
  forDust: boolean;
  vortex: string;
  bestUse: string;
}

const DATA: Record<CycloneSeparatorType, CycloneData> = {
  standard_tangential_entry: {
    cutSize: 6, efficiency: 7, throughput: 7, pressureDrop: 6, cyCost: 3,
    wet: false, forDust: true,
    vortex: "tangential_inlet_axial_exit",
    bestUse: "general_dust_collection_pre_filter",
  },
  high_efficiency_long_cone: {
    cutSize: 9, efficiency: 9, throughput: 5, pressureDrop: 4, cyCost: 5,
    wet: false, forDust: true,
    vortex: "elongated_cone_tight_spiral",
    bestUse: "fine_dust_pm10_cement_grain",
  },
  high_throughput_short_cone: {
    cutSize: 4, efficiency: 5, throughput: 10, pressureDrop: 8, cyCost: 3,
    wet: false, forDust: true,
    vortex: "wide_body_short_cone_fast",
    bestUse: "coarse_particle_high_volume_wood",
  },
  multi_clone_parallel_array: {
    cutSize: 8, efficiency: 8, throughput: 9, pressureDrop: 5, cyCost: 7,
    wet: false, forDust: true,
    vortex: "multiple_small_tubes_parallel",
    bestUse: "boiler_flue_gas_fly_ash",
  },
  hydrocyclone_liquid_solid: {
    cutSize: 7, efficiency: 7, throughput: 8, pressureDrop: 5, cyCost: 4,
    wet: true, forDust: false,
    vortex: "liquid_tangential_underflow_apex",
    bestUse: "mineral_slurry_oil_water_starch",
  },
};

function get(t: CycloneSeparatorType): CycloneData {
  return DATA[t];
}

export const cutSize = (t: CycloneSeparatorType) => get(t).cutSize;
export const efficiency = (t: CycloneSeparatorType) => get(t).efficiency;
export const throughput = (t: CycloneSeparatorType) => get(t).throughput;
export const pressureDrop = (t: CycloneSeparatorType) => get(t).pressureDrop;
export const cyCost = (t: CycloneSeparatorType) => get(t).cyCost;
export const wet = (t: CycloneSeparatorType) => get(t).wet;
export const forDust = (t: CycloneSeparatorType) => get(t).forDust;
export const vortex = (t: CycloneSeparatorType) => get(t).vortex;
export const bestUse = (t: CycloneSeparatorType) => get(t).bestUse;
export const cycloneSeparatorTypes = (): CycloneSeparatorType[] =>
  Object.keys(DATA) as CycloneSeparatorType[];
