export type SolidStateWeldType =
  | "friction_stir_plate"
  | "ultrasonic_thin_sheet"
  | "diffusion_bond_aero"
  | "explosion_clad_plate"
  | "cold_pressure_wire";

interface SolidStateWeldData {
  strength: number;
  precision: number;
  heatInput: number;
  versatility: number;
  swCost: number;
  noMelt: boolean;
  forDissimilar: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<SolidStateWeldType, SolidStateWeldData> = {
  friction_stir_plate: {
    strength: 9, precision: 8, heatInput: 5, versatility: 7, swCost: 8,
    noMelt: true, forDissimilar: true,
    mechanism: "rotating_pin_shoulder_plasticize",
    bestUse: "aluminum_plate_aerospace_ship_panel",
  },
  ultrasonic_thin_sheet: {
    strength: 7, precision: 9, heatInput: 2, versatility: 6, swCost: 7,
    noMelt: true, forDissimilar: true,
    mechanism: "high_freq_vibration_scrub_bond",
    bestUse: "battery_tab_wire_harness_foil",
  },
  diffusion_bond_aero: {
    strength: 10, precision: 10, heatInput: 7, versatility: 5, swCost: 10,
    noMelt: true, forDissimilar: true,
    mechanism: "temp_pressure_time_atom_migrate",
    bestUse: "titanium_honeycomb_aero_structure",
  },
  explosion_clad_plate: {
    strength: 9, precision: 4, heatInput: 3, versatility: 4, swCost: 6,
    noMelt: true, forDissimilar: true,
    mechanism: "detonation_wave_jet_surface_bond",
    bestUse: "clad_plate_vessel_transition_joint",
  },
  cold_pressure_wire: {
    strength: 6, precision: 7, heatInput: 1, versatility: 3, swCost: 4,
    noMelt: true, forDissimilar: false,
    mechanism: "high_pressure_die_plastic_deform",
    bestUse: "copper_aluminum_wire_butt_splice",
  },
};

function get(t: SolidStateWeldType): SolidStateWeldData {
  return DATA[t];
}

export const strength = (t: SolidStateWeldType) => get(t).strength;
export const precision = (t: SolidStateWeldType) => get(t).precision;
export const heatInput = (t: SolidStateWeldType) => get(t).heatInput;
export const versatility = (t: SolidStateWeldType) => get(t).versatility;
export const swCost = (t: SolidStateWeldType) => get(t).swCost;
export const noMelt = (t: SolidStateWeldType) => get(t).noMelt;
export const forDissimilar = (t: SolidStateWeldType) => get(t).forDissimilar;
export const mechanism = (t: SolidStateWeldType) => get(t).mechanism;
export const bestUse = (t: SolidStateWeldType) => get(t).bestUse;
export const solidStateWeldTypes = (): SolidStateWeldType[] =>
  Object.keys(DATA) as SolidStateWeldType[];
