export type FreezeDryerType =
  | "shelf_batch_pharma"
  | "rotary_drum_continuous"
  | "spray_freeze_particle"
  | "atmospheric_belt_food"
  | "microwave_assisted_vacuum";

const DATA: Record<FreezeDryerType, {
  quality: number; throughput: number; energy: number;
  uniformity: number; fdCost: number; continuous: boolean;
  forPharma: boolean; sublimation: string; bestUse: string;
}> = {
  shelf_batch_pharma: {
    quality: 10, throughput: 4, energy: 4,
    uniformity: 9, fdCost: 5, continuous: false,
    forPharma: true, sublimation: "heated_shelf_vacuum_chamber",
    bestUse: "injectable_vaccine_biologic_vial",
  },
  rotary_drum_continuous: {
    quality: 7, throughput: 8, energy: 6,
    uniformity: 6, fdCost: 4, continuous: true,
    forPharma: false, sublimation: "rotating_drum_vacuum_continuous",
    bestUse: "instant_coffee_bulk_granule",
  },
  spray_freeze_particle: {
    quality: 9, throughput: 6, energy: 5,
    uniformity: 8, fdCost: 5, continuous: true,
    forPharma: true, sublimation: "spray_into_cryogen_then_dry",
    bestUse: "inhaled_drug_microsphere_powder",
  },
  atmospheric_belt_food: {
    quality: 6, throughput: 9, energy: 7,
    uniformity: 7, fdCost: 3, continuous: true,
    forPharma: false, sublimation: "belt_conveyor_low_humidity_air",
    bestUse: "fruit_snack_herb_pet_food",
  },
  microwave_assisted_vacuum: {
    quality: 8, throughput: 7, energy: 9,
    uniformity: 7, fdCost: 4, continuous: false,
    forPharma: false, sublimation: "microwave_energy_vacuum_drying",
    bestUse: "premium_herb_berry_rapid_dry",
  },
};

const get = (t: FreezeDryerType) => DATA[t];

export const quality = (t: FreezeDryerType) => get(t).quality;
export const throughput = (t: FreezeDryerType) => get(t).throughput;
export const energy = (t: FreezeDryerType) => get(t).energy;
export const uniformity = (t: FreezeDryerType) => get(t).uniformity;
export const fdCost = (t: FreezeDryerType) => get(t).fdCost;
export const continuous = (t: FreezeDryerType) => get(t).continuous;
export const forPharma = (t: FreezeDryerType) => get(t).forPharma;
export const sublimation = (t: FreezeDryerType) => get(t).sublimation;
export const bestUse = (t: FreezeDryerType) => get(t).bestUse;
export const freezeDryerTypes = (): FreezeDryerType[] => Object.keys(DATA) as FreezeDryerType[];
