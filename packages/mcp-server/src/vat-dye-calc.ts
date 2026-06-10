export type VatDyeType = "indigo" | "woad" | "tyrian_purple" | "logwood" | "synthetic_indigo";

export function reductionPh(type: VatDyeType): number {
  const ph: Record<VatDyeType, number> = {
    indigo: 10.5, woad: 9.5, tyrian_purple: 11, logwood: 8.5, synthetic_indigo: 10,
  };
  return ph[type];
}

export function vatTempCelsius(type: VatDyeType): number {
  const t: Record<VatDyeType, number> = {
    indigo: 50, woad: 45, tyrian_purple: 55, logwood: 40, synthetic_indigo: 50,
  };
  return t[type];
}

export function dipsRequired(type: VatDyeType): number {
  const d: Record<VatDyeType, number> = {
    indigo: 8, woad: 12, tyrian_purple: 15, logwood: 5, synthetic_indigo: 6,
  };
  return d[type];
}

export function lightfastnessRating(type: VatDyeType): number {
  const l: Record<VatDyeType, number> = {
    indigo: 8, woad: 6, tyrian_purple: 10, logwood: 4, synthetic_indigo: 7,
  };
  return l[type];
}

export function washfastnessRating(type: VatDyeType): number {
  const w: Record<VatDyeType, number> = {
    indigo: 9, woad: 7, tyrian_purple: 10, logwood: 5, synthetic_indigo: 8,
  };
  return w[type];
}

export function reducingAgent(type: VatDyeType): string {
  const r: Record<VatDyeType, string> = {
    indigo: "fructose", woad: "bran", tyrian_purple: "sodium_hydrosulfite",
    logwood: "tin_mordant", synthetic_indigo: "sodium_dithionite",
  };
  return r[type];
}

export function oxidationTimeMinutes(type: VatDyeType): number {
  const o: Record<VatDyeType, number> = {
    indigo: 20, woad: 15, tyrian_purple: 30, logwood: 10, synthetic_indigo: 15,
  };
  return o[type];
}

export function historicalOrigin(type: VatDyeType): string {
  const h: Record<VatDyeType, string> = {
    indigo: "india", woad: "europe", tyrian_purple: "phoenicia",
    logwood: "central_america", synthetic_indigo: "germany",
  };
  return h[type];
}

export function costPerKg(type: VatDyeType): number {
  const c: Record<VatDyeType, number> = {
    indigo: 80, woad: 120, tyrian_purple: 5000, logwood: 40, synthetic_indigo: 30,
  };
  return c[type];
}

export function vatDyeTypes(): VatDyeType[] {
  return ["indigo", "woad", "tyrian_purple", "logwood", "synthetic_indigo"];
}
