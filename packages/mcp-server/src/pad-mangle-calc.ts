export type PadMangleType =
  | "two_roll_vertical"
  | "three_roll_offset"
  | "vacuum_slot"
  | "foam_applicator"
  | "kiss_roll";

interface PadMangleData {
  nipPressure: number;
  pickupRate: number;
  fabricSpeed: number;
  uniformity: number;
  pmCost: number;
  pneumatic: boolean;
  forStretch: boolean;
  rollConfig: string;
  bestUse: string;
}

const DATA: Record<PadMangleType, PadMangleData> = {
  two_roll_vertical: {
    nipPressure: 8, pickupRate: 7, fabricSpeed: 8, uniformity: 7, pmCost: 4,
    pneumatic: true, forStretch: false,
    rollConfig: "vertical_two_roll_stack_pneumatic_load_simple_nip_squeeze",
    bestUse: "woven_cotton_dye_padding_chemical_impregnation_standard_line",
  },
  three_roll_offset: {
    nipPressure: 9, pickupRate: 8, fabricSpeed: 7, uniformity: 9, pmCost: 6,
    pneumatic: true, forStretch: false,
    rollConfig: "three_roll_offset_stack_double_nip_even_wet_pickup_both_face",
    bestUse: "heavy_fabric_denim_twill_uniform_chemical_application_padding",
  },
  vacuum_slot: {
    nipPressure: 6, pickupRate: 10, fabricSpeed: 9, uniformity: 10, pmCost: 8,
    pneumatic: false, forStretch: true,
    rollConfig: "vacuum_extraction_slot_remove_excess_liquor_no_contact_nip",
    bestUse: "knit_stretch_delicate_fabric_contactless_dewatering_padding",
  },
  foam_applicator: {
    nipPressure: 5, pickupRate: 6, fabricSpeed: 8, uniformity: 8, pmCost: 7,
    pneumatic: false, forStretch: true,
    rollConfig: "foam_generation_unit_apply_chemical_foam_low_wet_pickup_save",
    bestUse: "water_saving_finishing_softener_resin_low_add_on_application",
  },
  kiss_roll: {
    nipPressure: 4, pickupRate: 5, fabricSpeed: 10, uniformity: 6, pmCost: 3,
    pneumatic: false, forStretch: false,
    rollConfig: "single_roll_partial_immersion_transfer_liquor_one_face_only",
    bestUse: "one_side_coating_back_sizing_single_face_chemical_transfer",
  },
};

function get(t: PadMangleType): PadMangleData {
  return DATA[t];
}

export const nipPressure = (t: PadMangleType) => get(t).nipPressure;
export const pickupRate = (t: PadMangleType) => get(t).pickupRate;
export const fabricSpeed = (t: PadMangleType) => get(t).fabricSpeed;
export const uniformity = (t: PadMangleType) => get(t).uniformity;
export const pmCost = (t: PadMangleType) => get(t).pmCost;
export const pneumatic = (t: PadMangleType) => get(t).pneumatic;
export const forStretch = (t: PadMangleType) => get(t).forStretch;
export const rollConfig = (t: PadMangleType) => get(t).rollConfig;
export const bestUse = (t: PadMangleType) => get(t).bestUse;
export const padMangleTypes = (): PadMangleType[] =>
  Object.keys(DATA) as PadMangleType[];
