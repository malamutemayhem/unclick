export type PduType =
  | "basic_metered_rack"
  | "switched_outlet_remote"
  | "monitored_per_outlet"
  | "auto_transfer_switch"
  | "inline_metered_tap_box";

interface PduData {
  outlets: number;
  monitoring: number;
  reliability: number;
  management: number;
  pdCost: number;
  switchable: boolean;
  forDataCenter: boolean;
  input: string;
  bestUse: string;
}

const DATA: Record<PduType, PduData> = {
  basic_metered_rack: {
    outlets: 7, monitoring: 4, reliability: 8, management: 3, pdCost: 2,
    switchable: false, forDataCenter: false,
    input: "single_phase_120v_20a_l5_20",
    bestUse: "small_server_closet_basic",
  },
  switched_outlet_remote: {
    outlets: 8, monitoring: 7, reliability: 8, management: 9, pdCost: 6,
    switchable: true, forDataCenter: true,
    input: "single_phase_208v_30a_l6_30",
    bestUse: "remote_reboot_outlet_control",
  },
  monitored_per_outlet: {
    outlets: 8, monitoring: 10, reliability: 9, management: 8, pdCost: 7,
    switchable: false, forDataCenter: true,
    input: "three_phase_208v_30a_l21_30",
    bestUse: "data_center_capacity_planning",
  },
  auto_transfer_switch: {
    outlets: 7, monitoring: 8, reliability: 10, management: 7, pdCost: 10,
    switchable: false, forDataCenter: true,
    input: "dual_feed_ats_redundant_power",
    bestUse: "mission_critical_dual_feed",
  },
  inline_metered_tap_box: {
    outlets: 5, monitoring: 6, reliability: 8, management: 5, pdCost: 4,
    switchable: false, forDataCenter: false,
    input: "inline_tap_box_branch_circuit",
    bestUse: "branch_circuit_sub_metering",
  },
};

function get(t: PduType): PduData {
  return DATA[t];
}

export const outlets = (t: PduType) => get(t).outlets;
export const monitoring = (t: PduType) => get(t).monitoring;
export const reliability = (t: PduType) => get(t).reliability;
export const management = (t: PduType) => get(t).management;
export const pdCost = (t: PduType) => get(t).pdCost;
export const switchable = (t: PduType) => get(t).switchable;
export const forDataCenter = (t: PduType) => get(t).forDataCenter;
export const input = (t: PduType) => get(t).input;
export const bestUse = (t: PduType) => get(t).bestUse;
export const pduTypes = (): PduType[] =>
  Object.keys(DATA) as PduType[];
