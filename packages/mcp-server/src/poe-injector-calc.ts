export type PoeInjectorType =
  | "passive_12v_pair"
  | "standard_802_3af"
  | "plus_802_3at"
  | "ultra_802_3bt"
  | "multi_port_midspan";

const DATA: Record<PoeInjectorType, {
  powerOutput: number; portCount: number; efficiency: number;
  compatibility: number; injectorCost: number; managed: boolean;
  highPower: boolean; standard: string; bestUse: string;
}> = {
  passive_12v_pair: { powerOutput: 3, portCount: 3, efficiency: 6, compatibility: 4, injectorCost: 1, managed: false, highPower: false, standard: "passive_non_standard", bestUse: "low_power_ap_feed" },
  standard_802_3af: { powerOutput: 5, portCount: 3, efficiency: 8, compatibility: 10, injectorCost: 3, managed: false, highPower: false, standard: "ieee_802_3af_15w", bestUse: "ip_phone_power_feed" },
  plus_802_3at: { powerOutput: 7, portCount: 3, efficiency: 8, compatibility: 9, injectorCost: 5, managed: false, highPower: false, standard: "ieee_802_3at_30w", bestUse: "ptz_camera_power" },
  ultra_802_3bt: { powerOutput: 10, portCount: 3, efficiency: 9, compatibility: 7, injectorCost: 8, managed: false, highPower: true, standard: "ieee_802_3bt_90w", bestUse: "high_power_display_feed" },
  multi_port_midspan: { powerOutput: 7, portCount: 10, efficiency: 9, compatibility: 9, injectorCost: 9, managed: true, highPower: false, standard: "ieee_802_3at_rack", bestUse: "bulk_ap_deployment" },
};

const get = (t: PoeInjectorType) => DATA[t];

export const powerOutput = (t: PoeInjectorType) => get(t).powerOutput;
export const portCount = (t: PoeInjectorType) => get(t).portCount;
export const efficiency = (t: PoeInjectorType) => get(t).efficiency;
export const compatibility = (t: PoeInjectorType) => get(t).compatibility;
export const injectorCost = (t: PoeInjectorType) => get(t).injectorCost;
export const managed = (t: PoeInjectorType) => get(t).managed;
export const highPower = (t: PoeInjectorType) => get(t).highPower;
export const standard = (t: PoeInjectorType) => get(t).standard;
export const bestUse = (t: PoeInjectorType) => get(t).bestUse;
export const poeInjectors = (): PoeInjectorType[] => Object.keys(DATA) as PoeInjectorType[];
