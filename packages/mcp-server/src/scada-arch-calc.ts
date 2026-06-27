export type ScadaArch =
  | "classic_poll_rtu"
  | "distributed_dcs"
  | "cloud_iot_scada"
  | "edge_compute_scada"
  | "historian_first";

const DATA: Record<ScadaArch, {
  scalability: number; latency: number; security: number;
  dataRetention: number; scadaCost: number; cloudNative: boolean;
  forCritical: boolean; protocol: string; bestUse: string;
}> = {
  classic_poll_rtu: {
    scalability: 4, latency: 6, security: 7,
    dataRetention: 5, scadaCost: 4, cloudNative: false,
    forCritical: true, protocol: "modbus_dnp3_poll",
    bestUse: "water_utility_legacy",
  },
  distributed_dcs: {
    scalability: 7, latency: 8, security: 8,
    dataRetention: 7, scadaCost: 8, cloudNative: false,
    forCritical: true, protocol: "opc_ua_pub_sub",
    bestUse: "petrochemical_plant",
  },
  cloud_iot_scada: {
    scalability: 9, latency: 5, security: 6,
    dataRetention: 9, scadaCost: 6, cloudNative: true,
    forCritical: false, protocol: "mqtt_amqp_rest",
    bestUse: "renewable_fleet_monitor",
  },
  edge_compute_scada: {
    scalability: 8, latency: 9, security: 7,
    dataRetention: 7, scadaCost: 7, cloudNative: false,
    forCritical: true, protocol: "tsn_opcua_edge",
    bestUse: "smart_factory_iiot",
  },
  historian_first: {
    scalability: 7, latency: 6, security: 7,
    dataRetention: 10, scadaCost: 7, cloudNative: false,
    forCritical: false, protocol: "pi_af_sql_replay",
    bestUse: "process_analytics_ml",
  },
};

const get = (t: ScadaArch) => DATA[t];

export const scalability = (t: ScadaArch) => get(t).scalability;
export const latency = (t: ScadaArch) => get(t).latency;
export const security = (t: ScadaArch) => get(t).security;
export const dataRetention = (t: ScadaArch) => get(t).dataRetention;
export const scadaCost = (t: ScadaArch) => get(t).scadaCost;
export const cloudNative = (t: ScadaArch) => get(t).cloudNative;
export const forCritical = (t: ScadaArch) => get(t).forCritical;
export const protocol = (t: ScadaArch) => get(t).protocol;
export const bestUse = (t: ScadaArch) => get(t).bestUse;
export const scadaArchs = (): ScadaArch[] => Object.keys(DATA) as ScadaArch[];
