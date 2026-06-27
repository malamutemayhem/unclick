export type Photodetector =
  | "pin_silicon"
  | "apd_avalanche"
  | "spad_single_photon"
  | "ingaas_swir"
  | "balanced_coherent";

const DATA: Record<Photodetector, {
  responsivity: number; bandwidth: number; sensitivity: number;
  dynamicRange: number; pdCost: number; internalGain: boolean;
  forTelecom: boolean; material: string; bestUse: string;
}> = {
  pin_silicon: {
    responsivity: 6, bandwidth: 8, sensitivity: 5,
    dynamicRange: 9, pdCost: 2, internalGain: false,
    forTelecom: false, material: "silicon_epitaxial",
    bestUse: "visible_light_datacom",
  },
  apd_avalanche: {
    responsivity: 8, bandwidth: 7, sensitivity: 8,
    dynamicRange: 7, pdCost: 5, internalGain: true,
    forTelecom: true, material: "ingaas_inp_mesa",
    bestUse: "long_reach_fiber_rx",
  },
  spad_single_photon: {
    responsivity: 10, bandwidth: 4, sensitivity: 10,
    dynamicRange: 3, pdCost: 8, internalGain: true,
    forTelecom: false, material: "silicon_geiger_mode",
    bestUse: "lidar_tof_ranging",
  },
  ingaas_swir: {
    responsivity: 9, bandwidth: 6, sensitivity: 7,
    dynamicRange: 8, pdCost: 7, internalGain: false,
    forTelecom: true, material: "ingaas_lattice_matched",
    bestUse: "1550nm_telecom_receiver",
  },
  balanced_coherent: {
    responsivity: 7, bandwidth: 9, sensitivity: 9,
    dynamicRange: 6, pdCost: 9, internalGain: false,
    forTelecom: true, material: "dual_ingaas_matched_pair",
    bestUse: "coherent_qpsk_detection",
  },
};

const get = (t: Photodetector) => DATA[t];

export const responsivity = (t: Photodetector) => get(t).responsivity;
export const bandwidth = (t: Photodetector) => get(t).bandwidth;
export const sensitivity = (t: Photodetector) => get(t).sensitivity;
export const dynamicRange = (t: Photodetector) => get(t).dynamicRange;
export const pdCost = (t: Photodetector) => get(t).pdCost;
export const internalGain = (t: Photodetector) => get(t).internalGain;
export const forTelecom = (t: Photodetector) => get(t).forTelecom;
export const material = (t: Photodetector) => get(t).material;
export const bestUse = (t: Photodetector) => get(t).bestUse;
export const photodetectors = (): Photodetector[] => Object.keys(DATA) as Photodetector[];
