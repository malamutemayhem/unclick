export type AssessmentType = "multiple_choice" | "essay" | "portfolio" | "oral_exam" | "peer_review";

export function gradingSpeed(a: AssessmentType): number {
  const m: Record<AssessmentType, number> = {
    multiple_choice: 10, essay: 2, portfolio: 3, oral_exam: 4, peer_review: 7,
  };
  return m[a];
}

export function depthOfUnderstanding(a: AssessmentType): number {
  const m: Record<AssessmentType, number> = {
    multiple_choice: 3, essay: 9, portfolio: 10, oral_exam: 8, peer_review: 6,
  };
  return m[a];
}

export function objectivity(a: AssessmentType): number {
  const m: Record<AssessmentType, number> = {
    multiple_choice: 10, essay: 4, portfolio: 3, oral_exam: 5, peer_review: 4,
  };
  return m[a];
}

export function cheatingVulnerability(a: AssessmentType): number {
  const m: Record<AssessmentType, number> = {
    multiple_choice: 8, essay: 5, portfolio: 2, oral_exam: 1, peer_review: 4,
  };
  return m[a];
}

export function studentAnxiety(a: AssessmentType): number {
  const m: Record<AssessmentType, number> = {
    multiple_choice: 6, essay: 7, portfolio: 3, oral_exam: 9, peer_review: 5,
  };
  return m[a];
}

export function automatable(a: AssessmentType): boolean {
  const m: Record<AssessmentType, boolean> = {
    multiple_choice: true, essay: false, portfolio: false, oral_exam: false, peer_review: false,
  };
  return m[a];
}

export function formativeUse(a: AssessmentType): boolean {
  const m: Record<AssessmentType, boolean> = {
    multiple_choice: false, essay: false, portfolio: true, oral_exam: false, peer_review: true,
  };
  return m[a];
}

export function bloomsLevel(a: AssessmentType): string {
  const m: Record<AssessmentType, string> = {
    multiple_choice: "remember_understand", essay: "analyze_evaluate",
    portfolio: "create", oral_exam: "evaluate",
    peer_review: "evaluate",
  };
  return m[a];
}

export function feedbackQuality(a: AssessmentType): string {
  const m: Record<AssessmentType, string> = {
    multiple_choice: "minimal", essay: "detailed_written",
    portfolio: "ongoing_dialogue", oral_exam: "immediate_verbal",
    peer_review: "peer_perspective",
  };
  return m[a];
}

export function assessmentTypes(): AssessmentType[] {
  return ["multiple_choice", "essay", "portfolio", "oral_exam", "peer_review"];
}
