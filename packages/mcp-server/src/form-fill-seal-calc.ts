export type FormFillSealType =
  | "vffs_vertical_pillow"
  | "hffs_horizontal_flow"
  | "tffs_thermoform_tray"
  | "sachet_stick_pack"
  | "pouch_premade_rotary";

interface FormFillSealData {
  speed: number;
  versatility: number;
  filmEfficiency: number;
  sealIntegrity: number;
  ffsCost: number;
  modified_atmosphere: boolean;
  forLiquid: boolean;
  filmType: string;
  bestUse: string;
}

const DATA: Record<FormFillSealType, FormFillSealData> = {
  vffs_vertical_pillow: {
    speed: 9, versatility: 8, filmEfficiency: 9, sealIntegrity: 8, ffsCost: 6,
    modified_atmosphere: true, forLiquid: false,
    filmType: "laminate_poly_pillow_bag_roll",
    bestUse: "snack_chip_coffee_granule_bag",
  },
  hffs_horizontal_flow: {
    speed: 10, versatility: 7, filmEfficiency: 8, sealIntegrity: 8, ffsCost: 7,
    modified_atmosphere: true, forLiquid: false,
    filmType: "center_seal_flow_wrap_film",
    bestUse: "biscuit_bar_bakery_flow_wrap",
  },
  tffs_thermoform_tray: {
    speed: 7, versatility: 9, filmEfficiency: 7, sealIntegrity: 10, ffsCost: 9,
    modified_atmosphere: true, forLiquid: true,
    filmType: "rigid_base_lidding_film_tray",
    bestUse: "meat_cheese_medical_device_tray",
  },
  sachet_stick_pack: {
    speed: 8, versatility: 6, filmEfficiency: 10, sealIntegrity: 9, ffsCost: 5,
    modified_atmosphere: false, forLiquid: true,
    filmType: "foil_laminate_single_dose_strip",
    bestUse: "sugar_sauce_pharma_single_dose",
  },
  pouch_premade_rotary: {
    speed: 6, versatility: 10, filmEfficiency: 6, sealIntegrity: 9, ffsCost: 8,
    modified_atmosphere: true, forLiquid: true,
    filmType: "premade_standup_spouted_pouch",
    bestUse: "retort_pouch_pet_food_beverage",
  },
};

function get(t: FormFillSealType): FormFillSealData {
  return DATA[t];
}

export const speed = (t: FormFillSealType) => get(t).speed;
export const versatility = (t: FormFillSealType) => get(t).versatility;
export const filmEfficiency = (t: FormFillSealType) => get(t).filmEfficiency;
export const sealIntegrity = (t: FormFillSealType) => get(t).sealIntegrity;
export const ffsCost = (t: FormFillSealType) => get(t).ffsCost;
export const modifiedAtmosphere = (t: FormFillSealType) => get(t).modified_atmosphere;
export const forLiquid = (t: FormFillSealType) => get(t).forLiquid;
export const filmType = (t: FormFillSealType) => get(t).filmType;
export const bestUse = (t: FormFillSealType) => get(t).bestUse;
export const formFillSealTypes = (): FormFillSealType[] =>
  Object.keys(DATA) as FormFillSealType[];
