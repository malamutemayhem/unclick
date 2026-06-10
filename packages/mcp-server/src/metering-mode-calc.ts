export type MeteringMode = "matrix" | "center_weighted" | "spot" | "highlight_weighted" | "partial";

export function coveragePercent(m_mode: MeteringMode): number {
  const m: Record<MeteringMode, number> = {
    matrix: 100, center_weighted: 75, spot: 3, highlight_weighted: 100, partial: 10,
  };
  return m[m_mode];
}

export function accuracyScore(m_mode: MeteringMode): number {
  const m: Record<MeteringMode, number> = {
    matrix: 7, center_weighted: 6, spot: 10, highlight_weighted: 8, partial: 9,
  };
  return m[m_mode];
}

export function easeOfUse(m_mode: MeteringMode): number {
  const m: Record<MeteringMode, number> = {
    matrix: 10, center_weighted: 8, spot: 4, highlight_weighted: 7, partial: 5,
  };
  return m[m_mode];
}

export function highlightProtection(m_mode: MeteringMode): number {
  const m: Record<MeteringMode, number> = {
    matrix: 5, center_weighted: 4, spot: 7, highlight_weighted: 10, partial: 6,
  };
  return m[m_mode];
}

export function backlitHandling(m_mode: MeteringMode): number {
  const m: Record<MeteringMode, number> = {
    matrix: 6, center_weighted: 4, spot: 9, highlight_weighted: 7, partial: 8,
  };
  return m[m_mode];
}

export function subjectIsolation(m_mode: MeteringMode): boolean {
  const m: Record<MeteringMode, boolean> = {
    matrix: false, center_weighted: false, spot: true, highlight_weighted: false, partial: true,
  };
  return m[m_mode];
}

export function sceneAnalysis(m_mode: MeteringMode): boolean {
  const m: Record<MeteringMode, boolean> = {
    matrix: true, center_weighted: false, spot: false, highlight_weighted: true, partial: false,
  };
  return m[m_mode];
}

export function bestScenario(m_mode: MeteringMode): string {
  const m: Record<MeteringMode, string> = {
    matrix: "general_scenes", center_weighted: "portraits",
    spot: "stage_performers", highlight_weighted: "weddings",
    partial: "backlit_subjects",
  };
  return m[m_mode];
}

export function complexityLevel(m_mode: MeteringMode): number {
  const m: Record<MeteringMode, number> = {
    matrix: 8, center_weighted: 3, spot: 6, highlight_weighted: 7, partial: 5,
  };
  return m[m_mode];
}

export function meteringModes(): MeteringMode[] {
  return ["matrix", "center_weighted", "spot", "highlight_weighted", "partial"];
}
