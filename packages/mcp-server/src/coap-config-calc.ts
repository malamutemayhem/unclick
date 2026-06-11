export type CoapConfigType =
  | "coap_core_udp"
  | "coap_observe_sub"
  | "coap_block_transfer"
  | "coap_dtls_secure"
  | "coap_group_multicast";

const DATA: Record<CoapConfigType, {
  overhead: number; reliability: number; latency: number;
  security: number; complexity: number; confirmable: boolean;
  forConstrained: boolean; transport: string; bestUse: string;
}> = {
  coap_core_udp: { overhead: 9, reliability: 5, latency: 9, security: 3, complexity: 2, confirmable: true, forConstrained: true, transport: "udp_simple_req_res", bestUse: "sensor_read_constrained" },
  coap_observe_sub: { overhead: 8, reliability: 6, latency: 8, security: 3, complexity: 4, confirmable: true, forConstrained: true, transport: "udp_observe_notify", bestUse: "push_notification_sensor" },
  coap_block_transfer: { overhead: 6, reliability: 7, latency: 6, security: 3, complexity: 5, confirmable: true, forConstrained: true, transport: "udp_block_chunk", bestUse: "firmware_ota_update" },
  coap_dtls_secure: { overhead: 5, reliability: 7, latency: 5, security: 9, complexity: 7, confirmable: true, forConstrained: false, transport: "dtls_1_2_secured", bestUse: "secure_lwm2m_bootstrap" },
  coap_group_multicast: { overhead: 7, reliability: 4, latency: 10, security: 2, complexity: 6, confirmable: false, forConstrained: true, transport: "multicast_group_req", bestUse: "building_light_group_cmd" },
};

const get = (t: CoapConfigType) => DATA[t];

export const overhead = (t: CoapConfigType) => get(t).overhead;
export const reliability = (t: CoapConfigType) => get(t).reliability;
export const latency = (t: CoapConfigType) => get(t).latency;
export const security = (t: CoapConfigType) => get(t).security;
export const complexity = (t: CoapConfigType) => get(t).complexity;
export const confirmable = (t: CoapConfigType) => get(t).confirmable;
export const forConstrained = (t: CoapConfigType) => get(t).forConstrained;
export const transport = (t: CoapConfigType) => get(t).transport;
export const bestUse = (t: CoapConfigType) => get(t).bestUse;
export const coapConfigs = (): CoapConfigType[] => Object.keys(DATA) as CoapConfigType[];
