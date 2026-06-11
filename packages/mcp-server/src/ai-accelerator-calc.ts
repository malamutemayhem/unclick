export type AiAccelerator =
  | "gpu_tensor_core"
  | "tpu_systolic"
  | "npu_dataflow"
  | "fpga_overlay"
  | "analog_imc";

const DATA: Record<AiAccelerator, {
  topsPerWatt: number; memBandwidth: number; flexibility: number;
  latency: number; accelCost: number; programmable: boolean;
  forTraining: boolean; compute: string; bestUse: string;
}> = {
  gpu_tensor_core: {
    topsPerWatt: 6, memBandwidth: 10, flexibility: 9,
    latency: 5, accelCost: 8, programmable: true,
    forTraining: true, compute: "simt_tensor_mma",
    bestUse: "llm_training_cluster",
  },
  tpu_systolic: {
    topsPerWatt: 8, memBandwidth: 8, flexibility: 5,
    latency: 7, accelCost: 9, programmable: false,
    forTraining: true, compute: "systolic_bfloat16",
    bestUse: "cloud_ml_inference",
  },
  npu_dataflow: {
    topsPerWatt: 10, memBandwidth: 5, flexibility: 4,
    latency: 9, accelCost: 4, programmable: false,
    forTraining: false, compute: "spatial_dataflow_int8",
    bestUse: "edge_vision_classify",
  },
  fpga_overlay: {
    topsPerWatt: 5, memBandwidth: 6, flexibility: 10,
    latency: 8, accelCost: 7, programmable: true,
    forTraining: false, compute: "dsp_slice_overlay",
    bestUse: "custom_layer_prototype",
  },
  analog_imc: {
    topsPerWatt: 9, memBandwidth: 3, flexibility: 2,
    latency: 10, accelCost: 6, programmable: false,
    forTraining: false, compute: "rram_crossbar_mvm",
    bestUse: "ultra_low_power_sensor",
  },
};

const get = (t: AiAccelerator) => DATA[t];

export const topsPerWatt = (t: AiAccelerator) => get(t).topsPerWatt;
export const memBandwidth = (t: AiAccelerator) => get(t).memBandwidth;
export const flexibility = (t: AiAccelerator) => get(t).flexibility;
export const latency = (t: AiAccelerator) => get(t).latency;
export const accelCost = (t: AiAccelerator) => get(t).accelCost;
export const programmable = (t: AiAccelerator) => get(t).programmable;
export const forTraining = (t: AiAccelerator) => get(t).forTraining;
export const compute = (t: AiAccelerator) => get(t).compute;
export const bestUse = (t: AiAccelerator) => get(t).bestUse;
export const aiAccelerators = (): AiAccelerator[] => Object.keys(DATA) as AiAccelerator[];
