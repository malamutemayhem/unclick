export type IndustrialInkjetType =
  | "continuous_cij_small_char"
  | "thermal_dod_large_char"
  | "piezo_dod_high_res"
  | "valve_jet_large_char"
  | "uv_led_cure_inline";

interface IndustrialInkjetData {
  resolution: number;
  speed: number;
  durability: number;
  substrate: number;
  ijCost: number;
  nonContact: boolean;
  forPrimary: boolean;
  ink: string;
  bestUse: string;
}

const DATA: Record<IndustrialInkjetType, IndustrialInkjetData> = {
  continuous_cij_small_char: {
    resolution: 6, speed: 10, durability: 7, substrate: 10, ijCost: 6,
    nonContact: true, forPrimary: false,
    ink: "mek_ethanol_solvent_small_drop",
    bestUse: "date_code_lot_expiry_fast_line",
  },
  thermal_dod_large_char: {
    resolution: 8, speed: 7, durability: 8, substrate: 7, ijCost: 4,
    nonContact: true, forPrimary: false,
    ink: "water_based_thermal_cartridge",
    bestUse: "case_carton_pallet_marking",
  },
  piezo_dod_high_res: {
    resolution: 10, speed: 8, durability: 9, substrate: 8, ijCost: 8,
    nonContact: true, forPrimary: true,
    ink: "uv_solvent_aqueous_piezo_drop",
    bestUse: "label_pouch_shrink_film_print",
  },
  valve_jet_large_char: {
    resolution: 5, speed: 9, durability: 9, substrate: 9, ijCost: 5,
    nonContact: true, forPrimary: false,
    ink: "pigmented_solvent_valve_dispense",
    bestUse: "lumber_pipe_bag_large_character",
  },
  uv_led_cure_inline: {
    resolution: 10, speed: 9, durability: 10, substrate: 9, ijCost: 10,
    nonContact: true, forPrimary: true,
    ink: "uv_curable_led_pinning_cure",
    bestUse: "pharma_carton_security_variable",
  },
};

function get(t: IndustrialInkjetType): IndustrialInkjetData {
  return DATA[t];
}

export const resolution = (t: IndustrialInkjetType) => get(t).resolution;
export const speed = (t: IndustrialInkjetType) => get(t).speed;
export const durability = (t: IndustrialInkjetType) => get(t).durability;
export const substrate = (t: IndustrialInkjetType) => get(t).substrate;
export const ijCost = (t: IndustrialInkjetType) => get(t).ijCost;
export const nonContact = (t: IndustrialInkjetType) => get(t).nonContact;
export const forPrimary = (t: IndustrialInkjetType) => get(t).forPrimary;
export const ink = (t: IndustrialInkjetType) => get(t).ink;
export const bestUse = (t: IndustrialInkjetType) => get(t).bestUse;
export const industrialInkjetTypes = (): IndustrialInkjetType[] =>
  Object.keys(DATA) as IndustrialInkjetType[];
