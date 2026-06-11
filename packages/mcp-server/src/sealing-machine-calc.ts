export type SealingMachineType =
  | "heat_bar_impulse"
  | "continuous_band"
  | "induction_cap"
  | "ultrasonic_weld"
  | "vacuum_map_chamber";

interface SealingMachineData {
  speed: number;
  sealStrength: number;
  versatility: number;
  cleanability: number;
  smCost: number;
  contactless: boolean;
  forFoodSafety: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<SealingMachineType, SealingMachineData> = {
  heat_bar_impulse: {
    speed: 5, sealStrength: 7, versatility: 8, cleanability: 6, smCost: 3,
    contactless: false, forFoodSafety: true,
    method: "heated_jaw_impulse_wire_clamp_seal_poly_bag_pouch",
    bestUse: "small_batch_poly_bag_medical_pouch_manual_sealing",
  },
  continuous_band: {
    speed: 8, sealStrength: 7, versatility: 7, cleanability: 6, smCost: 5,
    contactless: false, forFoodSafety: true,
    method: "moving_belt_heated_band_continuous_feed_horizontal",
    bestUse: "snack_food_bag_bakery_pouch_medium_speed_continuous",
  },
  induction_cap: {
    speed: 9, sealStrength: 9, versatility: 5, cleanability: 8, smCost: 7,
    contactless: true, forFoodSafety: true,
    method: "electromagnetic_induction_foil_liner_cap_heat_seal",
    bestUse: "bottle_jar_tamper_evident_foil_seal_pharma_beverage",
  },
  ultrasonic_weld: {
    speed: 8, sealStrength: 9, versatility: 6, cleanability: 9, smCost: 8,
    contactless: false, forFoodSafety: true,
    method: "high_freq_vibration_horn_anvil_thermoplastic_weld",
    bestUse: "tube_sealing_blister_pack_medical_device_clean_seal",
  },
  vacuum_map_chamber: {
    speed: 4, sealStrength: 8, versatility: 7, cleanability: 7, smCost: 6,
    contactless: false, forFoodSafety: true,
    method: "chamber_vacuum_gas_flush_map_heat_seal_tray_or_bag",
    bestUse: "fresh_meat_cheese_deli_vacuum_skin_pack_shelf_life",
  },
};

function get(t: SealingMachineType): SealingMachineData {
  return DATA[t];
}

export const speed = (t: SealingMachineType) => get(t).speed;
export const sealStrength = (t: SealingMachineType) => get(t).sealStrength;
export const versatility = (t: SealingMachineType) => get(t).versatility;
export const cleanability = (t: SealingMachineType) => get(t).cleanability;
export const smCost = (t: SealingMachineType) => get(t).smCost;
export const contactless = (t: SealingMachineType) => get(t).contactless;
export const forFoodSafety = (t: SealingMachineType) => get(t).forFoodSafety;
export const method = (t: SealingMachineType) => get(t).method;
export const bestUse = (t: SealingMachineType) => get(t).bestUse;
export const sealingMachineTypes = (): SealingMachineType[] =>
  Object.keys(DATA) as SealingMachineType[];
