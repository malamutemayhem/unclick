export type BarcodeScanType =
  | "laser_line_1d"
  | "linear_imager_ccd"
  | "area_imager_2d"
  | "dpm_reader_direct_part"
  | "fixed_mount_tunnel";

interface BarcodeScanData {
  readRate: number;
  range: number;
  dpmCapable: number;
  durability: number;
  bsCost: number;
  wireless: boolean;
  forDpm: boolean;
  illumination: string;
  bestUse: string;
}

const DATA: Record<BarcodeScanType, BarcodeScanData> = {
  laser_line_1d: {
    readRate: 7, range: 9, dpmCapable: 2, durability: 7, bsCost: 3,
    wireless: true, forDpm: false,
    illumination: "visible_laser_diode_650nm",
    bestUse: "retail_pos_warehouse_1d_barcode",
  },
  linear_imager_ccd: {
    readRate: 8, range: 6, dpmCapable: 3, durability: 8, bsCost: 4,
    wireless: true, forDpm: false,
    illumination: "led_array_linear_red_white",
    bestUse: "retail_healthcare_badge_scan",
  },
  area_imager_2d: {
    readRate: 9, range: 8, dpmCapable: 7, durability: 8, bsCost: 6,
    wireless: true, forDpm: false,
    illumination: "white_led_aimer_crosshair",
    bestUse: "logistics_qr_datamatrix_mobile",
  },
  dpm_reader_direct_part: {
    readRate: 8, range: 5, dpmCapable: 10, durability: 10, bsCost: 9,
    wireless: false, forDpm: true,
    illumination: "multi_angle_dome_diffuse_dark",
    bestUse: "auto_aero_direct_part_mark_read",
  },
  fixed_mount_tunnel: {
    readRate: 10, range: 7, dpmCapable: 6, durability: 9, bsCost: 8,
    wireless: false, forDpm: false,
    illumination: "omnidirectional_multi_laser_led",
    bestUse: "conveyor_sort_high_speed_omni",
  },
};

function get(t: BarcodeScanType): BarcodeScanData {
  return DATA[t];
}

export const readRate = (t: BarcodeScanType) => get(t).readRate;
export const range = (t: BarcodeScanType) => get(t).range;
export const dpmCapable = (t: BarcodeScanType) => get(t).dpmCapable;
export const durability = (t: BarcodeScanType) => get(t).durability;
export const bsCost = (t: BarcodeScanType) => get(t).bsCost;
export const wireless = (t: BarcodeScanType) => get(t).wireless;
export const forDpm = (t: BarcodeScanType) => get(t).forDpm;
export const illumination = (t: BarcodeScanType) => get(t).illumination;
export const bestUse = (t: BarcodeScanType) => get(t).bestUse;
export const barcodeScanTypes = (): BarcodeScanType[] =>
  Object.keys(DATA) as BarcodeScanType[];
