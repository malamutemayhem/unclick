export type CoffeeRoasterType =
  | "drum_roaster"
  | "fluid_bed"
  | "centrifugal_roaster"
  | "tangential_roaster"
  | "hybrid_recirculation";

interface CoffeeRoasterData {
  roastUniformity: number;
  batchSize: number;
  profileControl: number;
  energyEfficiency: number;
  crCost: number;
  continuous: boolean;
  forSpecialty: boolean;
  roasterConfig: string;
  bestUse: string;
}

const DATA: Record<CoffeeRoasterType, CoffeeRoasterData> = {
  drum_roaster: {
    roastUniformity: 8, batchSize: 8, profileControl: 9, energyEfficiency: 6, crCost: 7,
    continuous: false, forSpecialty: true,
    roasterConfig: "drum_roaster_rotating_cylinder_conduction_convection_batch_profile",
    bestUse: "specialty_coffee_roastery_drum_roaster_profile_control_batch_craft",
  },
  fluid_bed: {
    roastUniformity: 10, batchSize: 6, profileControl: 8, energyEfficiency: 8, crCost: 6,
    continuous: false, forSpecialty: true,
    roasterConfig: "fluid_bed_air_roaster_hot_air_levitate_bean_even_roast_clean_cup",
    bestUse: "clean_cup_specialty_fluid_bed_roaster_even_light_roast_origin_flavor",
  },
  centrifugal_roaster: {
    roastUniformity: 9, batchSize: 10, profileControl: 7, energyEfficiency: 7, crCost: 9,
    continuous: true, forSpecialty: false,
    roasterConfig: "centrifugal_roaster_spinning_bowl_high_volume_rapid_roast_cycle",
    bestUse: "commercial_coffee_centrifugal_roaster_high_volume_rapid_batch_cycle",
  },
  tangential_roaster: {
    roastUniformity: 7, batchSize: 9, profileControl: 6, energyEfficiency: 7, crCost: 8,
    continuous: true, forSpecialty: false,
    roasterConfig: "tangential_roaster_scoop_drum_industrial_high_throughput_commodity",
    bestUse: "industrial_commodity_coffee_tangential_roaster_high_throughput_bulk",
  },
  hybrid_recirculation: {
    roastUniformity: 9, batchSize: 7, profileControl: 10, energyEfficiency: 9, crCost: 10,
    continuous: false, forSpecialty: true,
    roasterConfig: "hybrid_recirculation_roaster_drum_air_combo_heat_recovery_precise",
    bestUse: "premium_micro_roastery_hybrid_recirculation_precise_profile_energy",
  },
};

function get(t: CoffeeRoasterType): CoffeeRoasterData {
  return DATA[t];
}

export const roastUniformity = (t: CoffeeRoasterType) => get(t).roastUniformity;
export const batchSize = (t: CoffeeRoasterType) => get(t).batchSize;
export const profileControl = (t: CoffeeRoasterType) => get(t).profileControl;
export const energyEfficiency = (t: CoffeeRoasterType) => get(t).energyEfficiency;
export const crCost = (t: CoffeeRoasterType) => get(t).crCost;
export const continuous = (t: CoffeeRoasterType) => get(t).continuous;
export const forSpecialty = (t: CoffeeRoasterType) => get(t).forSpecialty;
export const roasterConfig = (t: CoffeeRoasterType) => get(t).roasterConfig;
export const bestUse = (t: CoffeeRoasterType) => get(t).bestUse;
export const coffeeRoasterTypes = (): CoffeeRoasterType[] =>
  Object.keys(DATA) as CoffeeRoasterType[];
