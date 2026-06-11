export type CtScannerType =
  | "micro_ct"
  | "nano_ct"
  | "industrial_ct"
  | "inline_ct"
  | "dual_energy_ct";

interface CtScannerData {
  voxelResolution: number;
  throughput: number;
  penetration: number;
  scanVolume: number;
  ctCost_: number;
  realTime: boolean;
  forAmQuality: boolean;
  scannerConfig: string;
  bestUse: string;
}

const DATA: Record<CtScannerType, CtScannerData> = {
  micro_ct: {
    voxelResolution: 8, throughput: 5, penetration: 6, scanVolume: 6, ctCost_: 7,
    realTime: false, forAmQuality: true,
    scannerConfig: "micro_ct_scanner_xray_tube_rotate_detector_sub_micron_voxel_3d",
    bestUse: "am_porosity_micro_ct_scanner_internal_void_3d_map_defect_size",
  },
  nano_ct: {
    voxelResolution: 9, throughput: 3, penetration: 4, scanVolume: 3, ctCost_: 9,
    realTime: false, forAmQuality: false,
    scannerConfig: "nano_ct_scanner_synchrotron_source_sub_100nm_voxel_high_flux",
    bestUse: "fiber_composite_nano_ct_scanner_sub_micron_fiber_matrix_crack",
  },
  industrial_ct: {
    voxelResolution: 6, throughput: 7, penetration: 9, scanVolume: 9, ctCost_: 8,
    realTime: false, forAmQuality: true,
    scannerConfig: "industrial_ct_scanner_high_energy_linac_thick_metal_large_part",
    bestUse: "cast_block_industrial_ct_scanner_thick_steel_shrinkage_crack",
  },
  inline_ct: {
    voxelResolution: 5, throughput: 9, penetration: 6, scanVolume: 5, ctCost_: 8,
    realTime: true, forAmQuality: false,
    scannerConfig: "inline_ct_scanner_conveyor_fast_scan_100_percent_check_reject",
    bestUse: "production_line_inline_ct_scanner_100_percent_inspect_auto_reject",
  },
  dual_energy_ct: {
    voxelResolution: 7, throughput: 6, penetration: 8, scanVolume: 7, ctCost_: 8,
    realTime: false, forAmQuality: true,
    scannerConfig: "dual_energy_ct_scanner_two_voltage_material_discriminate_density",
    bestUse: "multi_material_dual_energy_ct_scanner_material_density_separate",
  },
};

function get(t: CtScannerType): CtScannerData {
  return DATA[t];
}

export const voxelResolution = (t: CtScannerType) => get(t).voxelResolution;
export const throughput = (t: CtScannerType) => get(t).throughput;
export const penetration = (t: CtScannerType) => get(t).penetration;
export const scanVolume = (t: CtScannerType) => get(t).scanVolume;
export const ctCost_ = (t: CtScannerType) => get(t).ctCost_;
export const realTime = (t: CtScannerType) => get(t).realTime;
export const forAmQuality = (t: CtScannerType) => get(t).forAmQuality;
export const scannerConfig = (t: CtScannerType) => get(t).scannerConfig;
export const bestUse = (t: CtScannerType) => get(t).bestUse;
export const ctScannerTypes = (): CtScannerType[] =>
  Object.keys(DATA) as CtScannerType[];
