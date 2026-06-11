export type DcDcTopology =
  | "buck_step_down"
  | "boost_step_up"
  | "buck_boost_inverting"
  | "sepic_non_inverting"
  | "flyback_isolated";

const DATA: Record<DcDcTopology, {
  efficiency: number; regulation: number; ripple: number;
  isolation: number; topCost: number; synchronous: boolean;
  forBattery: boolean; inductor: string; bestUse: string;
}> = {
  buck_step_down: {
    efficiency: 9, regulation: 9, ripple: 8,
    isolation: 1, topCost: 2, synchronous: true,
    forBattery: true, inductor: "single_choke_output",
    bestUse: "cpu_core_point_of_load",
  },
  boost_step_up: {
    efficiency: 8, regulation: 7, ripple: 7,
    isolation: 1, topCost: 3, synchronous: true,
    forBattery: true, inductor: "single_choke_input",
    bestUse: "led_string_driver_boost",
  },
  buck_boost_inverting: {
    efficiency: 7, regulation: 7, ripple: 6,
    isolation: 1, topCost: 4, synchronous: false,
    forBattery: true, inductor: "single_choke_shared",
    bestUse: "wide_vin_battery_rail",
  },
  sepic_non_inverting: {
    efficiency: 6, regulation: 6, ripple: 5,
    isolation: 3, topCost: 5, synchronous: false,
    forBattery: false, inductor: "coupled_dual_winding",
    bestUse: "automotive_pre_regulator",
  },
  flyback_isolated: {
    efficiency: 7, regulation: 6, ripple: 4,
    isolation: 10, topCost: 6, synchronous: false,
    forBattery: false, inductor: "transformer_multi_output",
    bestUse: "offline_ac_dc_adapter",
  },
};

const get = (t: DcDcTopology) => DATA[t];

export const efficiency = (t: DcDcTopology) => get(t).efficiency;
export const regulation = (t: DcDcTopology) => get(t).regulation;
export const ripple = (t: DcDcTopology) => get(t).ripple;
export const isolation = (t: DcDcTopology) => get(t).isolation;
export const topCost = (t: DcDcTopology) => get(t).topCost;
export const synchronous = (t: DcDcTopology) => get(t).synchronous;
export const forBattery = (t: DcDcTopology) => get(t).forBattery;
export const inductor = (t: DcDcTopology) => get(t).inductor;
export const bestUse = (t: DcDcTopology) => get(t).bestUse;
export const dcDcTopologies = (): DcDcTopology[] => Object.keys(DATA) as DcDcTopology[];
