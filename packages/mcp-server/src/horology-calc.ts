export type MovementType = "manual" | "automatic" | "quartz" | "spring_drive" | "tourbillon";

export function mainspringTurns(powerReserveHours: number, trainRatio: number): number {
  if (trainRatio <= 0) return 0;
  return parseFloat((powerReserveHours * 60 / trainRatio).toFixed(0));
}

export function balanceFrequency(bph: number): number {
  return parseFloat((bph / 3600).toFixed(2));
}

export function gearTeeth(wheelTeeth: number, pinionLeaves: number, ratio: number): { wheel: number; pinion: number } {
  return {
    wheel: Math.round(wheelTeeth * ratio),
    pinion: pinionLeaves,
  };
}

export function jewelsCount(type: MovementType): number {
  const jewels: Record<MovementType, number> = {
    manual: 17, automatic: 25, quartz: 0, spring_drive: 30, tourbillon: 25,
  };
  return jewels[type];
}

export function powerReserveHours(type: MovementType): number {
  const hours: Record<MovementType, number> = {
    manual: 42, automatic: 48, quartz: 17520, spring_drive: 72, tourbillon: 48,
  };
  return hours[type];
}

export function accuracySecPerDay(type: MovementType): number {
  const sec: Record<MovementType, number> = {
    manual: 10, automatic: 5, quartz: 0.5, spring_drive: 1, tourbillon: 3,
  };
  return sec[type];
}

export function serviceCostUsd(type: MovementType): number {
  const costs: Record<MovementType, number> = {
    manual: 200, automatic: 300, quartz: 50, spring_drive: 500, tourbillon: 2000,
  };
  return costs[type];
}

export function serviceIntervalYears(type: MovementType): number {
  const years: Record<MovementType, number> = {
    manual: 5, automatic: 5, quartz: 10, spring_drive: 5, tourbillon: 3,
  };
  return years[type];
}

export function waterResistanceAtm(caseSealType: string): number {
  const atm: Record<string, number> = {
    push: 3, screw: 10, triple: 20, helium: 30,
  };
  return atm[caseSealType] || 3;
}

export function movementTypes(): MovementType[] {
  return ["manual", "automatic", "quartz", "spring_drive", "tourbillon"];
}
