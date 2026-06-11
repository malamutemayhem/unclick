export type SmtReflowType =
  | "convection_inline"
  | "vapor_phase"
  | "infrared"
  | "dual_lane"
  | "vacuum_reflow";

interface SmtReflowData {
  thermalUniformity: number;
  throughput: number;
  profileControl: number;
  voidReduction: number;
  srCost: number;
  leadFree: boolean;
  forHighReliability: boolean;
  heating: string;
  bestUse: string;
}

const DATA: Record<SmtReflowType, SmtReflowData> = {
  convection_inline: {
    thermalUniformity: 8, throughput: 9, profileControl: 8, voidReduction: 6, srCost: 7,
    leadFree: true, forHighReliability: false,
    heating: "forced_convection_zone_top_bottom_heater_nitrogen_capable",
    bestUse: "high_volume_pcb_assembly_standard_smt_production_line",
  },
  vapor_phase: {
    thermalUniformity: 10, throughput: 5, profileControl: 10, voidReduction: 9, srCost: 8,
    leadFree: true, forHighReliability: true,
    heating: "fluorinated_fluid_boiling_point_condensation_heat_transfer",
    bestUse: "mixed_assembly_large_thermal_mass_bga_sensitive_component",
  },
  infrared: {
    thermalUniformity: 6, throughput: 7, profileControl: 6, voidReduction: 5, srCost: 4,
    leadFree: true, forHighReliability: false,
    heating: "infrared_emitter_panel_radiant_heat_medium_wave_ceramic",
    bestUse: "prototype_lab_small_batch_rework_simple_board_assembly",
  },
  dual_lane: {
    thermalUniformity: 8, throughput: 10, profileControl: 8, voidReduction: 6, srCost: 9,
    leadFree: true, forHighReliability: false,
    heating: "dual_conveyor_lane_independent_speed_width_shared_chamber",
    bestUse: "high_mix_dual_product_simultaneous_run_maximum_utilization",
  },
  vacuum_reflow: {
    thermalUniformity: 9, throughput: 6, profileControl: 9, voidReduction: 10, srCost: 10,
    leadFree: true, forHighReliability: true,
    heating: "convection_plus_vacuum_chamber_void_free_solder_joint",
    bestUse: "automotive_power_module_led_void_critical_joint_quality",
  },
};

function get(t: SmtReflowType): SmtReflowData {
  return DATA[t];
}

export const thermalUniformity = (t: SmtReflowType) => get(t).thermalUniformity;
export const throughput = (t: SmtReflowType) => get(t).throughput;
export const profileControl = (t: SmtReflowType) => get(t).profileControl;
export const voidReduction = (t: SmtReflowType) => get(t).voidReduction;
export const srCost = (t: SmtReflowType) => get(t).srCost;
export const leadFree = (t: SmtReflowType) => get(t).leadFree;
export const forHighReliability = (t: SmtReflowType) => get(t).forHighReliability;
export const heating = (t: SmtReflowType) => get(t).heating;
export const bestUse = (t: SmtReflowType) => get(t).bestUse;
export const smtReflowTypes = (): SmtReflowType[] =>
  Object.keys(DATA) as SmtReflowType[];
