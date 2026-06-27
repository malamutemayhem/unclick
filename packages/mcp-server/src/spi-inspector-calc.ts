export type SpiInspectorType =
  | "laser_triangulation"
  | "moiri_fringe"
  | "confocal_chromatic"
  | "white_light_phase"
  | "dual_projection";

interface SpiInspectorData {
  heightAccuracy: number;
  measureSpeed: number;
  resolution: number;
  repeatability: number;
  spiCost: number;
  inline: boolean;
  forMicroPad: boolean;
  measureMethod: string;
  bestUse: string;
}

const DATA: Record<SpiInspectorType, SpiInspectorData> = {
  laser_triangulation: {
    heightAccuracy: 8, measureSpeed: 9, resolution: 7, repeatability: 8, spiCost: 6,
    inline: true, forMicroPad: false,
    measureMethod: "laser_line_scan_triangulate_paste_height_volume_area_calc",
    bestUse: "standard_smt_line_paste_volume_height_area_bridge_detect",
  },
  moiri_fringe: {
    heightAccuracy: 9, measureSpeed: 8, resolution: 9, repeatability: 9, spiCost: 8,
    inline: true, forMicroPad: true,
    measureMethod: "projected_grating_pattern_phase_shift_3d_surface_reconstruct",
    bestUse: "fine_pitch_bga_csp_01005_high_resolution_paste_inspection",
  },
  confocal_chromatic: {
    heightAccuracy: 10, measureSpeed: 6, resolution: 10, repeatability: 10, spiCost: 9,
    inline: true, forMicroPad: true,
    measureMethod: "chromatic_confocal_point_measure_nanometer_height_accuracy",
    bestUse: "wafer_level_package_flip_chip_ultra_fine_pitch_bump_measure",
  },
  white_light_phase: {
    heightAccuracy: 9, measureSpeed: 9, resolution: 8, repeatability: 9, spiCost: 7,
    inline: true, forMicroPad: true,
    measureMethod: "white_light_multi_frequency_phase_shift_fast_3d_measure",
    bestUse: "high_volume_automotive_mixed_board_fast_accurate_inline",
  },
  dual_projection: {
    heightAccuracy: 8, measureSpeed: 10, resolution: 8, repeatability: 8, spiCost: 7,
    inline: true, forMicroPad: false,
    measureMethod: "dual_angle_projection_eliminate_shadow_robust_board_warp",
    bestUse: "warped_board_large_panel_thick_stencil_robust_measurement",
  },
};

function get(t: SpiInspectorType): SpiInspectorData {
  return DATA[t];
}

export const heightAccuracy = (t: SpiInspectorType) => get(t).heightAccuracy;
export const measureSpeed = (t: SpiInspectorType) => get(t).measureSpeed;
export const resolution = (t: SpiInspectorType) => get(t).resolution;
export const repeatability = (t: SpiInspectorType) => get(t).repeatability;
export const spiCost = (t: SpiInspectorType) => get(t).spiCost;
export const inline = (t: SpiInspectorType) => get(t).inline;
export const forMicroPad = (t: SpiInspectorType) => get(t).forMicroPad;
export const measureMethod = (t: SpiInspectorType) => get(t).measureMethod;
export const bestUse = (t: SpiInspectorType) => get(t).bestUse;
export const spiInspectorTypes = (): SpiInspectorType[] =>
  Object.keys(DATA) as SpiInspectorType[];
