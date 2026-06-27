export type AnalogSwitch =
  | "spst_nmos_single"
  | "spdt_cmos_complementary"
  | "mux_4to1_cmos"
  | "t_gate_transmission"
  | "high_voltage_nmos";

const DATA: Record<AnalogSwitch, {
  onResist: number; offIsolation: number; bandwidth: number;
  chargeInject: number; asCost: number; bidirectional: boolean;
  forAudio: boolean; topology: string; bestUse: string;
}> = {
  spst_nmos_single: {
    onResist: 5, offIsolation: 6, bandwidth: 7,
    chargeInject: 6, asCost: 1, bidirectional: true,
    forAudio: false, topology: "single_nmos_pass_gate",
    bestUse: "power_rail_load_switch",
  },
  spdt_cmos_complementary: {
    onResist: 7, offIsolation: 8, bandwidth: 8,
    chargeInject: 7, asCost: 3, bidirectional: true,
    forAudio: true, topology: "complementary_cmos_tgate",
    bestUse: "signal_routing_crossbar",
  },
  mux_4to1_cmos: {
    onResist: 6, offIsolation: 7, bandwidth: 6,
    chargeInject: 5, asCost: 4, bidirectional: true,
    forAudio: false, topology: "decoded_cmos_tree_mux",
    bestUse: "sensor_channel_multiplex",
  },
  t_gate_transmission: {
    onResist: 9, offIsolation: 9, bandwidth: 10,
    chargeInject: 10, asCost: 5, bidirectional: true,
    forAudio: true, topology: "parallel_nmos_pmos_pair",
    bestUse: "sample_hold_precision_acq",
  },
  high_voltage_nmos: {
    onResist: 4, offIsolation: 10, bandwidth: 5,
    chargeInject: 4, asCost: 6, bidirectional: false,
    forAudio: false, topology: "drain_extended_nmos_hv",
    bestUse: "industrial_plc_field_io",
  },
};

const get = (t: AnalogSwitch) => DATA[t];

export const onResist = (t: AnalogSwitch) => get(t).onResist;
export const offIsolation = (t: AnalogSwitch) => get(t).offIsolation;
export const bandwidth = (t: AnalogSwitch) => get(t).bandwidth;
export const chargeInject = (t: AnalogSwitch) => get(t).chargeInject;
export const asCost = (t: AnalogSwitch) => get(t).asCost;
export const bidirectional = (t: AnalogSwitch) => get(t).bidirectional;
export const forAudio = (t: AnalogSwitch) => get(t).forAudio;
export const topology = (t: AnalogSwitch) => get(t).topology;
export const bestUse = (t: AnalogSwitch) => get(t).bestUse;
export const analogSwitches = (): AnalogSwitch[] => Object.keys(DATA) as AnalogSwitch[];
