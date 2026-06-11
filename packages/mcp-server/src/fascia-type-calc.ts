export type FasciaTypeType =
  | "wood_primed_painted"
  | "aluminum_wrap_coil"
  | "pvc_cellular_trim"
  | "fiber_cement_board"
  | "composite_capped_trim";

interface FasciaTypeData {
  durability: number;
  aesthetic: number;
  maintenance: number;
  paintability: number;
  faCost: number;
  rotResistant: boolean;
  forExterior: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<FasciaTypeType, FasciaTypeData> = {
  wood_primed_painted: {
    durability: 4, aesthetic: 7, maintenance: 3, paintability: 10, faCost: 3,
    rotResistant: false, forExterior: true,
    material: "finger_joint_primed_pine",
    bestUse: "traditional_residential_painted",
  },
  aluminum_wrap_coil: {
    durability: 8, aesthetic: 6, maintenance: 9, paintability: 2, faCost: 5,
    rotResistant: true, forExterior: true,
    material: "aluminum_coil_stock_brake_formed",
    bestUse: "low_maintenance_wrap_existing",
  },
  pvc_cellular_trim: {
    durability: 9, aesthetic: 7, maintenance: 10, paintability: 8, faCost: 6,
    rotResistant: true, forExterior: true,
    material: "cellular_pvc_foam_board",
    bestUse: "coastal_moisture_prone_area",
  },
  fiber_cement_board: {
    durability: 8, aesthetic: 7, maintenance: 7, paintability: 9, faCost: 5,
    rotResistant: true, forExterior: true,
    material: "fiber_cement_primed_smooth",
    bestUse: "fire_zone_non_combustible",
  },
  composite_capped_trim: {
    durability: 9, aesthetic: 8, maintenance: 9, paintability: 5, faCost: 7,
    rotResistant: true, forExterior: true,
    material: "wood_polymer_capped_profile",
    bestUse: "premium_residential_no_paint",
  },
};

function get(t: FasciaTypeType): FasciaTypeData {
  return DATA[t];
}

export const durability = (t: FasciaTypeType) => get(t).durability;
export const aesthetic = (t: FasciaTypeType) => get(t).aesthetic;
export const maintenance = (t: FasciaTypeType) => get(t).maintenance;
export const paintability = (t: FasciaTypeType) => get(t).paintability;
export const faCost = (t: FasciaTypeType) => get(t).faCost;
export const rotResistant = (t: FasciaTypeType) => get(t).rotResistant;
export const forExterior = (t: FasciaTypeType) => get(t).forExterior;
export const material = (t: FasciaTypeType) => get(t).material;
export const bestUse = (t: FasciaTypeType) => get(t).bestUse;
export const fasciaTypeTypes = (): FasciaTypeType[] =>
  Object.keys(DATA) as FasciaTypeType[];
