export type SlsPrinterType =
  | "nylon_sls"
  | "tpu_sls"
  | "glass_filled_sls"
  | "multi_jet_fusion"
  | "high_speed_sinter";

interface SlsPrinterData {
  partStrength: number;
  throughput: number;
  surfaceFinish: number;
  packingDensity: number;
  slCost: number;
  supportFree: boolean;
  forFunctional: boolean;
  printerConfig: string;
  bestUse: string;
}

const DATA: Record<SlsPrinterType, SlsPrinterData> = {
  nylon_sls: {
    partStrength: 8, throughput: 7, surfaceFinish: 6, packingDensity: 8, slCost: 7,
    supportFree: true, forFunctional: true,
    printerConfig: "nylon_sls_printer_co2_laser_powder_bed_fuse_pa12_recycle_blend",
    bestUse: "functional_proto_nylon_sls_printer_pa12_strong_snap_fit_hinge",
  },
  tpu_sls: {
    partStrength: 5, throughput: 5, surfaceFinish: 5, packingDensity: 6, slCost: 8,
    supportFree: true, forFunctional: true,
    printerConfig: "tpu_sls_printer_co2_laser_elastomer_powder_flexible_lattice",
    bestUse: "shoe_midsole_tpu_sls_printer_flexible_lattice_cushion_custom",
  },
  glass_filled_sls: {
    partStrength: 9, throughput: 6, surfaceFinish: 5, packingDensity: 7, slCost: 8,
    supportFree: true, forFunctional: true,
    printerConfig: "glass_filled_sls_printer_pa_gf_powder_high_stiffness_heat_resist",
    bestUse: "under_hood_bracket_glass_filled_sls_printer_stiff_heat_resist",
  },
  multi_jet_fusion: {
    partStrength: 8, throughput: 9, surfaceFinish: 7, packingDensity: 9, slCost: 7,
    supportFree: true, forFunctional: true,
    printerConfig: "multi_jet_fusion_printer_inkjet_fusing_agent_ir_lamp_fast_layer",
    bestUse: "production_run_multi_jet_fusion_printer_batch_fast_strong_part",
  },
  high_speed_sinter: {
    partStrength: 7, throughput: 9, surfaceFinish: 6, packingDensity: 8, slCost: 6,
    supportFree: true, forFunctional: false,
    printerConfig: "high_speed_sinter_printer_inkjet_absorber_ir_flash_open_source",
    bestUse: "batch_enclosure_high_speed_sinter_printer_low_cost_volume_run",
  },
};

function get(t: SlsPrinterType): SlsPrinterData {
  return DATA[t];
}

export const partStrength = (t: SlsPrinterType) => get(t).partStrength;
export const throughput = (t: SlsPrinterType) => get(t).throughput;
export const surfaceFinish = (t: SlsPrinterType) => get(t).surfaceFinish;
export const packingDensity = (t: SlsPrinterType) => get(t).packingDensity;
export const slCost = (t: SlsPrinterType) => get(t).slCost;
export const supportFree = (t: SlsPrinterType) => get(t).supportFree;
export const forFunctional = (t: SlsPrinterType) => get(t).forFunctional;
export const printerConfig = (t: SlsPrinterType) => get(t).printerConfig;
export const bestUse = (t: SlsPrinterType) => get(t).bestUse;
export const slsPrinterTypes = (): SlsPrinterType[] =>
  Object.keys(DATA) as SlsPrinterType[];
