export type AteTester =
  | "digital_scan_ate"
  | "mixed_signal_ate"
  | "rf_mmwave_ate"
  | "memory_high_speed"
  | "soc_system_level";

const DATA: Record<AteTester, {
  throughput: number; accuracy: number; parallelism: number;
  frequency: number; ateCost: number; multiSite: boolean;
  forProduction: boolean; architecture: string; bestUse: string;
}> = {
  digital_scan_ate: {
    throughput: 8, accuracy: 7, parallelism: 9,
    frequency: 6, ateCost: 6, multiSite: true,
    forProduction: true, architecture: "pattern_gen_compare",
    bestUse: "logic_ic_production_test",
  },
  mixed_signal_ate: {
    throughput: 6, accuracy: 9, parallelism: 6,
    frequency: 7, ateCost: 8, multiSite: true,
    forProduction: true, architecture: "adc_dac_dsp_core",
    bestUse: "analog_converter_validation",
  },
  rf_mmwave_ate: {
    throughput: 5, accuracy: 8, parallelism: 4,
    frequency: 10, ateCost: 10, multiSite: false,
    forProduction: true, architecture: "vector_source_analyzer",
    bestUse: "5g_frontend_module",
  },
  memory_high_speed: {
    throughput: 10, accuracy: 7, parallelism: 10,
    frequency: 8, ateCost: 7, multiSite: true,
    forProduction: true, architecture: "parallel_dut_bank",
    bestUse: "dram_nand_mass_test",
  },
  soc_system_level: {
    throughput: 4, accuracy: 8, parallelism: 3,
    frequency: 7, ateCost: 9, multiSite: false,
    forProduction: false, architecture: "embedded_os_stimulus",
    bestUse: "automotive_soc_qual",
  },
};

const get = (t: AteTester) => DATA[t];

export const throughput = (t: AteTester) => get(t).throughput;
export const accuracy = (t: AteTester) => get(t).accuracy;
export const parallelism = (t: AteTester) => get(t).parallelism;
export const frequency = (t: AteTester) => get(t).frequency;
export const ateCost = (t: AteTester) => get(t).ateCost;
export const multiSite = (t: AteTester) => get(t).multiSite;
export const forProduction = (t: AteTester) => get(t).forProduction;
export const architecture = (t: AteTester) => get(t).architecture;
export const bestUse = (t: AteTester) => get(t).bestUse;
export const ateTesters = (): AteTester[] => Object.keys(DATA) as AteTester[];
