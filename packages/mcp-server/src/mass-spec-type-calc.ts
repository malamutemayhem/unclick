export type MassSpecType =
  | "quadrupole_single_quad"
  | "triple_quad_mrm"
  | "tof_time_of_flight"
  | "orbitrap_high_res"
  | "ion_trap_tandem";

const DATA: Record<MassSpecType, {
  resolution: number; sensitivity: number; speed: number;
  massAccuracy: number; msCost: number; highRes: boolean;
  forProteomics: boolean; analyzer: string; bestUse: string;
}> = {
  quadrupole_single_quad: {
    resolution: 3, sensitivity: 6, speed: 8,
    massAccuracy: 3, msCost: 1, highRes: false,
    forProteomics: false, analyzer: "rf_dc_quadrupole_filter",
    bestUse: "routine_lcms_drug_screening",
  },
  triple_quad_mrm: {
    resolution: 4, sensitivity: 10, speed: 9,
    massAccuracy: 4, msCost: 3, highRes: false,
    forProteomics: false, analyzer: "q1_collision_q3_mrm",
    bestUse: "clinical_quantitation_pk_study",
  },
  tof_time_of_flight: {
    resolution: 8, sensitivity: 7, speed: 10,
    massAccuracy: 8, msCost: 4, highRes: true,
    forProteomics: true, analyzer: "reflectron_tof_drift_tube",
    bestUse: "metabolomics_untargeted_screen",
  },
  orbitrap_high_res: {
    resolution: 10, sensitivity: 8, speed: 6,
    massAccuracy: 10, msCost: 5, highRes: true,
    forProteomics: true, analyzer: "orbital_trap_image_current",
    bestUse: "proteomics_intact_protein_id",
  },
  ion_trap_tandem: {
    resolution: 5, sensitivity: 7, speed: 7,
    massAccuracy: 5, msCost: 2, highRes: false,
    forProteomics: true, analyzer: "3d_paul_trap_resonance",
    bestUse: "structural_elucidation_msn",
  },
};

const get = (t: MassSpecType) => DATA[t];

export const resolution = (t: MassSpecType) => get(t).resolution;
export const sensitivity = (t: MassSpecType) => get(t).sensitivity;
export const speed = (t: MassSpecType) => get(t).speed;
export const massAccuracy = (t: MassSpecType) => get(t).massAccuracy;
export const msCost = (t: MassSpecType) => get(t).msCost;
export const highRes = (t: MassSpecType) => get(t).highRes;
export const forProteomics = (t: MassSpecType) => get(t).forProteomics;
export const analyzer = (t: MassSpecType) => get(t).analyzer;
export const bestUse = (t: MassSpecType) => get(t).bestUse;
export const massSpecTypes = (): MassSpecType[] => Object.keys(DATA) as MassSpecType[];
