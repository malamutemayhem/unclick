export type LabyrinthSealType =
  | "straight_through_teeth"
  | "stepped_interlocking"
  | "honeycomb_abradable"
  | "brush_seal_bristle"
  | "carbon_ring_segmented";

interface LabyrinthSealData {
  leakage: number;
  speed: number;
  temperature: number;
  wear: number;
  lsCost: number;
  nonContact: boolean;
  forTurbine: boolean;
  geometry: string;
  bestUse: string;
}

const DATA: Record<LabyrinthSealType, LabyrinthSealData> = {
  straight_through_teeth: {
    leakage: 5, speed: 9, temperature: 8, wear: 9, lsCost: 4,
    nonContact: true, forTurbine: true,
    geometry: "straight_knife_edge_teeth_groove",
    bestUse: "shaft_bearing_isolator_general",
  },
  stepped_interlocking: {
    leakage: 7, speed: 9, temperature: 9, wear: 9, lsCost: 6,
    nonContact: true, forTurbine: true,
    geometry: "stepped_offset_interlocking_teeth",
    bestUse: "gas_turbine_compressor_interstage",
  },
  honeycomb_abradable: {
    leakage: 9, speed: 10, temperature: 10, wear: 8, lsCost: 9,
    nonContact: true, forTurbine: true,
    geometry: "honeycomb_cell_abradable_stator",
    bestUse: "aircraft_engine_turbine_tip_seal",
  },
  brush_seal_bristle: {
    leakage: 8, speed: 10, temperature: 9, wear: 7, lsCost: 7,
    nonContact: false, forTurbine: true,
    geometry: "metallic_bristle_pack_backing_plate",
    bestUse: "steam_turbine_gland_seal_upgrade",
  },
  carbon_ring_segmented: {
    leakage: 8, speed: 8, temperature: 7, wear: 6, lsCost: 5,
    nonContact: false, forTurbine: false,
    geometry: "segmented_carbon_ring_garter_spring",
    bestUse: "compressor_shaft_oil_seal_buffer",
  },
};

function get(t: LabyrinthSealType): LabyrinthSealData {
  return DATA[t];
}

export const leakage = (t: LabyrinthSealType) => get(t).leakage;
export const speed = (t: LabyrinthSealType) => get(t).speed;
export const temperature = (t: LabyrinthSealType) => get(t).temperature;
export const wear = (t: LabyrinthSealType) => get(t).wear;
export const lsCost = (t: LabyrinthSealType) => get(t).lsCost;
export const nonContact = (t: LabyrinthSealType) => get(t).nonContact;
export const forTurbine = (t: LabyrinthSealType) => get(t).forTurbine;
export const geometry = (t: LabyrinthSealType) => get(t).geometry;
export const bestUse = (t: LabyrinthSealType) => get(t).bestUse;
export const labyrinthSealTypes = (): LabyrinthSealType[] =>
  Object.keys(DATA) as LabyrinthSealType[];
