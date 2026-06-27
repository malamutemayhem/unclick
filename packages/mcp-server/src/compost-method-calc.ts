export type CompostMethod = "hot_pile" | "cold_pile" | "vermicompost" | "bokashi" | "trench";

export function readyWeeks(method: CompostMethod): number {
  const r: Record<CompostMethod, number> = {
    hot_pile: 8, cold_pile: 52, vermicompost: 12, bokashi: 4, trench: 26,
  };
  return r[method];
}

export function tempPeakCelsius(method: CompostMethod): number {
  const t: Record<CompostMethod, number> = {
    hot_pile: 65, cold_pile: 30, vermicompost: 25, bokashi: 20, trench: 35,
  };
  return t[method];
}

export function turningRequired(method: CompostMethod): boolean {
  const t: Record<CompostMethod, boolean> = {
    hot_pile: true, cold_pile: false, vermicompost: false, bokashi: false, trench: false,
  };
  return t[method];
}

export function spaceNeededM2(method: CompostMethod): number {
  const s: Record<CompostMethod, number> = {
    hot_pile: 4, cold_pile: 3, vermicompost: 1, bokashi: 0.5, trench: 2,
  };
  return s[method];
}

export function odorLevel(method: CompostMethod): number {
  const o: Record<CompostMethod, number> = {
    hot_pile: 5, cold_pile: 3, vermicompost: 1, bokashi: 7, trench: 2,
  };
  return o[method];
}

export function indoorSuitable(method: CompostMethod): boolean {
  const i: Record<CompostMethod, boolean> = {
    hot_pile: false, cold_pile: false, vermicompost: true, bokashi: true, trench: false,
  };
  return i[method];
}

export function nutrientDensity(method: CompostMethod): number {
  const n: Record<CompostMethod, number> = {
    hot_pile: 8, cold_pile: 6, vermicompost: 10, bokashi: 9, trench: 7,
  };
  return n[method];
}

export function weedSeedKill(method: CompostMethod): boolean {
  const w: Record<CompostMethod, boolean> = {
    hot_pile: true, cold_pile: false, vermicompost: false, bokashi: false, trench: false,
  };
  return w[method];
}

export function costRating(method: CompostMethod): number {
  const c: Record<CompostMethod, number> = {
    hot_pile: 3, cold_pile: 1, vermicompost: 5, bokashi: 6, trench: 1,
  };
  return c[method];
}

export function compostMethods(): CompostMethod[] {
  return ["hot_pile", "cold_pile", "vermicompost", "bokashi", "trench"];
}
