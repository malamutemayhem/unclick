export type TeaBase = "green" | "black" | "oolong" | "white" | "herbal";

export function steepTempCelsius(tea: TeaBase): number {
  const t: Record<TeaBase, number> = {
    green: 75, black: 100, oolong: 85, white: 70, herbal: 100,
  };
  return t[tea];
}

export function steepTimeMinutes(tea: TeaBase): number {
  const s: Record<TeaBase, number> = {
    green: 2, black: 4, oolong: 3, white: 5, herbal: 7,
  };
  return s[tea];
}

export function caffeineLevel(tea: TeaBase): number {
  const c: Record<TeaBase, number> = {
    green: 5, black: 8, oolong: 6, white: 3, herbal: 0,
  };
  return c[tea];
}

export function antioxidantLevel(tea: TeaBase): number {
  const a: Record<TeaBase, number> = {
    green: 10, black: 7, oolong: 8, white: 9, herbal: 5,
  };
  return a[tea];
}

export function resteepCount(tea: TeaBase): number {
  const r: Record<TeaBase, number> = {
    green: 3, black: 1, oolong: 5, white: 4, herbal: 1,
  };
  return r[tea];
}

export function oxidationPercent(tea: TeaBase): number {
  const o: Record<TeaBase, number> = {
    green: 5, black: 95, oolong: 50, white: 10, herbal: 0,
  };
  return o[tea];
}

export function bestPairing(tea: TeaBase): string {
  const b: Record<TeaBase, string> = {
    green: "sushi", black: "scones", oolong: "dim_sum",
    white: "fruit", herbal: "honey",
  };
  return b[tea];
}

export function shelfLifeMonths(tea: TeaBase): number {
  const s: Record<TeaBase, number> = {
    green: 12, black: 36, oolong: 24, white: 18, herbal: 12,
  };
  return s[tea];
}

export function costPerGram(tea: TeaBase): number {
  const c: Record<TeaBase, number> = {
    green: 0.5, black: 0.3, oolong: 0.8, white: 1.2, herbal: 0.4,
  };
  return c[tea];
}

export function teaBases(): TeaBase[] {
  return ["green", "black", "oolong", "white", "herbal"];
}
