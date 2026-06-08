export interface Experiment {
  name: string;
  variants: string[];
  weights?: number[];
}

export function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function assign(experiment: Experiment, userId: string): string {
  const hash = hashCode(`${experiment.name}:${userId}`);
  const weights = experiment.weights ?? experiment.variants.map(() => 1);
  const totalWeight = weights.reduce((s, w) => s + w, 0);
  const normalized = weights.map((w) => w / totalWeight);
  const bucket = (hash % 10000) / 10000;
  let cumulative = 0;
  for (let i = 0; i < normalized.length; i++) {
    cumulative += normalized[i];
    if (bucket < cumulative) return experiment.variants[i];
  }
  return experiment.variants[experiment.variants.length - 1];
}

export function assignBatch(experiment: Experiment, userIds: string[]): Map<string, string> {
  const result = new Map<string, string>();
  for (const id of userIds) {
    result.set(id, assign(experiment, id));
  }
  return result;
}

export function isInVariant(experiment: Experiment, userId: string, variant: string): boolean {
  return assign(experiment, userId) === variant;
}

export function variantDistribution(experiment: Experiment, userIds: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const v of experiment.variants) counts.set(v, 0);
  for (const id of userIds) {
    const v = assign(experiment, id);
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  return counts;
}
