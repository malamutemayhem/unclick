export type MediaConverterType =
  | "copper_to_fiber_gbe"
  | "copper_to_fiber_10gbe"
  | "poe_media_converter"
  | "managed_chassis_modular"
  | "industrial_hardened";

interface MediaConverterData {
  speed: number;
  reliability: number;
  flexibility: number;
  distance: number;
  mcCost: number;
  managed: boolean;
  forOutdoor: boolean;
  interface_: string;
  bestUse: string;
}

const DATA: Record<MediaConverterType, MediaConverterData> = {
  copper_to_fiber_gbe: {
    speed: 5, reliability: 7, flexibility: 4, distance: 7, mcCost: 2,
    managed: false, forOutdoor: false,
    interface_: "rj45_to_sfp_1g_single_mode",
    bestUse: "building_to_building_link",
  },
  copper_to_fiber_10gbe: {
    speed: 9, reliability: 8, flexibility: 5, distance: 9, mcCost: 6,
    managed: false, forOutdoor: false,
    interface_: "rj45_to_sfp_plus_10g_sm",
    bestUse: "data_center_long_reach_uplink",
  },
  poe_media_converter: {
    speed: 5, reliability: 7, flexibility: 6, distance: 7, mcCost: 4,
    managed: false, forOutdoor: true,
    interface_: "rj45_poe_to_sfp_1g_injector",
    bestUse: "remote_ip_camera_fiber_fed",
  },
  managed_chassis_modular: {
    speed: 8, reliability: 10, flexibility: 10, distance: 9, mcCost: 9,
    managed: true, forOutdoor: false,
    interface_: "modular_blade_mixed_speed",
    bestUse: "enterprise_fiber_aggregation",
  },
  industrial_hardened: {
    speed: 5, reliability: 10, flexibility: 5, distance: 8, mcCost: 7,
    managed: true, forOutdoor: true,
    interface_: "din_rail_ip40_wide_temp_fiber",
    bestUse: "factory_substation_scada_link",
  },
};

function get(t: MediaConverterType): MediaConverterData {
  return DATA[t];
}

export const speed = (t: MediaConverterType) => get(t).speed;
export const reliability = (t: MediaConverterType) => get(t).reliability;
export const flexibility = (t: MediaConverterType) => get(t).flexibility;
export const distance = (t: MediaConverterType) => get(t).distance;
export const mcCost = (t: MediaConverterType) => get(t).mcCost;
export const managed = (t: MediaConverterType) => get(t).managed;
export const forOutdoor = (t: MediaConverterType) => get(t).forOutdoor;
export const interface_ = (t: MediaConverterType) => get(t).interface_;
export const bestUse = (t: MediaConverterType) => get(t).bestUse;
export const mediaConverterTypes = (): MediaConverterType[] =>
  Object.keys(DATA) as MediaConverterType[];
