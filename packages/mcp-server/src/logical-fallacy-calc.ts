export type LogicalFallacy = "ad_hominem" | "straw_man" | "false_dilemma" | "slippery_slope" | "appeal_to_authority";

export function frequencyInDebate(l: LogicalFallacy): number {
  const m: Record<LogicalFallacy, number> = {
    ad_hominem: 10, straw_man: 9, false_dilemma: 7, slippery_slope: 8, appeal_to_authority: 6,
  };
  return m[l];
}

export function detectionDifficulty(l: LogicalFallacy): number {
  const m: Record<LogicalFallacy, number> = {
    ad_hominem: 3, straw_man: 6, false_dilemma: 7, slippery_slope: 5, appeal_to_authority: 8,
  };
  return m[l];
}

export function persuasivePower(l: LogicalFallacy): number {
  const m: Record<LogicalFallacy, number> = {
    ad_hominem: 7, straw_man: 8, false_dilemma: 9, slippery_slope: 8, appeal_to_authority: 9,
  };
  return m[l];
}

export function harmToDiscourse(l: LogicalFallacy): number {
  const m: Record<LogicalFallacy, number> = {
    ad_hominem: 9, straw_man: 8, false_dilemma: 7, slippery_slope: 6, appeal_to_authority: 5,
  };
  return m[l];
}

export function educationalValue(l: LogicalFallacy): number {
  const m: Record<LogicalFallacy, number> = {
    ad_hominem: 8, straw_man: 9, false_dilemma: 7, slippery_slope: 6, appeal_to_authority: 8,
  };
  return m[l];
}

export function attacksPerson(l: LogicalFallacy): boolean {
  const m: Record<LogicalFallacy, boolean> = {
    ad_hominem: true, straw_man: false, false_dilemma: false, slippery_slope: false, appeal_to_authority: false,
  };
  return m[l];
}

export function formalFallacy(l: LogicalFallacy): boolean {
  const m: Record<LogicalFallacy, boolean> = {
    ad_hominem: false, straw_man: false, false_dilemma: true, slippery_slope: false, appeal_to_authority: false,
  };
  return m[l];
}

export function category(l: LogicalFallacy): string {
  const m: Record<LogicalFallacy, string> = {
    ad_hominem: "relevance", straw_man: "misrepresentation",
    false_dilemma: "presumption", slippery_slope: "causal",
    appeal_to_authority: "relevance",
  };
  return m[l];
}

export function latinName(l: LogicalFallacy): string {
  const m: Record<LogicalFallacy, string> = {
    ad_hominem: "argumentum_ad_hominem", straw_man: "ignoratio_elenchi",
    false_dilemma: "bifurcation", slippery_slope: "continuum",
    appeal_to_authority: "argumentum_ad_verecundiam",
  };
  return m[l];
}

export function logicalFallacies(): LogicalFallacy[] {
  return ["ad_hominem", "straw_man", "false_dilemma", "slippery_slope", "appeal_to_authority"];
}
