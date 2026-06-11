export type FenderType =
  | "cylindrical_rubber_extruded"
  | "cell_fender_buckling_rubber"
  | "cone_fender_super_cone"
  | "pneumatic_yokohama_floating"
  | "foam_filled_polyurethane";

interface FenderData {
  energy: number;
  reaction: number;
  durability: number;
  deflection: number;
  fdCost: number;
  floating: boolean;
  forBerth: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<FenderType, FenderData> = {
  cylindrical_rubber_extruded: {
    energy: 4, reaction: 5, durability: 7, deflection: 5, fdCost: 2,
    floating: false, forBerth: true,
    material: "extruded_rubber_hollow_cylinder",
    bestUse: "small_berth_tug_workboat_pier",
  },
  cell_fender_buckling_rubber: {
    energy: 8, reaction: 7, durability: 9, deflection: 8, fdCost: 6,
    floating: false, forBerth: true,
    material: "molded_rubber_cell_buckling_design",
    bestUse: "container_terminal_heavy_berth",
  },
  cone_fender_super_cone: {
    energy: 9, reaction: 6, durability: 9, deflection: 9, fdCost: 7,
    floating: false, forBerth: true,
    material: "molded_rubber_cone_low_reaction",
    bestUse: "bulk_tanker_berth_high_energy",
  },
  pneumatic_yokohama_floating: {
    energy: 7, reaction: 4, durability: 6, deflection: 10, fdCost: 5,
    floating: true, forBerth: false,
    material: "rubber_air_filled_chain_tire_net",
    bestUse: "ship_to_ship_transfer_offshore",
  },
  foam_filled_polyurethane: {
    energy: 7, reaction: 5, durability: 10, deflection: 7, fdCost: 8,
    floating: true, forBerth: false,
    material: "polyurethane_skin_closed_cell_foam",
    bestUse: "unsinkable_floating_dock_sts",
  },
};

function get(t: FenderType): FenderData {
  return DATA[t];
}

export const energy = (t: FenderType) => get(t).energy;
export const reaction = (t: FenderType) => get(t).reaction;
export const durability = (t: FenderType) => get(t).durability;
export const deflection = (t: FenderType) => get(t).deflection;
export const fdCost = (t: FenderType) => get(t).fdCost;
export const floating = (t: FenderType) => get(t).floating;
export const forBerth = (t: FenderType) => get(t).forBerth;
export const material = (t: FenderType) => get(t).material;
export const bestUse = (t: FenderType) => get(t).bestUse;
export const fenderTypes = (): FenderType[] =>
  Object.keys(DATA) as FenderType[];
