export type PelletizeType =
  | "disc_pelletizer_balling"
  | "drum_pelletizer_rotary"
  | "extrusion_pellet_die"
  | "spray_congeal_prilling"
  | "fluid_bed_pellet_coat";

interface PelletizeData {
  uniformity: number;
  throughput: number;
  strength: number;
  sizeControl: number;
  plCost: number;
  continuous: boolean;
  forIronOre: boolean;
  binder: string;
  bestUse: string;
}

const DATA: Record<PelletizeType, PelletizeData> = {
  disc_pelletizer_balling: {
    uniformity: 9, throughput: 7, strength: 8, sizeControl: 9, plCost: 6,
    continuous: true, forIronOre: true,
    binder: "bentonite_water_nucleation_disc",
    bestUse: "iron_ore_pellet_blast_furnace",
  },
  drum_pelletizer_rotary: {
    uniformity: 7, throughput: 10, strength: 7, sizeControl: 6, plCost: 5,
    continuous: true, forIronOre: true,
    binder: "bentonite_limestone_drum_tumble",
    bestUse: "fertilizer_iron_ore_high_tonnage",
  },
  extrusion_pellet_die: {
    uniformity: 10, throughput: 8, strength: 9, sizeControl: 10, plCost: 7,
    continuous: true, forIronOre: false,
    binder: "starch_cellulose_wet_mass_extrude",
    bestUse: "pharma_catalyst_feed_pellet_uniform",
  },
  spray_congeal_prilling: {
    uniformity: 8, throughput: 9, strength: 5, sizeControl: 7, plCost: 6,
    continuous: true, forIronOre: false,
    binder: "melt_spray_solidify_droplet_tower",
    bestUse: "urea_ammonium_nitrate_wax_prill",
  },
  fluid_bed_pellet_coat: {
    uniformity: 10, throughput: 5, strength: 8, sizeControl: 10, plCost: 9,
    continuous: false, forIronOre: false,
    binder: "polymer_solution_spray_layer_coat",
    bestUse: "pharma_controlled_release_coated",
  },
};

function get(t: PelletizeType): PelletizeData {
  return DATA[t];
}

export const uniformity = (t: PelletizeType) => get(t).uniformity;
export const throughput = (t: PelletizeType) => get(t).throughput;
export const strength = (t: PelletizeType) => get(t).strength;
export const sizeControl = (t: PelletizeType) => get(t).sizeControl;
export const plCost = (t: PelletizeType) => get(t).plCost;
export const continuous = (t: PelletizeType) => get(t).continuous;
export const forIronOre = (t: PelletizeType) => get(t).forIronOre;
export const binder = (t: PelletizeType) => get(t).binder;
export const bestUse = (t: PelletizeType) => get(t).bestUse;
export const pelletizeTypes = (): PelletizeType[] =>
  Object.keys(DATA) as PelletizeType[];
