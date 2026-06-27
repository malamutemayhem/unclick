export type WaferStepperType =
  | "i_line_stepper"
  | "krf_scanner"
  | "arf_immersion"
  | "euv_lithography"
  | "nanoimprint";

interface WaferStepperData {
  resolution: number;
  throughput: number;
  overlay: number;
  defectControl: number;
  wsCost: number;
  immersion: boolean;
  forAdvanced: boolean;
  stepperConfig: string;
  bestUse: string;
}

const DATA: Record<WaferStepperType, WaferStepperData> = {
  i_line_stepper: {
    resolution: 4, throughput: 8, overlay: 6, defectControl: 7, wsCost: 4,
    immersion: false, forAdvanced: false,
    stepperConfig: "i_line_365nm_mercury_lamp_stepper_mature_node_backend_layer",
    bestUse: "mature_node_backend_layer_mems_sensor_i_line_365nm_stepper",
  },
  krf_scanner: {
    resolution: 6, throughput: 9, overlay: 8, defectControl: 8, wsCost: 6,
    immersion: false, forAdvanced: false,
    stepperConfig: "krf_248nm_excimer_laser_scanner_mid_node_critical_layer_litho",
    bestUse: "mid_node_logic_memory_krf_248nm_scanner_critical_layer_litho",
  },
  arf_immersion: {
    resolution: 8, throughput: 9, overlay: 9, defectControl: 9, wsCost: 9,
    immersion: true, forAdvanced: true,
    stepperConfig: "arf_193nm_immersion_scanner_water_lens_multi_patterning_litho",
    bestUse: "advanced_logic_memory_7nm_plus_arf_immersion_multi_patterning",
  },
  euv_lithography: {
    resolution: 10, throughput: 7, overlay: 10, defectControl: 10, wsCost: 10,
    immersion: false, forAdvanced: true,
    stepperConfig: "euv_13_5nm_tin_plasma_source_reflective_mask_single_expose_litho",
    bestUse: "leading_edge_5nm_3nm_2nm_euv_single_expose_critical_layer",
  },
  nanoimprint: {
    resolution: 9, throughput: 6, overlay: 7, defectControl: 6, wsCost: 7,
    immersion: false, forAdvanced: true,
    stepperConfig: "nanoimprint_template_uv_cure_resist_pattern_transfer_contact",
    bestUse: "memory_3d_nand_nanoimprint_template_uv_cure_low_cost_litho",
  },
};

function get(t: WaferStepperType): WaferStepperData {
  return DATA[t];
}

export const resolution = (t: WaferStepperType) => get(t).resolution;
export const throughput = (t: WaferStepperType) => get(t).throughput;
export const overlay = (t: WaferStepperType) => get(t).overlay;
export const defectControl = (t: WaferStepperType) => get(t).defectControl;
export const wsCost = (t: WaferStepperType) => get(t).wsCost;
export const immersion = (t: WaferStepperType) => get(t).immersion;
export const forAdvanced = (t: WaferStepperType) => get(t).forAdvanced;
export const stepperConfig = (t: WaferStepperType) => get(t).stepperConfig;
export const bestUse = (t: WaferStepperType) => get(t).bestUse;
export const waferStepperTypes = (): WaferStepperType[] =>
  Object.keys(DATA) as WaferStepperType[];
