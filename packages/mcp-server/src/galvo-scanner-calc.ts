export type GalvoScannerType =
  | "single_axis_galvo"
  | "dual_axis_galvo"
  | "three_axis_galvo"
  | "polygon_scanner"
  | "resonant_scanner";

interface GalvoScannerData {
  scanSpeed: number;
  throughput: number;
  fieldSize: number;
  positionAccuracy: number;
  gsCost_: number;
  closedLoop: boolean;
  forMarking: boolean;
  scannerConfig: string;
  bestUse: string;
}

const DATA: Record<GalvoScannerType, GalvoScannerData> = {
  single_axis_galvo: {
    scanSpeed: 7, throughput: 7, fieldSize: 5, positionAccuracy: 8, gsCost_: 3,
    closedLoop: true, forMarking: false,
    scannerConfig: "single_axis_galvo_scanner_mirror_deflect_one_plane_line_scan",
    bestUse: "barcode_read_single_axis_galvo_scanner_line_scan_fast_deflect",
  },
  dual_axis_galvo: {
    scanSpeed: 9, throughput: 9, fieldSize: 8, positionAccuracy: 9, gsCost_: 6,
    closedLoop: true, forMarking: true,
    scannerConfig: "dual_axis_galvo_scanner_xy_mirror_pair_flat_field_f_theta_lens",
    bestUse: "laser_marking_dual_axis_galvo_scanner_xy_deflect_f_theta_precise",
  },
  three_axis_galvo: {
    scanSpeed: 8, throughput: 8, fieldSize: 10, positionAccuracy: 8, gsCost_: 9,
    closedLoop: true, forMarking: true,
    scannerConfig: "three_axis_galvo_scanner_xy_plus_z_focus_shift_3d_surface_mark",
    bestUse: "3d_surface_three_axis_galvo_scanner_focus_shift_curved_part_mark",
  },
  polygon_scanner: {
    scanSpeed: 10, throughput: 10, fieldSize: 7, positionAccuracy: 6, gsCost_: 7,
    closedLoop: false, forMarking: false,
    scannerConfig: "polygon_scanner_rotating_mirror_facet_very_high_speed_line_scan",
    bestUse: "laser_printer_polygon_scanner_very_high_speed_raster_line_expose",
  },
  resonant_scanner: {
    scanSpeed: 10, throughput: 7, fieldSize: 6, positionAccuracy: 7, gsCost_: 5,
    closedLoop: false, forMarking: false,
    scannerConfig: "resonant_scanner_tuning_fork_mirror_sinusoidal_ultra_fast_imaging",
    bestUse: "confocal_microscope_resonant_scanner_ultra_fast_sinusoidal_imaging",
  },
};

function get(t: GalvoScannerType): GalvoScannerData {
  return DATA[t];
}

export const scanSpeed = (t: GalvoScannerType) => get(t).scanSpeed;
export const throughput = (t: GalvoScannerType) => get(t).throughput;
export const fieldSize = (t: GalvoScannerType) => get(t).fieldSize;
export const positionAccuracy = (t: GalvoScannerType) => get(t).positionAccuracy;
export const gsCost_ = (t: GalvoScannerType) => get(t).gsCost_;
export const closedLoop = (t: GalvoScannerType) => get(t).closedLoop;
export const forMarking = (t: GalvoScannerType) => get(t).forMarking;
export const scannerConfig = (t: GalvoScannerType) => get(t).scannerConfig;
export const bestUse = (t: GalvoScannerType) => get(t).bestUse;
export const galvoScannerTypes = (): GalvoScannerType[] =>
  Object.keys(DATA) as GalvoScannerType[];
