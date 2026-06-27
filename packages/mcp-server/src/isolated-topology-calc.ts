export type IsolatedTopology =
  | "flyback_single"
  | "forward_reset"
  | "half_bridge_llc"
  | "full_bridge_psfb"
  | "push_pull_center";

const DATA: Record<IsolatedTopology, {
  powerRange: number; efficiency: number; complexity: number;
  emiPerf: number; topoCost: number; softSwitch: boolean;
  forTelecom: boolean; isolation: string; bestUse: string;
}> = {
  flyback_single: {
    powerRange: 3, efficiency: 4, complexity: 2,
    emiPerf: 3, topoCost: 2, softSwitch: false,
    forTelecom: false, isolation: "single_winding_coupled",
    bestUse: "usb_charger_adapter",
  },
  forward_reset: {
    powerRange: 5, efficiency: 6, complexity: 4,
    emiPerf: 5, topoCost: 4, softSwitch: false,
    forTelecom: false, isolation: "transformer_reset_clamp",
    bestUse: "industrial_24v_supply",
  },
  half_bridge_llc: {
    powerRange: 7, efficiency: 9, complexity: 7,
    emiPerf: 9, topoCost: 7, softSwitch: true,
    forTelecom: true, isolation: "resonant_tank_gain",
    bestUse: "server_12v_main_rail",
  },
  full_bridge_psfb: {
    powerRange: 9, efficiency: 8, complexity: 8,
    emiPerf: 7, topoCost: 8, softSwitch: true,
    forTelecom: true, isolation: "phase_shift_zvs",
    bestUse: "high_power_battery_charger",
  },
  push_pull_center: {
    powerRange: 6, efficiency: 5, complexity: 5,
    emiPerf: 4, topoCost: 5, softSwitch: false,
    forTelecom: false, isolation: "center_tap_bidirect",
    bestUse: "solar_micro_inverter",
  },
};

const get = (t: IsolatedTopology) => DATA[t];

export const powerRange = (t: IsolatedTopology) => get(t).powerRange;
export const efficiency = (t: IsolatedTopology) => get(t).efficiency;
export const complexity = (t: IsolatedTopology) => get(t).complexity;
export const emiPerf = (t: IsolatedTopology) => get(t).emiPerf;
export const topoCost = (t: IsolatedTopology) => get(t).topoCost;
export const softSwitch = (t: IsolatedTopology) => get(t).softSwitch;
export const forTelecom = (t: IsolatedTopology) => get(t).forTelecom;
export const isolation = (t: IsolatedTopology) => get(t).isolation;
export const bestUse = (t: IsolatedTopology) => get(t).bestUse;
export const isolatedTopologies = (): IsolatedTopology[] => Object.keys(DATA) as IsolatedTopology[];
