export type IncenseType = "stick" | "coil" | "trail" | "koh" | "cone";

export function burnTimeHours(type: IncenseType): number {
  const hours: Record<IncenseType, number> = {
    stick: 1, coil: 12, trail: 8, koh: 0.5, cone: 0.3,
  };
  return hours[type];
}

export function burnRateCmPerMinute(type: IncenseType): number {
  const rates: Record<IncenseType, number> = {
    stick: 0.3, coil: 0.1, trail: 0.15, koh: 0.4, cone: 0.5,
  };
  return rates[type];
}

export function accuracyMinutes(type: IncenseType): number {
  const acc: Record<IncenseType, number> = {
    stick: 5, coil: 15, trail: 10, koh: 3, cone: 2,
  };
  return acc[type];
}

export function scentIntensity(type: IncenseType): number {
  const scent: Record<IncenseType, number> = {
    stick: 3, coil: 2, trail: 2, koh: 4, cone: 5,
  };
  return scent[type];
}

export function smokeLevel(type: IncenseType): number {
  const smoke: Record<IncenseType, number> = {
    stick: 3, coil: 2, trail: 1, koh: 1, cone: 4,
  };
  return smoke[type];
}

export function draftSensitivity(type: IncenseType): number {
  const sens: Record<IncenseType, number> = {
    stick: 3, coil: 2, trail: 4, koh: 2, cone: 1,
  };
  return sens[type];
}

export function alarmCapable(type: IncenseType): boolean {
  return type === "trail" || type === "coil";
}

export function holderRequired(type: IncenseType): boolean {
  return type !== "trail";
}

export function costPerHour(type: IncenseType): number {
  const costs: Record<IncenseType, number> = {
    stick: 0.5, coil: 0.3, trail: 1.0, koh: 3.0, cone: 1.5,
  };
  return costs[type];
}

export function incenseTypes(): IncenseType[] {
  return ["stick", "coil", "trail", "koh", "cone"];
}
