export type ActivatedCarbonFilterType =
  | "granular_fixed_bed"
  | "powdered_dosing"
  | "impregnated_specialty"
  | "carbon_block"
  | "fluidized_bed_carbon";

interface ActivatedCarbonFilterData {
  adsorptionCapacity: number;
  contactTime: number;
  regenerability: number;
  particleRemoval: number;
  acfCost: number;
  reusable: boolean;
  forGasPhase: boolean;
  carbonType: string;
  bestUse: string;
}

const DATA: Record<ActivatedCarbonFilterType, ActivatedCarbonFilterData> = {
  granular_fixed_bed: {
    adsorptionCapacity: 9, contactTime: 8, regenerability: 9, particleRemoval: 7, acfCost: 7,
    reusable: true, forGasPhase: true,
    carbonType: "coconut_coal_based_granular_8x30_mesh_fixed_bed_column",
    bestUse: "water_treatment_plant_voc_removal_odor_control_large_flow",
  },
  powdered_dosing: {
    adsorptionCapacity: 8, contactTime: 10, regenerability: 3, particleRemoval: 5, acfCost: 4,
    reusable: false, forGasPhase: false,
    carbonType: "fine_powder_200_mesh_slurry_dose_mix_settle_filter_remove",
    bestUse: "emergency_spill_response_seasonal_taste_odor_batch_treat",
  },
  impregnated_specialty: {
    adsorptionCapacity: 8, contactTime: 7, regenerability: 4, particleRemoval: 6, acfCost: 9,
    reusable: false, forGasPhase: true,
    carbonType: "koh_ki_na2s_impregnated_chemisorb_h2s_mercury_acid_gas",
    bestUse: "mercury_removal_acid_gas_scrub_nuclear_iodine_capture",
  },
  carbon_block: {
    adsorptionCapacity: 7, contactTime: 6, regenerability: 3, particleRemoval: 10, acfCost: 5,
    reusable: false, forGasPhase: false,
    carbonType: "compressed_carbon_block_sub_micron_pore_cyst_lead_remove",
    bestUse: "point_of_use_drinking_water_filter_under_sink_refrigerator",
  },
  fluidized_bed_carbon: {
    adsorptionCapacity: 9, contactTime: 9, regenerability: 8, particleRemoval: 6, acfCost: 8,
    reusable: true, forGasPhase: true,
    carbonType: "granular_carbon_fluidized_upflow_continuous_regen_thermal",
    bestUse: "industrial_wastewater_phenol_dye_removal_continuous_process",
  },
};

function get(t: ActivatedCarbonFilterType): ActivatedCarbonFilterData {
  return DATA[t];
}

export const adsorptionCapacity = (t: ActivatedCarbonFilterType) => get(t).adsorptionCapacity;
export const contactTime = (t: ActivatedCarbonFilterType) => get(t).contactTime;
export const regenerability = (t: ActivatedCarbonFilterType) => get(t).regenerability;
export const particleRemoval = (t: ActivatedCarbonFilterType) => get(t).particleRemoval;
export const acfCost = (t: ActivatedCarbonFilterType) => get(t).acfCost;
export const reusable = (t: ActivatedCarbonFilterType) => get(t).reusable;
export const forGasPhase = (t: ActivatedCarbonFilterType) => get(t).forGasPhase;
export const carbonType = (t: ActivatedCarbonFilterType) => get(t).carbonType;
export const bestUse = (t: ActivatedCarbonFilterType) => get(t).bestUse;
export const activatedCarbonFilterTypes = (): ActivatedCarbonFilterType[] =>
  Object.keys(DATA) as ActivatedCarbonFilterType[];
