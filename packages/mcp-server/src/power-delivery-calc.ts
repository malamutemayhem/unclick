export type PowerDelivery =
  | "atx_desktop"
  | "server_12v_only"
  | "rack_48v_dc"
  | "usb_pd_3_1"
  | "poe_plus_plus";

const DATA: Record<PowerDelivery, {
  maxPower: number; efficiency: number; cableSimplicity: number;
  safety: number; pdCost: number; dcOnly: boolean;
  forEdge: boolean; standard: string; bestUse: string;
}> = {
  atx_desktop: {
    maxPower: 6, efficiency: 5, cableSimplicity: 3,
    safety: 5, pdCost: 3, dcOnly: false,
    forEdge: false, standard: "atx_12v_3_0",
    bestUse: "desktop_workstation",
  },
  server_12v_only: {
    maxPower: 8, efficiency: 8, cableSimplicity: 7,
    safety: 7, pdCost: 6, dcOnly: false,
    forEdge: false, standard: "ocp_12v_only_rack",
    bestUse: "hyperscale_server_rack",
  },
  rack_48v_dc: {
    maxPower: 10, efficiency: 9, cableSimplicity: 8,
    safety: 9, pdCost: 8, dcOnly: true,
    forEdge: true, standard: "open_rack_v3_48v",
    bestUse: "telecom_central_office",
  },
  usb_pd_3_1: {
    maxPower: 3, efficiency: 7, cableSimplicity: 9,
    safety: 8, pdCost: 4, dcOnly: true,
    forEdge: true, standard: "usb_pd_240w_epr",
    bestUse: "laptop_universal_dock",
  },
  poe_plus_plus: {
    maxPower: 2, efficiency: 6, cableSimplicity: 10,
    safety: 10, pdCost: 5, dcOnly: true,
    forEdge: true, standard: "ieee_802_3bt_type4",
    bestUse: "ip_camera_wifi_ap",
  },
};

const get = (t: PowerDelivery) => DATA[t];

export const maxPower = (t: PowerDelivery) => get(t).maxPower;
export const efficiency = (t: PowerDelivery) => get(t).efficiency;
export const cableSimplicity = (t: PowerDelivery) => get(t).cableSimplicity;
export const safety = (t: PowerDelivery) => get(t).safety;
export const pdCost = (t: PowerDelivery) => get(t).pdCost;
export const dcOnly = (t: PowerDelivery) => get(t).dcOnly;
export const forEdge = (t: PowerDelivery) => get(t).forEdge;
export const standard = (t: PowerDelivery) => get(t).standard;
export const bestUse = (t: PowerDelivery) => get(t).bestUse;
export const powerDeliveries = (): PowerDelivery[] => Object.keys(DATA) as PowerDelivery[];
