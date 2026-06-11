export type FurnaceType =
  | "blast_furnace_iron_ore"
  | "electric_arc_eaf_scrap"
  | "induction_melt_crucible"
  | "muffle_chamber_laboratory"
  | "rotary_kiln_cement_lime";

interface FurnaceData {
  temperature: number;
  throughput: number;
  efficiency: number;
  controllability: number;
  fnCost: number;
  electric: boolean;
  forSteel: boolean;
  heating: string;
  bestUse: string;
}

const DATA: Record<FurnaceType, FurnaceData> = {
  blast_furnace_iron_ore: {
    temperature: 8, throughput: 10, efficiency: 6, controllability: 5, fnCost: 9,
    electric: false, forSteel: true,
    heating: "coke_combustion_hot_blast_tuyere",
    bestUse: "primary_iron_smelting_pig_iron",
  },
  electric_arc_eaf_scrap: {
    temperature: 10, throughput: 8, efficiency: 7, controllability: 8, fnCost: 7,
    electric: true, forSteel: true,
    heating: "carbon_electrode_arc_plasma",
    bestUse: "scrap_recycling_specialty_steel",
  },
  induction_melt_crucible: {
    temperature: 7, throughput: 5, efficiency: 9, controllability: 10, fnCost: 6,
    electric: true, forSteel: false,
    heating: "electromagnetic_coil_eddy_current",
    bestUse: "precision_alloy_melt_foundry_cast",
  },
  muffle_chamber_laboratory: {
    temperature: 6, throughput: 2, efficiency: 5, controllability: 9, fnCost: 3,
    electric: true, forSteel: false,
    heating: "resistive_element_insulated_box",
    bestUse: "lab_ashing_heat_treat_small_batch",
  },
  rotary_kiln_cement_lime: {
    temperature: 9, throughput: 9, efficiency: 6, controllability: 4, fnCost: 8,
    electric: false, forSteel: false,
    heating: "direct_flame_rotating_cylinder",
    bestUse: "cement_clinker_calcination_lime",
  },
};

function get(t: FurnaceType): FurnaceData {
  return DATA[t];
}

export const temperature = (t: FurnaceType) => get(t).temperature;
export const throughput = (t: FurnaceType) => get(t).throughput;
export const efficiency = (t: FurnaceType) => get(t).efficiency;
export const controllability = (t: FurnaceType) => get(t).controllability;
export const fnCost = (t: FurnaceType) => get(t).fnCost;
export const electric = (t: FurnaceType) => get(t).electric;
export const forSteel = (t: FurnaceType) => get(t).forSteel;
export const heating = (t: FurnaceType) => get(t).heating;
export const bestUse = (t: FurnaceType) => get(t).bestUse;
export const furnaceTypes = (): FurnaceType[] =>
  Object.keys(DATA) as FurnaceType[];
