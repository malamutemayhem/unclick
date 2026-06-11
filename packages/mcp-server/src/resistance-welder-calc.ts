export type ResistanceWelderType =
  | "spot_weld"
  | "seam_weld"
  | "projection_weld"
  | "flash_butt"
  | "upset_butt";

interface ResistanceWelderData {
  weldSpeed: number;
  jointConsistency: number;
  materialThickness: number;
  energyEfficiency: number;
  rwCost: number;
  automated: boolean;
  forSheet: boolean;
  welderConfig: string;
  bestUse: string;
}

const DATA: Record<ResistanceWelderType, ResistanceWelderData> = {
  spot_weld: {
    weldSpeed: 10, jointConsistency: 9, materialThickness: 6, energyEfficiency: 8, rwCost: 6,
    automated: true, forSheet: true,
    welderConfig: "spot_weld_electrode_squeeze_current_nugget_sheet_metal_overlap",
    bestUse: "automotive_body_panel_sheet_metal_spot_weld_robot_high_speed",
  },
  seam_weld: {
    weldSpeed: 9, jointConsistency: 9, materialThickness: 6, energyEfficiency: 7, rwCost: 7,
    automated: true, forSheet: true,
    welderConfig: "seam_weld_roller_electrode_continuous_overlap_tank_barrel_seal",
    bestUse: "tank_barrel_fuel_tank_seam_weld_roller_electrode_leak_proof_seal",
  },
  projection_weld: {
    weldSpeed: 8, jointConsistency: 10, materialThickness: 8, energyEfficiency: 9, rwCost: 7,
    automated: true, forSheet: false,
    welderConfig: "projection_weld_raised_dimple_localize_heat_nut_stud_bracket",
    bestUse: "weld_nut_stud_bracket_to_panel_projection_weld_dimple_localize",
  },
  flash_butt: {
    weldSpeed: 7, jointConsistency: 8, materialThickness: 10, energyEfficiency: 7, rwCost: 8,
    automated: true, forSheet: false,
    welderConfig: "flash_butt_weld_clamp_flash_arc_forge_upset_rail_chain_rim",
    bestUse: "rail_chain_wheel_rim_flash_butt_weld_forge_upset_full_section",
  },
  upset_butt: {
    weldSpeed: 8, jointConsistency: 8, materialThickness: 9, energyEfficiency: 8, rwCost: 6,
    automated: true, forSheet: false,
    welderConfig: "upset_butt_weld_clamp_pressure_current_bar_rod_wire_end_join",
    bestUse: "wire_rod_bar_end_to_end_upset_butt_weld_continuous_mill_join",
  },
};

function get(t: ResistanceWelderType): ResistanceWelderData {
  return DATA[t];
}

export const weldSpeed = (t: ResistanceWelderType) => get(t).weldSpeed;
export const jointConsistency = (t: ResistanceWelderType) => get(t).jointConsistency;
export const materialThickness = (t: ResistanceWelderType) => get(t).materialThickness;
export const energyEfficiency = (t: ResistanceWelderType) => get(t).energyEfficiency;
export const rwCost = (t: ResistanceWelderType) => get(t).rwCost;
export const automated = (t: ResistanceWelderType) => get(t).automated;
export const forSheet = (t: ResistanceWelderType) => get(t).forSheet;
export const welderConfig = (t: ResistanceWelderType) => get(t).welderConfig;
export const bestUse = (t: ResistanceWelderType) => get(t).bestUse;
export const resistanceWelderTypes = (): ResistanceWelderType[] =>
  Object.keys(DATA) as ResistanceWelderType[];
