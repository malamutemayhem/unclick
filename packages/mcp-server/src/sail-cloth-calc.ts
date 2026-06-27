export type SailClothType = "dacron" | "nylon" | "canvas" | "laminate" | "dyneema";

export function weightGPerM2(cloth: SailClothType): number {
  const w: Record<SailClothType, number> = {
    dacron: 200, nylon: 150, canvas: 350, laminate: 180, dyneema: 120,
  };
  return w[cloth];
}

export function stretchPercent(cloth: SailClothType): number {
  const s: Record<SailClothType, number> = {
    dacron: 3, nylon: 8, canvas: 2, laminate: 0.5, dyneema: 0.3,
  };
  return s[cloth];
}

export function uvResistance(cloth: SailClothType): number {
  const u: Record<SailClothType, number> = {
    dacron: 8, nylon: 4, canvas: 6, laminate: 5, dyneema: 9,
  };
  return u[cloth];
}

export function tearStrength(cloth: SailClothType): number {
  const t: Record<SailClothType, number> = {
    dacron: 7, nylon: 9, canvas: 6, laminate: 4, dyneema: 10,
  };
  return t[cloth];
}

export function shapeRetention(cloth: SailClothType): number {
  const s: Record<SailClothType, number> = {
    dacron: 7, nylon: 4, canvas: 5, laminate: 10, dyneema: 9,
  };
  return s[cloth];
}

export function repairability(cloth: SailClothType): number {
  const r: Record<SailClothType, number> = {
    dacron: 8, nylon: 7, canvas: 9, laminate: 3, dyneema: 4,
  };
  return r[cloth];
}

export function sewable(cloth: SailClothType): boolean {
  return cloth !== "laminate";
}

export function lifespanYears(cloth: SailClothType): number {
  const l: Record<SailClothType, number> = {
    dacron: 10, nylon: 7, canvas: 5, laminate: 8, dyneema: 15,
  };
  return l[cloth];
}

export function costPerM2(cloth: SailClothType): number {
  const c: Record<SailClothType, number> = {
    dacron: 20, nylon: 15, canvas: 10, laminate: 60, dyneema: 80,
  };
  return c[cloth];
}

export function sailClothTypes(): SailClothType[] {
  return ["dacron", "nylon", "canvas", "laminate", "dyneema"];
}
