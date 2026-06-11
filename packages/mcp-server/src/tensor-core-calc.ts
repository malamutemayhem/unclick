export type TensorCore =
  | "gpu_cuda_tensor"
  | "tpu_systolic"
  | "npu_mac_array"
  | "fpga_dsp_block"
  | "wafer_scale_engine";

const DATA: Record<TensorCore, {
  tflops: number; powerEff: number; precision: number;
  programmability: number; coreCost: number; sparsity: boolean;
  forTraining: boolean; dataflow: string; bestUse: string;
}> = {
  gpu_cuda_tensor: {
    tflops: 9, powerEff: 6, precision: 8,
    programmability: 9, coreCost: 8, sparsity: true,
    forTraining: true, dataflow: "simt_warp_tensor",
    bestUse: "llm_training_general",
  },
  tpu_systolic: {
    tflops: 8, powerEff: 8, precision: 7,
    programmability: 5, coreCost: 7, sparsity: false,
    forTraining: true, dataflow: "weight_stationary_2d",
    bestUse: "cloud_inference_at_scale",
  },
  npu_mac_array: {
    tflops: 5, powerEff: 9, precision: 5,
    programmability: 4, coreCost: 3, sparsity: true,
    forTraining: false, dataflow: "output_stationary_tiled",
    bestUse: "edge_phone_ai_int8",
  },
  fpga_dsp_block: {
    tflops: 4, powerEff: 7, precision: 9,
    programmability: 10, coreCost: 6, sparsity: false,
    forTraining: false, dataflow: "custom_rtl_pipeline",
    bestUse: "low_latency_quantized",
  },
  wafer_scale_engine: {
    tflops: 10, powerEff: 7, precision: 7,
    programmability: 6, coreCost: 10, sparsity: true,
    forTraining: true, dataflow: "dataflow_on_wafer_mesh",
    bestUse: "frontier_model_training",
  },
};

const get = (t: TensorCore) => DATA[t];

export const tflops = (t: TensorCore) => get(t).tflops;
export const powerEff = (t: TensorCore) => get(t).powerEff;
export const precision = (t: TensorCore) => get(t).precision;
export const programmability = (t: TensorCore) => get(t).programmability;
export const coreCost = (t: TensorCore) => get(t).coreCost;
export const sparsity = (t: TensorCore) => get(t).sparsity;
export const forTraining = (t: TensorCore) => get(t).forTraining;
export const dataflow = (t: TensorCore) => get(t).dataflow;
export const bestUse = (t: TensorCore) => get(t).bestUse;
export const tensorCores = (): TensorCore[] => Object.keys(DATA) as TensorCore[];
