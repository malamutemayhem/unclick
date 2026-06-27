export type VacuumOvenType =
  | "shelf_batch_lab"
  | "tumble_rotary_bulk"
  | "conical_screw_pharma"
  | "belt_continuous_thin"
  | "microwave_vacuum_rapid";

interface VacuumOvenData {
  uniformity: number;
  throughput: number;
  gentleness: number;
  vacuumLevel: number;
  voCost: number;
  continuous: boolean;
  forLab: boolean;
  heating: string;
  bestUse: string;
}

const DATA: Record<VacuumOvenType, VacuumOvenData> = {
  shelf_batch_lab: {
    uniformity: 8, throughput: 3, gentleness: 9, vacuumLevel: 9, voCost: 4,
    continuous: false, forLab: true,
    heating: "heated_shelf_conduction_radiant",
    bestUse: "lab_sample_electronic_component",
  },
  tumble_rotary_bulk: {
    uniformity: 9, throughput: 8, gentleness: 6, vacuumLevel: 7, voCost: 7,
    continuous: false, forLab: false,
    heating: "jacketed_shell_rotation_tumble",
    bestUse: "chemical_pigment_polymer_bulk_dry",
  },
  conical_screw_pharma: {
    uniformity: 10, throughput: 7, gentleness: 8, vacuumLevel: 8, voCost: 9,
    continuous: false, forLab: false,
    heating: "jacketed_cone_orbiting_screw",
    bestUse: "pharma_api_fine_chemical_gmp",
  },
  belt_continuous_thin: {
    uniformity: 7, throughput: 9, gentleness: 7, vacuumLevel: 6, voCost: 8,
    continuous: true, forLab: false,
    heating: "heated_belt_thin_film_vacuum",
    bestUse: "extract_paste_fruit_puree_continuous",
  },
  microwave_vacuum_rapid: {
    uniformity: 8, throughput: 6, gentleness: 10, vacuumLevel: 8, voCost: 10,
    continuous: false, forLab: false,
    heating: "microwave_volumetric_vacuum_chamber",
    bestUse: "herb_enzyme_probiotic_rapid_gentle",
  },
};

function get(t: VacuumOvenType): VacuumOvenData {
  return DATA[t];
}

export const uniformity = (t: VacuumOvenType) => get(t).uniformity;
export const throughput = (t: VacuumOvenType) => get(t).throughput;
export const gentleness = (t: VacuumOvenType) => get(t).gentleness;
export const vacuumLevel = (t: VacuumOvenType) => get(t).vacuumLevel;
export const voCost = (t: VacuumOvenType) => get(t).voCost;
export const continuous = (t: VacuumOvenType) => get(t).continuous;
export const forLab = (t: VacuumOvenType) => get(t).forLab;
export const heating = (t: VacuumOvenType) => get(t).heating;
export const bestUse = (t: VacuumOvenType) => get(t).bestUse;
export const vacuumOvenTypes = (): VacuumOvenType[] =>
  Object.keys(DATA) as VacuumOvenType[];
