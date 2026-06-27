export type BioAmType =
  | "extrusion_bioprint_hydrogel"
  | "inkjet_drop_on_demand"
  | "laser_assisted_lift"
  | "scaffold_melt_electrospin"
  | "volumetric_tomographic";

interface BioAmData {
  cellViability: number;
  resolution: number;
  speed: number;
  complexity: number;
  baCost: number;
  cellLaden: boolean;
  forOrgan: boolean;
  bioink: string;
  bestUse: string;
}

const DATA: Record<BioAmType, BioAmData> = {
  extrusion_bioprint_hydrogel: {
    cellViability: 9, resolution: 6, speed: 8, complexity: 7, baCost: 5,
    cellLaden: true, forOrgan: true,
    bioink: "alginate_gelatin_collagen_gel",
    bestUse: "tissue_model_cartilage_skin",
  },
  inkjet_drop_on_demand: {
    cellViability: 8, resolution: 9, speed: 9, complexity: 6, baCost: 6,
    cellLaden: true, forOrgan: false,
    bioink: "low_viscosity_cell_suspension",
    bestUse: "drug_screen_high_throughput_array",
  },
  laser_assisted_lift: {
    cellViability: 10, resolution: 10, speed: 5, complexity: 8, baCost: 10,
    cellLaden: true, forOrgan: true,
    bioink: "laser_ribbon_cell_transfer_gel",
    bestUse: "single_cell_pattern_stem_research",
  },
  scaffold_melt_electrospin: {
    cellViability: 6, resolution: 7, speed: 7, complexity: 5, baCost: 4,
    cellLaden: false, forOrgan: false,
    bioink: "pcl_pla_melt_electrospun_fiber",
    bestUse: "bone_scaffold_wound_dressing",
  },
  volumetric_tomographic: {
    cellViability: 9, resolution: 8, speed: 10, complexity: 9, baCost: 9,
    cellLaden: true, forOrgan: true,
    bioink: "gelatin_methacryloyl_photoinitiator",
    bestUse: "complex_vasculature_organ_model",
  },
};

function get(t: BioAmType): BioAmData {
  return DATA[t];
}

export const cellViability = (t: BioAmType) => get(t).cellViability;
export const resolution = (t: BioAmType) => get(t).resolution;
export const speed = (t: BioAmType) => get(t).speed;
export const complexity = (t: BioAmType) => get(t).complexity;
export const baCost = (t: BioAmType) => get(t).baCost;
export const cellLaden = (t: BioAmType) => get(t).cellLaden;
export const forOrgan = (t: BioAmType) => get(t).forOrgan;
export const bioink = (t: BioAmType) => get(t).bioink;
export const bestUse = (t: BioAmType) => get(t).bestUse;
export const bioAmTypes = (): BioAmType[] =>
  Object.keys(DATA) as BioAmType[];
