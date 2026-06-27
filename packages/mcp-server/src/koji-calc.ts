export type KojiSubstrate = "rice" | "barley" | "soybean" | "wheat" | "sweet_potato";

export function incubationTempCelsius(substrate: KojiSubstrate): number {
  const t: Record<KojiSubstrate, number> = {
    rice: 30, barley: 32, soybean: 28, wheat: 30, sweet_potato: 35,
  };
  return t[substrate];
}

export function incubationHours(substrate: KojiSubstrate): number {
  const h: Record<KojiSubstrate, number> = {
    rice: 48, barley: 52, soybean: 44, wheat: 46, sweet_potato: 40,
  };
  return h[substrate];
}

export function humidityPercent(substrate: KojiSubstrate): number {
  const h: Record<KojiSubstrate, number> = {
    rice: 85, barley: 80, soybean: 90, wheat: 82, sweet_potato: 88,
  };
  return h[substrate];
}

export function turningIntervalHours(substrate: KojiSubstrate): number {
  const t: Record<KojiSubstrate, number> = {
    rice: 12, barley: 10, soybean: 14, wheat: 12, sweet_potato: 8,
  };
  return t[substrate];
}

export function enzymeActivity(substrate: KojiSubstrate): number {
  const e: Record<KojiSubstrate, number> = {
    rice: 8, barley: 7, soybean: 6, wheat: 9, sweet_potato: 5,
  };
  return e[substrate];
}

export function primaryUse(substrate: KojiSubstrate): string {
  const u: Record<KojiSubstrate, string> = {
    rice: "sake", barley: "miso", soybean: "soy_sauce",
    wheat: "soy_sauce", sweet_potato: "shochu",
  };
  return u[substrate];
}

export function sporeDensity(substrate: KojiSubstrate): number {
  const d: Record<KojiSubstrate, number> = {
    rice: 8, barley: 6, soybean: 5, wheat: 7, sweet_potato: 4,
  };
  return d[substrate];
}

export function contaminationRisk(substrate: KojiSubstrate): number {
  const r: Record<KojiSubstrate, number> = {
    rice: 3, barley: 4, soybean: 6, wheat: 4, sweet_potato: 5,
  };
  return r[substrate];
}

export function costPerKg(substrate: KojiSubstrate): number {
  const c: Record<KojiSubstrate, number> = {
    rice: 5, barley: 4, soybean: 3, wheat: 4, sweet_potato: 6,
  };
  return c[substrate];
}

export function kojiSubstrates(): KojiSubstrate[] {
  return ["rice", "barley", "soybean", "wheat", "sweet_potato"];
}
