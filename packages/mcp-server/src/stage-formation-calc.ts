export type StageFormation = "line" | "circle" | "diagonal" | "cluster" | "v_shape";

export function visualImpact(s: StageFormation): number {
  const m: Record<StageFormation, number> = {
    line: 6, circle: 8, diagonal: 9, cluster: 5, v_shape: 10,
  };
  return m[s];
}

export function spatialCoverage(s: StageFormation): number {
  const m: Record<StageFormation, number> = {
    line: 8, circle: 7, diagonal: 9, cluster: 4, v_shape: 8,
  };
  return m[s];
}

export function audienceVisibility(s: StageFormation): number {
  const m: Record<StageFormation, number> = {
    line: 9, circle: 5, diagonal: 8, cluster: 4, v_shape: 10,
  };
  return m[s];
}

export function transitionEase(s: StageFormation): number {
  const m: Record<StageFormation, number> = {
    line: 8, circle: 6, diagonal: 7, cluster: 10, v_shape: 5,
  };
  return m[s];
}

export function dancerCount(s: StageFormation): number {
  const m: Record<StageFormation, number> = {
    line: 8, circle: 10, diagonal: 6, cluster: 5, v_shape: 7,
  };
  return m[s];
}

export function symmetrical(s: StageFormation): boolean {
  const m: Record<StageFormation, boolean> = {
    line: true, circle: true, diagonal: false, cluster: false, v_shape: true,
  };
  return m[s];
}

export function centerFocal(s: StageFormation): boolean {
  const m: Record<StageFormation, boolean> = {
    line: false, circle: true, diagonal: false, cluster: true, v_shape: true,
  };
  return m[s];
}

export function bestGenre(s: StageFormation): string {
  const m: Record<StageFormation, string> = {
    line: "chorus_kickline", circle: "folk_ritual",
    diagonal: "contemporary_ballet", cluster: "modern_abstract",
    v_shape: "musical_finale",
  };
  return m[s];
}

export function dynamicQuality(s: StageFormation): string {
  const m: Record<StageFormation, string> = {
    line: "uniform_power", circle: "communal_unity",
    diagonal: "tension_movement", cluster: "chaos_intimacy",
    v_shape: "focus_grandeur",
  };
  return m[s];
}

export function stageFormations(): StageFormation[] {
  return ["line", "circle", "diagonal", "cluster", "v_shape"];
}
