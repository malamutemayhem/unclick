export type ModelEvaluation = "accuracy" | "precision" | "recall" | "f1_score" | "auc_roc";

export function simplicityScore(e: ModelEvaluation): number {
  const m: Record<ModelEvaluation, number> = {
    accuracy: 10, precision: 7, recall: 7, f1_score: 5, auc_roc: 3,
  };
  return m[e];
}

export function imbalanceRobustness(e: ModelEvaluation): number {
  const m: Record<ModelEvaluation, number> = {
    accuracy: 2, precision: 6, recall: 6, f1_score: 8, auc_roc: 10,
  };
  return m[e];
}

export function thresholdIndependence(e: ModelEvaluation): number {
  const m: Record<ModelEvaluation, number> = {
    accuracy: 2, precision: 3, recall: 3, f1_score: 3, auc_roc: 10,
  };
  return m[e];
}

export function communicability(e: ModelEvaluation): number {
  const m: Record<ModelEvaluation, number> = {
    accuracy: 10, precision: 7, recall: 7, f1_score: 5, auc_roc: 4,
  };
  return m[e];
}

export function multiclassSupport(e: ModelEvaluation): number {
  const m: Record<ModelEvaluation, number> = {
    accuracy: 10, precision: 7, recall: 7, f1_score: 7, auc_roc: 5,
  };
  return m[e];
}

export function singleNumber(e: ModelEvaluation): boolean {
  const m: Record<ModelEvaluation, boolean> = {
    accuracy: true, precision: true, recall: true, f1_score: true, auc_roc: true,
  };
  return m[e];
}

export function penalizesFalsePositives(e: ModelEvaluation): boolean {
  const m: Record<ModelEvaluation, boolean> = {
    accuracy: false, precision: true, recall: false, f1_score: true, auc_roc: false,
  };
  return m[e];
}

export function bestUseCase(e: ModelEvaluation): string {
  const m: Record<ModelEvaluation, string> = {
    accuracy: "balanced_classes", precision: "spam_detection",
    recall: "medical_diagnosis", f1_score: "imbalanced_general",
    auc_roc: "ranking_comparison",
  };
  return m[e];
}

export function formula(e: ModelEvaluation): string {
  const m: Record<ModelEvaluation, string> = {
    accuracy: "correct_over_total", precision: "tp_over_tp_fp",
    recall: "tp_over_tp_fn", f1_score: "harmonic_mean_prec_rec",
    auc_roc: "area_under_curve",
  };
  return m[e];
}

export function modelEvaluationMetrics(): ModelEvaluation[] {
  return ["accuracy", "precision", "recall", "f1_score", "auc_roc"];
}
