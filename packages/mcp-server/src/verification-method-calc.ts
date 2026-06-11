export type VerificationMethod =
  | "uvm_constrained_random"
  | "formal_assertion"
  | "coverage_directed"
  | "emulation_in_circuit"
  | "portable_stimulus_pss";

const DATA: Record<VerificationMethod, {
  coverage: number; speed: number; bugFind: number;
  reuse: number; vmCost: number; exhaustive: boolean;
  forIp: boolean; framework: string; bestUse: string;
}> = {
  uvm_constrained_random: {
    coverage: 8, speed: 6, bugFind: 8,
    reuse: 9, vmCost: 5, exhaustive: false,
    forIp: true, framework: "systemverilog_uvm_class",
    bestUse: "ip_block_regression",
  },
  formal_assertion: {
    coverage: 10, speed: 3, bugFind: 10,
    reuse: 6, vmCost: 6, exhaustive: true,
    forIp: true, framework: "sva_psl_property_spec",
    bestUse: "protocol_deadlock_proof",
  },
  coverage_directed: {
    coverage: 9, speed: 5, bugFind: 7,
    reuse: 7, vmCost: 4, exhaustive: false,
    forIp: false, framework: "functional_cross_bins",
    bestUse: "soc_integration_hole_fill",
  },
  emulation_in_circuit: {
    coverage: 6, speed: 10, bugFind: 6,
    reuse: 4, vmCost: 9, exhaustive: false,
    forIp: false, framework: "hardware_speed_real_sw",
    bestUse: "full_chip_boot_firmware",
  },
  portable_stimulus_pss: {
    coverage: 9, speed: 7, bugFind: 8,
    reuse: 10, vmCost: 7, exhaustive: false,
    forIp: true, framework: "accellera_pss_graph",
    bestUse: "multi_level_reuse_plan",
  },
};

const get = (t: VerificationMethod) => DATA[t];

export const coverage = (t: VerificationMethod) => get(t).coverage;
export const speed = (t: VerificationMethod) => get(t).speed;
export const bugFind = (t: VerificationMethod) => get(t).bugFind;
export const reuse = (t: VerificationMethod) => get(t).reuse;
export const vmCost = (t: VerificationMethod) => get(t).vmCost;
export const exhaustive = (t: VerificationMethod) => get(t).exhaustive;
export const forIp = (t: VerificationMethod) => get(t).forIp;
export const framework = (t: VerificationMethod) => get(t).framework;
export const bestUse = (t: VerificationMethod) => get(t).bestUse;
export const verificationMethods = (): VerificationMethod[] => Object.keys(DATA) as VerificationMethod[];
