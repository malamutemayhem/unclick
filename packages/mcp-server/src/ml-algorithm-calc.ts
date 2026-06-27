export type MlAlgorithm = "random_forest" | "gradient_boosting" | "neural_network" | "svm" | "knn";

export function trainingSpeed(m_: MlAlgorithm): number {
  const m: Record<MlAlgorithm, number> = {
    random_forest: 7, gradient_boosting: 5, neural_network: 2, svm: 4, knn: 9,
  };
  return m[m_];
}

export function predictionAccuracy(m_: MlAlgorithm): number {
  const m: Record<MlAlgorithm, number> = {
    random_forest: 8, gradient_boosting: 9, neural_network: 10, svm: 7, knn: 6,
  };
  return m[m_];
}

export function interpretability(m_: MlAlgorithm): number {
  const m: Record<MlAlgorithm, number> = {
    random_forest: 6, gradient_boosting: 5, neural_network: 2, svm: 3, knn: 8,
  };
  return m[m_];
}

export function memoryUsage(m_: MlAlgorithm): number {
  const m: Record<MlAlgorithm, number> = {
    random_forest: 6, gradient_boosting: 5, neural_network: 9, svm: 7, knn: 8,
  };
  return m[m_];
}

export function hyperparameterCount(m_: MlAlgorithm): number {
  const m: Record<MlAlgorithm, number> = {
    random_forest: 5, gradient_boosting: 8, neural_network: 10, svm: 4, knn: 2,
  };
  return m[m_];
}

export function handlesNonLinear(m_: MlAlgorithm): boolean {
  const m: Record<MlAlgorithm, boolean> = {
    random_forest: true, gradient_boosting: true, neural_network: true, svm: true, knn: true,
  };
  return m[m_];
}

export function requiresFeatureScaling(m_: MlAlgorithm): boolean {
  const m: Record<MlAlgorithm, boolean> = {
    random_forest: false, gradient_boosting: false, neural_network: true, svm: true, knn: true,
  };
  return m[m_];
}

export function bestForDataSize(m_: MlAlgorithm): string {
  const m: Record<MlAlgorithm, string> = {
    random_forest: "medium", gradient_boosting: "medium_large",
    neural_network: "very_large", svm: "small_medium", knn: "small",
  };
  return m[m_];
}

export function paradigm(m_: MlAlgorithm): string {
  const m: Record<MlAlgorithm, string> = {
    random_forest: "ensemble_bagging", gradient_boosting: "ensemble_boosting",
    neural_network: "deep_learning", svm: "kernel_method", knn: "instance_based",
  };
  return m[m_];
}

export function mlAlgorithms(): MlAlgorithm[] {
  return ["random_forest", "gradient_boosting", "neural_network", "svm", "knn"];
}
