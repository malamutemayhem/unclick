export type AerationType =
  | "fine_bubble_diffuser"
  | "coarse_bubble_diffuser"
  | "surface_mechanical_aerator"
  | "jet_aerator_mixing"
  | "membrane_disc_epdm";

interface AerationData {
  transfer: number;
  efficiency: number;
  mixing: number;
  maintenance: number;
  aeCost: number;
  submerged: boolean;
  forDeepTank: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<AerationType, AerationData> = {
  fine_bubble_diffuser: {
    transfer: 10, efficiency: 10, mixing: 6, maintenance: 6, aeCost: 7,
    submerged: true, forDeepTank: true,
    element: "epdm_membrane_disc_grid_floor",
    bestUse: "activated_sludge_aeration_basin",
  },
  coarse_bubble_diffuser: {
    transfer: 5, efficiency: 5, mixing: 9, maintenance: 9, aeCost: 4,
    submerged: true, forDeepTank: true,
    element: "stainless_tube_non_clog_orifice",
    bestUse: "equalization_tank_grit_chamber",
  },
  surface_mechanical_aerator: {
    transfer: 7, efficiency: 6, mixing: 10, maintenance: 7, aeCost: 6,
    submerged: false, forDeepTank: false,
    element: "impeller_float_surface_splash",
    bestUse: "lagoon_pond_oxidation_ditch",
  },
  jet_aerator_mixing: {
    transfer: 8, efficiency: 8, mixing: 10, maintenance: 7, aeCost: 8,
    submerged: true, forDeepTank: true,
    element: "nozzle_jet_pump_venturi_mix",
    bestUse: "sbr_deep_tank_high_strength",
  },
  membrane_disc_epdm: {
    transfer: 9, efficiency: 9, mixing: 7, maintenance: 5, aeCost: 6,
    submerged: true, forDeepTank: true,
    element: "epdm_disc_9in_replaceable",
    bestUse: "municipal_wwtp_fine_bubble_grid",
  },
};

function get(t: AerationType): AerationData {
  return DATA[t];
}

export const transfer = (t: AerationType) => get(t).transfer;
export const efficiency = (t: AerationType) => get(t).efficiency;
export const mixing = (t: AerationType) => get(t).mixing;
export const maintenance = (t: AerationType) => get(t).maintenance;
export const aeCost = (t: AerationType) => get(t).aeCost;
export const submerged = (t: AerationType) => get(t).submerged;
export const forDeepTank = (t: AerationType) => get(t).forDeepTank;
export const element = (t: AerationType) => get(t).element;
export const bestUse = (t: AerationType) => get(t).bestUse;
export const aerationTypes = (): AerationType[] =>
  Object.keys(DATA) as AerationType[];
