export type UltrasonicNdtType =
  | "pulse_echo_flaw"
  | "phased_array_paut"
  | "tofd_diffraction"
  | "thickness_gauge"
  | "guided_wave_pipe";

interface UltrasonicNdtData {
  sensitivity: number;
  coverage: number;
  depthRange: number;
  portability: number;
  unCost: number;
  automated: boolean;
  forWeldInspection: boolean;
  technique: string;
  bestUse: string;
}

const DATA: Record<UltrasonicNdtType, UltrasonicNdtData> = {
  pulse_echo_flaw: {
    sensitivity: 8, coverage: 5, depthRange: 8, portability: 8, unCost: 5,
    automated: false, forWeldInspection: true,
    technique: "single_element_probe_a_scan_b_scan_flaw_detection",
    bestUse: "forging_casting_flaw_detection_manual_spot_check",
  },
  phased_array_paut: {
    sensitivity: 10, coverage: 9, depthRange: 8, portability: 6, unCost: 9,
    automated: true, forWeldInspection: true,
    technique: "multi_element_probe_electronic_beam_steering_scan",
    bestUse: "weld_inspection_corrosion_mapping_sector_scan_image",
  },
  tofd_diffraction: {
    sensitivity: 9, coverage: 8, depthRange: 9, portability: 6, unCost: 8,
    automated: true, forWeldInspection: true,
    technique: "two_probe_pitch_catch_diffracted_wave_sizing_tofd",
    bestUse: "pressure_vessel_weld_crack_sizing_code_compliance",
  },
  thickness_gauge: {
    sensitivity: 5, coverage: 3, depthRange: 5, portability: 10, unCost: 3,
    automated: false, forWeldInspection: false,
    technique: "dual_element_probe_echo_echo_through_coat_measure",
    bestUse: "pipe_wall_thickness_corrosion_survey_tank_floor",
  },
  guided_wave_pipe: {
    sensitivity: 7, coverage: 10, depthRange: 10, portability: 4, unCost: 10,
    automated: true, forWeldInspection: false,
    technique: "collar_ring_low_freq_guided_wave_long_range_screen",
    bestUse: "buried_insulated_pipe_screening_long_range_survey",
  },
};

function get(t: UltrasonicNdtType): UltrasonicNdtData {
  return DATA[t];
}

export const sensitivity = (t: UltrasonicNdtType) => get(t).sensitivity;
export const coverage = (t: UltrasonicNdtType) => get(t).coverage;
export const depthRange = (t: UltrasonicNdtType) => get(t).depthRange;
export const portability = (t: UltrasonicNdtType) => get(t).portability;
export const unCost = (t: UltrasonicNdtType) => get(t).unCost;
export const automated = (t: UltrasonicNdtType) => get(t).automated;
export const forWeldInspection = (t: UltrasonicNdtType) => get(t).forWeldInspection;
export const technique = (t: UltrasonicNdtType) => get(t).technique;
export const bestUse = (t: UltrasonicNdtType) => get(t).bestUse;
export const ultrasonicNdtTypes = (): UltrasonicNdtType[] =>
  Object.keys(DATA) as UltrasonicNdtType[];
