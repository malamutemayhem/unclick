export type ResistanceWeldType =
  | "spot_weld_sheet"
  | "seam_weld_continuous"
  | "projection_weld_nut"
  | "flash_butt_rail"
  | "upset_weld_bar";

interface ResistanceWeldData {
  speed: number;
  repeatability: number;
  sheetCapability: number;
  automation: number;
  rwCost: number;
  continuous: boolean;
  forSheet: boolean;
  electrode: string;
  bestUse: string;
}

const DATA: Record<ResistanceWeldType, ResistanceWeldData> = {
  spot_weld_sheet: {
    speed: 10, repeatability: 9, sheetCapability: 10, automation: 10, rwCost: 6,
    continuous: false, forSheet: true,
    electrode: "copper_alloy_truncated_cone_tip",
    bestUse: "auto_body_sheet_metal_overlap",
  },
  seam_weld_continuous: {
    speed: 9, repeatability: 9, sheetCapability: 9, automation: 9, rwCost: 7,
    continuous: true, forSheet: true,
    electrode: "copper_wheel_roller_rotating",
    bestUse: "fuel_tank_can_hermetic_seam",
  },
  projection_weld_nut: {
    speed: 10, repeatability: 10, sheetCapability: 7, automation: 10, rwCost: 5,
    continuous: false, forSheet: true,
    electrode: "flat_copper_die_embossed_point",
    bestUse: "weld_nut_stud_fastener_attach",
  },
  flash_butt_rail: {
    speed: 6, repeatability: 8, sheetCapability: 3, automation: 7, rwCost: 8,
    continuous: false, forSheet: false,
    electrode: "clamping_die_full_section_forge",
    bestUse: "rail_chain_link_rod_butt_joint",
  },
  upset_weld_bar: {
    speed: 7, repeatability: 8, sheetCapability: 4, automation: 8, rwCost: 6,
    continuous: false, forSheet: false,
    electrode: "clamping_die_solid_state_forge",
    bestUse: "wire_rod_tube_end_butt_joint",
  },
};

function get(t: ResistanceWeldType): ResistanceWeldData {
  return DATA[t];
}

export const speed = (t: ResistanceWeldType) => get(t).speed;
export const repeatability = (t: ResistanceWeldType) => get(t).repeatability;
export const sheetCapability = (t: ResistanceWeldType) => get(t).sheetCapability;
export const automation = (t: ResistanceWeldType) => get(t).automation;
export const rwCost = (t: ResistanceWeldType) => get(t).rwCost;
export const continuous = (t: ResistanceWeldType) => get(t).continuous;
export const forSheet = (t: ResistanceWeldType) => get(t).forSheet;
export const electrode = (t: ResistanceWeldType) => get(t).electrode;
export const bestUse = (t: ResistanceWeldType) => get(t).bestUse;
export const resistanceWeldTypes = (): ResistanceWeldType[] =>
  Object.keys(DATA) as ResistanceWeldType[];
