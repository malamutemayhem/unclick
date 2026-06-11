export type AgitatorTankType =
  | "turbine_impeller_radial"
  | "hydrofoil_axial_flow"
  | "anchor_paddle_viscous"
  | "high_shear_rotor_stator"
  | "gas_sparged_self_aspir";

interface AgitatorTankData {
  mixIntensity: number;
  pumpingRate: number;
  shearLevel: number;
  scalability: number;
  atCost: number;
  topEntry: boolean;
  forViscous: boolean;
  impeller: string;
  bestUse: string;
}

const DATA: Record<AgitatorTankType, AgitatorTankData> = {
  turbine_impeller_radial: {
    mixIntensity: 8, pumpingRate: 7, shearLevel: 7, scalability: 8, atCost: 5,
    topEntry: true, forViscous: false,
    impeller: "rushton_turbine_flat_blade_radial_flow",
    bestUse: "general_chemical_reaction_gas_disperse",
  },
  hydrofoil_axial_flow: {
    mixIntensity: 6, pumpingRate: 10, shearLevel: 4, scalability: 9, atCost: 5,
    topEntry: true, forViscous: false,
    impeller: "hydrofoil_pitched_blade_axial_pump",
    bestUse: "solid_suspension_blend_large_tank_bulk",
  },
  anchor_paddle_viscous: {
    mixIntensity: 5, pumpingRate: 4, shearLevel: 3, scalability: 5, atCost: 6,
    topEntry: true, forViscous: true,
    impeller: "anchor_gate_close_clearance_wall_scrape",
    bestUse: "high_viscosity_polymer_paste_wall_heat",
  },
  high_shear_rotor_stator: {
    mixIntensity: 10, pumpingRate: 3, shearLevel: 10, scalability: 4, atCost: 7,
    topEntry: true, forViscous: false,
    impeller: "rotor_stator_high_tip_speed_emulsify",
    bestUse: "emulsion_disperse_droplet_reduce_cream",
  },
  gas_sparged_self_aspir: {
    mixIntensity: 7, pumpingRate: 6, shearLevel: 6, scalability: 7, atCost: 6,
    topEntry: true, forViscous: false,
    impeller: "self_aspirating_hollow_shaft_gas_draw",
    bestUse: "fermentation_bioreactor_oxygen_transfer",
  },
};

function get(t: AgitatorTankType): AgitatorTankData {
  return DATA[t];
}

export const mixIntensity = (t: AgitatorTankType) => get(t).mixIntensity;
export const pumpingRate = (t: AgitatorTankType) => get(t).pumpingRate;
export const shearLevel = (t: AgitatorTankType) => get(t).shearLevel;
export const scalability = (t: AgitatorTankType) => get(t).scalability;
export const atCost = (t: AgitatorTankType) => get(t).atCost;
export const topEntry = (t: AgitatorTankType) => get(t).topEntry;
export const forViscous = (t: AgitatorTankType) => get(t).forViscous;
export const impeller = (t: AgitatorTankType) => get(t).impeller;
export const bestUse = (t: AgitatorTankType) => get(t).bestUse;
export const agitatorTankTypes = (): AgitatorTankType[] =>
  Object.keys(DATA) as AgitatorTankType[];
