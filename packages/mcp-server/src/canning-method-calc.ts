export type CanningMethod = "water_bath" | "pressure_canning" | "steam_canning" | "open_kettle" | "inversion";

export function maxTempCelsius(method: CanningMethod): number {
  const m: Record<CanningMethod, number> = {
    water_bath: 100, pressure_canning: 121, steam_canning: 100, open_kettle: 100, inversion: 85,
  };
  return m[method];
}

export function processingMinutes(method: CanningMethod): number {
  const m: Record<CanningMethod, number> = {
    water_bath: 25, pressure_canning: 75, steam_canning: 20, open_kettle: 10, inversion: 5,
  };
  return m[method];
}

export function safetyRating(method: CanningMethod): number {
  const m: Record<CanningMethod, number> = {
    water_bath: 8, pressure_canning: 10, steam_canning: 7, open_kettle: 3, inversion: 2,
  };
  return m[method];
}

export function equipmentCost(method: CanningMethod): number {
  const m: Record<CanningMethod, number> = {
    water_bath: 30, pressure_canning: 100, steam_canning: 50, open_kettle: 15, inversion: 10,
  };
  return m[method];
}

export function shelfLifeYears(method: CanningMethod): number {
  const m: Record<CanningMethod, number> = {
    water_bath: 2, pressure_canning: 3, steam_canning: 2, open_kettle: 1, inversion: 0.5,
  };
  return m[method];
}

export function lowAcidSafe(method: CanningMethod): boolean {
  const m: Record<CanningMethod, boolean> = {
    water_bath: false, pressure_canning: true, steam_canning: false, open_kettle: false, inversion: false,
  };
  return m[method];
}

export function beginnerFriendly(method: CanningMethod): boolean {
  const m: Record<CanningMethod, boolean> = {
    water_bath: true, pressure_canning: false, steam_canning: true, open_kettle: true, inversion: true,
  };
  return m[method];
}

export function bestFood(method: CanningMethod): string {
  const m: Record<CanningMethod, string> = {
    water_bath: "fruit_preserves", pressure_canning: "vegetables",
    steam_canning: "pickles", open_kettle: "jam", inversion: "jelly",
  };
  return m[method];
}

export function energyUsage(method: CanningMethod): number {
  const m: Record<CanningMethod, number> = {
    water_bath: 5, pressure_canning: 8, steam_canning: 4, open_kettle: 3, inversion: 2,
  };
  return m[method];
}

export function canningMethods(): CanningMethod[] {
  return ["water_bath", "pressure_canning", "steam_canning", "open_kettle", "inversion"];
}
