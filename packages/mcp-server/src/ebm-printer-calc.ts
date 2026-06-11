export type EbmPrinterType =
  | "standard_ebm"
  | "large_build_ebm"
  | "multi_beam_ebm"
  | "high_preheat_ebm"
  | "wire_feed_ebm";

interface EbmPrinterData {
  partDensity: number;
  throughput: number;
  residualStress: number;
  buildRate: number;
  ebCost: number;
  vacuumProcess: boolean;
  forTitanium: boolean;
  printerConfig: string;
  bestUse: string;
}

const DATA: Record<EbmPrinterType, EbmPrinterData> = {
  standard_ebm: {
    partDensity: 9, throughput: 7, residualStress: 9, buildRate: 7, ebCost: 8,
    vacuumProcess: true, forTitanium: true,
    printerConfig: "standard_ebm_printer_electron_beam_vacuum_preheat_titanium_melt",
    bestUse: "hip_implant_standard_ebm_printer_titanium_porous_lattice_bone",
  },
  large_build_ebm: {
    partDensity: 8, throughput: 8, residualStress: 8, buildRate: 8, ebCost: 9,
    vacuumProcess: true, forTitanium: true,
    printerConfig: "large_build_ebm_printer_wide_chamber_multi_part_batch_titanium",
    bestUse: "aero_bracket_large_build_ebm_printer_batch_titanium_structural",
  },
  multi_beam_ebm: {
    partDensity: 9, throughput: 9, residualStress: 9, buildRate: 9, ebCost: 9,
    vacuumProcess: true, forTitanium: true,
    printerConfig: "multi_beam_ebm_printer_split_beam_simultaneous_melt_fast_layer",
    bestUse: "production_part_multi_beam_ebm_printer_fast_melt_rate_volume",
  },
  high_preheat_ebm: {
    partDensity: 9, throughput: 6, residualStress: 9, buildRate: 6, ebCost: 8,
    vacuumProcess: true, forTitanium: false,
    printerConfig: "high_preheat_ebm_printer_1100c_bed_gamma_tial_intermetallic_melt",
    bestUse: "turbine_blade_high_preheat_ebm_printer_gamma_tial_low_ductility",
  },
  wire_feed_ebm: {
    partDensity: 8, throughput: 8, residualStress: 7, buildRate: 9, ebCost: 7,
    vacuumProcess: true, forTitanium: true,
    printerConfig: "wire_feed_ebm_printer_wire_spool_beam_melt_near_net_shape_large",
    bestUse: "near_net_preform_wire_feed_ebm_printer_large_titanium_rough_shape",
  },
};

function get(t: EbmPrinterType): EbmPrinterData {
  return DATA[t];
}

export const partDensity = (t: EbmPrinterType) => get(t).partDensity;
export const throughput = (t: EbmPrinterType) => get(t).throughput;
export const residualStress = (t: EbmPrinterType) => get(t).residualStress;
export const buildRate = (t: EbmPrinterType) => get(t).buildRate;
export const ebCost = (t: EbmPrinterType) => get(t).ebCost;
export const vacuumProcess = (t: EbmPrinterType) => get(t).vacuumProcess;
export const forTitanium = (t: EbmPrinterType) => get(t).forTitanium;
export const printerConfig = (t: EbmPrinterType) => get(t).printerConfig;
export const bestUse = (t: EbmPrinterType) => get(t).bestUse;
export const ebmPrinterTypes = (): EbmPrinterType[] =>
  Object.keys(DATA) as EbmPrinterType[];
