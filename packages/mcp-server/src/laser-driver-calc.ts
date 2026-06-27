export type LaserDriver =
  | "cml_current_mode"
  | "tia_modulator"
  | "linear_analog"
  | "burst_mode_pon"
  | "coherent_dsp_ic";

const DATA: Record<LaserDriver, {
  dataRate: number; outputSwing: number; jitter: number;
  powerDraw: number; driverCost: number; dualRate: boolean;
  forDatacenter: boolean; interface_: string; bestUse: string;
}> = {
  cml_current_mode: {
    dataRate: 7, outputSwing: 6, jitter: 7,
    powerDraw: 5, driverCost: 4, dualRate: false,
    forDatacenter: true, interface_: "differential_cml_50ohm",
    bestUse: "sfp_plus_10g_tx",
  },
  tia_modulator: {
    dataRate: 9, outputSwing: 9, jitter: 8,
    powerDraw: 7, driverCost: 8, dualRate: false,
    forDatacenter: true, interface_: "mach_zehnder_rf_drive",
    bestUse: "400g_qsfp_dd_pam4",
  },
  linear_analog: {
    dataRate: 5, outputSwing: 8, jitter: 5,
    powerDraw: 4, driverCost: 3, dualRate: false,
    forDatacenter: false, interface_: "single_ended_analog",
    bestUse: "catv_analog_transmit",
  },
  burst_mode_pon: {
    dataRate: 6, outputSwing: 7, jitter: 6,
    powerDraw: 3, driverCost: 5, dualRate: true,
    forDatacenter: false, interface_: "burst_enable_bias_t",
    bestUse: "gpon_onu_upstream",
  },
  coherent_dsp_ic: {
    dataRate: 10, outputSwing: 10, jitter: 9,
    powerDraw: 9, driverCost: 10, dualRate: true,
    forDatacenter: true, interface_: "dp_iq_coherent_4ch",
    bestUse: "800g_zr_plus_dwdm",
  },
};

const get = (t: LaserDriver) => DATA[t];

export const dataRate = (t: LaserDriver) => get(t).dataRate;
export const outputSwing = (t: LaserDriver) => get(t).outputSwing;
export const jitter = (t: LaserDriver) => get(t).jitter;
export const powerDraw = (t: LaserDriver) => get(t).powerDraw;
export const driverCost = (t: LaserDriver) => get(t).driverCost;
export const dualRate = (t: LaserDriver) => get(t).dualRate;
export const forDatacenter = (t: LaserDriver) => get(t).forDatacenter;
export const interface_ = (t: LaserDriver) => get(t).interface_;
export const bestUse = (t: LaserDriver) => get(t).bestUse;
export const laserDrivers = (): LaserDriver[] => Object.keys(DATA) as LaserDriver[];
