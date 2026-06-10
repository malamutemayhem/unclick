export type DanceNotation = "labanotation" | "benesh" | "eshkol_wachman" | "action_stroke" | "motif";

export function precisionLevel(d: DanceNotation): number {
  const m: Record<DanceNotation, number> = {
    labanotation: 10, benesh: 9, eshkol_wachman: 8, action_stroke: 5, motif: 3,
  };
  return m[d];
}

export function learningDifficulty(d: DanceNotation): number {
  const m: Record<DanceNotation, number> = {
    labanotation: 10, benesh: 8, eshkol_wachman: 9, action_stroke: 4, motif: 2,
  };
  return m[d];
}

export function adoptionLevel(d: DanceNotation): number {
  const m: Record<DanceNotation, number> = {
    labanotation: 8, benesh: 7, eshkol_wachman: 3, action_stroke: 4, motif: 6,
  };
  return m[d];
}

export function notationSpeed(d: DanceNotation): number {
  const m: Record<DanceNotation, number> = {
    labanotation: 3, benesh: 5, eshkol_wachman: 4, action_stroke: 8, motif: 10,
  };
  return m[d];
}

export function bodyPartDetail(d: DanceNotation): number {
  const m: Record<DanceNotation, number> = {
    labanotation: 10, benesh: 9, eshkol_wachman: 10, action_stroke: 5, motif: 3,
  };
  return m[d];
}

export function usesStaffSystem(d: DanceNotation): boolean {
  const m: Record<DanceNotation, boolean> = {
    labanotation: true, benesh: true, eshkol_wachman: false, action_stroke: false, motif: false,
  };
  return m[d];
}

export function suitableForTeaching(d: DanceNotation): boolean {
  const m: Record<DanceNotation, boolean> = {
    labanotation: false, benesh: false, eshkol_wachman: false, action_stroke: true, motif: true,
  };
  return m[d];
}

export function primaryUse(d: DanceNotation): string {
  const m: Record<DanceNotation, string> = {
    labanotation: "archival_reconstruction", benesh: "ballet_companies",
    eshkol_wachman: "research_analysis", action_stroke: "quick_sketching",
    motif: "education_overview",
  };
  return m[d];
}

export function creator(d: DanceNotation): string {
  const m: Record<DanceNotation, string> = {
    labanotation: "rudolf_laban", benesh: "rudolf_joan_benesh",
    eshkol_wachman: "noa_eshkol", action_stroke: "ann_hutchinson",
    motif: "laban_simplified",
  };
  return m[d];
}

export function danceNotations(): DanceNotation[] {
  return ["labanotation", "benesh", "eshkol_wachman", "action_stroke", "motif"];
}
