export type ResistanceSpotWeldType =
  | "pedestal_press"
  | "portable_gun"
  | "robotic_spot"
  | "projection_weld"
  | "seam_weld";

interface ResistanceSpotWeldData {
  weldStrength: number;
  speed: number;
  consistency: number;
  materialRange: number;
  rwCost: number;
  automated: boolean;
  forSheetMetal: boolean;
  electrode: string;
  bestUse: string;
}

const DATA: Record<ResistanceSpotWeldType, ResistanceSpotWeldData> = {
  pedestal_press: {
    weldStrength: 8, speed: 7, consistency: 8, materialRange: 7, rwCost: 5,
    automated: false, forSheetMetal: true,
    electrode: "fixed_pedestal_pneumatic_press_copper_electrode_tip_dress",
    bestUse: "general_fabrication_sheet_metal_assembly_stationary_weld",
  },
  portable_gun: {
    weldStrength: 6, speed: 6, consistency: 5, materialRange: 6, rwCost: 3,
    automated: false, forSheetMetal: true,
    electrode: "handheld_c_frame_gun_transformer_integrated_portable_tip",
    bestUse: "field_repair_auto_body_sheet_metal_ductwork_manual_spot",
  },
  robotic_spot: {
    weldStrength: 9, speed: 10, consistency: 10, materialRange: 8, rwCost: 9,
    automated: true, forSheetMetal: true,
    electrode: "servo_gun_robot_wrist_adaptive_force_mid_frequency_dc",
    bestUse: "automotive_body_line_high_volume_multi_spot_robot_cell",
  },
  projection_weld: {
    weldStrength: 9, speed: 9, consistency: 9, materialRange: 7, rwCost: 7,
    automated: true, forSheetMetal: true,
    electrode: "flat_electrode_embossed_projection_nut_bolt_weld_fixture",
    bestUse: "nut_stud_projection_bracket_weld_automotive_chassis_part",
  },
  seam_weld: {
    weldStrength: 8, speed: 8, consistency: 8, materialRange: 6, rwCost: 6,
    automated: true, forSheetMetal: true,
    electrode: "rotating_wheel_electrode_continuous_overlapping_spot_seam",
    bestUse: "fuel_tank_can_drum_radiator_hermetic_leak_tight_seam_weld",
  },
};

function get(t: ResistanceSpotWeldType): ResistanceSpotWeldData {
  return DATA[t];
}

export const weldStrength = (t: ResistanceSpotWeldType) => get(t).weldStrength;
export const speed = (t: ResistanceSpotWeldType) => get(t).speed;
export const consistency = (t: ResistanceSpotWeldType) => get(t).consistency;
export const materialRange = (t: ResistanceSpotWeldType) => get(t).materialRange;
export const rwCost = (t: ResistanceSpotWeldType) => get(t).rwCost;
export const automated = (t: ResistanceSpotWeldType) => get(t).automated;
export const forSheetMetal = (t: ResistanceSpotWeldType) => get(t).forSheetMetal;
export const electrode = (t: ResistanceSpotWeldType) => get(t).electrode;
export const bestUse = (t: ResistanceSpotWeldType) => get(t).bestUse;
export const resistanceSpotWeldTypes = (): ResistanceSpotWeldType[] =>
  Object.keys(DATA) as ResistanceSpotWeldType[];
