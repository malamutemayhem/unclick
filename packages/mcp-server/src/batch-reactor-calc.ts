export type BatchReactorType =
  | "jacketed_stirred_std"
  | "glass_lined_pharma"
  | "high_pressure_autoclave"
  | "fermentation_bioreact"
  | "calorimeter_reaction";

interface BatchReactorData {
  flexibility: number;
  heatRemoval: number;
  mixing: number;
  containment: number;
  brCost: number;
  pressurized: boolean;
  forMultiProduct: boolean;
  vessel: string;
  bestUse: string;
}

const DATA: Record<BatchReactorType, BatchReactorData> = {
  jacketed_stirred_std: {
    flexibility: 9, heatRemoval: 7, mixing: 8, containment: 7, brCost: 5,
    pressurized: false, forMultiProduct: true,
    vessel: "jacketed_ss_vessel_anchor_or_rushton_agitator",
    bestUse: "specialty_chemical_dye_resin_multi_product",
  },
  glass_lined_pharma: {
    flexibility: 9, heatRemoval: 6, mixing: 7, containment: 9, brCost: 7,
    pressurized: false, forMultiProduct: true,
    vessel: "glass_lined_steel_vessel_corrosion_resistant",
    bestUse: "pharma_api_fine_chemical_corrosive_batch",
  },
  high_pressure_autoclave: {
    flexibility: 6, heatRemoval: 8, mixing: 7, containment: 10, brCost: 9,
    pressurized: true, forMultiProduct: false,
    vessel: "thick_wall_autoclave_high_pressure_bolted_lid",
    bestUse: "hydrogenation_polymerization_high_pressure",
  },
  fermentation_bioreact: {
    flexibility: 7, heatRemoval: 8, mixing: 9, containment: 8, brCost: 8,
    pressurized: false, forMultiProduct: false,
    vessel: "sterile_vessel_sparger_baffles_do_ph_control",
    bestUse: "biotech_fermentation_cell_culture_enzyme_prod",
  },
  calorimeter_reaction: {
    flexibility: 10, heatRemoval: 10, mixing: 9, containment: 8, brCost: 10,
    pressurized: false, forMultiProduct: true,
    vessel: "reaction_calorimeter_precise_heat_measurement",
    bestUse: "process_safety_scale_up_thermal_hazard_study",
  },
};

function get(t: BatchReactorType): BatchReactorData {
  return DATA[t];
}

export const flexibility = (t: BatchReactorType) => get(t).flexibility;
export const heatRemoval = (t: BatchReactorType) => get(t).heatRemoval;
export const mixing = (t: BatchReactorType) => get(t).mixing;
export const containment = (t: BatchReactorType) => get(t).containment;
export const brCost = (t: BatchReactorType) => get(t).brCost;
export const pressurized = (t: BatchReactorType) => get(t).pressurized;
export const forMultiProduct = (t: BatchReactorType) => get(t).forMultiProduct;
export const vessel = (t: BatchReactorType) => get(t).vessel;
export const bestUse = (t: BatchReactorType) => get(t).bestUse;
export const batchReactorTypes = (): BatchReactorType[] =>
  Object.keys(DATA) as BatchReactorType[];
