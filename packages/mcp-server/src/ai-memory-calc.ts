export type AiMemory =
  | "hbm_gpu_stack"
  | "gddr_discrete"
  | "lpddr_edge"
  | "sram_on_chip"
  | "processing_in_mem";

const DATA: Record<AiMemory, {
  bandwidth: number; capacity: number; powerEff: number;
  latency: number; memCost: number; onPackage: boolean;
  forLlm: boolean; interface_: string; bestUse: string;
}> = {
  hbm_gpu_stack: {
    bandwidth: 10, capacity: 8, powerEff: 7,
    latency: 7, memCost: 10, onPackage: true,
    forLlm: true, interface_: "1024bit_tsv_stack",
    bestUse: "large_model_weight_store",
  },
  gddr_discrete: {
    bandwidth: 7, capacity: 5, powerEff: 4,
    latency: 6, memCost: 5, onPackage: false,
    forLlm: false, interface_: "32bit_pam4_board",
    bestUse: "gaming_gpu_frame_buffer",
  },
  lpddr_edge: {
    bandwidth: 5, capacity: 4, powerEff: 9,
    latency: 6, memCost: 4, onPackage: false,
    forLlm: false, interface_: "16bit_pop_stack",
    bestUse: "phone_on_device_ai",
  },
  sram_on_chip: {
    bandwidth: 9, capacity: 1, powerEff: 8,
    latency: 10, memCost: 8, onPackage: true,
    forLlm: false, interface_: "wide_bus_register_file",
    bestUse: "activation_kv_cache",
  },
  processing_in_mem: {
    bandwidth: 8, capacity: 6, powerEff: 10,
    latency: 9, memCost: 7, onPackage: true,
    forLlm: true, interface_: "compute_near_memory",
    bestUse: "pim_attention_offload",
  },
};

const get = (t: AiMemory) => DATA[t];

export const bandwidth = (t: AiMemory) => get(t).bandwidth;
export const capacity = (t: AiMemory) => get(t).capacity;
export const powerEff = (t: AiMemory) => get(t).powerEff;
export const latency = (t: AiMemory) => get(t).latency;
export const memCost = (t: AiMemory) => get(t).memCost;
export const onPackage = (t: AiMemory) => get(t).onPackage;
export const forLlm = (t: AiMemory) => get(t).forLlm;
export const interface_ = (t: AiMemory) => get(t).interface_;
export const bestUse = (t: AiMemory) => get(t).bestUse;
export const aiMemories = (): AiMemory[] => Object.keys(DATA) as AiMemory[];
