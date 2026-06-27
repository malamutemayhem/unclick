export type AgitatorType =
  | "propeller_axial_flow"
  | "turbine_radial_rushton"
  | "anchor_gate_close_clearance"
  | "helical_ribbon_viscous"
  | "magnetic_drive_sealed";

interface AgitatorData {
  mixing: number;
  viscosity: number;
  shear: number;
  power: number;
  agCost: number;
  sealed: boolean;
  forViscous: boolean;
  impeller: string;
  bestUse: string;
}

const DATA: Record<AgitatorType, AgitatorData> = {
  propeller_axial_flow: {
    mixing: 8, viscosity: 4, shear: 5, power: 5, agCost: 3,
    sealed: false, forViscous: false,
    impeller: "marine_propeller_axial_down",
    bestUse: "blending_suspension_low_viscosity",
  },
  turbine_radial_rushton: {
    mixing: 9, viscosity: 6, shear: 9, power: 8, agCost: 5,
    sealed: false, forViscous: false,
    impeller: "flat_blade_disc_radial_flow",
    bestUse: "gas_dispersion_emulsion_reaction",
  },
  anchor_gate_close_clearance: {
    mixing: 6, viscosity: 8, shear: 4, power: 7, agCost: 6,
    sealed: false, forViscous: true,
    impeller: "anchor_frame_wall_scraping",
    bestUse: "paste_polymer_heat_transfer_wall",
  },
  helical_ribbon_viscous: {
    mixing: 7, viscosity: 10, shear: 3, power: 9, agCost: 8,
    sealed: false, forViscous: true,
    impeller: "helical_ribbon_close_barrel",
    bestUse: "high_viscosity_adhesive_food_paste",
  },
  magnetic_drive_sealed: {
    mixing: 7, viscosity: 5, shear: 6, power: 6, agCost: 9,
    sealed: true, forViscous: false,
    impeller: "magnetic_coupled_no_shaft_seal",
    bestUse: "sterile_pharma_hazardous_no_leak",
  },
};

function get(t: AgitatorType): AgitatorData {
  return DATA[t];
}

export const mixing = (t: AgitatorType) => get(t).mixing;
export const viscosity = (t: AgitatorType) => get(t).viscosity;
export const shear = (t: AgitatorType) => get(t).shear;
export const power = (t: AgitatorType) => get(t).power;
export const agCost = (t: AgitatorType) => get(t).agCost;
export const sealed = (t: AgitatorType) => get(t).sealed;
export const forViscous = (t: AgitatorType) => get(t).forViscous;
export const impeller = (t: AgitatorType) => get(t).impeller;
export const bestUse = (t: AgitatorType) => get(t).bestUse;
export const agitatorTypes = (): AgitatorType[] =>
  Object.keys(DATA) as AgitatorType[];
