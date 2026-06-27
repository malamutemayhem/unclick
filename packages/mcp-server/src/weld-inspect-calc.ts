export type WeldInspectType =
  | "visual_vt_mag_glass"
  | "radiographic_rt_xray"
  | "ultrasonic_ut_phased"
  | "magnetic_particle_mt"
  | "dye_penetrant_pt";

interface WeldInspectData {
  sensitivity: number;
  depth: number;
  speed: number;
  safety: number;
  wiCost: number;
  volumetric: boolean;
  forSubsurface: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<WeldInspectType, WeldInspectData> = {
  visual_vt_mag_glass: {
    sensitivity: 4, depth: 2, speed: 10, safety: 10, wiCost: 2,
    volumetric: false, forSubsurface: false,
    method: "direct_visual_aided_magnification",
    bestUse: "first_pass_surface_defect_check",
  },
  radiographic_rt_xray: {
    sensitivity: 9, depth: 10, speed: 4, safety: 3, wiCost: 8,
    volumetric: true, forSubsurface: true,
    method: "xray_gamma_film_or_digital",
    bestUse: "pressure_vessel_pipe_code_weld",
  },
  ultrasonic_ut_phased: {
    sensitivity: 10, depth: 10, speed: 7, safety: 9, wiCost: 7,
    volumetric: true, forSubsurface: true,
    method: "phased_array_tofd_pulse_echo",
    bestUse: "thick_section_critical_structural",
  },
  magnetic_particle_mt: {
    sensitivity: 7, depth: 4, speed: 8, safety: 8, wiCost: 4,
    volumetric: false, forSubsurface: false,
    method: "magnetic_flux_leakage_particles",
    bestUse: "ferromagnetic_surface_crack_detect",
  },
  dye_penetrant_pt: {
    sensitivity: 6, depth: 3, speed: 7, safety: 7, wiCost: 3,
    volumetric: false, forSubsurface: false,
    method: "fluorescent_visible_dye_capillary",
    bestUse: "non_ferrous_surface_breaking_defect",
  },
};

function get(t: WeldInspectType): WeldInspectData {
  return DATA[t];
}

export const sensitivity = (t: WeldInspectType) => get(t).sensitivity;
export const depth = (t: WeldInspectType) => get(t).depth;
export const speed = (t: WeldInspectType) => get(t).speed;
export const safety = (t: WeldInspectType) => get(t).safety;
export const wiCost = (t: WeldInspectType) => get(t).wiCost;
export const volumetric = (t: WeldInspectType) => get(t).volumetric;
export const forSubsurface = (t: WeldInspectType) => get(t).forSubsurface;
export const method = (t: WeldInspectType) => get(t).method;
export const bestUse = (t: WeldInspectType) => get(t).bestUse;
export const weldInspectTypes = (): WeldInspectType[] =>
  Object.keys(DATA) as WeldInspectType[];
