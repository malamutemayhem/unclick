export type DdcControllerType =
  | "unitary_rooftop_ahu"
  | "vav_zone_terminal"
  | "plant_chiller_boiler"
  | "general_purpose_io"
  | "network_supervisory";

interface DdcControllerData {
  points: number;
  reliability: number;
  flexibility: number;
  integration: number;
  ddcCost: number;
  programmable: boolean;
  forCritical: boolean;
  protocol: string;
  bestUse: string;
}

const DATA: Record<DdcControllerType, DdcControllerData> = {
  unitary_rooftop_ahu: {
    points: 6, reliability: 8, flexibility: 6, integration: 7, ddcCost: 4,
    programmable: true, forCritical: false,
    protocol: "bacnet_mstp_rs485_bus",
    bestUse: "single_ahu_rooftop_unit",
  },
  vav_zone_terminal: {
    points: 4, reliability: 8, flexibility: 5, integration: 7, ddcCost: 3,
    programmable: false, forCritical: false,
    protocol: "bacnet_mstp_zone_bus",
    bestUse: "vav_box_zone_temperature",
  },
  plant_chiller_boiler: {
    points: 9, reliability: 10, flexibility: 8, integration: 9, ddcCost: 8,
    programmable: true, forCritical: true,
    protocol: "bacnet_ip_ethernet_tcp",
    bestUse: "central_plant_chiller_sequence",
  },
  general_purpose_io: {
    points: 8, reliability: 8, flexibility: 10, integration: 8, ddcCost: 6,
    programmable: true, forCritical: false,
    protocol: "bacnet_ip_modbus_hybrid",
    bestUse: "mixed_system_custom_sequence",
  },
  network_supervisory: {
    points: 10, reliability: 9, flexibility: 9, integration: 10, ddcCost: 10,
    programmable: true, forCritical: true,
    protocol: "bacnet_ip_web_api_rest",
    bestUse: "campus_wide_optimization",
  },
};

function get(t: DdcControllerType): DdcControllerData {
  return DATA[t];
}

export const points = (t: DdcControllerType) => get(t).points;
export const reliability = (t: DdcControllerType) => get(t).reliability;
export const flexibility = (t: DdcControllerType) => get(t).flexibility;
export const integration = (t: DdcControllerType) => get(t).integration;
export const ddcCost = (t: DdcControllerType) => get(t).ddcCost;
export const programmable = (t: DdcControllerType) => get(t).programmable;
export const forCritical = (t: DdcControllerType) => get(t).forCritical;
export const protocol = (t: DdcControllerType) => get(t).protocol;
export const bestUse = (t: DdcControllerType) => get(t).bestUse;
export const ddcControllerTypes = (): DdcControllerType[] =>
  Object.keys(DATA) as DdcControllerType[];
