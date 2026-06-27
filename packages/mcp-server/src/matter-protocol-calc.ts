export type MatterProtocol =
  | "matter_over_thread"
  | "matter_over_wifi"
  | "matter_over_ethernet"
  | "matter_bridge"
  | "matter_controller";

const DATA: Record<MatterProtocol, {
  interop: number; powerDraw: number; throughput: number;
  latency: number; matterCost: number; batteryDevice: boolean;
  forLighting: boolean; transport: string; bestUse: string;
}> = {
  matter_over_thread: {
    interop: 9, powerDraw: 9, throughput: 4,
    latency: 6, matterCost: 5, batteryDevice: true,
    forLighting: true, transport: "thread_ipv6_udp",
    bestUse: "smart_lock_battery",
  },
  matter_over_wifi: {
    interop: 9, powerDraw: 4, throughput: 8,
    latency: 8, matterCost: 4, batteryDevice: false,
    forLighting: true, transport: "wifi_ipv4v6_tcp",
    bestUse: "smart_plug_outlet",
  },
  matter_over_ethernet: {
    interop: 9, powerDraw: 3, throughput: 10,
    latency: 10, matterCost: 6, batteryDevice: false,
    forLighting: false, transport: "eth_ipv4_tcp_mdns",
    bestUse: "hvac_thermostat_pro",
  },
  matter_bridge: {
    interop: 10, powerDraw: 3, throughput: 7,
    latency: 5, matterCost: 8, batteryDevice: false,
    forLighting: true, transport: "bridge_translate_any",
    bestUse: "legacy_zigbee_bridge",
  },
  matter_controller: {
    interop: 10, powerDraw: 2, throughput: 9,
    latency: 9, matterCost: 7, batteryDevice: false,
    forLighting: false, transport: "controller_fabric",
    bestUse: "smart_speaker_hub",
  },
};

const get = (t: MatterProtocol) => DATA[t];

export const interop = (t: MatterProtocol) => get(t).interop;
export const powerDraw = (t: MatterProtocol) => get(t).powerDraw;
export const throughput = (t: MatterProtocol) => get(t).throughput;
export const latency = (t: MatterProtocol) => get(t).latency;
export const matterCost = (t: MatterProtocol) => get(t).matterCost;
export const batteryDevice = (t: MatterProtocol) => get(t).batteryDevice;
export const forLighting = (t: MatterProtocol) => get(t).forLighting;
export const transport = (t: MatterProtocol) => get(t).transport;
export const bestUse = (t: MatterProtocol) => get(t).bestUse;
export const matterProtocols = (): MatterProtocol[] => Object.keys(DATA) as MatterProtocol[];
