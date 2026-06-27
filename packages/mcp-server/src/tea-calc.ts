export type TeaType = "green" | "black" | "white" | "oolong" | "puerh" | "herbal" | "matcha";

export function waterTemp(type: TeaType): number {
  const temps: Record<TeaType, number> = {
    green: 75, black: 95, white: 80, oolong: 85,
    puerh: 100, herbal: 100, matcha: 80,
  };
  return temps[type];
}

export function steepTime(type: TeaType): { minSeconds: number; maxSeconds: number } {
  const times: Record<TeaType, { minSeconds: number; maxSeconds: number }> = {
    green: { minSeconds: 60, maxSeconds: 180 },
    black: { minSeconds: 180, maxSeconds: 300 },
    white: { minSeconds: 120, maxSeconds: 300 },
    oolong: { minSeconds: 120, maxSeconds: 300 },
    puerh: { minSeconds: 60, maxSeconds: 240 },
    herbal: { minSeconds: 300, maxSeconds: 600 },
    matcha: { minSeconds: 0, maxSeconds: 0 },
  };
  return times[type];
}

export function teaAmount(cupsMl: number, gramsPerCup: number = 2.5): number {
  const cups = cupsMl / 240;
  return parseFloat((cups * gramsPerCup).toFixed(1));
}

export function caffeineEstimate(type: TeaType): number {
  const mg: Record<TeaType, number> = {
    green: 30, black: 50, white: 15, oolong: 40,
    puerh: 35, herbal: 0, matcha: 70,
  };
  return mg[type];
}

export function resteepCount(type: TeaType): number {
  const steeps: Record<TeaType, number> = {
    green: 3, black: 2, white: 3, oolong: 5,
    puerh: 8, herbal: 1, matcha: 0,
  };
  return steeps[type];
}

export function waterPerCup(type: TeaType): number {
  if (type === "matcha") return 60;
  return 240;
}

export function costPerCup(teaPricePerG: number, gramsPerCup: number = 2.5, resteeps: number = 1): number {
  const effectiveCups = 1 + resteeps;
  return parseFloat((teaPricePerG * gramsPerCup / effectiveCups).toFixed(3));
}

export function gongfuRatio(type: TeaType): number {
  const gPerMl: Record<TeaType, number> = {
    green: 0.04, black: 0.05, white: 0.04, oolong: 0.06,
    puerh: 0.06, herbal: 0.03, matcha: 0,
  };
  return gPerMl[type];
}

export function westernRatio(type: TeaType): number {
  const gPer240ml: Record<TeaType, number> = {
    green: 2.5, black: 3, white: 2, oolong: 3,
    puerh: 3, herbal: 2, matcha: 2,
  };
  return gPer240ml[type];
}

export function coldBrewTime(): number {
  return 12;
}

export function coldBrewRatio(): number {
  return 10;
}

export function oxidationLevel(type: TeaType): number {
  const levels: Record<TeaType, number> = {
    green: 5, black: 90, white: 10, oolong: 50,
    puerh: 100, herbal: 0, matcha: 5,
  };
  return levels[type];
}

export function antioxidantLevel(type: TeaType): string {
  if (type === "matcha" || type === "green") return "very high";
  if (type === "white") return "high";
  if (type === "oolong") return "moderate";
  return "moderate";
}

export function teaTypes(): TeaType[] {
  return ["green", "black", "white", "oolong", "puerh", "herbal", "matcha"];
}
