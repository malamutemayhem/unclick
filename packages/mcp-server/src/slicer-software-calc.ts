export type SlicerSoftware = "cura" | "prusaslicer" | "simplify3d" | "ideamaker" | "orcaslicer";

export function easeOfUse(s: SlicerSoftware): number {
  const m: Record<SlicerSoftware, number> = {
    cura: 9, prusaslicer: 7, simplify3d: 5, ideamaker: 8, orcaslicer: 6,
  };
  return m[s];
}

export function advancedFeatures(s: SlicerSoftware): number {
  const m: Record<SlicerSoftware, number> = {
    cura: 7, prusaslicer: 9, simplify3d: 8, ideamaker: 6, orcaslicer: 10,
  };
  return m[s];
}

export function printerSupport(s: SlicerSoftware): number {
  const m: Record<SlicerSoftware, number> = {
    cura: 10, prusaslicer: 8, simplify3d: 7, ideamaker: 5, orcaslicer: 9,
  };
  return m[s];
}

export function slicingSpeed(s: SlicerSoftware): number {
  const m: Record<SlicerSoftware, number> = {
    cura: 6, prusaslicer: 8, simplify3d: 7, ideamaker: 9, orcaslicer: 10,
  };
  return m[s];
}

export function licenseCost(s: SlicerSoftware): number {
  const m: Record<SlicerSoftware, number> = {
    cura: 0, prusaslicer: 0, simplify3d: 8, ideamaker: 0, orcaslicer: 0,
  };
  return m[s];
}

export function openSource(s: SlicerSoftware): boolean {
  const m: Record<SlicerSoftware, boolean> = {
    cura: true, prusaslicer: true, simplify3d: false, ideamaker: false, orcaslicer: true,
  };
  return m[s];
}

export function multiMaterialSupport(s: SlicerSoftware): boolean {
  const m: Record<SlicerSoftware, boolean> = {
    cura: true, prusaslicer: true, simplify3d: true, ideamaker: false, orcaslicer: true,
  };
  return m[s];
}

export function coreEngine(s: SlicerSoftware): string {
  const m: Record<SlicerSoftware, string> = {
    cura: "curaengine_arachne_variable", prusaslicer: "perimeter_generator_classic",
    simplify3d: "proprietary_process_engine", ideamaker: "raise3d_optimized_engine",
    orcaslicer: "bambu_fork_arachne_enhanced",
  };
  return m[s];
}

export function bestUser(s: SlicerSoftware): string {
  const m: Record<SlicerSoftware, string> = {
    cura: "beginner_ultimaker_general", prusaslicer: "intermediate_prusa_advanced",
    simplify3d: "experienced_fine_control", ideamaker: "raise3d_quick_simple",
    orcaslicer: "bambu_multi_color_speed",
  };
  return m[s];
}

export function slicerSoftwareTypes(): SlicerSoftware[] {
  return ["cura", "prusaslicer", "simplify3d", "ideamaker", "orcaslicer"];
}
