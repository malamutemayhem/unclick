export type NdtMethodType =
  | "ultrasonic_pulse_echo"
  | "radiographic_xray_gamma"
  | "magnetic_particle_mt"
  | "liquid_penetrant_pt"
  | "eddy_current_et";

interface NdtMethodData {
  sensitivity: number;
  speed: number;
  depth: number;
  portability: number;
  ndCost: number;
  volumetric: boolean;
  forSurface: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<NdtMethodType, NdtMethodData> = {
  ultrasonic_pulse_echo: {
    sensitivity: 9, speed: 8, depth: 10, portability: 8, ndCost: 7,
    volumetric: true, forSurface: false,
    medium: "piezoelectric_transducer_couplant",
    bestUse: "weld_forging_casting_subsurface",
  },
  radiographic_xray_gamma: {
    sensitivity: 9, speed: 5, depth: 10, portability: 5, ndCost: 9,
    volumetric: true, forSurface: false,
    medium: "xray_tube_iridium_192_film",
    bestUse: "weld_quality_porosity_inclusion",
  },
  magnetic_particle_mt: {
    sensitivity: 8, speed: 9, depth: 3, portability: 9, ndCost: 4,
    volumetric: false, forSurface: true,
    medium: "magnetic_yoke_wet_fluorescent",
    bestUse: "surface_crack_ferrous_casting",
  },
  liquid_penetrant_pt: {
    sensitivity: 7, speed: 7, depth: 2, portability: 10, ndCost: 3,
    volumetric: false, forSurface: true,
    medium: "fluorescent_dye_developer_spray",
    bestUse: "surface_crack_non_ferrous_weld",
  },
  eddy_current_et: {
    sensitivity: 9, speed: 10, depth: 4, portability: 9, ndCost: 6,
    volumetric: false, forSurface: true,
    medium: "electromagnetic_coil_probe_array",
    bestUse: "tube_heat_exchanger_surface_scan",
  },
};

function get(t: NdtMethodType): NdtMethodData {
  return DATA[t];
}

export const sensitivity = (t: NdtMethodType) => get(t).sensitivity;
export const speed = (t: NdtMethodType) => get(t).speed;
export const depth = (t: NdtMethodType) => get(t).depth;
export const portability = (t: NdtMethodType) => get(t).portability;
export const ndCost = (t: NdtMethodType) => get(t).ndCost;
export const volumetric = (t: NdtMethodType) => get(t).volumetric;
export const forSurface = (t: NdtMethodType) => get(t).forSurface;
export const medium = (t: NdtMethodType) => get(t).medium;
export const bestUse = (t: NdtMethodType) => get(t).bestUse;
export const ndtMethodTypes = (): NdtMethodType[] =>
  Object.keys(DATA) as NdtMethodType[];
