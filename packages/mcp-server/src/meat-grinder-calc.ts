export type MeatGrinderType =
  | "plate_grinder"
  | "bowl_cutter"
  | "flaker_chipper"
  | "emulsifier"
  | "mixer_grinder";

interface MeatGrinderData {
  speed: number;
  fineness: number;
  capacity: number;
  temperature: number;
  mgCost: number;
  continuous: boolean;
  forSausage: boolean;
  cutting: string;
  bestUse: string;
}

const DATA: Record<MeatGrinderType, MeatGrinderData> = {
  plate_grinder: {
    speed: 8, fineness: 7, capacity: 9, temperature: 6, mgCost: 5,
    continuous: true, forSausage: true,
    cutting: "auger_feed_rotating_knife_against_perforated_plate_extrude",
    bestUse: "ground_beef_pork_mince_sausage_meat_general_grinding",
  },
  bowl_cutter: {
    speed: 9, fineness: 10, capacity: 7, temperature: 8, mgCost: 8,
    continuous: false, forSausage: true,
    cutting: "rotating_bowl_high_speed_knife_set_vacuum_fine_emulsion",
    bestUse: "frankfurt_hot_dog_emulsion_sausage_paste_fine_comminution",
  },
  flaker_chipper: {
    speed: 7, fineness: 4, capacity: 8, temperature: 10, mgCost: 6,
    continuous: true, forSausage: false,
    cutting: "rotating_drum_blade_frozen_block_chip_flake_temper_feed",
    bestUse: "frozen_meat_block_tempering_flake_chip_before_further_process",
  },
  emulsifier: {
    speed: 10, fineness: 10, capacity: 8, temperature: 7, mgCost: 9,
    continuous: true, forSausage: true,
    cutting: "high_speed_rotor_stator_inline_fine_cut_emulsify_pump",
    bestUse: "fine_emulsion_pate_spread_baby_food_meat_paste_high_speed",
  },
  mixer_grinder: {
    speed: 6, fineness: 7, capacity: 10, temperature: 5, mgCost: 7,
    continuous: false, forSausage: true,
    cutting: "paddle_mix_then_grind_combined_unit_seasoning_blend_extrude",
    bestUse: "seasoned_sausage_burger_patty_mix_blend_grind_one_unit",
  },
};

function get(t: MeatGrinderType): MeatGrinderData {
  return DATA[t];
}

export const speed = (t: MeatGrinderType) => get(t).speed;
export const fineness = (t: MeatGrinderType) => get(t).fineness;
export const capacity = (t: MeatGrinderType) => get(t).capacity;
export const temperature = (t: MeatGrinderType) => get(t).temperature;
export const mgCost = (t: MeatGrinderType) => get(t).mgCost;
export const continuous = (t: MeatGrinderType) => get(t).continuous;
export const forSausage = (t: MeatGrinderType) => get(t).forSausage;
export const cutting = (t: MeatGrinderType) => get(t).cutting;
export const bestUse = (t: MeatGrinderType) => get(t).bestUse;
export const meatGrinderTypes = (): MeatGrinderType[] =>
  Object.keys(DATA) as MeatGrinderType[];
