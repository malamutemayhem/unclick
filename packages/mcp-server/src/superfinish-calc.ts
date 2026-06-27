export type SuperfinishType =
  | "stone_oscillation_plunge"
  | "film_microfinish_tape"
  | "belt_microfinish_wide"
  | "roller_burnish_rz"
  | "centrifugal_barrel_mass";

interface SuperfinishData {
  roughness: number;
  speed: number;
  consistency: number;
  geometry: number;
  sfCost: number;
  abrasiveFree: boolean;
  forBearing: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<SuperfinishType, SuperfinishData> = {
  stone_oscillation_plunge: {
    roughness: 10, speed: 6, consistency: 10, geometry: 7, sfCost: 8,
    abrasiveFree: false, forBearing: true,
    medium: "aluminum_oxide_stone_oscillate",
    bestUse: "bearing_race_crankshaft_journal",
  },
  film_microfinish_tape: {
    roughness: 10, speed: 7, consistency: 9, geometry: 8, sfCost: 7,
    abrasiveFree: false, forBearing: true,
    medium: "lapping_film_3um_polyester_back",
    bestUse: "cam_lobe_fuel_injector_needle",
  },
  belt_microfinish_wide: {
    roughness: 8, speed: 9, consistency: 8, geometry: 6, sfCost: 5,
    abrasiveFree: false, forBearing: false,
    medium: "coated_abrasive_belt_structured",
    bestUse: "roll_cylinder_large_od_finish",
  },
  roller_burnish_rz: {
    roughness: 9, speed: 10, consistency: 9, geometry: 5, sfCost: 4,
    abrasiveFree: true, forBearing: false,
    medium: "hardened_roller_hydrostatic_tool",
    bestUse: "hydraulic_cylinder_bore_seal",
  },
  centrifugal_barrel_mass: {
    roughness: 7, speed: 8, consistency: 7, geometry: 9, sfCost: 5,
    abrasiveFree: false, forBearing: false,
    medium: "ceramic_plastic_media_compound",
    bestUse: "watch_part_implant_batch_polish",
  },
};

function get(t: SuperfinishType): SuperfinishData {
  return DATA[t];
}

export const roughness = (t: SuperfinishType) => get(t).roughness;
export const speed = (t: SuperfinishType) => get(t).speed;
export const consistency = (t: SuperfinishType) => get(t).consistency;
export const geometry = (t: SuperfinishType) => get(t).geometry;
export const sfCost = (t: SuperfinishType) => get(t).sfCost;
export const abrasiveFree = (t: SuperfinishType) => get(t).abrasiveFree;
export const forBearing = (t: SuperfinishType) => get(t).forBearing;
export const medium = (t: SuperfinishType) => get(t).medium;
export const bestUse = (t: SuperfinishType) => get(t).bestUse;
export const superfinishTypes = (): SuperfinishType[] =>
  Object.keys(DATA) as SuperfinishType[];
