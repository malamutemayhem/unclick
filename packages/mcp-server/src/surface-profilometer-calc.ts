export type SurfaceProfilometerType =
  | "contact_stylus"
  | "white_light_interferometry"
  | "confocal_laser"
  | "focus_variation"
  | "atomic_force_micro";

interface SurfaceProfilometerData {
  verticalResolution: number;
  lateralResolution: number;
  measureRange: number;
  scanSpeed: number;
  spCost: number;
  nonContact: boolean;
  forNanoScale: boolean;
  technique: string;
  bestUse: string;
}

const DATA: Record<SurfaceProfilometerType, SurfaceProfilometerData> = {
  contact_stylus: {
    verticalResolution: 8, lateralResolution: 6, measureRange: 9, scanSpeed: 5, spCost: 5,
    nonContact: false, forNanoScale: false,
    technique: "diamond_tip_stylus_drag_across_surface_lvdt_displacement",
    bestUse: "machined_surface_ra_rz_rmax_shop_floor_roughness_check",
  },
  white_light_interferometry: {
    verticalResolution: 10, lateralResolution: 9, measureRange: 7, scanSpeed: 8, spCost: 8,
    nonContact: true, forNanoScale: true,
    technique: "broadband_light_interference_fringe_vertical_scan_3d_topo",
    bestUse: "optical_surface_coating_mems_wafer_film_thickness_step",
  },
  confocal_laser: {
    verticalResolution: 9, lateralResolution: 10, measureRange: 6, scanSpeed: 7, spCost: 9,
    nonContact: true, forNanoScale: true,
    technique: "laser_pinhole_confocal_z_scan_optical_section_3d_reconstruct",
    bestUse: "semiconductor_wafer_bio_surface_steep_slope_high_aspect",
  },
  focus_variation: {
    verticalResolution: 7, lateralResolution: 8, measureRange: 10, scanSpeed: 9, spCost: 7,
    nonContact: true, forNanoScale: false,
    technique: "focus_sweep_depth_of_field_combine_sharp_image_3d_height",
    bestUse: "cutting_tool_insert_wear_scar_rough_surface_large_area_scan",
  },
  atomic_force_micro: {
    verticalResolution: 10, lateralResolution: 10, measureRange: 3, scanSpeed: 3, spCost: 10,
    nonContact: true, forNanoScale: true,
    technique: "cantilever_tip_atomic_force_raster_scan_sub_nm_resolution",
    bestUse: "nano_material_thin_film_polymer_surface_research_sub_angstrom",
  },
};

function get(t: SurfaceProfilometerType): SurfaceProfilometerData {
  return DATA[t];
}

export const verticalResolution = (t: SurfaceProfilometerType) => get(t).verticalResolution;
export const lateralResolution = (t: SurfaceProfilometerType) => get(t).lateralResolution;
export const measureRange = (t: SurfaceProfilometerType) => get(t).measureRange;
export const scanSpeed = (t: SurfaceProfilometerType) => get(t).scanSpeed;
export const spCost = (t: SurfaceProfilometerType) => get(t).spCost;
export const nonContact = (t: SurfaceProfilometerType) => get(t).nonContact;
export const forNanoScale = (t: SurfaceProfilometerType) => get(t).forNanoScale;
export const technique = (t: SurfaceProfilometerType) => get(t).technique;
export const bestUse = (t: SurfaceProfilometerType) => get(t).bestUse;
export const surfaceProfilometerTypes = (): SurfaceProfilometerType[] =>
  Object.keys(DATA) as SurfaceProfilometerType[];
