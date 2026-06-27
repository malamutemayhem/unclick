export type PowerSequencer =
  | "discrete_rc_delay"
  | "analog_comparator_seq"
  | "digital_i2c_prog"
  | "fpga_soft_seq"
  | "pmic_integrated";

const DATA: Record<PowerSequencer, {
  channels: number; timing: number; monitoring: number;
  flexibility: number; seqCost: number; programmable: boolean;
  forServer: boolean; control: string; bestUse: string;
}> = {
  discrete_rc_delay: {
    channels: 2, timing: 3, monitoring: 2,
    flexibility: 2, seqCost: 1, programmable: false,
    forServer: false, control: "rc_time_constant",
    bestUse: "simple_dual_rail",
  },
  analog_comparator_seq: {
    channels: 5, timing: 6, monitoring: 5,
    flexibility: 4, seqCost: 3, programmable: false,
    forServer: false, control: "voltage_threshold_comp",
    bestUse: "fpga_multi_rail",
  },
  digital_i2c_prog: {
    channels: 8, timing: 9, monitoring: 8,
    flexibility: 9, seqCost: 6, programmable: true,
    forServer: true, control: "i2c_register_map",
    bestUse: "telecom_line_card",
  },
  fpga_soft_seq: {
    channels: 10, timing: 10, monitoring: 9,
    flexibility: 10, seqCost: 8, programmable: true,
    forServer: false, control: "fsm_bitstream_logic",
    bestUse: "prototype_dev_board",
  },
  pmic_integrated: {
    channels: 7, timing: 7, monitoring: 10,
    flexibility: 6, seqCost: 7, programmable: true,
    forServer: true, control: "otp_rail_sequence",
    bestUse: "server_bmc_power",
  },
};

const get = (t: PowerSequencer) => DATA[t];

export const channels = (t: PowerSequencer) => get(t).channels;
export const timing = (t: PowerSequencer) => get(t).timing;
export const monitoring = (t: PowerSequencer) => get(t).monitoring;
export const flexibility = (t: PowerSequencer) => get(t).flexibility;
export const seqCost = (t: PowerSequencer) => get(t).seqCost;
export const programmable = (t: PowerSequencer) => get(t).programmable;
export const forServer = (t: PowerSequencer) => get(t).forServer;
export const control = (t: PowerSequencer) => get(t).control;
export const bestUse = (t: PowerSequencer) => get(t).bestUse;
export const powerSequencers = (): PowerSequencer[] => Object.keys(DATA) as PowerSequencer[];
