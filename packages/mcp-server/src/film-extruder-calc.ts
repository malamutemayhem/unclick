export type FilmExtruderType =
  | "blown_film"
  | "cast_film"
  | "biaxial_stretch"
  | "multi_layer"
  | "nano_layer";

interface FilmExtruderData {
  filmClarity: number;
  throughput: number;
  thicknessControl: number;
  barrierProperty: number;
  feCost: number;
  oriented: boolean;
  forFood: boolean;
  extruderConfig: string;
  bestUse: string;
}

const DATA: Record<FilmExtruderType, FilmExtruderData> = {
  blown_film: {
    filmClarity: 7, throughput: 9, thicknessControl: 7, barrierProperty: 7, feCost: 6,
    oriented: false, forFood: true,
    extruderConfig: "blown_film_extruder_annular_die_air_ring_inflate_bubble_nip",
    bestUse: "packaging_film_blown_extruder_bag_shrink_wrap_stretch_film",
  },
  cast_film: {
    filmClarity: 9, throughput: 10, thicknessControl: 9, barrierProperty: 7, feCost: 7,
    oriented: false, forFood: true,
    extruderConfig: "cast_film_extruder_flat_die_chill_roll_quench_clear_sheet",
    bestUse: "clear_film_cast_extruder_cling_wrap_lamination_optical_clarity",
  },
  biaxial_stretch: {
    filmClarity: 10, throughput: 8, thicknessControl: 10, barrierProperty: 9, feCost: 9,
    oriented: true, forFood: true,
    extruderConfig: "biaxial_stretch_film_extruder_tenter_frame_md_td_orient_strong",
    bestUse: "bopp_bopet_biaxial_stretch_film_snack_bag_label_capacitor",
  },
  multi_layer: {
    filmClarity: 8, throughput: 8, thicknessControl: 8, barrierProperty: 10, feCost: 8,
    oriented: false, forFood: true,
    extruderConfig: "multi_layer_film_extruder_coextrude_feedblock_combine_barrier",
    bestUse: "barrier_packaging_multi_layer_film_meat_cheese_shelf_life",
  },
  nano_layer: {
    filmClarity: 10, throughput: 6, thicknessControl: 10, barrierProperty: 10, feCost: 10,
    oriented: false, forFood: false,
    extruderConfig: "nano_layer_film_extruder_multiply_element_hundred_plus_layers",
    bestUse: "specialty_nano_layer_film_extreme_barrier_optical_electronic",
  },
};

function get(t: FilmExtruderType): FilmExtruderData {
  return DATA[t];
}

export const filmClarity = (t: FilmExtruderType) => get(t).filmClarity;
export const throughput = (t: FilmExtruderType) => get(t).throughput;
export const thicknessControl = (t: FilmExtruderType) => get(t).thicknessControl;
export const barrierProperty = (t: FilmExtruderType) => get(t).barrierProperty;
export const feCost = (t: FilmExtruderType) => get(t).feCost;
export const oriented = (t: FilmExtruderType) => get(t).oriented;
export const forFood = (t: FilmExtruderType) => get(t).forFood;
export const extruderConfig = (t: FilmExtruderType) => get(t).extruderConfig;
export const bestUse = (t: FilmExtruderType) => get(t).bestUse;
export const filmExtruderTypes = (): FilmExtruderType[] =>
  Object.keys(DATA) as FilmExtruderType[];
