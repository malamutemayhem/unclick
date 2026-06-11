export type ConcreteFormType =
  | "plywood_panel_flat_slab"
  | "aluminum_frame_modular"
  | "steel_gang_form_wall"
  | "insulated_concrete_icf"
  | "slip_form_continuous_pour";

interface ConcreteFormData {
  reuses: number;
  speed: number;
  finish_: number;
  versatility: number;
  cfCost: number;
  modular: boolean;
  forWall: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<ConcreteFormType, ConcreteFormData> = {
  plywood_panel_flat_slab: {
    reuses: 3, speed: 5, finish_: 6, versatility: 9, cfCost: 2,
    modular: false, forWall: true,
    material: "plywood_sheet_timber_frame",
    bestUse: "custom_shape_foundation_footing",
  },
  aluminum_frame_modular: {
    reuses: 8, speed: 8, finish_: 8, versatility: 7, cfCost: 7,
    modular: true, forWall: true,
    material: "aluminum_extrusion_panel_system",
    bestUse: "repetitive_slab_wall_high_rise",
  },
  steel_gang_form_wall: {
    reuses: 10, speed: 7, finish_: 9, versatility: 5, cfCost: 9,
    modular: true, forWall: true,
    material: "steel_face_plate_stiffener_rib",
    bestUse: "mass_wall_pour_dam_retaining",
  },
  insulated_concrete_icf: {
    reuses: 1, speed: 6, finish_: 5, versatility: 4, cfCost: 6,
    modular: true, forWall: true,
    material: "eps_foam_block_stay_in_place",
    bestUse: "residential_basement_insulated_wall",
  },
  slip_form_continuous_pour: {
    reuses: 9, speed: 10, finish_: 7, versatility: 3, cfCost: 10,
    modular: false, forWall: true,
    material: "steel_yoke_hydraulic_jack_climb",
    bestUse: "tall_core_silo_chimney_continuous",
  },
};

function get(t: ConcreteFormType): ConcreteFormData {
  return DATA[t];
}

export const reuses = (t: ConcreteFormType) => get(t).reuses;
export const speed = (t: ConcreteFormType) => get(t).speed;
export const finish_ = (t: ConcreteFormType) => get(t).finish_;
export const versatility = (t: ConcreteFormType) => get(t).versatility;
export const cfCost = (t: ConcreteFormType) => get(t).cfCost;
export const modular = (t: ConcreteFormType) => get(t).modular;
export const forWall = (t: ConcreteFormType) => get(t).forWall;
export const material = (t: ConcreteFormType) => get(t).material;
export const bestUse = (t: ConcreteFormType) => get(t).bestUse;
export const concreteFormTypes = (): ConcreteFormType[] =>
  Object.keys(DATA) as ConcreteFormType[];
