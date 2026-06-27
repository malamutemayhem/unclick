export type PneumaticToolType =
  | "impact_wrench_socket"
  | "die_grinder_rotary"
  | "air_hammer_chisel"
  | "orbital_sander_palm"
  | "rivet_gun_bucking";

interface PneumaticToolData {
  power: number;
  speed: number;
  weight: number;
  durability: number;
  ptCost: number;
  rotary: boolean;
  forAssembly: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<PneumaticToolType, PneumaticToolData> = {
  impact_wrench_socket: {
    power: 9, speed: 8, weight: 6, durability: 9, ptCost: 7,
    rotary: true, forAssembly: true,
    drive: "anvil_square_socket_impact",
    bestUse: "bolt_torque_lug_nut_assembly",
  },
  die_grinder_rotary: {
    power: 6, speed: 10, weight: 4, durability: 8, ptCost: 5,
    rotary: true, forAssembly: false,
    drive: "collet_chuck_rotary_burr",
    bestUse: "deburr_polish_port_grind_weld",
  },
  air_hammer_chisel: {
    power: 10, speed: 6, weight: 7, durability: 9, ptCost: 6,
    rotary: false, forAssembly: false,
    drive: "piston_reciprocate_chisel_bit",
    bestUse: "rivet_cut_chip_scale_break",
  },
  orbital_sander_palm: {
    power: 4, speed: 9, weight: 3, durability: 7, ptCost: 4,
    rotary: true, forAssembly: false,
    drive: "eccentric_orbit_pad_velcro",
    bestUse: "surface_prep_finish_sand_smooth",
  },
  rivet_gun_bucking: {
    power: 8, speed: 7, weight: 5, durability: 9, ptCost: 6,
    rotary: false, forAssembly: true,
    drive: "piston_set_rivet_buck_bar",
    bestUse: "aircraft_rivet_sheet_metal_join",
  },
};

function get(t: PneumaticToolType): PneumaticToolData {
  return DATA[t];
}

export const power = (t: PneumaticToolType) => get(t).power;
export const speed = (t: PneumaticToolType) => get(t).speed;
export const weight = (t: PneumaticToolType) => get(t).weight;
export const durability = (t: PneumaticToolType) => get(t).durability;
export const ptCost = (t: PneumaticToolType) => get(t).ptCost;
export const rotary = (t: PneumaticToolType) => get(t).rotary;
export const forAssembly = (t: PneumaticToolType) => get(t).forAssembly;
export const drive = (t: PneumaticToolType) => get(t).drive;
export const bestUse = (t: PneumaticToolType) => get(t).bestUse;
export const pneumaticToolTypes = (): PneumaticToolType[] =>
  Object.keys(DATA) as PneumaticToolType[];
