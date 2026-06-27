export type BaghouseFilterType =
  | "pulse_jet"
  | "reverse_air"
  | "shaker"
  | "cartridge_collector"
  | "pleated_bag";

interface BaghouseFilterData {
  efficiency: number;
  airVolume: number;
  pressureDrop: number;
  bagLife: number;
  bhCost: number;
  continuous: boolean;
  forHighTemp: boolean;
  media: string;
  bestUse: string;
}

const DATA: Record<BaghouseFilterType, BaghouseFilterData> = {
  pulse_jet: {
    efficiency: 10, airVolume: 10, pressureDrop: 8, bagLife: 8, bhCost: 7,
    continuous: true, forHighTemp: true,
    media: "polyester_felt_ptfe_membrane_pulse_compressed_air_clean",
    bestUse: "cement_plant_steel_mill_power_plant_high_volume_dust_collect",
  },
  reverse_air: {
    efficiency: 9, airVolume: 9, pressureDrop: 7, bagLife: 9, bhCost: 6,
    continuous: false, forHighTemp: true,
    media: "woven_fiberglass_reverse_air_gentle_clean_compartment",
    bestUse: "utility_boiler_smelter_high_temp_flue_gas_large_volume",
  },
  shaker: {
    efficiency: 8, airVolume: 6, pressureDrop: 6, bagLife: 7, bhCost: 4,
    continuous: false, forHighTemp: false,
    media: "woven_cotton_polyester_mechanical_shake_clean_intermittent",
    bestUse: "woodworking_grain_handling_light_dust_batch_process_older",
  },
  cartridge_collector: {
    efficiency: 10, airVolume: 7, pressureDrop: 9, bagLife: 7, bhCost: 8,
    continuous: true, forHighTemp: false,
    media: "pleated_cellulose_polyester_cartridge_high_surface_area",
    bestUse: "welding_fume_plasma_cutting_pharmaceutical_compact_space",
  },
  pleated_bag: {
    efficiency: 10, airVolume: 8, pressureDrop: 9, bagLife: 8, bhCost: 8,
    continuous: true, forHighTemp: true,
    media: "pleated_ptfe_expanded_membrane_bag_high_efficiency_nano",
    bestUse: "metal_smelting_chemical_process_fine_particulate_pm2_5",
  },
};

function get(t: BaghouseFilterType): BaghouseFilterData {
  return DATA[t];
}

export const efficiency = (t: BaghouseFilterType) => get(t).efficiency;
export const airVolume = (t: BaghouseFilterType) => get(t).airVolume;
export const pressureDrop = (t: BaghouseFilterType) => get(t).pressureDrop;
export const bagLife = (t: BaghouseFilterType) => get(t).bagLife;
export const bhCost = (t: BaghouseFilterType) => get(t).bhCost;
export const continuous = (t: BaghouseFilterType) => get(t).continuous;
export const forHighTemp = (t: BaghouseFilterType) => get(t).forHighTemp;
export const media = (t: BaghouseFilterType) => get(t).media;
export const bestUse = (t: BaghouseFilterType) => get(t).bestUse;
export const baghouseFilterTypes = (): BaghouseFilterType[] =>
  Object.keys(DATA) as BaghouseFilterType[];
