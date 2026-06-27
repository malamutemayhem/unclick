export type SwitchAsic =
  | "memory_crossbar"
  | "broadcom_memory"
  | "memory_clos"
  | "barefoot_rmt"
  | "memory_vof";

const DATA: Record<SwitchAsic, {
  capacity: number; latency: number; programmability: number;
  bufferDepth: number; asicCost: number; p4Capable: boolean;
  forHyperscale: boolean; architecture: string; bestUse: string;
}> = {
  memory_crossbar: {
    capacity: 6, latency: 9, programmability: 3,
    bufferDepth: 5, asicCost: 4, p4Capable: false,
    forHyperscale: false, architecture: "shared_memory_crossbar",
    bestUse: "campus_access_switch",
  },
  broadcom_memory: {
    capacity: 9, latency: 7, programmability: 5,
    bufferDepth: 8, asicCost: 8, p4Capable: false,
    forHyperscale: true, architecture: "tomahawk_mmu_pipeline",
    bestUse: "leaf_spine_51_2t",
  },
  memory_clos: {
    capacity: 10, latency: 6, programmability: 4,
    bufferDepth: 9, asicCost: 10, p4Capable: false,
    forHyperscale: true, architecture: "multi_die_clos_fabric",
    bestUse: "chassis_core_router",
  },
  barefoot_rmt: {
    capacity: 7, latency: 8, programmability: 10,
    bufferDepth: 6, asicCost: 7, p4Capable: true,
    forHyperscale: true, architecture: "reconfigurable_match_table",
    bestUse: "smart_nic_inband_telemetry",
  },
  memory_vof: {
    capacity: 8, latency: 7, programmability: 7,
    bufferDepth: 7, asicCost: 7, p4Capable: true,
    forHyperscale: true, architecture: "vof_flexible_parser",
    bestUse: "dpu_offload_fabric",
  },
};

const get = (t: SwitchAsic) => DATA[t];

export const capacity = (t: SwitchAsic) => get(t).capacity;
export const latency = (t: SwitchAsic) => get(t).latency;
export const programmability = (t: SwitchAsic) => get(t).programmability;
export const bufferDepth = (t: SwitchAsic) => get(t).bufferDepth;
export const asicCost = (t: SwitchAsic) => get(t).asicCost;
export const p4Capable = (t: SwitchAsic) => get(t).p4Capable;
export const forHyperscale = (t: SwitchAsic) => get(t).forHyperscale;
export const architecture = (t: SwitchAsic) => get(t).architecture;
export const bestUse = (t: SwitchAsic) => get(t).bestUse;
export const switchAsics = (): SwitchAsic[] => Object.keys(DATA) as SwitchAsic[];
