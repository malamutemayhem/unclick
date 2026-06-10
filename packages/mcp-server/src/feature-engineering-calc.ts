export type FeatureEngineering = "one_hot_encoding" | "normalization" | "pca" | "binning" | "embedding";

export function complexityScore(f: FeatureEngineering): number {
  const m: Record<FeatureEngineering, number> = {
    one_hot_encoding: 2, normalization: 3, pca: 7, binning: 4, embedding: 9,
  };
  return m[f];
}

export function dimensionalityImpact(f: FeatureEngineering): number {
  const m: Record<FeatureEngineering, number> = {
    one_hot_encoding: 9, normalization: 0, pca: -8, binning: -3, embedding: -6,
  };
  return m[f];
}

export function informationRetention(f: FeatureEngineering): number {
  const m: Record<FeatureEngineering, number> = {
    one_hot_encoding: 10, normalization: 10, pca: 7, binning: 5, embedding: 8,
  };
  return m[f];
}

export function computeCost(f: FeatureEngineering): number {
  const m: Record<FeatureEngineering, number> = {
    one_hot_encoding: 1, normalization: 1, pca: 6, binning: 2, embedding: 9,
  };
  return m[f];
}

export function interpretability(f: FeatureEngineering): number {
  const m: Record<FeatureEngineering, number> = {
    one_hot_encoding: 9, normalization: 8, pca: 3, binning: 7, embedding: 2,
  };
  return m[f];
}

export function requiresTraining(f: FeatureEngineering): boolean {
  const m: Record<FeatureEngineering, boolean> = {
    one_hot_encoding: false, normalization: false, pca: true, binning: false, embedding: true,
  };
  return m[f];
}

export function lossy(f: FeatureEngineering): boolean {
  const m: Record<FeatureEngineering, boolean> = {
    one_hot_encoding: false, normalization: false, pca: true, binning: true, embedding: true,
  };
  return m[f];
}

export function bestForDataType(f: FeatureEngineering): string {
  const m: Record<FeatureEngineering, string> = {
    one_hot_encoding: "categorical", normalization: "numeric",
    pca: "high_dimensional", binning: "continuous",
    embedding: "text_or_categorical",
  };
  return m[f];
}

export function outputType(f: FeatureEngineering): string {
  const m: Record<FeatureEngineering, string> = {
    one_hot_encoding: "binary_vector", normalization: "scaled_numeric",
    pca: "principal_components", binning: "discrete_bins",
    embedding: "dense_vector",
  };
  return m[f];
}

export function featureEngineeringMethods(): FeatureEngineering[] {
  return ["one_hot_encoding", "normalization", "pca", "binning", "embedding"];
}
