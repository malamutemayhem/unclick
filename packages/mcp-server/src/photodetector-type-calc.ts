export type PhotodetectorType =
  | "pin_silicon"
  | "apd_avalanche"
  | "mppc_sipm"
  | "ingaas_swir"
  | "photomultiplier_tube";

const DATA: Record<PhotodetectorType, {
  sensitivity: number; bandwidth: number; darkCurrent: number;
  dynamicRange: number; detectorCost: number; internalGain: boolean;
  forTelecom: boolean; spectralRange: string; bestUse: string;
}> = {
  pin_silicon: {
    sensitivity: 5, bandwidth: 7, darkCurrent: 8,
    dynamicRange: 8, detectorCost: 2, internalGain: false,
    forTelecom: false, spectralRange: "visible_300_1100nm",
    bestUse: "datacom_short_reach",
  },
  apd_avalanche: {
    sensitivity: 8, bandwidth: 8, darkCurrent: 5,
    dynamicRange: 6, detectorCost: 6, internalGain: true,
    forTelecom: true, spectralRange: "nir_900_1700nm",
    bestUse: "long_haul_fiber_rx",
  },
  mppc_sipm: {
    sensitivity: 10, bandwidth: 6, darkCurrent: 3,
    dynamicRange: 4, detectorCost: 7, internalGain: true,
    forTelecom: false, spectralRange: "visible_uv_200_900nm",
    bestUse: "pet_scanner_scintillator",
  },
  ingaas_swir: {
    sensitivity: 7, bandwidth: 9, darkCurrent: 4,
    dynamicRange: 7, detectorCost: 8, internalGain: false,
    forTelecom: true, spectralRange: "swir_900_2600nm",
    bestUse: "coherent_optical_receiver",
  },
  photomultiplier_tube: {
    sensitivity: 10, bandwidth: 5, darkCurrent: 6,
    dynamicRange: 9, detectorCost: 9, internalGain: true,
    forTelecom: false, spectralRange: "uv_vis_115_900nm",
    bestUse: "spectroscopy_fluorescence",
  },
};

const get = (t: PhotodetectorType) => DATA[t];

export const sensitivity = (t: PhotodetectorType) => get(t).sensitivity;
export const bandwidth = (t: PhotodetectorType) => get(t).bandwidth;
export const darkCurrent = (t: PhotodetectorType) => get(t).darkCurrent;
export const dynamicRange = (t: PhotodetectorType) => get(t).dynamicRange;
export const detectorCost = (t: PhotodetectorType) => get(t).detectorCost;
export const internalGain = (t: PhotodetectorType) => get(t).internalGain;
export const forTelecom = (t: PhotodetectorType) => get(t).forTelecom;
export const spectralRange = (t: PhotodetectorType) => get(t).spectralRange;
export const bestUse = (t: PhotodetectorType) => get(t).bestUse;
export const photodetectorTypes = (): PhotodetectorType[] => Object.keys(DATA) as PhotodetectorType[];
