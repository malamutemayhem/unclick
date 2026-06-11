export type PhMeterType =
  | "glass_electrode_lab"
  | "glass_electrode_process"
  | "isfet_solid_state"
  | "optical_fluorescent"
  | "antimony_high_temp";

interface PhMeterData {
  accuracy: number;
  response: number;
  durability: number;
  maintenance: number;
  pmCost: number;
  noGlass: boolean;
  forProcess: boolean;
  sensing: string;
  bestUse: string;
}

const DATA: Record<PhMeterType, PhMeterData> = {
  glass_electrode_lab: {
    accuracy: 10, response: 8, durability: 5, maintenance: 5, pmCost: 4,
    noGlass: false, forProcess: false,
    sensing: "ag_agcl_reference_glass_bulb",
    bestUse: "lab_bench_qc_titration_sample",
  },
  glass_electrode_process: {
    accuracy: 9, response: 7, durability: 7, maintenance: 6, pmCost: 7,
    noGlass: false, forProcess: true,
    sensing: "flat_glass_retractable_holder",
    bestUse: "wastewater_chemical_dose_control",
  },
  isfet_solid_state: {
    accuracy: 8, response: 10, durability: 9, maintenance: 9, pmCost: 6,
    noGlass: true, forProcess: true,
    sensing: "ion_sensitive_field_effect_chip",
    bestUse: "food_pharma_breakage_free_clean",
  },
  optical_fluorescent: {
    accuracy: 8, response: 6, durability: 8, maintenance: 10, pmCost: 8,
    noGlass: true, forProcess: true,
    sensing: "fluorescent_dye_spot_fiber_optic",
    bestUse: "bioprocess_fermentation_sterile",
  },
  antimony_high_temp: {
    accuracy: 6, response: 9, durability: 10, maintenance: 8, pmCost: 5,
    noGlass: true, forProcess: true,
    sensing: "antimony_metal_oxide_electrode",
    bestUse: "high_temp_hf_acid_abrasive_slurry",
  },
};

function get(t: PhMeterType): PhMeterData {
  return DATA[t];
}

export const accuracy = (t: PhMeterType) => get(t).accuracy;
export const response = (t: PhMeterType) => get(t).response;
export const durability = (t: PhMeterType) => get(t).durability;
export const maintenance = (t: PhMeterType) => get(t).maintenance;
export const pmCost = (t: PhMeterType) => get(t).pmCost;
export const noGlass = (t: PhMeterType) => get(t).noGlass;
export const forProcess = (t: PhMeterType) => get(t).forProcess;
export const sensing = (t: PhMeterType) => get(t).sensing;
export const bestUse = (t: PhMeterType) => get(t).bestUse;
export const phMeterTypes = (): PhMeterType[] =>
  Object.keys(DATA) as PhMeterType[];
