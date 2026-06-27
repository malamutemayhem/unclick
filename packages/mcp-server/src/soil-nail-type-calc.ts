export type SoilNailType =
  | "driven_steel_bar"
  | "grouted_drill_hollow"
  | "self_drilling_sacrificial"
  | "launched_compressed_air"
  | "screw_in_helical_plate";

const DATA: Record<SoilNailType, {
  pullout: number; speed: number; depth: number;
  versatility: number; snCost: number; grouted: boolean;
  forTemporary: boolean; installation: string; bestUse: string;
}> = {
  driven_steel_bar: {
    pullout: 5, speed: 9, depth: 4,
    versatility: 6, snCost: 1, grouted: false,
    forTemporary: true, installation: "pneumatic_percussive_hammer",
    bestUse: "temporary_excavation_support",
  },
  grouted_drill_hollow: {
    pullout: 9, speed: 5, depth: 8,
    versatility: 8, snCost: 3, grouted: true,
    forTemporary: false, installation: "rotary_drill_gravity_grout",
    bestUse: "permanent_slope_stabilization",
  },
  self_drilling_sacrificial: {
    pullout: 8, speed: 7, depth: 7,
    versatility: 9, snCost: 4, grouted: true,
    forTemporary: false, installation: "rotary_percussive_simultaneous",
    bestUse: "collapsing_ground_difficult_drill",
  },
  launched_compressed_air: {
    pullout: 4, speed: 10, depth: 3,
    versatility: 4, snCost: 2, grouted: false,
    forTemporary: true, installation: "compressed_air_ballistic_launch",
    bestUse: "emergency_slope_rapid_install",
  },
  screw_in_helical_plate: {
    pullout: 7, speed: 6, depth: 6,
    versatility: 5, snCost: 3, grouted: false,
    forTemporary: false, installation: "torque_drive_screw_rotation",
    bestUse: "soft_soil_low_vibration_urban",
  },
};

const get = (t: SoilNailType) => DATA[t];

export const pullout = (t: SoilNailType) => get(t).pullout;
export const speed = (t: SoilNailType) => get(t).speed;
export const depth = (t: SoilNailType) => get(t).depth;
export const versatility = (t: SoilNailType) => get(t).versatility;
export const snCost = (t: SoilNailType) => get(t).snCost;
export const grouted = (t: SoilNailType) => get(t).grouted;
export const forTemporary = (t: SoilNailType) => get(t).forTemporary;
export const installation = (t: SoilNailType) => get(t).installation;
export const bestUse = (t: SoilNailType) => get(t).bestUse;
export const soilNailTypes = (): SoilNailType[] => Object.keys(DATA) as SoilNailType[];
