export type IcPackageType =
  | "qfp_quad_flat"
  | "bga_ball_grid"
  | "qfn_quad_flat_no"
  | "soic_small_outline"
  | "wlcsp_wafer_level";

const DATA: Record<IcPackageType, {
  pinCount: number; thermalPerf: number; signalIntegrity: number;
  boardArea: number; packageCost: number; leadless: boolean;
  forHighSpeed: boolean; mountStyle: string; bestUse: string;
}> = {
  qfp_quad_flat: { pinCount: 8, thermalPerf: 5, signalIntegrity: 5, boardArea: 4, packageCost: 3, leadless: false, forHighSpeed: false, mountStyle: "gull_wing_solder", bestUse: "mid_pin_count_mcu" },
  bga_ball_grid: { pinCount: 10, thermalPerf: 9, signalIntegrity: 9, boardArea: 8, packageCost: 7, leadless: true, forHighSpeed: true, mountStyle: "solder_ball_reflow", bestUse: "high_pin_fpga_processor" },
  qfn_quad_flat_no: { pinCount: 6, thermalPerf: 8, signalIntegrity: 7, boardArea: 9, packageCost: 4, leadless: true, forHighSpeed: true, mountStyle: "exposed_pad_reflow", bestUse: "compact_power_ic" },
  soic_small_outline: { pinCount: 3, thermalPerf: 4, signalIntegrity: 4, boardArea: 3, packageCost: 2, leadless: false, forHighSpeed: false, mountStyle: "gull_wing_solder", bestUse: "low_pin_analog_logic" },
  wlcsp_wafer_level: { pinCount: 7, thermalPerf: 7, signalIntegrity: 10, boardArea: 10, packageCost: 8, leadless: true, forHighSpeed: true, mountStyle: "direct_die_bump", bestUse: "mobile_rf_smallest_form" },
};

const get = (t: IcPackageType) => DATA[t];

export const pinCount = (t: IcPackageType) => get(t).pinCount;
export const thermalPerf = (t: IcPackageType) => get(t).thermalPerf;
export const signalIntegrity = (t: IcPackageType) => get(t).signalIntegrity;
export const boardArea = (t: IcPackageType) => get(t).boardArea;
export const packageCost = (t: IcPackageType) => get(t).packageCost;
export const leadless = (t: IcPackageType) => get(t).leadless;
export const forHighSpeed = (t: IcPackageType) => get(t).forHighSpeed;
export const mountStyle = (t: IcPackageType) => get(t).mountStyle;
export const bestUse = (t: IcPackageType) => get(t).bestUse;
export const icPackages = (): IcPackageType[] => Object.keys(DATA) as IcPackageType[];
