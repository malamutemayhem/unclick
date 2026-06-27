// needle-felt-tool-calc - needle felting tool types

export type NeedleFeltTool =
  | "single_needle_hand"
  | "multi_needle_pen"
  | "clover_tool_spring"
  | "felting_machine_auto"
  | "reverse_needle_pull";

const DATA: Record<NeedleFeltTool, {
  controlFine: number; speedFelt: number; detailFine: number; comfortGrip: number;
  cost: number; multiNeedle: boolean; powered: boolean; needleHolder: string; bestUse: string;
}> = {
  single_needle_hand:   { controlFine: 10, speedFelt: 3, detailFine: 10, comfortGrip: 5, cost: 1, multiNeedle: false, powered: false, needleHolder: "bare_needle_grip", bestUse: "fine_detail_sculpt" },
  multi_needle_pen:     { controlFine: 7, speedFelt: 7, detailFine: 6, comfortGrip: 8, cost: 4, multiNeedle: true, powered: false, needleHolder: "spring_loaded_pen", bestUse: "general_surface_fill" },
  clover_tool_spring:   { controlFine: 8, speedFelt: 6, detailFine: 7, comfortGrip: 9, cost: 5, multiNeedle: true, powered: false, needleHolder: "ergonomic_spring_body", bestUse: "comfortable_long_session" },
  felting_machine_auto: { controlFine: 4, speedFelt: 10, detailFine: 3, comfortGrip: 7, cost: 9, multiNeedle: true, powered: true, needleHolder: "motorized_punch_head", bestUse: "large_flat_panel" },
  reverse_needle_pull:  { controlFine: 9, speedFelt: 4, detailFine: 8, comfortGrip: 6, cost: 3, multiNeedle: false, powered: false, needleHolder: "reverse_barb_holder", bestUse: "fuzzy_texture_pull" },
};

const get = (t: NeedleFeltTool) => DATA[t];
export const controlFine = (t: NeedleFeltTool) => get(t).controlFine;
export const speedFelt = (t: NeedleFeltTool) => get(t).speedFelt;
export const detailFine = (t: NeedleFeltTool) => get(t).detailFine;
export const comfortGrip = (t: NeedleFeltTool) => get(t).comfortGrip;
export const toolCost = (t: NeedleFeltTool) => get(t).cost;
export const multiNeedle = (t: NeedleFeltTool) => get(t).multiNeedle;
export const powered = (t: NeedleFeltTool) => get(t).powered;
export const needleHolder = (t: NeedleFeltTool) => get(t).needleHolder;
export const bestUse = (t: NeedleFeltTool) => get(t).bestUse;
export const needleFeltTools = (): NeedleFeltTool[] => Object.keys(DATA) as NeedleFeltTool[];
