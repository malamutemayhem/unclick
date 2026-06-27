export type BottleRinserType =
  | "air_rinse"
  | "water_rinse"
  | "ionized_air"
  | "ozone_rinse"
  | "vacuum_rinse";

interface BottleRinserData {
  cleanLevel: number;
  throughput: number;
  waterUsage: number;
  dryness: number;
  brCost: number;
  contactFree: boolean;
  forPharma: boolean;
  rinserConfig: string;
  bestUse: string;
}

const DATA: Record<BottleRinserType, BottleRinserData> = {
  air_rinse: {
    cleanLevel: 6, throughput: 9, waterUsage: 10, dryness: 10, brCost: 5,
    contactFree: true, forPharma: false,
    rinserConfig: "air_rinse_bottle_rinser_invert_blow_nozzle_dry_clean_no_water",
    bestUse: "pet_bottle_air_rinse_bottle_rinser_dry_clean_high_speed_line",
  },
  water_rinse: {
    cleanLevel: 8, throughput: 8, waterUsage: 3, dryness: 4, brCost: 5,
    contactFree: false, forPharma: false,
    rinserConfig: "water_rinse_bottle_rinser_invert_spray_drain_recirculate_filter",
    bestUse: "glass_bottle_water_rinse_bottle_rinser_reuse_recirculate_clean",
  },
  ionized_air: {
    cleanLevel: 7, throughput: 8, waterUsage: 10, dryness: 10, brCost: 7,
    contactFree: true, forPharma: true,
    rinserConfig: "ionized_air_bottle_rinser_static_neutralize_particle_blow_clean",
    bestUse: "pharma_vial_ionized_air_bottle_rinser_static_free_particle_remove",
  },
  ozone_rinse: {
    cleanLevel: 9, throughput: 7, waterUsage: 5, dryness: 5, brCost: 8,
    contactFree: false, forPharma: true,
    rinserConfig: "ozone_rinse_bottle_rinser_ozone_water_sanitize_chemical_free",
    bestUse: "food_grade_ozone_rinse_bottle_rinser_sanitize_no_residue_safe",
  },
  vacuum_rinse: {
    cleanLevel: 8, throughput: 7, waterUsage: 10, dryness: 9, brCost: 6,
    contactFree: true, forPharma: false,
    rinserConfig: "vacuum_rinse_bottle_rinser_suction_extract_debris_particle_dry",
    bestUse: "can_clean_vacuum_rinse_bottle_rinser_suction_debris_no_liquid",
  },
};

function get(t: BottleRinserType): BottleRinserData {
  return DATA[t];
}

export const cleanLevel = (t: BottleRinserType) => get(t).cleanLevel;
export const throughput = (t: BottleRinserType) => get(t).throughput;
export const waterUsage = (t: BottleRinserType) => get(t).waterUsage;
export const dryness = (t: BottleRinserType) => get(t).dryness;
export const brCost = (t: BottleRinserType) => get(t).brCost;
export const contactFree = (t: BottleRinserType) => get(t).contactFree;
export const forPharma = (t: BottleRinserType) => get(t).forPharma;
export const rinserConfig = (t: BottleRinserType) => get(t).rinserConfig;
export const bestUse = (t: BottleRinserType) => get(t).bestUse;
export const bottleRinserTypes = (): BottleRinserType[] =>
  Object.keys(DATA) as BottleRinserType[];
