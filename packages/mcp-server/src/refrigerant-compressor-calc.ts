export type RefrigerantCompressorType =
  | "reciprocating_piston"
  | "scroll_orbital_pair"
  | "screw_rotary_twin"
  | "centrifugal_turbo_impeller"
  | "linear_free_piston";

interface RefrigerantCompressorData {
  efficiency: number;
  capacity: number;
  noise: number;
  partLoad: number;
  rcCost: number;
  oilFree: boolean;
  forLargeChiller: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<RefrigerantCompressorType, RefrigerantCompressorData> = {
  reciprocating_piston: {
    efficiency: 7, capacity: 6, noise: 5, partLoad: 6, rcCost: 4,
    oilFree: false, forLargeChiller: false,
    mechanism: "piston_cylinder_crankshaft",
    bestUse: "small_commercial_cold_room_ac",
  },
  scroll_orbital_pair: {
    efficiency: 8, capacity: 5, noise: 9, partLoad: 7, rcCost: 5,
    oilFree: false, forLargeChiller: false,
    mechanism: "orbital_scroll_pair_hermetic",
    bestUse: "residential_split_heat_pump",
  },
  screw_rotary_twin: {
    efficiency: 8, capacity: 8, noise: 7, partLoad: 9, rcCost: 7,
    oilFree: false, forLargeChiller: true,
    mechanism: "helical_rotor_pair_slide_valve",
    bestUse: "industrial_chiller_cold_storage",
  },
  centrifugal_turbo_impeller: {
    efficiency: 9, capacity: 10, noise: 8, partLoad: 10, rcCost: 10,
    oilFree: true, forLargeChiller: true,
    mechanism: "impeller_vane_diffuser_magnetic",
    bestUse: "district_cooling_large_campus",
  },
  linear_free_piston: {
    efficiency: 9, capacity: 3, noise: 10, partLoad: 5, rcCost: 8,
    oilFree: true, forLargeChiller: false,
    mechanism: "free_piston_linear_motor_spring",
    bestUse: "cryocooler_stirling_miniature",
  },
};

function get(t: RefrigerantCompressorType): RefrigerantCompressorData {
  return DATA[t];
}

export const efficiency = (t: RefrigerantCompressorType) => get(t).efficiency;
export const capacity = (t: RefrigerantCompressorType) => get(t).capacity;
export const noise = (t: RefrigerantCompressorType) => get(t).noise;
export const partLoad = (t: RefrigerantCompressorType) => get(t).partLoad;
export const rcCost = (t: RefrigerantCompressorType) => get(t).rcCost;
export const oilFree = (t: RefrigerantCompressorType) => get(t).oilFree;
export const forLargeChiller = (t: RefrigerantCompressorType) => get(t).forLargeChiller;
export const mechanism = (t: RefrigerantCompressorType) => get(t).mechanism;
export const bestUse = (t: RefrigerantCompressorType) => get(t).bestUse;
export const refrigerantCompressorTypes = (): RefrigerantCompressorType[] =>
  Object.keys(DATA) as RefrigerantCompressorType[];
