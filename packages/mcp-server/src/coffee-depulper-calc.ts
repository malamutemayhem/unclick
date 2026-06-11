export type CoffeeDepulperType =
  | "disc_depulper"
  | "drum_depulper"
  | "eco_pulper"
  | "mechanical_demucilager"
  | "hand_crank";

interface CoffeeDepulperData {
  pulpRemoval: number;
  beanDamage: number;
  waterUsage: number;
  throughput: number;
  cdCost: number;
  waterless: boolean;
  forWashed: boolean;
  depulperConfig: string;
  bestUse: string;
}

const DATA: Record<CoffeeDepulperType, CoffeeDepulperData> = {
  disc_depulper: {
    pulpRemoval: 8, beanDamage: 7, waterUsage: 5, throughput: 8, cdCost: 6,
    waterless: false, forWashed: true,
    depulperConfig: "disc_depulper_rotating_disc_channel_cherry_squeeze_pulp_separate",
    bestUse: "commercial_wet_mill_disc_depulper_high_volume_washed_process",
  },
  drum_depulper: {
    pulpRemoval: 7, beanDamage: 6, waterUsage: 6, throughput: 9, cdCost: 5,
    waterless: false, forWashed: true,
    depulperConfig: "drum_depulper_rotating_cylinder_screen_cherry_pulp_water_channel",
    bestUse: "mid_size_wet_mill_drum_depulper_reliable_throughput_washed_coffee",
  },
  eco_pulper: {
    pulpRemoval: 9, beanDamage: 8, waterUsage: 9, throughput: 8, cdCost: 8,
    waterless: false, forWashed: true,
    depulperConfig: "eco_pulper_low_water_mechanical_mucilage_remove_combine_depulp",
    bestUse: "sustainable_wet_mill_eco_pulper_low_water_depulp_demucilage_combo",
  },
  mechanical_demucilager: {
    pulpRemoval: 10, beanDamage: 5, waterUsage: 8, throughput: 7, cdCost: 7,
    waterless: false, forWashed: true,
    depulperConfig: "mechanical_demucilager_friction_rotor_mucilage_strip_parchment_clean",
    bestUse: "washed_coffee_mill_mechanical_demucilager_skip_fermentation_fast",
  },
  hand_crank: {
    pulpRemoval: 6, beanDamage: 8, waterUsage: 10, throughput: 2, cdCost: 2,
    waterless: true, forWashed: true,
    depulperConfig: "hand_crank_depulper_manual_cherry_pulp_small_lot_farm_level",
    bestUse: "smallholder_farm_hand_crank_depulper_micro_lot_cherry_pulp_manual",
  },
};

function get(t: CoffeeDepulperType): CoffeeDepulperData {
  return DATA[t];
}

export const pulpRemoval = (t: CoffeeDepulperType) => get(t).pulpRemoval;
export const beanDamage = (t: CoffeeDepulperType) => get(t).beanDamage;
export const waterUsage = (t: CoffeeDepulperType) => get(t).waterUsage;
export const throughput = (t: CoffeeDepulperType) => get(t).throughput;
export const cdCost = (t: CoffeeDepulperType) => get(t).cdCost;
export const waterless = (t: CoffeeDepulperType) => get(t).waterless;
export const forWashed = (t: CoffeeDepulperType) => get(t).forWashed;
export const depulperConfig = (t: CoffeeDepulperType) => get(t).depulperConfig;
export const bestUse = (t: CoffeeDepulperType) => get(t).bestUse;
export const coffeeDepulperTypes = (): CoffeeDepulperType[] =>
  Object.keys(DATA) as CoffeeDepulperType[];
