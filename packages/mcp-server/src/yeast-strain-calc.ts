export type YeastStrain = "ale" | "lager" | "wild" | "wine" | "bread";

export function fermentTempCelsius(strain: YeastStrain): number {
  const t: Record<YeastStrain, number> = {
    ale: 20, lager: 10, wild: 22, wine: 18, bread: 30,
  };
  return t[strain];
}

export function attenuationPercent(strain: YeastStrain): number {
  const a: Record<YeastStrain, number> = {
    ale: 75, lager: 80, wild: 90, wine: 95, bread: 50,
  };
  return a[strain];
}

export function flocculationRating(strain: YeastStrain): number {
  const f: Record<YeastStrain, number> = {
    ale: 8, lager: 6, wild: 2, wine: 4, bread: 3,
  };
  return f[strain];
}

export function alcoholTolerancePercent(strain: YeastStrain): number {
  const a: Record<YeastStrain, number> = {
    ale: 10, lager: 9, wild: 12, wine: 18, bread: 4,
  };
  return a[strain];
}

export function flavorContribution(strain: YeastStrain): number {
  const f: Record<YeastStrain, number> = {
    ale: 7, lager: 3, wild: 10, wine: 5, bread: 6,
  };
  return f[strain];
}

export function lagTimeHours(strain: YeastStrain): number {
  const l: Record<YeastStrain, number> = {
    ale: 12, lager: 24, wild: 48, wine: 18, bread: 1,
  };
  return l[strain];
}

export function reusablePitches(strain: YeastStrain): number {
  const r: Record<YeastStrain, number> = {
    ale: 8, lager: 6, wild: 3, wine: 2, bread: 1,
  };
  return r[strain];
}

export function bestApplication(strain: YeastStrain): string {
  const b: Record<YeastStrain, string> = {
    ale: "pale_ale", lager: "pilsner", wild: "lambic",
    wine: "chardonnay", bread: "sourdough",
  };
  return b[strain];
}

export function costPerPacket(strain: YeastStrain): number {
  const c: Record<YeastStrain, number> = {
    ale: 8, lager: 8, wild: 15, wine: 10, bread: 3,
  };
  return c[strain];
}

export function yeastStrains(): YeastStrain[] {
  return ["ale", "lager", "wild", "wine", "bread"];
}
