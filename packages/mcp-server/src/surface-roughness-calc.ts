export type SurfaceRoughnessType =
  | "contact_stylus_probe"
  | "optical_interferometer"
  | "confocal_laser_scan"
  | "afm_atomic_force"
  | "portable_handheld";

interface SurfaceRoughnessData {
  resolution: number;
  measureRange: number;
  speed: number;
  portability: number;
  srCost: number;
  nonContact: boolean;
  forShopFloor: boolean;
  principle: string;
  bestUse: string;
}

const DATA: Record<SurfaceRoughnessType, SurfaceRoughnessData> = {
  contact_stylus_probe: {
    resolution: 8, measureRange: 8, speed: 6, portability: 5, srCost: 5,
    nonContact: false, forShopFloor: false,
    principle: "diamond_stylus_tip_traverse_surface_profile_trace",
    bestUse: "machine_shop_qc_ra_rz_measurement_standard_method",
  },
  optical_interferometer: {
    resolution: 10, measureRange: 6, speed: 9, portability: 3, srCost: 9,
    nonContact: true, forShopFloor: false,
    principle: "white_light_interferometry_3d_surface_topography",
    bestUse: "semiconductor_wafer_optics_coating_sub_nm_analysis",
  },
  confocal_laser_scan: {
    resolution: 9, measureRange: 7, speed: 8, portability: 4, srCost: 8,
    nonContact: true, forShopFloor: false,
    principle: "laser_confocal_pinhole_z_scan_3d_color_height_map",
    bestUse: "precision_mold_insert_medical_implant_fine_surface",
  },
  afm_atomic_force: {
    resolution: 10, measureRange: 2, speed: 3, portability: 1, srCost: 10,
    nonContact: true, forShopFloor: false,
    principle: "cantilever_tip_atomic_force_nano_scale_topography",
    bestUse: "nano_material_research_thin_film_step_height_atomic",
  },
  portable_handheld: {
    resolution: 5, measureRange: 6, speed: 9, portability: 10, srCost: 3,
    nonContact: false, forShopFloor: true,
    principle: "skid_stylus_battery_powered_digital_display_quick",
    bestUse: "shop_floor_incoming_inspection_quick_ra_check_field",
  },
};

function get(t: SurfaceRoughnessType): SurfaceRoughnessData {
  return DATA[t];
}

export const resolution = (t: SurfaceRoughnessType) => get(t).resolution;
export const measureRange = (t: SurfaceRoughnessType) => get(t).measureRange;
export const speed = (t: SurfaceRoughnessType) => get(t).speed;
export const portability = (t: SurfaceRoughnessType) => get(t).portability;
export const srCost = (t: SurfaceRoughnessType) => get(t).srCost;
export const nonContact = (t: SurfaceRoughnessType) => get(t).nonContact;
export const forShopFloor = (t: SurfaceRoughnessType) => get(t).forShopFloor;
export const principle = (t: SurfaceRoughnessType) => get(t).principle;
export const bestUse = (t: SurfaceRoughnessType) => get(t).bestUse;
export const surfaceRoughnessTypes = (): SurfaceRoughnessType[] =>
  Object.keys(DATA) as SurfaceRoughnessType[];
