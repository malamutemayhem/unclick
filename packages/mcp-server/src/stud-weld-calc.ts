export type StudWeldType =
  | "headed_shear_stud_composite"
  | "threaded_stud_projection"
  | "deformed_bar_anchor_rebar"
  | "insulation_pin_cd_weld"
  | "arc_stud_drawn_arc_large";

interface StudWeldData {
  shear: number;
  tensile: number;
  speed: number;
  versatility: number;
  swCost: number;
  automatic: boolean;
  forComposite: boolean;
  process: string;
  bestUse: string;
}

const DATA: Record<StudWeldType, StudWeldData> = {
  headed_shear_stud_composite: {
    shear: 10, tensile: 7, speed: 9, versatility: 5, swCost: 5,
    automatic: true, forComposite: true,
    process: "drawn_arc_ceramic_ferrule_shield",
    bestUse: "composite_beam_deck_shear_connect",
  },
  threaded_stud_projection: {
    shear: 6, tensile: 8, speed: 8, versatility: 8, swCost: 4,
    automatic: true, forComposite: false,
    process: "capacitor_discharge_cd_rapid",
    bestUse: "equipment_mount_threaded_attach",
  },
  deformed_bar_anchor_rebar: {
    shear: 9, tensile: 9, speed: 6, versatility: 4, swCost: 6,
    automatic: false, forComposite: true,
    process: "arc_weld_deformed_bar_embed",
    bestUse: "steel_concrete_hybrid_wall_anchor",
  },
  insulation_pin_cd_weld: {
    shear: 2, tensile: 3, speed: 10, versatility: 3, swCost: 2,
    automatic: true, forComposite: false,
    process: "capacitor_discharge_thin_pin",
    bestUse: "duct_wrap_insulation_pin_attach",
  },
  arc_stud_drawn_arc_large: {
    shear: 8, tensile: 8, speed: 7, versatility: 7, swCost: 7,
    automatic: true, forComposite: false,
    process: "drawn_arc_gas_shield_large_dia",
    bestUse: "heavy_plate_stiffener_attachment",
  },
};

function get(t: StudWeldType): StudWeldData {
  return DATA[t];
}

export const shear = (t: StudWeldType) => get(t).shear;
export const tensile = (t: StudWeldType) => get(t).tensile;
export const speed = (t: StudWeldType) => get(t).speed;
export const versatility = (t: StudWeldType) => get(t).versatility;
export const swCost = (t: StudWeldType) => get(t).swCost;
export const automatic = (t: StudWeldType) => get(t).automatic;
export const forComposite = (t: StudWeldType) => get(t).forComposite;
export const process = (t: StudWeldType) => get(t).process;
export const bestUse = (t: StudWeldType) => get(t).bestUse;
export const studWeldTypes = (): StudWeldType[] =>
  Object.keys(DATA) as StudWeldType[];
