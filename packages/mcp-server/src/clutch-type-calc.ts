export type ClutchType =
  | "friction_disc_dry"
  | "friction_disc_wet"
  | "electromagnetic_powder"
  | "centrifugal_shoe"
  | "overrunning_sprag";

const DATA: Record<ClutchType, {
  torque: number; speed: number; life: number;
  engagement: number; clCost: number; slipCapable: boolean;
  forAutomotive: boolean; mechanism: string; bestUse: string;
}> = {
  friction_disc_dry: {
    torque: 8, speed: 7, life: 6,
    engagement: 7, clCost: 2, slipCapable: true,
    forAutomotive: true, mechanism: "dry_friction_plate_spring",
    bestUse: "manual_transmission_vehicle",
  },
  friction_disc_wet: {
    torque: 9, speed: 9, life: 9,
    engagement: 8, clCost: 4, slipCapable: true,
    forAutomotive: true, mechanism: "oil_bath_multi_plate",
    bestUse: "motorcycle_automatic_trans",
  },
  electromagnetic_powder: {
    torque: 6, speed: 6, life: 8,
    engagement: 10, clCost: 3, slipCapable: true,
    forAutomotive: false, mechanism: "magnetic_powder_fill_gap",
    bestUse: "web_tension_control_printing",
  },
  centrifugal_shoe: {
    torque: 5, speed: 5, life: 5,
    engagement: 3, clCost: 1, slipCapable: false,
    forAutomotive: false, mechanism: "weighted_shoe_centrifugal",
    bestUse: "chainsaw_moped_small_engine",
  },
  overrunning_sprag: {
    torque: 7, speed: 8, life: 7,
    engagement: 9, clCost: 3, slipCapable: false,
    forAutomotive: true, mechanism: "sprag_wedge_one_way",
    bestUse: "conveyor_backstop_torque_conv",
  },
};

const get = (t: ClutchType) => DATA[t];

export const torque = (t: ClutchType) => get(t).torque;
export const speed = (t: ClutchType) => get(t).speed;
export const life = (t: ClutchType) => get(t).life;
export const engagement = (t: ClutchType) => get(t).engagement;
export const clCost = (t: ClutchType) => get(t).clCost;
export const slipCapable = (t: ClutchType) => get(t).slipCapable;
export const forAutomotive = (t: ClutchType) => get(t).forAutomotive;
export const mechanism = (t: ClutchType) => get(t).mechanism;
export const bestUse = (t: ClutchType) => get(t).bestUse;
export const clutchTypes = (): ClutchType[] => Object.keys(DATA) as ClutchType[];
