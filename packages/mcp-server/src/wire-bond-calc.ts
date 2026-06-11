export type WireBond =
  | "gold_ball_thermo"
  | "aluminum_wedge"
  | "copper_ball_fab"
  | "ribbon_bond_power"
  | "heavy_wire_al";

const DATA: Record<WireBond, {
  bondStrength: number; loopHeight: number; speed: number;
  currentCapacity: number; bondCost: number; oxidationRes: boolean;
  forPower: boolean; wireType: string; bestUse: string;
}> = {
  gold_ball_thermo: {
    bondStrength: 7, loopHeight: 8, speed: 9,
    currentCapacity: 4, bondCost: 9, oxidationRes: true,
    forPower: false, wireType: "au_25um_ball",
    bestUse: "fine_pitch_ic_packaging",
  },
  aluminum_wedge: {
    bondStrength: 6, loopHeight: 5, speed: 6,
    currentCapacity: 5, bondCost: 3, oxidationRes: false,
    forPower: false, wireType: "al_32um_wedge",
    bestUse: "automotive_sensor_pkg",
  },
  copper_ball_fab: {
    bondStrength: 8, loopHeight: 7, speed: 8,
    currentCapacity: 6, bondCost: 5, oxidationRes: false,
    forPower: false, wireType: "cu_20um_pd_coat",
    bestUse: "high_volume_consumer_ic",
  },
  ribbon_bond_power: {
    bondStrength: 9, loopHeight: 3, speed: 4,
    currentCapacity: 9, bondCost: 7, oxidationRes: true,
    forPower: true, wireType: "al_ribbon_2mm",
    bestUse: "power_module_intercon",
  },
  heavy_wire_al: {
    bondStrength: 8, loopHeight: 4, speed: 3,
    currentCapacity: 10, bondCost: 4, oxidationRes: false,
    forPower: true, wireType: "al_300um_wedge",
    bestUse: "igbt_die_top_connect",
  },
};

const get = (t: WireBond) => DATA[t];

export const bondStrength = (t: WireBond) => get(t).bondStrength;
export const loopHeight = (t: WireBond) => get(t).loopHeight;
export const speed = (t: WireBond) => get(t).speed;
export const currentCapacity = (t: WireBond) => get(t).currentCapacity;
export const bondCost = (t: WireBond) => get(t).bondCost;
export const oxidationRes = (t: WireBond) => get(t).oxidationRes;
export const forPower = (t: WireBond) => get(t).forPower;
export const wireType = (t: WireBond) => get(t).wireType;
export const bestUse = (t: WireBond) => get(t).bestUse;
export const wireBonds = (): WireBond[] => Object.keys(DATA) as WireBond[];
