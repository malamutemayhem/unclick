export type AerationSystemType =
  | "fine_bubble_diffuser"
  | "coarse_bubble_diffuser"
  | "surface_mechanical"
  | "jet_aeration"
  | "membrane_aeration";

interface AerationSystemData {
  oxygenTransfer: number;
  energyEfficiency: number;
  mixing: number;
  maintenance: number;
  asCost_: number;
  submerged: boolean;
  forDeepTank: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<AerationSystemType, AerationSystemData> = {
  fine_bubble_diffuser: {
    oxygenTransfer: 10, energyEfficiency: 10, mixing: 5, maintenance: 6, asCost_: 6,
    submerged: true, forDeepTank: true,
    mechanism: "ceramic_or_membrane_disc_1_3mm_bubble_floor_mount",
    bestUse: "activated_sludge_basin_municipal_wastewater_treat",
  },
  coarse_bubble_diffuser: {
    oxygenTransfer: 5, energyEfficiency: 5, mixing: 9, maintenance: 8, asCost_: 4,
    submerged: true, forDeepTank: false,
    mechanism: "perforated_pipe_or_disc_3_50mm_bubble_high_mixing",
    bestUse: "grit_chamber_channel_aeration_equalization_mixing",
  },
  surface_mechanical: {
    oxygenTransfer: 7, energyEfficiency: 6, mixing: 8, maintenance: 7, asCost_: 5,
    submerged: false, forDeepTank: false,
    mechanism: "floating_or_fixed_impeller_splash_surface_entrain",
    bestUse: "oxidation_ditch_lagoon_pond_aeration_low_depth",
  },
  jet_aeration: {
    oxygenTransfer: 8, energyEfficiency: 7, mixing: 10, maintenance: 7, asCost_: 7,
    submerged: true, forDeepTank: true,
    mechanism: "liquid_jet_pump_venturi_air_entrainment_shear_mix",
    bestUse: "industrial_wastewater_high_strength_deep_tank_mix",
  },
  membrane_aeration: {
    oxygenTransfer: 9, energyEfficiency: 9, mixing: 4, maintenance: 5, asCost_: 9,
    submerged: true, forDeepTank: true,
    mechanism: "hollow_fiber_membrane_gas_transfer_bubble_free",
    bestUse: "nitrification_upgrade_energy_saving_retrofit_mabr",
  },
};

function get(t: AerationSystemType): AerationSystemData {
  return DATA[t];
}

export const oxygenTransfer = (t: AerationSystemType) => get(t).oxygenTransfer;
export const energyEfficiency = (t: AerationSystemType) => get(t).energyEfficiency;
export const mixing = (t: AerationSystemType) => get(t).mixing;
export const maintenance = (t: AerationSystemType) => get(t).maintenance;
export const asCost_ = (t: AerationSystemType) => get(t).asCost_;
export const submerged = (t: AerationSystemType) => get(t).submerged;
export const forDeepTank = (t: AerationSystemType) => get(t).forDeepTank;
export const mechanism = (t: AerationSystemType) => get(t).mechanism;
export const bestUse = (t: AerationSystemType) => get(t).bestUse;
export const aerationSystemTypes = (): AerationSystemType[] =>
  Object.keys(DATA) as AerationSystemType[];
