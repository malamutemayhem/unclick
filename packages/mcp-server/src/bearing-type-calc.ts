export type BearingType =
  | "ball_deep_groove"
  | "roller_tapered"
  | "needle_thin_wall"
  | "air_bearing_porous"
  | "magnetic_active";

const DATA: Record<BearingType, {
  loadCapacity: number; speedLimit: number; precision: number;
  friction: number; brCost: number; contactless: boolean;
  forSpindle: boolean; element: string; bestUse: string;
}> = {
  ball_deep_groove: {
    loadCapacity: 6, speedLimit: 8, precision: 7,
    friction: 7, brCost: 2, contactless: false,
    forSpindle: false, element: "hardened_steel_ball",
    bestUse: "general_purpose_motor",
  },
  roller_tapered: {
    loadCapacity: 10, speedLimit: 5, precision: 6,
    friction: 5, brCost: 4, contactless: false,
    forSpindle: false, element: "cone_cup_roller_set",
    bestUse: "wheel_hub_axle_load",
  },
  needle_thin_wall: {
    loadCapacity: 8, speedLimit: 7, precision: 6,
    friction: 6, brCost: 3, contactless: false,
    forSpindle: false, element: "small_diameter_roller",
    bestUse: "gearbox_compact_radial",
  },
  air_bearing_porous: {
    loadCapacity: 3, speedLimit: 10, precision: 10,
    friction: 10, brCost: 8, contactless: true,
    forSpindle: true, element: "porous_graphite_film",
    bestUse: "metrology_spindle_wafer",
  },
  magnetic_active: {
    loadCapacity: 5, speedLimit: 10, precision: 9,
    friction: 10, brCost: 10, contactless: true,
    forSpindle: true, element: "electromagnet_feedback",
    bestUse: "turbo_molecular_pump",
  },
};

const get = (t: BearingType) => DATA[t];

export const loadCapacity = (t: BearingType) => get(t).loadCapacity;
export const speedLimit = (t: BearingType) => get(t).speedLimit;
export const precision = (t: BearingType) => get(t).precision;
export const friction = (t: BearingType) => get(t).friction;
export const brCost = (t: BearingType) => get(t).brCost;
export const contactless = (t: BearingType) => get(t).contactless;
export const forSpindle = (t: BearingType) => get(t).forSpindle;
export const element = (t: BearingType) => get(t).element;
export const bestUse = (t: BearingType) => get(t).bestUse;
export const bearingTypes = (): BearingType[] => Object.keys(DATA) as BearingType[];
