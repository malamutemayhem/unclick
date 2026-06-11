export type PoleLightType =
  | "shoebox_cobra_head"
  | "post_top_acorn"
  | "decorative_pendant_arm"
  | "sports_field_high_mast"
  | "solar_bollard_hybrid";

interface PoleLightData {
  lumens: number;
  efficiency: number;
  windLoad: number;
  aesthetic: number;
  plCost: number;
  darkSky: boolean;
  forParking: boolean;
  distribution: string;
  bestUse: string;
}

const DATA: Record<PoleLightType, PoleLightData> = {
  shoebox_cobra_head: {
    lumens: 8, efficiency: 9, windLoad: 8, aesthetic: 4, plCost: 5,
    darkSky: true, forParking: true,
    distribution: "type_iii_forward_throw_led",
    bestUse: "parking_lot_roadway_area",
  },
  post_top_acorn: {
    lumens: 5, efficiency: 7, windLoad: 6, aesthetic: 9, plCost: 6,
    darkSky: false, forParking: false,
    distribution: "type_v_omnidirectional_globe",
    bestUse: "downtown_streetscape_campus",
  },
  decorative_pendant_arm: {
    lumens: 6, efficiency: 7, windLoad: 5, aesthetic: 10, plCost: 8,
    darkSky: true, forParking: false,
    distribution: "type_ii_crosswalk_pedestrian",
    bestUse: "historic_district_main_street",
  },
  sports_field_high_mast: {
    lumens: 10, efficiency: 8, windLoad: 10, aesthetic: 3, plCost: 9,
    darkSky: false, forParking: false,
    distribution: "narrow_spot_high_intensity_aim",
    bestUse: "athletic_field_stadium_arena",
  },
  solar_bollard_hybrid: {
    lumens: 3, efficiency: 10, windLoad: 9, aesthetic: 7, plCost: 4,
    darkSky: true, forParking: false,
    distribution: "low_level_path_360_degree",
    bestUse: "pathway_garden_no_wiring",
  },
};

function get(t: PoleLightType): PoleLightData {
  return DATA[t];
}

export const lumens = (t: PoleLightType) => get(t).lumens;
export const efficiency = (t: PoleLightType) => get(t).efficiency;
export const windLoad = (t: PoleLightType) => get(t).windLoad;
export const aesthetic = (t: PoleLightType) => get(t).aesthetic;
export const plCost = (t: PoleLightType) => get(t).plCost;
export const darkSky = (t: PoleLightType) => get(t).darkSky;
export const forParking = (t: PoleLightType) => get(t).forParking;
export const distribution = (t: PoleLightType) => get(t).distribution;
export const bestUse = (t: PoleLightType) => get(t).bestUse;
export const poleLightTypes = (): PoleLightType[] =>
  Object.keys(DATA) as PoleLightType[];
