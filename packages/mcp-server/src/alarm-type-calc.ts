export type AlarmType =
  | "conventional_zone_loop"
  | "addressable_sla_protocol"
  | "analog_addressable_smart"
  | "wireless_mesh_radio"
  | "networked_campus_fiber";

const DATA: Record<AlarmType, {
  scalability: number; precision: number; reliability: number;
  installSpeed: number; alCost: number; wireless: boolean;
  forHighRise: boolean; protocol: string; bestUse: string;
}> = {
  conventional_zone_loop: {
    scalability: 3, precision: 3, reliability: 7,
    installSpeed: 8, alCost: 1, wireless: false,
    forHighRise: false, protocol: "two_wire_zone_id_only",
    bestUse: "small_retail_shop_basic",
  },
  addressable_sla_protocol: {
    scalability: 7, precision: 8, reliability: 8,
    installSpeed: 5, alCost: 3, wireless: false,
    forHighRise: true, protocol: "sla_poll_response_loop",
    bestUse: "office_tower_device_identify",
  },
  analog_addressable_smart: {
    scalability: 9, precision: 10, reliability: 9,
    installSpeed: 5, alCost: 4, wireless: false,
    forHighRise: true, protocol: "analog_value_drift_compensate",
    bestUse: "hospital_campus_predictive_maint",
  },
  wireless_mesh_radio: {
    scalability: 6, precision: 7, reliability: 6,
    installSpeed: 10, alCost: 3, wireless: true,
    forHighRise: false, protocol: "mesh_radio_868_915_mhz",
    bestUse: "historic_building_no_wire_run",
  },
  networked_campus_fiber: {
    scalability: 10, precision: 9, reliability: 10,
    installSpeed: 3, alCost: 5, wireless: false,
    forHighRise: true, protocol: "fiber_ring_ip_multi_panel",
    bestUse: "university_campus_multi_building",
  },
};

const get = (t: AlarmType) => DATA[t];

export const scalability = (t: AlarmType) => get(t).scalability;
export const precision = (t: AlarmType) => get(t).precision;
export const reliability = (t: AlarmType) => get(t).reliability;
export const installSpeed = (t: AlarmType) => get(t).installSpeed;
export const alCost = (t: AlarmType) => get(t).alCost;
export const wireless = (t: AlarmType) => get(t).wireless;
export const forHighRise = (t: AlarmType) => get(t).forHighRise;
export const protocol = (t: AlarmType) => get(t).protocol;
export const bestUse = (t: AlarmType) => get(t).bestUse;
export const alarmTypes = (): AlarmType[] => Object.keys(DATA) as AlarmType[];
