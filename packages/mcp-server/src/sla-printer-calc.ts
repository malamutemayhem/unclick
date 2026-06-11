export type SlaPrinterType =
  | "standard_sla"
  | "inverted_sla"
  | "large_format_sla"
  | "micro_sla"
  | "continuous_sla";

interface SlaPrinterData {
  resolution: number;
  throughput: number;
  surfaceFinish: number;
  buildVolume: number;
  spCost: number;
  bottomUp: boolean;
  forDental: boolean;
  printerConfig: string;
  bestUse: string;
}

const DATA: Record<SlaPrinterType, SlaPrinterData> = {
  standard_sla: {
    resolution: 8, throughput: 6, surfaceFinish: 9, buildVolume: 7, spCost: 7,
    bottomUp: false, forDental: false,
    printerConfig: "standard_sla_printer_uv_laser_galvo_mirror_vat_top_down_scan",
    bestUse: "prototype_part_standard_sla_printer_smooth_surface_fine_detail",
  },
  inverted_sla: {
    resolution: 8, throughput: 7, surfaceFinish: 8, buildVolume: 5, spCost: 5,
    bottomUp: true, forDental: true,
    printerConfig: "inverted_sla_printer_bottom_up_peel_film_lcd_mask_small_vat",
    bestUse: "dental_model_inverted_sla_printer_bottom_up_fast_small_detail",
  },
  large_format_sla: {
    resolution: 7, throughput: 5, surfaceFinish: 8, buildVolume: 9, spCost: 9,
    bottomUp: false, forDental: false,
    printerConfig: "large_format_sla_printer_big_vat_gantry_laser_full_size_pattern",
    bestUse: "foundry_pattern_large_format_sla_printer_full_size_cast_master",
  },
  micro_sla: {
    resolution: 9, throughput: 3, surfaceFinish: 9, buildVolume: 2, spCost: 8,
    bottomUp: true, forDental: false,
    printerConfig: "micro_sla_printer_two_photon_polymerize_sub_micron_feature_lens",
    bestUse: "microfluidic_chip_micro_sla_printer_sub_micron_channel_optic",
  },
  continuous_sla: {
    resolution: 7, throughput: 9, surfaceFinish: 7, buildVolume: 6, spCost: 8,
    bottomUp: true, forDental: true,
    printerConfig: "continuous_sla_printer_dead_zone_membrane_no_peel_fast_print",
    bestUse: "batch_dental_continuous_sla_printer_no_peel_fast_production_run",
  },
};

function get(t: SlaPrinterType): SlaPrinterData {
  return DATA[t];
}

export const resolution = (t: SlaPrinterType) => get(t).resolution;
export const throughput = (t: SlaPrinterType) => get(t).throughput;
export const surfaceFinish = (t: SlaPrinterType) => get(t).surfaceFinish;
export const buildVolume = (t: SlaPrinterType) => get(t).buildVolume;
export const spCost = (t: SlaPrinterType) => get(t).spCost;
export const bottomUp = (t: SlaPrinterType) => get(t).bottomUp;
export const forDental = (t: SlaPrinterType) => get(t).forDental;
export const printerConfig = (t: SlaPrinterType) => get(t).printerConfig;
export const bestUse = (t: SlaPrinterType) => get(t).bestUse;
export const slaPrinterTypes = (): SlaPrinterType[] =>
  Object.keys(DATA) as SlaPrinterType[];
