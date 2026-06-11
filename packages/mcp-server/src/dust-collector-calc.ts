export type DustCollectorType =
  | "baghouse_pulse_jet"
  | "cartridge_nanofiber"
  | "cyclone_mechanical"
  | "wet_scrubber_venturi"
  | "electrostatic_industrial";

interface DustCollectorData {
  captureEfficiency: number;
  airVolume: number;
  filterLife: number;
  pressureLoss: number;
  dcCost: number;
  selfCleaning: boolean;
  forExplosive: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<DustCollectorType, DustCollectorData> = {
  baghouse_pulse_jet: {
    captureEfficiency: 10, airVolume: 9, filterLife: 8, pressureLoss: 6, dcCost: 7,
    selfCleaning: true, forExplosive: false,
    medium: "woven_felted_fabric_bag_pulse_air_clean_continuous_operation",
    bestUse: "cement_plant_steel_mill_power_plant_high_volume_fine_dust",
  },
  cartridge_nanofiber: {
    captureEfficiency: 10, airVolume: 7, filterLife: 9, pressureLoss: 7, dcCost: 8,
    selfCleaning: true, forExplosive: false,
    medium: "pleated_nanofiber_cartridge_surface_loading_easy_pulse_clean",
    bestUse: "welding_fume_pharmaceutical_fine_powder_compact_footprint",
  },
  cyclone_mechanical: {
    captureEfficiency: 6, airVolume: 10, filterLife: 10, pressureLoss: 5, dcCost: 3,
    selfCleaning: true, forExplosive: true,
    medium: "centrifugal_vortex_no_filter_media_gravity_hopper_collect",
    bestUse: "wood_shop_grain_elevator_pre_separator_coarse_heavy_dust",
  },
  wet_scrubber_venturi: {
    captureEfficiency: 8, airVolume: 8, filterLife: 10, pressureLoss: 4, dcCost: 6,
    selfCleaning: true, forExplosive: true,
    medium: "water_spray_venturi_throat_slurry_capture_wet_discharge",
    bestUse: "explosive_dust_hot_gas_chemical_fume_metal_grinding_spark",
  },
  electrostatic_industrial: {
    captureEfficiency: 9, airVolume: 9, filterLife: 9, pressureLoss: 8, dcCost: 9,
    selfCleaning: true, forExplosive: false,
    medium: "high_voltage_electrode_ionize_particle_collect_plate_rap",
    bestUse: "large_smelter_foundry_smoke_oil_mist_submicron_particle",
  },
};

function get(t: DustCollectorType): DustCollectorData {
  return DATA[t];
}

export const captureEfficiency = (t: DustCollectorType) => get(t).captureEfficiency;
export const airVolume = (t: DustCollectorType) => get(t).airVolume;
export const filterLife = (t: DustCollectorType) => get(t).filterLife;
export const pressureLoss = (t: DustCollectorType) => get(t).pressureLoss;
export const dcCost = (t: DustCollectorType) => get(t).dcCost;
export const selfCleaning = (t: DustCollectorType) => get(t).selfCleaning;
export const forExplosive = (t: DustCollectorType) => get(t).forExplosive;
export const medium = (t: DustCollectorType) => get(t).medium;
export const bestUse = (t: DustCollectorType) => get(t).bestUse;
export const dustCollectorTypes = (): DustCollectorType[] =>
  Object.keys(DATA) as DustCollectorType[];
