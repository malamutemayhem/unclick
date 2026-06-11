export type SecurityCameraType =
  | "dome_fixed_indoor"
  | "bullet_long_range"
  | "ptz_pan_tilt_zoom"
  | "fisheye_360_panoramic"
  | "thermal_imaging_ir";

interface SecurityCameraData {
  resolution: number;
  nightVision: number;
  coverage: number;
  durability: number;
  scCost: number;
  outdoor: boolean;
  forPerimeter: boolean;
  lens: string;
  bestUse: string;
}

const DATA: Record<SecurityCameraType, SecurityCameraData> = {
  dome_fixed_indoor: {
    resolution: 7, nightVision: 6, coverage: 6, durability: 7, scCost: 3,
    outdoor: false, forPerimeter: false,
    lens: "varifocal_2_8_12mm_fixed",
    bestUse: "retail_office_indoor_general",
  },
  bullet_long_range: {
    resolution: 8, nightVision: 9, coverage: 5, durability: 9, scCost: 5,
    outdoor: true, forPerimeter: true,
    lens: "motorized_5_50mm_telephoto",
    bestUse: "parking_lot_perimeter_fence",
  },
  ptz_pan_tilt_zoom: {
    resolution: 9, nightVision: 8, coverage: 10, durability: 7, scCost: 9,
    outdoor: true, forPerimeter: true,
    lens: "motorized_4_7_94mm_20x_zoom",
    bestUse: "large_campus_active_monitor",
  },
  fisheye_360_panoramic: {
    resolution: 7, nightVision: 6, coverage: 10, durability: 7, scCost: 6,
    outdoor: false, forPerimeter: false,
    lens: "fisheye_1_6mm_360_dewarping",
    bestUse: "open_floor_retail_warehouse",
  },
  thermal_imaging_ir: {
    resolution: 5, nightVision: 10, coverage: 7, durability: 9, scCost: 10,
    outdoor: true, forPerimeter: true,
    lens: "germanium_thermal_19mm_fov",
    bestUse: "critical_perimeter_zero_light",
  },
};

function get(t: SecurityCameraType): SecurityCameraData {
  return DATA[t];
}

export const resolution = (t: SecurityCameraType) => get(t).resolution;
export const nightVision = (t: SecurityCameraType) => get(t).nightVision;
export const coverage = (t: SecurityCameraType) => get(t).coverage;
export const durability = (t: SecurityCameraType) => get(t).durability;
export const scCost = (t: SecurityCameraType) => get(t).scCost;
export const outdoor = (t: SecurityCameraType) => get(t).outdoor;
export const forPerimeter = (t: SecurityCameraType) => get(t).forPerimeter;
export const lens = (t: SecurityCameraType) => get(t).lens;
export const bestUse = (t: SecurityCameraType) => get(t).bestUse;
export const securityCameraTypes = (): SecurityCameraType[] =>
  Object.keys(DATA) as SecurityCameraType[];
