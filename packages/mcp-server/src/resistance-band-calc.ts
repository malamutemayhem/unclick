export type ResistanceBand = "loop_flat" | "tube_handle" | "pull_up_assist" | "mini_hip" | "therapy_latex";

export function maxResistance(r: ResistanceBand): number {
  const m: Record<ResistanceBand, number> = {
    loop_flat: 7, tube_handle: 6, pull_up_assist: 10, mini_hip: 4, therapy_latex: 2,
  };
  return m[r];
}

export function exerciseVariety(r: ResistanceBand): number {
  const m: Record<ResistanceBand, number> = {
    loop_flat: 9, tube_handle: 8, pull_up_assist: 5, mini_hip: 4, therapy_latex: 7,
  };
  return m[r];
}

export function portability(r: ResistanceBand): number {
  const m: Record<ResistanceBand, number> = {
    loop_flat: 9, tube_handle: 7, pull_up_assist: 5, mini_hip: 10, therapy_latex: 10,
  };
  return m[r];
}

export function durabilityScore(r: ResistanceBand): number {
  const m: Record<ResistanceBand, number> = {
    loop_flat: 7, tube_handle: 6, pull_up_assist: 9, mini_hip: 5, therapy_latex: 3,
  };
  return m[r];
}

export function bandCost(r: ResistanceBand): number {
  const m: Record<ResistanceBand, number> = {
    loop_flat: 3, tube_handle: 4, pull_up_assist: 5, mini_hip: 2, therapy_latex: 1,
  };
  return m[r];
}

export function hasHandles(r: ResistanceBand): boolean {
  const m: Record<ResistanceBand, boolean> = {
    loop_flat: false, tube_handle: true, pull_up_assist: false, mini_hip: false, therapy_latex: false,
  };
  return m[r];
}

export function anchorRequired(r: ResistanceBand): boolean {
  const m: Record<ResistanceBand, boolean> = {
    loop_flat: false, tube_handle: true, pull_up_assist: true, mini_hip: false, therapy_latex: false,
  };
  return m[r];
}

export function material(r: ResistanceBand): string {
  const m: Record<ResistanceBand, string> = {
    loop_flat: "natural_latex_flat_strip", tube_handle: "rubber_tube_foam_grip",
    pull_up_assist: "layered_latex_continuous_loop", mini_hip: "fabric_elastic_non_slip",
    therapy_latex: "thin_latex_progressive_color",
  };
  return m[r];
}

export function bestExercise(r: ResistanceBand): string {
  const m: Record<ResistanceBand, string> = {
    loop_flat: "powerlifting_mobility_stretch", tube_handle: "upper_body_door_anchor",
    pull_up_assist: "pull_up_bar_progression", mini_hip: "glute_activation_hip_abduction",
    therapy_latex: "rehab_physical_therapy",
  };
  return m[r];
}

export function resistanceBands(): ResistanceBand[] {
  return ["loop_flat", "tube_handle", "pull_up_assist", "mini_hip", "therapy_latex"];
}
