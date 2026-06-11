export type PanelSawType =
  | "beam_saw"
  | "vertical_panel"
  | "sliding_table"
  | "cnc_nesting"
  | "wall_saw";

interface PanelSawData {
  speed: number;
  cutQuality: number;
  panelCapacity: number;
  automation: number;
  psCost: number;
  batchCapable: boolean;
  forMelamine: boolean;
  cutting: string;
  bestUse: string;
}

const DATA: Record<PanelSawType, PanelSawData> = {
  beam_saw: {
    speed: 10, cutQuality: 9, panelCapacity: 10, automation: 10, psCost: 10,
    batchCapable: true, forMelamine: true,
    cutting: "horizontal_pressure_beam_programmable_push_saw_batch_stack",
    bestUse: "high_volume_panel_plant_batch_cut_optimize_melamine_mdf",
  },
  vertical_panel: {
    speed: 5, cutQuality: 7, panelCapacity: 7, automation: 4, psCost: 4,
    batchCapable: false, forMelamine: true,
    cutting: "vertical_frame_saw_carriage_panel_upright_small_footprint",
    bestUse: "small_shop_limited_space_full_sheet_breakdown_vertical",
  },
  sliding_table: {
    speed: 6, cutQuality: 10, panelCapacity: 6, automation: 5, psCost: 6,
    batchCapable: false, forMelamine: true,
    cutting: "sliding_table_crosscut_scoring_blade_tilt_miter_precision",
    bestUse: "cabinet_shop_precision_crosscut_angle_cut_single_panel",
  },
  cnc_nesting: {
    speed: 8, cutQuality: 8, panelCapacity: 8, automation: 10, psCost: 9,
    batchCapable: true, forMelamine: true,
    cutting: "cnc_router_nesting_software_optimize_part_layout_vacuum",
    bestUse: "custom_cabinet_furniture_nested_parts_optimized_yield",
  },
  wall_saw: {
    speed: 4, cutQuality: 6, panelCapacity: 8, automation: 3, psCost: 3,
    batchCapable: false, forMelamine: false,
    cutting: "wall_mounted_rail_saw_carriage_vertical_horizontal_cut",
    bestUse: "insulation_foam_board_drywall_sheet_breakdown_jobsite",
  },
};

function get(t: PanelSawType): PanelSawData {
  return DATA[t];
}

export const speed = (t: PanelSawType) => get(t).speed;
export const cutQuality = (t: PanelSawType) => get(t).cutQuality;
export const panelCapacity = (t: PanelSawType) => get(t).panelCapacity;
export const automation = (t: PanelSawType) => get(t).automation;
export const psCost = (t: PanelSawType) => get(t).psCost;
export const batchCapable = (t: PanelSawType) => get(t).batchCapable;
export const forMelamine = (t: PanelSawType) => get(t).forMelamine;
export const cutting = (t: PanelSawType) => get(t).cutting;
export const bestUse = (t: PanelSawType) => get(t).bestUse;
export const panelSawTypes = (): PanelSawType[] =>
  Object.keys(DATA) as PanelSawType[];
