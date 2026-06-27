export type BondingWire =
  | "gold_ball_bond"
  | "copper_ball_bond"
  | "aluminum_wedge"
  | "silver_alloy"
  | "ribbon_power";

const DATA: Record<BondingWire, {
  conductivity: number; bondStrength: number; loopHeight: number;
  speed: number; bwCost: number; oxidationResist: boolean;
  forPower: boolean; material: string; bestUse: string;
}> = {
  gold_ball_bond: {
    conductivity: 8, bondStrength: 9, loopHeight: 8,
    speed: 9, bwCost: 9, oxidationResist: true,
    forPower: false, material: "4n_au_25um_fab",
    bestUse: "high_reliability_sensor",
  },
  copper_ball_bond: {
    conductivity: 10, bondStrength: 8, loopHeight: 7,
    speed: 8, bwCost: 3, oxidationResist: false,
    forPower: false, material: "4n_cu_20um_palladium_coat",
    bestUse: "high_volume_consumer",
  },
  aluminum_wedge: {
    conductivity: 7, bondStrength: 7, loopHeight: 5,
    speed: 6, bwCost: 2, oxidationResist: true,
    forPower: true, material: "al_1pct_si_32um",
    bestUse: "power_module_thick_wire",
  },
  silver_alloy: {
    conductivity: 9, bondStrength: 8, loopHeight: 8,
    speed: 8, bwCost: 5, oxidationResist: true,
    forPower: false, material: "ag_alloy_pd_doped",
    bestUse: "led_package_reflective",
  },
  ribbon_power: {
    conductivity: 9, bondStrength: 9, loopHeight: 3,
    speed: 5, bwCost: 6, oxidationResist: true,
    forPower: true, material: "al_ribbon_2mm_wide",
    bestUse: "igbt_high_current_bus",
  },
};

const get = (t: BondingWire) => DATA[t];

export const conductivity = (t: BondingWire) => get(t).conductivity;
export const bondStrength = (t: BondingWire) => get(t).bondStrength;
export const loopHeight = (t: BondingWire) => get(t).loopHeight;
export const speed = (t: BondingWire) => get(t).speed;
export const bwCost = (t: BondingWire) => get(t).bwCost;
export const oxidationResist = (t: BondingWire) => get(t).oxidationResist;
export const forPower = (t: BondingWire) => get(t).forPower;
export const material = (t: BondingWire) => get(t).material;
export const bestUse = (t: BondingWire) => get(t).bestUse;
export const bondingWires = (): BondingWire[] => Object.keys(DATA) as BondingWire[];
