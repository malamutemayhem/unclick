export type AeratorSystemType =
  | "fine_bubble_diffuser"
  | "coarse_bubble_diffuser"
  | "mechanical_surface"
  | "jet_aerator_nozzle"
  | "membrane_disc_tube";

interface AeratorSystemData {
  oxygenTransfer: number;
  energyEff: number;
  mixing: number;
  maintenance: number;
  asCost: number;
  submerged: boolean;
  forDeepTank: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<AeratorSystemType, AeratorSystemData> = {
  fine_bubble_diffuser: {
    oxygenTransfer: 10, energyEff: 10, mixing: 5, maintenance: 6, asCost: 7,
    submerged: true, forDeepTank: true,
    element: "epdm_membrane_disc_fine_pore_2mm_bubble",
    bestUse: "activated_sludge_deep_tank_energy_efficient",
  },
  coarse_bubble_diffuser: {
    oxygenTransfer: 5, energyEff: 5, mixing: 9, maintenance: 9, asCost: 4,
    submerged: true, forDeepTank: false,
    element: "stainless_shear_cap_large_orifice_coarse",
    bestUse: "channel_mixing_grit_aeration_sludge_holding",
  },
  mechanical_surface: {
    oxygenTransfer: 7, energyEff: 6, mixing: 10, maintenance: 7, asCost: 5,
    submerged: false, forDeepTank: false,
    element: "rotating_brush_disc_surface_splash_turbine",
    bestUse: "oxidation_ditch_lagoon_surface_splash_aerate",
  },
  jet_aerator_nozzle: {
    oxygenTransfer: 8, energyEff: 7, mixing: 8, maintenance: 8, asCost: 6,
    submerged: true, forDeepTank: true,
    element: "liquid_jet_nozzle_entrained_air_venturi_mix",
    bestUse: "industrial_wastewater_high_strength_equalize",
  },
  membrane_disc_tube: {
    oxygenTransfer: 10, energyEff: 9, mixing: 5, maintenance: 5, asCost: 8,
    submerged: true, forDeepTank: true,
    element: "ptfe_coated_membrane_tube_fine_pore_ceramic",
    bestUse: "high_purity_oxygen_pharma_food_process_water",
  },
};

function get(t: AeratorSystemType): AeratorSystemData {
  return DATA[t];
}

export const oxygenTransfer = (t: AeratorSystemType) => get(t).oxygenTransfer;
export const energyEff = (t: AeratorSystemType) => get(t).energyEff;
export const mixing = (t: AeratorSystemType) => get(t).mixing;
export const maintenance = (t: AeratorSystemType) => get(t).maintenance;
export const asCost = (t: AeratorSystemType) => get(t).asCost;
export const submerged = (t: AeratorSystemType) => get(t).submerged;
export const forDeepTank = (t: AeratorSystemType) => get(t).forDeepTank;
export const element = (t: AeratorSystemType) => get(t).element;
export const bestUse = (t: AeratorSystemType) => get(t).bestUse;
export const aeratorSystemTypes = (): AeratorSystemType[] =>
  Object.keys(DATA) as AeratorSystemType[];
