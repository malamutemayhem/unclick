export type MechanicalPencilType = "drafting_05mm_precise" | "writing_07mm_standard" | "auto_advance_shake" | "clutch_2mm_lead_holder" | "multipen_pencil_combo";

export function linePrecision(t: MechanicalPencilType): number {
  const m: Record<MechanicalPencilType, number> = {
    drafting_05mm_precise: 10, writing_07mm_standard: 7, auto_advance_shake: 6, clutch_2mm_lead_holder: 5, multipen_pencil_combo: 6,
  };
  return m[t];
}

export function leadBreakResist(t: MechanicalPencilType): number {
  const m: Record<MechanicalPencilType, number> = {
    drafting_05mm_precise: 6, writing_07mm_standard: 8, auto_advance_shake: 7, clutch_2mm_lead_holder: 10, multipen_pencil_combo: 5,
  };
  return m[t];
}

export function writingComfort(t: MechanicalPencilType): number {
  const m: Record<MechanicalPencilType, number> = {
    drafting_05mm_precise: 7, writing_07mm_standard: 9, auto_advance_shake: 8, clutch_2mm_lead_holder: 6, multipen_pencil_combo: 7,
  };
  return m[t];
}

export function versatility(t: MechanicalPencilType): number {
  const m: Record<MechanicalPencilType, number> = {
    drafting_05mm_precise: 5, writing_07mm_standard: 7, auto_advance_shake: 6, clutch_2mm_lead_holder: 8, multipen_pencil_combo: 10,
  };
  return m[t];
}

export function pencilCost(t: MechanicalPencilType): number {
  const m: Record<MechanicalPencilType, number> = {
    drafting_05mm_precise: 7, writing_07mm_standard: 4, auto_advance_shake: 6, clutch_2mm_lead_holder: 5, multipen_pencil_combo: 8,
  };
  return m[t];
}

export function hasEraser(t: MechanicalPencilType): boolean {
  const m: Record<MechanicalPencilType, boolean> = {
    drafting_05mm_precise: false, writing_07mm_standard: true, auto_advance_shake: true, clutch_2mm_lead_holder: false, multipen_pencil_combo: true,
  };
  return m[t];
}

export function retractableTip(t: MechanicalPencilType): boolean {
  const m: Record<MechanicalPencilType, boolean> = {
    drafting_05mm_precise: true, writing_07mm_standard: false, auto_advance_shake: false, clutch_2mm_lead_holder: false, multipen_pencil_combo: true,
  };
  return m[t];
}

export function leadAdvance(t: MechanicalPencilType): string {
  const m: Record<MechanicalPencilType, string> = {
    drafting_05mm_precise: "side_click_pipe_slide",
    writing_07mm_standard: "top_click_ratchet",
    auto_advance_shake: "automatic_shake_advance",
    clutch_2mm_lead_holder: "push_button_clutch_jaw",
    multipen_pencil_combo: "twist_select_mechanism",
  };
  return m[t];
}

export function bestUse(t: MechanicalPencilType): string {
  const m: Record<MechanicalPencilType, string> = {
    drafting_05mm_precise: "technical_drawing_cad",
    writing_07mm_standard: "daily_notes_homework",
    auto_advance_shake: "fast_writing_lecture",
    clutch_2mm_lead_holder: "sketching_shading_art",
    multipen_pencil_combo: "planner_multi_function",
  };
  return m[t];
}

export function mechanicalPencils(): MechanicalPencilType[] {
  return ["drafting_05mm_precise", "writing_07mm_standard", "auto_advance_shake", "clutch_2mm_lead_holder", "multipen_pencil_combo"];
}
