export type OcdMetrology =
  | "spectroscopic_ellipsometry"
  | "xray_reflectometry"
  | "scatterometry_ocd"
  | "cd_sem_topdown"
  | "afm_3d_profile";

const DATA: Record<OcdMetrology, {
  resolution: number; throughput: number; accuracy: number;
  nonDestructive: number; metCost: number; inline: boolean;
  forEuv: boolean; technique: string; bestUse: string;
}> = {
  spectroscopic_ellipsometry: {
    resolution: 6, throughput: 9, accuracy: 8,
    nonDestructive: 10, metCost: 5, inline: true,
    forEuv: true, technique: "polarized_light_model_fit",
    bestUse: "film_thickness_monitor",
  },
  xray_reflectometry: {
    resolution: 8, throughput: 5, accuracy: 9,
    nonDestructive: 10, metCost: 7, inline: false,
    forEuv: true, technique: "grazing_incidence_kiessig",
    bestUse: "multilayer_gate_stack",
  },
  scatterometry_ocd: {
    resolution: 7, throughput: 8, accuracy: 8,
    nonDestructive: 10, metCost: 6, inline: true,
    forEuv: true, technique: "diffraction_library_match",
    bestUse: "line_cd_profile_shape",
  },
  cd_sem_topdown: {
    resolution: 9, throughput: 7, accuracy: 7,
    nonDestructive: 8, metCost: 8, inline: true,
    forEuv: true, technique: "secondary_electron_edge_detect",
    bestUse: "photomask_cd_uniformity",
  },
  afm_3d_profile: {
    resolution: 10, throughput: 2, accuracy: 10,
    nonDestructive: 7, metCost: 9, inline: false,
    forEuv: false, technique: "tip_scan_surface_force",
    bestUse: "etch_depth_sidewall_angle",
  },
};

const get = (t: OcdMetrology) => DATA[t];

export const resolution = (t: OcdMetrology) => get(t).resolution;
export const throughput = (t: OcdMetrology) => get(t).throughput;
export const accuracy = (t: OcdMetrology) => get(t).accuracy;
export const nonDestructive = (t: OcdMetrology) => get(t).nonDestructive;
export const metCost = (t: OcdMetrology) => get(t).metCost;
export const inline = (t: OcdMetrology) => get(t).inline;
export const forEuv = (t: OcdMetrology) => get(t).forEuv;
export const technique = (t: OcdMetrology) => get(t).technique;
export const bestUse = (t: OcdMetrology) => get(t).bestUse;
export const ocdMetrologies = (): OcdMetrology[] => Object.keys(DATA) as OcdMetrology[];
