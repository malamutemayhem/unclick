export type OpticalPolisherType =
  | "pitch_lap"
  | "cmp_optical"
  | "ion_beam_figuring"
  | "float_polish"
  | "bonnet_polish";

interface OpticalPolisherData {
  surfaceFinish: number;
  throughput: number;
  figureControl: number;
  subsurfaceDamage: number;
  opCost: number;
  deterministic: boolean;
  forUltraflat: boolean;
  polisherConfig: string;
  bestUse: string;
}

const DATA: Record<OpticalPolisherType, OpticalPolisherData> = {
  pitch_lap: {
    surfaceFinish: 8, throughput: 4, figureControl: 7, subsurfaceDamage: 8, opCost: 4,
    deterministic: false, forUltraflat: false,
    polisherConfig: "pitch_lap_optical_polisher_cerium_oxide_slurry_classical_hand",
    bestUse: "traditional_optics_pitch_lap_polisher_cerium_oxide_classical",
  },
  cmp_optical: {
    surfaceFinish: 9, throughput: 8, figureControl: 8, subsurfaceDamage: 9, opCost: 7,
    deterministic: false, forUltraflat: true,
    polisherConfig: "cmp_optical_polisher_chemical_mechanical_pad_slurry_flat_wafer",
    bestUse: "wafer_flat_cmp_optical_polisher_chemical_mechanical_planarize",
  },
  ion_beam_figuring: {
    surfaceFinish: 10, throughput: 2, figureControl: 10, subsurfaceDamage: 10, opCost: 10,
    deterministic: true, forUltraflat: true,
    polisherConfig: "ion_beam_figuring_optical_polisher_sputter_correct_nanometer",
    bestUse: "space_optics_ion_beam_figuring_polisher_nanometer_correction",
  },
  float_polish: {
    surfaceFinish: 9, throughput: 6, figureControl: 7, subsurfaceDamage: 9, opCost: 6,
    deterministic: false, forUltraflat: true,
    polisherConfig: "float_optical_polisher_tin_lap_chemical_attack_super_smooth",
    bestUse: "etalon_flat_float_optical_polisher_tin_lap_super_smooth_surface",
  },
  bonnet_polish: {
    surfaceFinish: 9, throughput: 5, figureControl: 9, subsurfaceDamage: 9, opCost: 8,
    deterministic: true, forUltraflat: false,
    polisherConfig: "bonnet_optical_polisher_inflated_tool_precession_freeform",
    bestUse: "freeform_optics_bonnet_polisher_precession_aspheric_correct",
  },
};

function get(t: OpticalPolisherType): OpticalPolisherData {
  return DATA[t];
}

export const surfaceFinish = (t: OpticalPolisherType) => get(t).surfaceFinish;
export const throughput = (t: OpticalPolisherType) => get(t).throughput;
export const figureControl = (t: OpticalPolisherType) => get(t).figureControl;
export const subsurfaceDamage = (t: OpticalPolisherType) => get(t).subsurfaceDamage;
export const opCost = (t: OpticalPolisherType) => get(t).opCost;
export const deterministic = (t: OpticalPolisherType) => get(t).deterministic;
export const forUltraflat = (t: OpticalPolisherType) => get(t).forUltraflat;
export const polisherConfig = (t: OpticalPolisherType) => get(t).polisherConfig;
export const bestUse = (t: OpticalPolisherType) => get(t).bestUse;
export const opticalPolisherTypes = (): OpticalPolisherType[] =>
  Object.keys(DATA) as OpticalPolisherType[];
