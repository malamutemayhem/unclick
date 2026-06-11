export type VacuumPanType =
  | "batch_calandria"
  | "continuous_vertical"
  | "plate_type"
  | "coil_type"
  | "falling_film";

interface VacuumPanData {
  crystalGrowth: number;
  energyEfficiency: number;
  throughput: number;
  grainControl: number;
  vpCost: number;
  continuous: boolean;
  forRefined: boolean;
  panConfig: string;
  bestUse: string;
}

const DATA: Record<VacuumPanType, VacuumPanData> = {
  batch_calandria: {
    crystalGrowth: 9, energyEfficiency: 6, throughput: 6, grainControl: 10, vpCost: 6,
    continuous: false, forRefined: true,
    panConfig: "batch_calandria_vacuum_pan_tube_heat_exchange_boil_crystal_grow",
    bestUse: "sugar_refinery_batch_calandria_pan_precise_crystal_growth_white",
  },
  continuous_vertical: {
    crystalGrowth: 7, energyEfficiency: 8, throughput: 10, grainControl: 7, vpCost: 9,
    continuous: true, forRefined: false,
    panConfig: "continuous_vertical_vacuum_pan_multi_chamber_gravity_flow_crystal",
    bestUse: "large_sugar_factory_continuous_vertical_pan_high_volume_raw_sugar",
  },
  plate_type: {
    crystalGrowth: 8, energyEfficiency: 9, throughput: 8, grainControl: 8, vpCost: 7,
    continuous: false, forRefined: true,
    panConfig: "plate_type_vacuum_pan_plate_heat_exchanger_compact_efficient_boil",
    bestUse: "modern_sugar_refinery_plate_pan_compact_efficient_heat_transfer",
  },
  coil_type: {
    crystalGrowth: 8, energyEfficiency: 7, throughput: 7, grainControl: 9, vpCost: 5,
    continuous: false, forRefined: true,
    panConfig: "coil_type_vacuum_pan_internal_coil_heat_exchange_traditional_batch",
    bestUse: "traditional_sugar_mill_coil_pan_reliable_batch_crystallization",
  },
  falling_film: {
    crystalGrowth: 6, energyEfficiency: 10, throughput: 9, grainControl: 6, vpCost: 8,
    continuous: true, forRefined: false,
    panConfig: "falling_film_vacuum_pan_thin_film_evaporate_low_residence_time",
    bestUse: "energy_efficient_sugar_factory_falling_film_pan_low_color_formation",
  },
};

function get(t: VacuumPanType): VacuumPanData {
  return DATA[t];
}

export const crystalGrowth = (t: VacuumPanType) => get(t).crystalGrowth;
export const energyEfficiency = (t: VacuumPanType) => get(t).energyEfficiency;
export const throughput = (t: VacuumPanType) => get(t).throughput;
export const grainControl = (t: VacuumPanType) => get(t).grainControl;
export const vpCost = (t: VacuumPanType) => get(t).vpCost;
export const continuous = (t: VacuumPanType) => get(t).continuous;
export const forRefined = (t: VacuumPanType) => get(t).forRefined;
export const panConfig = (t: VacuumPanType) => get(t).panConfig;
export const bestUse = (t: VacuumPanType) => get(t).bestUse;
export const vacuumPanTypes = (): VacuumPanType[] =>
  Object.keys(DATA) as VacuumPanType[];
