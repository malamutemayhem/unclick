export type DlpPrinterType =
  | "desktop_dlp"
  | "production_dlp"
  | "micro_dlp"
  | "continuous_dlp"
  | "multi_material_dlp";

interface DlpPrinterData {
  resolution: number;
  throughput: number;
  layerUniformity: number;
  buildVolume: number;
  dpCost: number;
  fullLayer: boolean;
  forJewelry: boolean;
  printerConfig: string;
  bestUse: string;
}

const DATA: Record<DlpPrinterType, DlpPrinterData> = {
  desktop_dlp: {
    resolution: 8, throughput: 7, layerUniformity: 8, buildVolume: 4, dpCost: 4,
    fullLayer: true, forJewelry: true,
    printerConfig: "desktop_dlp_printer_led_projector_small_vat_bottom_up_expose",
    bestUse: "jewelry_cast_desktop_dlp_printer_fine_detail_wax_burnout_ring",
  },
  production_dlp: {
    resolution: 7, throughput: 9, layerUniformity: 9, buildVolume: 8, dpCost: 8,
    fullLayer: true, forJewelry: false,
    printerConfig: "production_dlp_printer_4k_projector_large_build_batch_expose",
    bestUse: "dental_aligner_production_dlp_printer_batch_tray_fast_serial",
  },
  micro_dlp: {
    resolution: 9, throughput: 3, layerUniformity: 9, buildVolume: 2, dpCost: 9,
    fullLayer: true, forJewelry: false,
    printerConfig: "micro_dlp_printer_high_mag_optic_micro_feature_sub_pixel_shift",
    bestUse: "mems_housing_micro_dlp_printer_sub_pixel_shift_micro_feature",
  },
  continuous_dlp: {
    resolution: 7, throughput: 9, layerUniformity: 7, buildVolume: 6, dpCost: 8,
    fullLayer: true, forJewelry: false,
    printerConfig: "continuous_dlp_printer_oxygen_membrane_no_peel_step_fast_grow",
    bestUse: "elastomer_part_continuous_dlp_printer_fast_grow_flexible_resin",
  },
  multi_material_dlp: {
    resolution: 8, throughput: 4, layerUniformity: 7, buildVolume: 5, dpCost: 9,
    fullLayer: true, forJewelry: false,
    printerConfig: "multi_material_dlp_printer_swap_vat_rinse_multi_resin_per_layer",
    bestUse: "overmold_proto_multi_material_dlp_printer_rigid_flexible_combo",
  },
};

function get(t: DlpPrinterType): DlpPrinterData {
  return DATA[t];
}

export const resolution = (t: DlpPrinterType) => get(t).resolution;
export const throughput = (t: DlpPrinterType) => get(t).throughput;
export const layerUniformity = (t: DlpPrinterType) => get(t).layerUniformity;
export const buildVolume = (t: DlpPrinterType) => get(t).buildVolume;
export const dpCost = (t: DlpPrinterType) => get(t).dpCost;
export const fullLayer = (t: DlpPrinterType) => get(t).fullLayer;
export const forJewelry = (t: DlpPrinterType) => get(t).forJewelry;
export const printerConfig = (t: DlpPrinterType) => get(t).printerConfig;
export const bestUse = (t: DlpPrinterType) => get(t).bestUse;
export const dlpPrinterTypes = (): DlpPrinterType[] =>
  Object.keys(DATA) as DlpPrinterType[];
