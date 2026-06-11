export type SignalConditionerType =
  | "isolation_amplifier"
  | "filter_conditioner"
  | "bridge_conditioner"
  | "charge_amplifier"
  | "frequency_converter";

interface SignalConditionerData {
  accuracy: number;
  throughput: number;
  isolation: number;
  bandwidth: number;
  scCost: number;
  galvanicIsolation: boolean;
  forFieldBus: boolean;
  conditionerConfig: string;
  bestUse: string;
}

const DATA: Record<SignalConditionerType, SignalConditionerData> = {
  isolation_amplifier: {
    accuracy: 8, throughput: 8, isolation: 10, bandwidth: 7, scCost: 5,
    galvanicIsolation: true, forFieldBus: true,
    conditionerConfig: "isolation_amplifier_galvanic_barrier_4_20ma_loop_powered_safe",
    bestUse: "hazardous_area_isolation_amplifier_galvanic_barrier_loop_power",
  },
  filter_conditioner: {
    accuracy: 7, throughput: 9, isolation: 6, bandwidth: 9, scCost: 4,
    galvanicIsolation: false, forFieldBus: false,
    conditionerConfig: "filter_conditioner_lowpass_antialiasing_noise_reject_clean_signal",
    bestUse: "data_acquisition_filter_conditioner_antialiasing_noise_reject_clean",
  },
  bridge_conditioner: {
    accuracy: 10, throughput: 7, isolation: 8, bandwidth: 6, scCost: 7,
    galvanicIsolation: true, forFieldBus: true,
    conditionerConfig: "bridge_conditioner_excitation_amplify_balance_shunt_cal_strain",
    bestUse: "strain_gauge_bridge_conditioner_excitation_amplify_balance_precise",
  },
  charge_amplifier: {
    accuracy: 9, throughput: 10, isolation: 7, bandwidth: 10, scCost: 8,
    galvanicIsolation: false, forFieldBus: false,
    conditionerConfig: "charge_amplifier_piezo_high_impedance_convert_voltage_fast_dynamic",
    bestUse: "vibration_test_charge_amplifier_piezo_convert_fast_dynamic_wide",
  },
  frequency_converter: {
    accuracy: 8, throughput: 8, isolation: 9, bandwidth: 8, scCost: 6,
    galvanicIsolation: true, forFieldBus: true,
    conditionerConfig: "frequency_converter_pulse_scale_divide_analog_out_speed_flow",
    bestUse: "turbine_meter_frequency_converter_pulse_to_analog_speed_flow",
  },
};

function get(t: SignalConditionerType): SignalConditionerData {
  return DATA[t];
}

export const accuracy = (t: SignalConditionerType) => get(t).accuracy;
export const throughput = (t: SignalConditionerType) => get(t).throughput;
export const isolation = (t: SignalConditionerType) => get(t).isolation;
export const bandwidth = (t: SignalConditionerType) => get(t).bandwidth;
export const scCost = (t: SignalConditionerType) => get(t).scCost;
export const galvanicIsolation = (t: SignalConditionerType) => get(t).galvanicIsolation;
export const forFieldBus = (t: SignalConditionerType) => get(t).forFieldBus;
export const conditionerConfig = (t: SignalConditionerType) => get(t).conditionerConfig;
export const bestUse = (t: SignalConditionerType) => get(t).bestUse;
export const signalConditionerTypes = (): SignalConditionerType[] =>
  Object.keys(DATA) as SignalConditionerType[];
