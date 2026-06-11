export type NdiScannerType =
  | "phased_array_ut"
  | "thermography_flash"
  | "shearography_laser"
  | "xray_ct_scan"
  | "tap_test_digital";

interface NdiScannerData {
  defectResolution: number;
  throughput: number;
  depthRange: number;
  areaRate: number;
  ndCost: number;
  contactFree: boolean;
  forInService: boolean;
  scannerConfig: string;
  bestUse: string;
}

const DATA: Record<NdiScannerType, NdiScannerData> = {
  phased_array_ut: {
    defectResolution: 9, throughput: 7, depthRange: 9, areaRate: 7, ndCost: 7,
    contactFree: false, forInService: true,
    scannerConfig: "phased_array_ut_ndi_scanner_multi_element_probe_beam_steer_map",
    bestUse: "laminate_scan_phased_array_ut_ndi_scanner_delamination_porosity",
  },
  thermography_flash: {
    defectResolution: 7, throughput: 9, depthRange: 5, areaRate: 9, ndCost: 6,
    contactFree: true, forInService: true,
    scannerConfig: "thermography_flash_ndi_scanner_xenon_pulse_ir_camera_decay_map",
    bestUse: "large_panel_thermography_flash_ndi_scanner_fast_area_scan_bond",
  },
  shearography_laser: {
    defectResolution: 7, throughput: 8, depthRange: 4, areaRate: 8, ndCost: 8,
    contactFree: true, forInService: true,
    scannerConfig: "shearography_laser_ndi_scanner_speckle_pattern_vacuum_stress",
    bestUse: "honeycomb_panel_shearography_laser_ndi_scanner_disbond_detect",
  },
  xray_ct_scan: {
    defectResolution: 9, throughput: 3, depthRange: 9, areaRate: 3, ndCost: 9,
    contactFree: true, forInService: false,
    scannerConfig: "xray_ct_scan_ndi_scanner_rotate_source_detector_3d_reconstruct",
    bestUse: "critical_joint_xray_ct_scan_ndi_scanner_3d_void_crack_porosity",
  },
  tap_test_digital: {
    defectResolution: 4, throughput: 6, depthRange: 3, areaRate: 6, ndCost: 2,
    contactFree: false, forInService: true,
    scannerConfig: "tap_test_digital_ndi_scanner_impact_hammer_accelerometer_map",
    bestUse: "field_check_tap_test_digital_ndi_scanner_quick_disbond_screen",
  },
};

function get(t: NdiScannerType): NdiScannerData {
  return DATA[t];
}

export const defectResolution = (t: NdiScannerType) => get(t).defectResolution;
export const throughput = (t: NdiScannerType) => get(t).throughput;
export const depthRange = (t: NdiScannerType) => get(t).depthRange;
export const areaRate = (t: NdiScannerType) => get(t).areaRate;
export const ndCost = (t: NdiScannerType) => get(t).ndCost;
export const contactFree = (t: NdiScannerType) => get(t).contactFree;
export const forInService = (t: NdiScannerType) => get(t).forInService;
export const scannerConfig = (t: NdiScannerType) => get(t).scannerConfig;
export const bestUse = (t: NdiScannerType) => get(t).bestUse;
export const ndiScannerTypes = (): NdiScannerType[] =>
  Object.keys(DATA) as NdiScannerType[];
