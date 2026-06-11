export type FuelGauge =
  | "coulomb_counter"
  | "voltage_lookup"
  | "impedance_track"
  | "kalman_filter_soc"
  | "machine_learning_soc";

const DATA: Record<FuelGauge, {
  socAccuracy: number; responseTime: number; computeLoad: number;
  agingCompensation: number; gaugeCost: number; selfCalibrate: boolean;
  forEv: boolean; method: string; bestUse: string;
}> = {
  coulomb_counter: {
    socAccuracy: 6, responseTime: 8, computeLoad: 3,
    agingCompensation: 4, gaugeCost: 3, selfCalibrate: false,
    forEv: false, method: "integrate_current_adc",
    bestUse: "power_tool_pack",
  },
  voltage_lookup: {
    socAccuracy: 4, responseTime: 10, computeLoad: 2,
    agingCompensation: 2, gaugeCost: 2, selfCalibrate: false,
    forEv: false, method: "ocv_table_interpolate",
    bestUse: "simple_battery_icon",
  },
  impedance_track: {
    socAccuracy: 9, responseTime: 7, computeLoad: 6,
    agingCompensation: 9, gaugeCost: 6, selfCalibrate: true,
    forEv: false, method: "eis_model_update",
    bestUse: "smartphone_battery",
  },
  kalman_filter_soc: {
    socAccuracy: 8, responseTime: 6, computeLoad: 8,
    agingCompensation: 7, gaugeCost: 7, selfCalibrate: true,
    forEv: true, method: "ekf_state_observer",
    bestUse: "ev_bms_pack_level",
  },
  machine_learning_soc: {
    socAccuracy: 10, responseTime: 5, computeLoad: 10,
    agingCompensation: 10, gaugeCost: 9, selfCalibrate: true,
    forEv: true, method: "lstm_rnn_inference",
    bestUse: "grid_storage_lifetime",
  },
};

const get = (t: FuelGauge) => DATA[t];

export const socAccuracy = (t: FuelGauge) => get(t).socAccuracy;
export const responseTime = (t: FuelGauge) => get(t).responseTime;
export const computeLoad = (t: FuelGauge) => get(t).computeLoad;
export const agingCompensation = (t: FuelGauge) => get(t).agingCompensation;
export const gaugeCost = (t: FuelGauge) => get(t).gaugeCost;
export const selfCalibrate = (t: FuelGauge) => get(t).selfCalibrate;
export const forEv = (t: FuelGauge) => get(t).forEv;
export const method = (t: FuelGauge) => get(t).method;
export const bestUse = (t: FuelGauge) => get(t).bestUse;
export const fuelGauges = (): FuelGauge[] => Object.keys(DATA) as FuelGauge[];
