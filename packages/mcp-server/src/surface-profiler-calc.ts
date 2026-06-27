export type SurfaceProfilerType =
  | "stylus_contact"
  | "white_light_interferometer"
  | "confocal_laser"
  | "afm_probe"
  | "focus_variation";

interface SurfaceProfilerData {
  verticalResolution: number;
  throughput: number;
  lateralResolution: number;
  scanArea: number;
  sfCost: number;
  contactFree: boolean;
  forNanoScale: boolean;
  profilerConfig: string;
  bestUse: string;
}

const DATA: Record<SurfaceProfilerType, SurfaceProfilerData> = {
  stylus_contact: {
    verticalResolution: 7, throughput: 7, lateralResolution: 5, scanArea: 8, sfCost: 5,
    contactFree: false, forNanoScale: false,
    profilerConfig: "stylus_contact_surface_profiler_diamond_tip_traverse_ra_rz_trace",
    bestUse: "machined_surface_stylus_contact_surface_profiler_ra_rz_roughness",
  },
  white_light_interferometer: {
    verticalResolution: 9, throughput: 6, lateralResolution: 8, scanArea: 5, sfCost: 8,
    contactFree: true, forNanoScale: true,
    profilerConfig: "white_light_interferometer_surface_profiler_fringe_pattern_3d_map",
    bestUse: "optical_flat_white_light_interferometer_surface_profiler_sub_nm",
  },
  confocal_laser: {
    verticalResolution: 9, throughput: 5, lateralResolution: 9, scanArea: 4, sfCost: 9,
    contactFree: true, forNanoScale: true,
    profilerConfig: "confocal_laser_surface_profiler_pinhole_scan_3d_topography_map",
    bestUse: "mems_surface_confocal_laser_surface_profiler_3d_topo_sub_micron",
  },
  afm_probe: {
    verticalResolution: 9, throughput: 2, lateralResolution: 9, scanArea: 2, sfCost: 9,
    contactFree: false, forNanoScale: true,
    profilerConfig: "afm_probe_surface_profiler_cantilever_tip_atomic_force_nano_scan",
    bestUse: "thin_film_step_afm_probe_surface_profiler_angstrom_resolution",
  },
  focus_variation: {
    verticalResolution: 7, throughput: 8, lateralResolution: 7, scanArea: 7, sfCost: 7,
    contactFree: true, forNanoScale: false,
    profilerConfig: "focus_variation_surface_profiler_objective_sweep_3d_color_image",
    bestUse: "am_surface_focus_variation_surface_profiler_rough_to_smooth_3d",
  },
};

function get(t: SurfaceProfilerType): SurfaceProfilerData {
  return DATA[t];
}

export const verticalResolution = (t: SurfaceProfilerType) => get(t).verticalResolution;
export const throughput = (t: SurfaceProfilerType) => get(t).throughput;
export const lateralResolution = (t: SurfaceProfilerType) => get(t).lateralResolution;
export const scanArea = (t: SurfaceProfilerType) => get(t).scanArea;
export const sfCost = (t: SurfaceProfilerType) => get(t).sfCost;
export const contactFree = (t: SurfaceProfilerType) => get(t).contactFree;
export const forNanoScale = (t: SurfaceProfilerType) => get(t).forNanoScale;
export const profilerConfig = (t: SurfaceProfilerType) => get(t).profilerConfig;
export const bestUse = (t: SurfaceProfilerType) => get(t).bestUse;
export const surfaceProfilerTypes = (): SurfaceProfilerType[] =>
  Object.keys(DATA) as SurfaceProfilerType[];
