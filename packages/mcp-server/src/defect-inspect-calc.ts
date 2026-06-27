export type DefectInspect =
  | "brightfield_optical"
  | "darkfield_laser"
  | "ebeam_voltage_contrast"
  | "xray_ct_3d"
  | "acoustic_micro_sam";

const DATA: Record<DefectInspect, {
  sensitivity: number; throughput: number; depth: number;
  classification: number; inspCost: number; nonContact: boolean;
  forYield: boolean; method: string; bestUse: string;
}> = {
  brightfield_optical: {
    sensitivity: 7, throughput: 9, depth: 3,
    classification: 6, inspCost: 4, nonContact: true,
    forYield: true, method: "reflected_light_contrast",
    bestUse: "inline_particle_monitor",
  },
  darkfield_laser: {
    sensitivity: 8, throughput: 8, depth: 4,
    classification: 7, inspCost: 5, nonContact: true,
    forYield: true, method: "scattered_light_haze_map",
    bestUse: "bare_wafer_surface_defect",
  },
  ebeam_voltage_contrast: {
    sensitivity: 10, throughput: 3, depth: 7,
    classification: 9, inspCost: 9, nonContact: true,
    forYield: true, method: "secondary_electron_potential",
    bestUse: "buried_via_open_short",
  },
  xray_ct_3d: {
    sensitivity: 9, throughput: 2, depth: 10,
    classification: 8, inspCost: 10, nonContact: true,
    forYield: false, method: "computed_tomography_slice",
    bestUse: "3d_package_void_detect",
  },
  acoustic_micro_sam: {
    sensitivity: 6, throughput: 5, depth: 8,
    classification: 5, inspCost: 3, nonContact: false,
    forYield: false, method: "ultrasonic_pulse_echo_gate",
    bestUse: "die_attach_delamination",
  },
};

const get = (t: DefectInspect) => DATA[t];

export const sensitivity = (t: DefectInspect) => get(t).sensitivity;
export const throughput = (t: DefectInspect) => get(t).throughput;
export const depth = (t: DefectInspect) => get(t).depth;
export const classification = (t: DefectInspect) => get(t).classification;
export const inspCost = (t: DefectInspect) => get(t).inspCost;
export const nonContact = (t: DefectInspect) => get(t).nonContact;
export const forYield = (t: DefectInspect) => get(t).forYield;
export const method = (t: DefectInspect) => get(t).method;
export const bestUse = (t: DefectInspect) => get(t).bestUse;
export const defectInspects = (): DefectInspect[] => Object.keys(DATA) as DefectInspect[];
