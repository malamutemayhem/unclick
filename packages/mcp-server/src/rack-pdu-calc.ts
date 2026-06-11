export type RackPdu =
  | "basic_metered"
  | "switched_outlet"
  | "monitored_per_outlet"
  | "intelligent_managed"
  | "busway_overhead";

const DATA: Record<RackPdu, {
  capacity: number; monitoring: number; control: number;
  efficiency: number; pduCost: number; perOutlet: boolean;
  forHpc: boolean; feed: string; bestUse: string;
}> = {
  basic_metered: {
    capacity: 5, monitoring: 3, control: 1,
    efficiency: 8, pduCost: 2, perOutlet: false,
    forHpc: false, feed: "single_phase_30a",
    bestUse: "small_comms_closet",
  },
  switched_outlet: {
    capacity: 6, monitoring: 5, control: 7,
    efficiency: 7, pduCost: 5, perOutlet: true,
    forHpc: false, feed: "single_phase_30a",
    bestUse: "remote_reboot_lab",
  },
  monitored_per_outlet: {
    capacity: 7, monitoring: 9, control: 3,
    efficiency: 8, pduCost: 6, perOutlet: true,
    forHpc: true, feed: "three_phase_60a",
    bestUse: "capacity_planning_dc",
  },
  intelligent_managed: {
    capacity: 8, monitoring: 10, control: 9,
    efficiency: 8, pduCost: 8, perOutlet: true,
    forHpc: true, feed: "three_phase_60a",
    bestUse: "colo_billing_dcim",
  },
  busway_overhead: {
    capacity: 10, monitoring: 8, control: 5,
    efficiency: 9, pduCost: 9, perOutlet: false,
    forHpc: true, feed: "busbar_400a_overhead",
    bestUse: "100kw_ai_rack_row",
  },
};

const get = (t: RackPdu) => DATA[t];

export const capacity = (t: RackPdu) => get(t).capacity;
export const monitoring = (t: RackPdu) => get(t).monitoring;
export const control = (t: RackPdu) => get(t).control;
export const efficiency = (t: RackPdu) => get(t).efficiency;
export const pduCost = (t: RackPdu) => get(t).pduCost;
export const perOutlet = (t: RackPdu) => get(t).perOutlet;
export const forHpc = (t: RackPdu) => get(t).forHpc;
export const feed = (t: RackPdu) => get(t).feed;
export const bestUse = (t: RackPdu) => get(t).bestUse;
export const rackPdus = (): RackPdu[] => Object.keys(DATA) as RackPdu[];
