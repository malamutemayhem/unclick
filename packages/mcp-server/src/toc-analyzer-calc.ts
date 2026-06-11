export type TocAnalyzerType =
  | "uv_persulfate_oxidation"
  | "high_temp_combustion"
  | "uv_oxidation_direct"
  | "membrane_conductometric"
  | "supercritical_water";

interface TocAnalyzerData {
  accuracy: number;
  range: number;
  particulateHandle: number;
  maintenance: number;
  taCost: number;
  reagentFree: boolean;
  forHighToc: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<TocAnalyzerType, TocAnalyzerData> = {
  uv_persulfate_oxidation: {
    accuracy: 8, range: 6, particulateHandle: 5, maintenance: 5, taCost: 5,
    reagentFree: false, forHighToc: false,
    method: "uv_lamp_persulfate_reagent_co2_ndir",
    bestUse: "pure_water_pharma_semiconductor_ppb_toc",
  },
  high_temp_combustion: {
    accuracy: 9, range: 10, particulateHandle: 9, maintenance: 6, taCost: 7,
    reagentFree: true, forHighToc: true,
    method: "catalytic_combustion_680c_co2_ndir",
    bestUse: "wastewater_high_toc_particulate_slurry",
  },
  uv_oxidation_direct: {
    accuracy: 7, range: 4, particulateHandle: 3, maintenance: 7, taCost: 4,
    reagentFree: true, forHighToc: false,
    method: "uv_photolysis_direct_conductivity",
    bestUse: "ultrapure_water_online_continuous_ppb",
  },
  membrane_conductometric: {
    accuracy: 8, range: 5, particulateHandle: 4, maintenance: 8, taCost: 6,
    reagentFree: true, forHighToc: false,
    method: "selective_membrane_co2_conductivity",
    bestUse: "drinking_water_process_low_ppb_toc",
  },
  supercritical_water: {
    accuracy: 10, range: 9, particulateHandle: 8, maintenance: 4, taCost: 9,
    reagentFree: true, forHighToc: true,
    method: "supercritical_water_oxidation_complete",
    bestUse: "research_lab_difficult_matrix_total_toc",
  },
};

function get(t: TocAnalyzerType): TocAnalyzerData {
  return DATA[t];
}

export const accuracy = (t: TocAnalyzerType) => get(t).accuracy;
export const range = (t: TocAnalyzerType) => get(t).range;
export const particulateHandle = (t: TocAnalyzerType) => get(t).particulateHandle;
export const maintenance = (t: TocAnalyzerType) => get(t).maintenance;
export const taCost = (t: TocAnalyzerType) => get(t).taCost;
export const reagentFree = (t: TocAnalyzerType) => get(t).reagentFree;
export const forHighToc = (t: TocAnalyzerType) => get(t).forHighToc;
export const method = (t: TocAnalyzerType) => get(t).method;
export const bestUse = (t: TocAnalyzerType) => get(t).bestUse;
export const tocAnalyzerTypes = (): TocAnalyzerType[] =>
  Object.keys(DATA) as TocAnalyzerType[];
