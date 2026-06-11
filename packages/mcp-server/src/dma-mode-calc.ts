export type DmaMode =
  | "single_transfer"
  | "burst_block"
  | "scatter_gather"
  | "circular_ring"
  | "linked_list_chain";

const DATA: Record<DmaMode, {
  throughput: number; cpuFree: number; flexibility: number;
  latency: number; dmaCost: number; autoReload: boolean;
  forAudio: boolean; descriptor: string; bestUse: string;
}> = {
  single_transfer: {
    throughput: 3, cpuFree: 4, flexibility: 3,
    latency: 9, dmaCost: 1, autoReload: false,
    forAudio: false, descriptor: "src_dst_count_trigger",
    bestUse: "spi_register_fetch",
  },
  burst_block: {
    throughput: 7, cpuFree: 7, flexibility: 5,
    latency: 6, dmaCost: 2, autoReload: false,
    forAudio: false, descriptor: "block_size_increment",
    bestUse: "memory_copy_buffer",
  },
  scatter_gather: {
    throughput: 8, cpuFree: 9, flexibility: 10,
    latency: 5, dmaCost: 5, autoReload: false,
    forAudio: false, descriptor: "table_of_descriptors",
    bestUse: "network_packet_assembly",
  },
  circular_ring: {
    throughput: 8, cpuFree: 9, flexibility: 6,
    latency: 7, dmaCost: 3, autoReload: true,
    forAudio: true, descriptor: "wrap_around_half_complete",
    bestUse: "adc_continuous_sample",
  },
  linked_list_chain: {
    throughput: 9, cpuFree: 10, flexibility: 9,
    latency: 4, dmaCost: 4, autoReload: true,
    forAudio: true, descriptor: "linked_descriptor_chain",
    bestUse: "i2s_double_buffer_stream",
  },
};

const get = (t: DmaMode) => DATA[t];

export const throughput = (t: DmaMode) => get(t).throughput;
export const cpuFree = (t: DmaMode) => get(t).cpuFree;
export const flexibility = (t: DmaMode) => get(t).flexibility;
export const latency = (t: DmaMode) => get(t).latency;
export const dmaCost = (t: DmaMode) => get(t).dmaCost;
export const autoReload = (t: DmaMode) => get(t).autoReload;
export const forAudio = (t: DmaMode) => get(t).forAudio;
export const descriptor = (t: DmaMode) => get(t).descriptor;
export const bestUse = (t: DmaMode) => get(t).bestUse;
export const dmaModes = (): DmaMode[] => Object.keys(DATA) as DmaMode[];
