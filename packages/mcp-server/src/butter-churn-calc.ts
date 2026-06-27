export type ChurnType = "barrel" | "paddle" | "glass_jar" | "electric" | "dash";

export function capacityLiters(churn: ChurnType): number {
  const c: Record<ChurnType, number> = {
    barrel: 20, paddle: 10, glass_jar: 2, electric: 5, dash: 8,
  };
  return c[churn];
}

export function churnTimeMinutes(churn: ChurnType): number {
  const t: Record<ChurnType, number> = {
    barrel: 30, paddle: 20, glass_jar: 15, electric: 5, dash: 25,
  };
  return t[churn];
}

export function effortRequired(churn: ChurnType): number {
  const e: Record<ChurnType, number> = {
    barrel: 7, paddle: 6, glass_jar: 4, electric: 1, dash: 8,
  };
  return e[churn];
}

export function butterYieldPercent(churn: ChurnType): number {
  const y: Record<ChurnType, number> = {
    barrel: 85, paddle: 80, glass_jar: 75, electric: 88, dash: 82,
  };
  return y[churn];
}

export function cleanupEase(churn: ChurnType): number {
  const c: Record<ChurnType, number> = {
    barrel: 3, paddle: 5, glass_jar: 9, electric: 6, dash: 4,
  };
  return c[churn];
}

export function electricPowered(churn: ChurnType): boolean {
  const e: Record<ChurnType, boolean> = {
    barrel: false, paddle: false, glass_jar: false, electric: true, dash: false,
  };
  return e[churn];
}

export function bestScale(churn: ChurnType): string {
  const b: Record<ChurnType, string> = {
    barrel: "farm", paddle: "homestead", glass_jar: "home_kitchen",
    electric: "small_dairy", dash: "traditional",
  };
  return b[churn];
}

export function textureQuality(churn: ChurnType): number {
  const t: Record<ChurnType, number> = {
    barrel: 8, paddle: 9, glass_jar: 6, electric: 7, dash: 8,
  };
  return t[churn];
}

export function costEstimate(churn: ChurnType): number {
  const c: Record<ChurnType, number> = {
    barrel: 200, paddle: 100, glass_jar: 15, electric: 300, dash: 80,
  };
  return c[churn];
}

export function churnTypes(): ChurnType[] {
  return ["barrel", "paddle", "glass_jar", "electric", "dash"];
}
