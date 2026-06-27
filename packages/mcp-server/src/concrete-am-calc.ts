export type ConcreteAmType =
  | "gantry_extrusion_large"
  | "robotic_arm_contour"
  | "shotcrete_spray_3d"
  | "binder_jet_sand_mold"
  | "particle_bed_selective";

interface ConcreteAmData {
  buildVolume: number;
  speed: number;
  precision: number;
  strength: number;
  caCost: number;
  reinforced: boolean;
  forHousing: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<ConcreteAmType, ConcreteAmData> = {
  gantry_extrusion_large: {
    buildVolume: 10, speed: 8, precision: 6, strength: 8, caCost: 7,
    reinforced: false, forHousing: true,
    material: "fiber_reinforced_mortar_mix",
    bestUse: "house_wall_barracks_shelter",
  },
  robotic_arm_contour: {
    buildVolume: 7, speed: 7, precision: 9, strength: 8, caCost: 8,
    reinforced: true, forHousing: true,
    material: "geopolymer_printable_concrete",
    bestUse: "curved_wall_facade_furniture",
  },
  shotcrete_spray_3d: {
    buildVolume: 8, speed: 9, precision: 5, strength: 9, caCost: 6,
    reinforced: true, forHousing: false,
    material: "sprayed_concrete_steel_fiber",
    bestUse: "tunnel_lining_retaining_wall",
  },
  binder_jet_sand_mold: {
    buildVolume: 6, speed: 10, precision: 9, strength: 5, caCost: 5,
    reinforced: false, forHousing: false,
    material: "furan_binder_silica_sand",
    bestUse: "foundry_mold_core_sand_casting",
  },
  particle_bed_selective: {
    buildVolume: 5, speed: 5, precision: 10, strength: 7, caCost: 9,
    reinforced: false, forHousing: false,
    material: "calcium_aluminate_cement_powder",
    bestUse: "architectural_sculpture_detail",
  },
};

function get(t: ConcreteAmType): ConcreteAmData {
  return DATA[t];
}

export const buildVolume = (t: ConcreteAmType) => get(t).buildVolume;
export const speed = (t: ConcreteAmType) => get(t).speed;
export const precision = (t: ConcreteAmType) => get(t).precision;
export const strength = (t: ConcreteAmType) => get(t).strength;
export const caCost = (t: ConcreteAmType) => get(t).caCost;
export const reinforced = (t: ConcreteAmType) => get(t).reinforced;
export const forHousing = (t: ConcreteAmType) => get(t).forHousing;
export const material = (t: ConcreteAmType) => get(t).material;
export const bestUse = (t: ConcreteAmType) => get(t).bestUse;
export const concreteAmTypes = (): ConcreteAmType[] =>
  Object.keys(DATA) as ConcreteAmType[];
