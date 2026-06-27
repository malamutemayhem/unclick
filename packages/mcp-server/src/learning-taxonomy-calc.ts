export type LearningTaxonomy = "remember" | "understand" | "apply" | "analyze" | "create";

export function cognitiveComplexity(l: LearningTaxonomy): number {
  const m: Record<LearningTaxonomy, number> = {
    remember: 1, understand: 3, apply: 5, analyze: 7, create: 10,
  };
  return m[l];
}

export function assessmentDifficulty(l: LearningTaxonomy): number {
  const m: Record<LearningTaxonomy, number> = {
    remember: 2, understand: 4, apply: 6, analyze: 8, create: 10,
  };
  return m[l];
}

export function transferability(l: LearningTaxonomy): number {
  const m: Record<LearningTaxonomy, number> = {
    remember: 2, understand: 4, apply: 7, analyze: 8, create: 10,
  };
  return m[l];
}

export function timeToMaster(l: LearningTaxonomy): number {
  const m: Record<LearningTaxonomy, number> = {
    remember: 2, understand: 4, apply: 6, analyze: 8, create: 10,
  };
  return m[l];
}

export function retentionDuration(l: LearningTaxonomy): number {
  const m: Record<LearningTaxonomy, number> = {
    remember: 2, understand: 5, apply: 7, analyze: 8, create: 10,
  };
  return m[l];
}

export function requiresPriorKnowledge(l: LearningTaxonomy): boolean {
  const m: Record<LearningTaxonomy, boolean> = {
    remember: false, understand: true, apply: true, analyze: true, create: true,
  };
  return m[l];
}

export function measurableByTest(l: LearningTaxonomy): boolean {
  const m: Record<LearningTaxonomy, boolean> = {
    remember: true, understand: true, apply: true, analyze: false, create: false,
  };
  return m[l];
}

export function actionVerb(l: LearningTaxonomy): string {
  const m: Record<LearningTaxonomy, string> = {
    remember: "recall_list", understand: "explain_summarize",
    apply: "solve_demonstrate", analyze: "compare_contrast",
    create: "design_compose",
  };
  return m[l];
}

export function bloomsPosition(l: LearningTaxonomy): string {
  const m: Record<LearningTaxonomy, string> = {
    remember: "base", understand: "second", apply: "third",
    analyze: "fourth", create: "top",
  };
  return m[l];
}

export function learningTaxonomyLevels(): LearningTaxonomy[] {
  return ["remember", "understand", "apply", "analyze", "create"];
}
