export type MqttBrokerType =
  | "mosquitto_light"
  | "emqx_enterprise"
  | "hivemq_cloud"
  | "vernemq_cluster"
  | "nanomq_edge";

const DATA: Record<MqttBrokerType, {
  throughput: number; clientCapacity: number; reliability: number;
  clustering: number; brokerCost: number; managed: boolean;
  forEdge: boolean; protocol: string; bestUse: string;
}> = {
  mosquitto_light: { throughput: 5, clientCapacity: 5, reliability: 7, clustering: 2, brokerCost: 1, managed: false, forEdge: true, protocol: "mqtt_3_1_1_core", bestUse: "single_node_home_iot" },
  emqx_enterprise: { throughput: 10, clientCapacity: 10, reliability: 9, clustering: 10, brokerCost: 8, managed: false, forEdge: false, protocol: "mqtt_5_0_enterprise", bestUse: "million_device_platform" },
  hivemq_cloud: { throughput: 8, clientCapacity: 9, reliability: 9, clustering: 8, brokerCost: 7, managed: true, forEdge: false, protocol: "mqtt_5_0_cloud", bestUse: "managed_iot_saas" },
  vernemq_cluster: { throughput: 8, clientCapacity: 8, reliability: 8, clustering: 9, brokerCost: 4, managed: false, forEdge: false, protocol: "mqtt_3_1_1_cluster", bestUse: "distributed_erlang_mesh" },
  nanomq_edge: { throughput: 6, clientCapacity: 4, reliability: 6, clustering: 3, brokerCost: 1, managed: false, forEdge: true, protocol: "mqtt_5_0_nano", bestUse: "gateway_edge_bridge" },
};

const get = (t: MqttBrokerType) => DATA[t];

export const throughput = (t: MqttBrokerType) => get(t).throughput;
export const clientCapacity = (t: MqttBrokerType) => get(t).clientCapacity;
export const reliability = (t: MqttBrokerType) => get(t).reliability;
export const clustering = (t: MqttBrokerType) => get(t).clustering;
export const brokerCost = (t: MqttBrokerType) => get(t).brokerCost;
export const managed = (t: MqttBrokerType) => get(t).managed;
export const forEdge = (t: MqttBrokerType) => get(t).forEdge;
export const protocol = (t: MqttBrokerType) => get(t).protocol;
export const bestUse = (t: MqttBrokerType) => get(t).bestUse;
export const mqttBrokers = (): MqttBrokerType[] => Object.keys(DATA) as MqttBrokerType[];
