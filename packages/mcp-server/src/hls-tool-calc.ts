export type HlsTool =
  | "vivado_hls_xilinx"
  | "intel_hls_oneapi"
  | "catapult_siemens"
  | "bambu_open_source"
  | "legup_academic";

const DATA: Record<HlsTool, {
  qor: number; compileSpeed: number; languageSupport: number;
  verification: number; hlsCost: number; openSource: boolean;
  forProduction: boolean; inputLang: string; bestUse: string;
}> = {
  vivado_hls_xilinx: {
    qor: 9, compileSpeed: 7, languageSupport: 8,
    verification: 9, hlsCost: 8, openSource: false,
    forProduction: true, inputLang: "cpp_systemc_pragma",
    bestUse: "xilinx_fpga_accelerator",
  },
  intel_hls_oneapi: {
    qor: 8, compileSpeed: 7, languageSupport: 9,
    verification: 8, hlsCost: 7, openSource: false,
    forProduction: true, inputLang: "sycl_oneapi_kernel",
    bestUse: "intel_fpga_datacenter",
  },
  catapult_siemens: {
    qor: 10, compileSpeed: 6, languageSupport: 7,
    verification: 10, hlsCost: 10, openSource: false,
    forProduction: true, inputLang: "systemc_ac_types",
    bestUse: "asic_ip_block_design",
  },
  bambu_open_source: {
    qor: 6, compileSpeed: 8, languageSupport: 6,
    verification: 5, hlsCost: 1, openSource: true,
    forProduction: false, inputLang: "c_gcc_frontend",
    bestUse: "research_benchmark_eval",
  },
  legup_academic: {
    qor: 5, compileSpeed: 8, languageSupport: 5,
    verification: 4, hlsCost: 1, openSource: true,
    forProduction: false, inputLang: "c_llvm_ir_backend",
    bestUse: "teaching_hls_exploration",
  },
};

const get = (t: HlsTool) => DATA[t];

export const qor = (t: HlsTool) => get(t).qor;
export const compileSpeed = (t: HlsTool) => get(t).compileSpeed;
export const languageSupport = (t: HlsTool) => get(t).languageSupport;
export const verification = (t: HlsTool) => get(t).verification;
export const hlsCost = (t: HlsTool) => get(t).hlsCost;
export const openSource = (t: HlsTool) => get(t).openSource;
export const forProduction = (t: HlsTool) => get(t).forProduction;
export const inputLang = (t: HlsTool) => get(t).inputLang;
export const bestUse = (t: HlsTool) => get(t).bestUse;
export const hlsTools = (): HlsTool[] => Object.keys(DATA) as HlsTool[];
