export type ThreadMesh =
  | "thread_1_3_border"
  | "thread_sleepy_end"
  | "thread_router"
  | "thread_leader"
  | "thread_commissioner";

const DATA: Record<ThreadMesh, {
  reliability: number; powerDraw: number; scalability: number;
  latency: number; nodeCost: number; sleepy: boolean;
  forSmartHome: boolean; role: string; bestUse: string;
}> = {
  thread_1_3_border: {
    reliability: 9, powerDraw: 3, scalability: 8,
    latency: 7, nodeCost: 8, sleepy: false,
    forSmartHome: true, role: "ipv6_border_gateway",
    bestUse: "matter_bridge_hub",
  },
  thread_sleepy_end: {
    reliability: 6, powerDraw: 10, scalability: 5,
    latency: 4, nodeCost: 2, sleepy: true,
    forSmartHome: true, role: "sed_poll_parent",
    bestUse: "door_window_sensor",
  },
  thread_router: {
    reliability: 8, powerDraw: 4, scalability: 9,
    latency: 8, nodeCost: 5, sleepy: false,
    forSmartHome: true, role: "mesh_packet_relay",
    bestUse: "smart_light_bulb",
  },
  thread_leader: {
    reliability: 10, powerDraw: 3, scalability: 10,
    latency: 9, nodeCost: 6, sleepy: false,
    forSmartHome: true, role: "network_data_leader",
    bestUse: "always_on_thermostat",
  },
  thread_commissioner: {
    reliability: 7, powerDraw: 5, scalability: 6,
    latency: 6, nodeCost: 7, sleepy: false,
    forSmartHome: false, role: "secure_commissioning",
    bestUse: "installer_tablet_app",
  },
};

const get = (t: ThreadMesh) => DATA[t];

export const reliability = (t: ThreadMesh) => get(t).reliability;
export const powerDraw = (t: ThreadMesh) => get(t).powerDraw;
export const scalability = (t: ThreadMesh) => get(t).scalability;
export const latency = (t: ThreadMesh) => get(t).latency;
export const nodeCost = (t: ThreadMesh) => get(t).nodeCost;
export const sleepy = (t: ThreadMesh) => get(t).sleepy;
export const forSmartHome = (t: ThreadMesh) => get(t).forSmartHome;
export const role = (t: ThreadMesh) => get(t).role;
export const bestUse = (t: ThreadMesh) => get(t).bestUse;
export const threadMeshes = (): ThreadMesh[] => Object.keys(DATA) as ThreadMesh[];
