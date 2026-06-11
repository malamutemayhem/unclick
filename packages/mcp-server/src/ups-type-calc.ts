export type UpsType =
  | "offline_standby"
  | "line_interactive"
  | "online_double_conv"
  | "rotary_flywheel"
  | "lithium_ups";

const DATA: Record<UpsType, {
  efficiency: number; transferTime: number; powerQuality: number;
  runtime: number; upsCost: number; zeroTransfer: boolean;
  forTier4: boolean; topology: string; bestUse: string;
}> = {
  offline_standby: {
    efficiency: 9, transferTime: 3, powerQuality: 3,
    runtime: 4, upsCost: 2, zeroTransfer: false,
    forTier4: false, topology: "bypass_switch_battery",
    bestUse: "desktop_home_office",
  },
  line_interactive: {
    efficiency: 8, transferTime: 6, powerQuality: 6,
    runtime: 5, upsCost: 4, zeroTransfer: false,
    forTier4: false, topology: "avr_tap_change_battery",
    bestUse: "small_server_room",
  },
  online_double_conv: {
    efficiency: 6, transferTime: 10, powerQuality: 10,
    runtime: 7, upsCost: 7, zeroTransfer: true,
    forTier4: true, topology: "rectifier_inverter_always",
    bestUse: "enterprise_datacenter",
  },
  rotary_flywheel: {
    efficiency: 7, transferTime: 9, powerQuality: 9,
    runtime: 3, upsCost: 8, zeroTransfer: true,
    forTier4: true, topology: "diesel_rotary_kinetic",
    bestUse: "bridging_to_generator",
  },
  lithium_ups: {
    efficiency: 7, transferTime: 10, powerQuality: 10,
    runtime: 8, upsCost: 9, zeroTransfer: true,
    forTier4: true, topology: "li_ion_double_conv",
    bestUse: "high_density_edge_dc",
  },
};

const get = (t: UpsType) => DATA[t];

export const efficiency = (t: UpsType) => get(t).efficiency;
export const transferTime = (t: UpsType) => get(t).transferTime;
export const powerQuality = (t: UpsType) => get(t).powerQuality;
export const runtime = (t: UpsType) => get(t).runtime;
export const upsCost = (t: UpsType) => get(t).upsCost;
export const zeroTransfer = (t: UpsType) => get(t).zeroTransfer;
export const forTier4 = (t: UpsType) => get(t).forTier4;
export const topology = (t: UpsType) => get(t).topology;
export const bestUse = (t: UpsType) => get(t).bestUse;
export const upsTypes = (): UpsType[] => Object.keys(DATA) as UpsType[];
