export type EspalierForm = "cordon" | "fan" | "palmette" | "belgian_fence" | "candelabra";

export function wireSpacingCm(form: EspalierForm): number {
  const spacing: Record<EspalierForm, number> = {
    cordon: 60, fan: 30, palmette: 45, belgian_fence: 50, candelabra: 40,
  };
  return spacing[form];
}

export function maxTiersCount(form: EspalierForm): number {
  const tiers: Record<EspalierForm, number> = {
    cordon: 1, fan: 8, palmette: 5, belgian_fence: 4, candelabra: 4,
  };
  return tiers[form];
}

export function treesPerMeter(form: EspalierForm): number {
  const tpm: Record<EspalierForm, number> = {
    cordon: 2, fan: 0.3, palmette: 0.5, belgian_fence: 1, candelabra: 0.4,
  };
  return tpm[form];
}

export function pruningFrequencyPerYear(form: EspalierForm): number {
  const freq: Record<EspalierForm, number> = {
    cordon: 3, fan: 4, palmette: 3, belgian_fence: 4, candelabra: 5,
  };
  return freq[form];
}

export function yearsToFullForm(form: EspalierForm): number {
  const years: Record<EspalierForm, number> = {
    cordon: 3, fan: 5, palmette: 6, belgian_fence: 4, candelabra: 7,
  };
  return years[form];
}

export function difficultyRating(form: EspalierForm): number {
  const diff: Record<EspalierForm, number> = {
    cordon: 1, fan: 3, palmette: 4, belgian_fence: 3, candelabra: 5,
  };
  return diff[form];
}

export function yieldComparedToFreestanding(form: EspalierForm): number {
  const yield_pct: Record<EspalierForm, number> = {
    cordon: 40, fan: 70, palmette: 80, belgian_fence: 60, candelabra: 75,
  };
  return yield_pct[form];
}

export function wallRequired(form: EspalierForm): boolean {
  return form !== "belgian_fence";
}

export function costPerMeter(form: EspalierForm): number {
  const costs: Record<EspalierForm, number> = {
    cordon: 30, fan: 50, palmette: 60, belgian_fence: 45, candelabra: 70,
  };
  return costs[form];
}

export function espalierForms(): EspalierForm[] {
  return ["cordon", "fan", "palmette", "belgian_fence", "candelabra"];
}
