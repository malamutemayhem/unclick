export type FishSmokerType =
  | "traditional_kiln"
  | "mechanical_kiln"
  | "liquid_smoke"
  | "electrostatic_smoke"
  | "cold_smoke_cabinet";

interface FishSmokerData {
  smokeDepth: number;
  throughput: number;
  temperatureControl: number;
  flavorConsistency: number;
  fmCost: number;
  coldSmoke: boolean;
  forSalmon: boolean;
  smokerConfig: string;
  bestUse: string;
}

const DATA: Record<FishSmokerType, FishSmokerData> = {
  traditional_kiln: {
    smokeDepth: 10, throughput: 4, temperatureControl: 5, flavorConsistency: 6, fmCost: 4,
    coldSmoke: true, forSalmon: true,
    smokerConfig: "traditional_kiln_fish_smoker_wood_chip_brick_chamber_slow_cure",
    bestUse: "artisan_smoked_fish_traditional_kiln_wood_smoke_premium_flavor",
  },
  mechanical_kiln: {
    smokeDepth: 8, throughput: 9, temperatureControl: 9, flavorConsistency: 8, fmCost: 8,
    coldSmoke: false, forSalmon: true,
    smokerConfig: "mechanical_kiln_fish_smoker_fan_circulate_thermostat_control",
    bestUse: "commercial_smoked_fish_mechanical_kiln_consistent_temperature",
  },
  liquid_smoke: {
    smokeDepth: 5, throughput: 10, temperatureControl: 10, flavorConsistency: 9, fmCost: 6,
    coldSmoke: false, forSalmon: false,
    smokerConfig: "liquid_smoke_fish_dip_spray_condensed_smoke_instant_color_flavor",
    bestUse: "industrial_fish_liquid_smoke_fast_consistent_color_flavor_apply",
  },
  electrostatic_smoke: {
    smokeDepth: 9, throughput: 8, temperatureControl: 9, flavorConsistency: 9, fmCost: 9,
    coldSmoke: true, forSalmon: true,
    smokerConfig: "electrostatic_smoke_fish_charge_particle_attract_surface_deep",
    bestUse: "premium_smoked_salmon_electrostatic_deep_smoke_penetration_even",
  },
  cold_smoke_cabinet: {
    smokeDepth: 9, throughput: 6, temperatureControl: 8, flavorConsistency: 8, fmCost: 7,
    coldSmoke: true, forSalmon: true,
    smokerConfig: "cold_smoke_cabinet_fish_external_generator_pipe_low_temp_cure",
    bestUse: "cold_smoked_salmon_cabinet_low_temperature_long_cure_delicate",
  },
};

function get(t: FishSmokerType): FishSmokerData {
  return DATA[t];
}

export const smokeDepth = (t: FishSmokerType) => get(t).smokeDepth;
export const throughput = (t: FishSmokerType) => get(t).throughput;
export const temperatureControl = (t: FishSmokerType) => get(t).temperatureControl;
export const flavorConsistency = (t: FishSmokerType) => get(t).flavorConsistency;
export const fmCost = (t: FishSmokerType) => get(t).fmCost;
export const coldSmoke = (t: FishSmokerType) => get(t).coldSmoke;
export const forSalmon = (t: FishSmokerType) => get(t).forSalmon;
export const smokerConfig = (t: FishSmokerType) => get(t).smokerConfig;
export const bestUse = (t: FishSmokerType) => get(t).bestUse;
export const fishSmokerTypes = (): FishSmokerType[] =>
  Object.keys(DATA) as FishSmokerType[];
