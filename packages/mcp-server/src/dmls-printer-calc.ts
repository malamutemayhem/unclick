export type DmlsPrinterType =
  | "single_laser"
  | "multi_laser"
  | "green_laser"
  | "large_format_dmls"
  | "micro_dmls";

interface DmlsPrinterData {
  partDensity: number;
  throughput: number;
  surfaceFinish: number;
  resolution: number;
  dmCost: number;
  multiBeam: boolean;
  forAerospace: boolean;
  printerConfig: string;
  bestUse: string;
}

const DATA: Record<DmlsPrinterType, DmlsPrinterData> = {
  single_laser: {
    partDensity: 9, throughput: 5, surfaceFinish: 7, resolution: 8, dmCost: 7,
    multiBeam: false, forAerospace: true,
    printerConfig: "single_laser_dmls_printer_fiber_laser_galvo_scan_inert_argon",
    bestUse: "turbine_blade_single_laser_dmls_printer_inconel_internal_cool",
  },
  multi_laser: {
    partDensity: 9, throughput: 9, surfaceFinish: 7, resolution: 7, dmCost: 9,
    multiBeam: true, forAerospace: true,
    printerConfig: "multi_laser_dmls_printer_four_laser_overlap_zone_fast_build",
    bestUse: "large_bracket_multi_laser_dmls_printer_titanium_fast_build_rate",
  },
  green_laser: {
    partDensity: 9, throughput: 6, surfaceFinish: 7, resolution: 8, dmCost: 8,
    multiBeam: false, forAerospace: false,
    printerConfig: "green_laser_dmls_printer_532nm_copper_reflective_alloy_process",
    bestUse: "copper_heat_sink_green_laser_dmls_printer_reflective_alloy_melt",
  },
  large_format_dmls: {
    partDensity: 8, throughput: 7, surfaceFinish: 6, resolution: 6, dmCost: 9,
    multiBeam: true, forAerospace: true,
    printerConfig: "large_format_dmls_printer_meter_class_build_multi_laser_chamber",
    bestUse: "rocket_nozzle_large_format_dmls_printer_meter_scale_single_piece",
  },
  micro_dmls: {
    partDensity: 9, throughput: 3, surfaceFinish: 8, resolution: 9, dmCost: 8,
    multiBeam: false, forAerospace: false,
    printerConfig: "micro_dmls_printer_fine_powder_small_spot_micro_feature_implant",
    bestUse: "medical_implant_micro_dmls_printer_fine_lattice_porous_surface",
  },
};

function get(t: DmlsPrinterType): DmlsPrinterData {
  return DATA[t];
}

export const partDensity = (t: DmlsPrinterType) => get(t).partDensity;
export const throughput = (t: DmlsPrinterType) => get(t).throughput;
export const surfaceFinish = (t: DmlsPrinterType) => get(t).surfaceFinish;
export const resolution = (t: DmlsPrinterType) => get(t).resolution;
export const dmCost = (t: DmlsPrinterType) => get(t).dmCost;
export const multiBeam = (t: DmlsPrinterType) => get(t).multiBeam;
export const forAerospace = (t: DmlsPrinterType) => get(t).forAerospace;
export const printerConfig = (t: DmlsPrinterType) => get(t).printerConfig;
export const bestUse = (t: DmlsPrinterType) => get(t).bestUse;
export const dmlsPrinterTypes = (): DmlsPrinterType[] =>
  Object.keys(DATA) as DmlsPrinterType[];
