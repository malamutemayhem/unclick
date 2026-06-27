export type ExtruderFoodType =
  | "single_screw_cooking"
  | "twin_screw_co_rotating"
  | "cold_forming_pasta"
  | "pellet_press_feed"
  | "expander_high_shear";

const DATA: Record<ExtruderFoodType, {
  throughput: number; shear: number; mixing: number;
  flexibility: number; efCost: number; cookedProduct: boolean;
  forSnack: boolean; screw: string; bestUse: string;
}> = {
  single_screw_cooking: {
    throughput: 8, shear: 7, mixing: 5,
    flexibility: 5, efCost: 2, cookedProduct: true,
    forSnack: true, screw: "single_flight_compression",
    bestUse: "puffed_snack_cereal_direct_expand",
  },
  twin_screw_co_rotating: {
    throughput: 9, shear: 9, mixing: 10,
    flexibility: 10, efCost: 5, cookedProduct: true,
    forSnack: true, screw: "intermeshing_co_rotate_twin",
    bestUse: "textured_protein_filled_snack",
  },
  cold_forming_pasta: {
    throughput: 7, shear: 3, mixing: 6,
    flexibility: 6, efCost: 3, cookedProduct: false,
    forSnack: false, screw: "single_screw_low_temp_die",
    bestUse: "fresh_dry_pasta_noodle_shape",
  },
  pellet_press_feed: {
    throughput: 8, shear: 5, mixing: 4,
    flexibility: 3, efCost: 2, cookedProduct: false,
    forSnack: false, screw: "ring_die_roller_press",
    bestUse: "animal_feed_pellet_biomass",
  },
  expander_high_shear: {
    throughput: 7, shear: 10, mixing: 7,
    flexibility: 4, efCost: 3, cookedProduct: true,
    forSnack: false, screw: "annular_gap_high_pressure",
    bestUse: "soybean_meal_conditioning_feed",
  },
};

const get = (t: ExtruderFoodType) => DATA[t];

export const throughput = (t: ExtruderFoodType) => get(t).throughput;
export const shear = (t: ExtruderFoodType) => get(t).shear;
export const mixing = (t: ExtruderFoodType) => get(t).mixing;
export const flexibility = (t: ExtruderFoodType) => get(t).flexibility;
export const efCost = (t: ExtruderFoodType) => get(t).efCost;
export const cookedProduct = (t: ExtruderFoodType) => get(t).cookedProduct;
export const forSnack = (t: ExtruderFoodType) => get(t).forSnack;
export const screw = (t: ExtruderFoodType) => get(t).screw;
export const bestUse = (t: ExtruderFoodType) => get(t).bestUse;
export const extruderFoodTypes = (): ExtruderFoodType[] => Object.keys(DATA) as ExtruderFoodType[];
