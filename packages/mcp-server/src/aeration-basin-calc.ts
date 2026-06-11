export type AerationBasinType =
  | "fine_bubble"
  | "coarse_bubble"
  | "surface_aerator"
  | "jet_aerator"
  | "membrane_diffuser";

interface AerationBasinData {
  oxygenTransfer: number;
  throughput: number;
  energyEfficiency: number;
  mixingQuality: number;
  abCost: number;
  submerged: boolean;
  forHighBod: boolean;
  basinConfig: string;
  bestUse: string;
}

const DATA: Record<AerationBasinType, AerationBasinData> = {
  fine_bubble: {
    oxygenTransfer: 10, throughput: 8, energyEfficiency: 10, mixingQuality: 7, abCost: 7,
    submerged: true, forHighBod: true,
    basinConfig: "fine_bubble_aeration_basin_diffuser_grid_floor_small_bubble_o2",
    bestUse: "municipal_wastewater_fine_bubble_aeration_activated_sludge_bod",
  },
  coarse_bubble: {
    oxygenTransfer: 6, throughput: 9, energyEfficiency: 5, mixingQuality: 10, abCost: 4,
    submerged: true, forHighBod: false,
    basinConfig: "coarse_bubble_aeration_basin_large_orifice_diffuser_mix_strip",
    bestUse: "industrial_pretreat_coarse_bubble_aeration_mixing_stripping",
  },
  surface_aerator: {
    oxygenTransfer: 7, throughput: 8, energyEfficiency: 6, mixingQuality: 9, abCost: 5,
    submerged: false, forHighBod: true,
    basinConfig: "surface_aerator_basin_mechanical_impeller_splash_entrain_air",
    bestUse: "lagoon_pond_surface_aerator_mechanical_splash_oxygen_transfer",
  },
  jet_aerator: {
    oxygenTransfer: 9, throughput: 7, energyEfficiency: 8, mixingQuality: 9, abCost: 8,
    submerged: true, forHighBod: true,
    basinConfig: "jet_aerator_basin_pump_nozzle_entrain_air_mix_deep_tank_o2",
    bestUse: "deep_tank_jet_aeration_basin_high_oxygen_demand_industrial",
  },
  membrane_diffuser: {
    oxygenTransfer: 10, throughput: 8, energyEfficiency: 9, mixingQuality: 7, abCost: 9,
    submerged: true, forHighBod: true,
    basinConfig: "membrane_diffuser_aeration_epdm_silicone_fine_pore_uniform_o2",
    bestUse: "advanced_wastewater_membrane_diffuser_aeration_energy_optimize",
  },
};

function get(t: AerationBasinType): AerationBasinData {
  return DATA[t];
}

export const oxygenTransfer = (t: AerationBasinType) => get(t).oxygenTransfer;
export const throughput = (t: AerationBasinType) => get(t).throughput;
export const energyEfficiency = (t: AerationBasinType) => get(t).energyEfficiency;
export const mixingQuality = (t: AerationBasinType) => get(t).mixingQuality;
export const abCost = (t: AerationBasinType) => get(t).abCost;
export const submerged = (t: AerationBasinType) => get(t).submerged;
export const forHighBod = (t: AerationBasinType) => get(t).forHighBod;
export const basinConfig = (t: AerationBasinType) => get(t).basinConfig;
export const bestUse = (t: AerationBasinType) => get(t).bestUse;
export const aerationBasinTypes = (): AerationBasinType[] =>
  Object.keys(DATA) as AerationBasinType[];
