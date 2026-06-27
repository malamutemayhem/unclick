export type McuArch =
  | "arm_cortex_m0"
  | "arm_cortex_m4f"
  | "arm_cortex_m33"
  | "risc_v_rv32imc"
  | "xtensa_lx7_dual";

const DATA: Record<McuArch, {
  performance: number; powerEff: number; codeSize: number;
  ecosystem: number; archCost: number; fpu: boolean;
  forSecurity: boolean; pipeline: string; bestUse: string;
}> = {
  arm_cortex_m0: {
    performance: 3, powerEff: 9, codeSize: 8,
    ecosystem: 8, archCost: 1, fpu: false,
    forSecurity: false, pipeline: "2_stage_von_neumann",
    bestUse: "low_cost_sensor_node",
  },
  arm_cortex_m4f: {
    performance: 7, powerEff: 7, codeSize: 6,
    ecosystem: 10, archCost: 3, fpu: true,
    forSecurity: false, pipeline: "3_stage_harvard_dsp",
    bestUse: "motor_control_dsp",
  },
  arm_cortex_m33: {
    performance: 8, powerEff: 7, codeSize: 5,
    ecosystem: 8, archCost: 5, fpu: true,
    forSecurity: true, pipeline: "3_stage_trustzone_m",
    bestUse: "iot_secure_element",
  },
  risc_v_rv32imc: {
    performance: 6, powerEff: 8, codeSize: 7,
    ecosystem: 5, archCost: 2, fpu: false,
    forSecurity: false, pipeline: "5_stage_open_isa",
    bestUse: "custom_soc_embedded",
  },
  xtensa_lx7_dual: {
    performance: 9, powerEff: 5, codeSize: 4,
    ecosystem: 7, archCost: 4, fpu: true,
    forSecurity: false, pipeline: "7_stage_dual_issue_vliw",
    bestUse: "wifi_ble_edge_ai",
  },
};

const get = (t: McuArch) => DATA[t];

export const performance = (t: McuArch) => get(t).performance;
export const powerEff = (t: McuArch) => get(t).powerEff;
export const codeSize = (t: McuArch) => get(t).codeSize;
export const ecosystem = (t: McuArch) => get(t).ecosystem;
export const archCost = (t: McuArch) => get(t).archCost;
export const fpu = (t: McuArch) => get(t).fpu;
export const forSecurity = (t: McuArch) => get(t).forSecurity;
export const pipeline = (t: McuArch) => get(t).pipeline;
export const bestUse = (t: McuArch) => get(t).bestUse;
export const mcuArchs = (): McuArch[] => Object.keys(DATA) as McuArch[];
