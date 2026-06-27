export type AmineTreatType =
  | "mea_primary_amine"
  | "dea_secondary_amine"
  | "mdea_tertiary_selective"
  | "activated_mdea_piperazine"
  | "dga_diglycolamine";

interface AmineTreatData {
  absorption: number;
  selectivity: number;
  loadCapacity: number;
  regenEnergy: number;
  atCost: number;
  selective: boolean;
  forCo2: boolean;
  solvent: string;
  bestUse: string;
}

const DATA: Record<AmineTreatType, AmineTreatData> = {
  mea_primary_amine: {
    absorption: 9, selectivity: 3, loadCapacity: 5, regenEnergy: 3, atCost: 4,
    selective: false, forCo2: true,
    solvent: "monoethanolamine_15_30_wt_aqueous",
    bestUse: "post_combustion_co2_capture_flue_gas",
  },
  dea_secondary_amine: {
    absorption: 8, selectivity: 4, loadCapacity: 6, regenEnergy: 5, atCost: 5,
    selective: false, forCo2: true,
    solvent: "diethanolamine_25_35_wt_refinery",
    bestUse: "refinery_gas_treat_co2_h2s_remove",
  },
  mdea_tertiary_selective: {
    absorption: 6, selectivity: 10, loadCapacity: 8, regenEnergy: 8, atCost: 6,
    selective: true, forCo2: false,
    solvent: "methyldiethanolamine_40_50_wt_select",
    bestUse: "natural_gas_h2s_selective_co2_slip",
  },
  activated_mdea_piperazine: {
    absorption: 9, selectivity: 8, loadCapacity: 9, regenEnergy: 7, atCost: 8,
    selective: true, forCo2: true,
    solvent: "mdea_piperazine_blend_fast_activate",
    bestUse: "lng_plant_deep_co2_h2s_remove_spec",
  },
  dga_diglycolamine: {
    absorption: 9, selectivity: 4, loadCapacity: 7, regenEnergy: 4, atCost: 7,
    selective: false, forCo2: true,
    solvent: "diglycolamine_50_60_wt_low_freeze",
    bestUse: "offshore_cold_climate_low_freeze_point",
  },
};

function get(t: AmineTreatType): AmineTreatData {
  return DATA[t];
}

export const absorption = (t: AmineTreatType) => get(t).absorption;
export const selectivity = (t: AmineTreatType) => get(t).selectivity;
export const loadCapacity = (t: AmineTreatType) => get(t).loadCapacity;
export const regenEnergy = (t: AmineTreatType) => get(t).regenEnergy;
export const atCost = (t: AmineTreatType) => get(t).atCost;
export const selective = (t: AmineTreatType) => get(t).selective;
export const forCo2 = (t: AmineTreatType) => get(t).forCo2;
export const solvent = (t: AmineTreatType) => get(t).solvent;
export const bestUse = (t: AmineTreatType) => get(t).bestUse;
export const amineTreatTypes = (): AmineTreatType[] =>
  Object.keys(DATA) as AmineTreatType[];
