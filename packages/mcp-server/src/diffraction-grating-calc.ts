export type DiffractionGratingType =
  | "ruled_blazed_reflection"
  | "holographic_sinusoidal"
  | "echelle_high_order"
  | "transmission_volume_phase"
  | "fiber_bragg_gratings";

const DATA: Record<DiffractionGratingType, {
  resolution: number; efficiency: number; bandwidth: number;
  strayLight: number; dgCost: number; inFiber: boolean;
  forSpectroscopy: boolean; fabrication: string; bestUse: string;
}> = {
  ruled_blazed_reflection: {
    resolution: 7, efficiency: 9, bandwidth: 7,
    strayLight: 5, dgCost: 3, inFiber: false,
    forSpectroscopy: true, fabrication: "diamond_ruled_sawtooth",
    bestUse: "monochromator_wavelength_select",
  },
  holographic_sinusoidal: {
    resolution: 8, efficiency: 7, bandwidth: 8,
    strayLight: 9, dgCost: 2, inFiber: false,
    forSpectroscopy: true, fabrication: "laser_interference_photoresist",
    bestUse: "spectrograph_low_stray_light",
  },
  echelle_high_order: {
    resolution: 10, efficiency: 8, bandwidth: 5,
    strayLight: 6, dgCost: 5, inFiber: false,
    forSpectroscopy: true, fabrication: "coarse_ruled_high_blaze",
    bestUse: "icp_oes_multi_element_analysis",
  },
  transmission_volume_phase: {
    resolution: 7, efficiency: 10, bandwidth: 6,
    strayLight: 8, dgCost: 4, inFiber: false,
    forSpectroscopy: true, fabrication: "dcg_holographic_gelatin",
    bestUse: "astronomy_multi_object_spectro",
  },
  fiber_bragg_gratings: {
    resolution: 6, efficiency: 8, bandwidth: 3,
    strayLight: 9, dgCost: 3, inFiber: true,
    forSpectroscopy: false, fabrication: "uv_written_fiber_core",
    bestUse: "telecom_wavelength_demux_sensor",
  },
};

const get = (t: DiffractionGratingType) => DATA[t];

export const resolution = (t: DiffractionGratingType) => get(t).resolution;
export const efficiency = (t: DiffractionGratingType) => get(t).efficiency;
export const bandwidth = (t: DiffractionGratingType) => get(t).bandwidth;
export const strayLight = (t: DiffractionGratingType) => get(t).strayLight;
export const dgCost = (t: DiffractionGratingType) => get(t).dgCost;
export const inFiber = (t: DiffractionGratingType) => get(t).inFiber;
export const forSpectroscopy = (t: DiffractionGratingType) => get(t).forSpectroscopy;
export const fabrication = (t: DiffractionGratingType) => get(t).fabrication;
export const bestUse = (t: DiffractionGratingType) => get(t).bestUse;
export const diffractionGratingTypes = (): DiffractionGratingType[] => Object.keys(DATA) as DiffractionGratingType[];
