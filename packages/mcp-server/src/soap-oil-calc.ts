export type SoapOil = "olive" | "coconut" | "palm" | "castor" | "shea";

export function sapValueMg(oil: SoapOil): number {
  const s: Record<SoapOil, number> = {
    olive: 190, coconut: 268, palm: 199, castor: 180, shea: 185,
  };
  return s[oil];
}

export function latherQuality(oil: SoapOil): number {
  const l: Record<SoapOil, number> = {
    olive: 4, coconut: 10, palm: 5, castor: 8, shea: 3,
  };
  return l[oil];
}

export function hardness(oil: SoapOil): number {
  const h: Record<SoapOil, number> = {
    olive: 5, coconut: 8, palm: 9, castor: 2, shea: 6,
  };
  return h[oil];
}

export function conditioning(oil: SoapOil): number {
  const c: Record<SoapOil, number> = {
    olive: 9, coconut: 3, palm: 5, castor: 7, shea: 10,
  };
  return c[oil];
}

export function cleansing(oil: SoapOil): number {
  const c: Record<SoapOil, number> = {
    olive: 4, coconut: 10, palm: 6, castor: 3, shea: 2,
  };
  return c[oil];
}

export function maxPercentInRecipe(oil: SoapOil): number {
  const m: Record<SoapOil, number> = {
    olive: 100, coconut: 30, palm: 40, castor: 10, shea: 15,
  };
  return m[oil];
}

export function traceSpeed(oil: SoapOil): number {
  const t: Record<SoapOil, number> = {
    olive: 2, coconut: 8, palm: 7, castor: 3, shea: 4,
  };
  return t[oil];
}

export function sustainable(oil: SoapOil): boolean {
  const s: Record<SoapOil, boolean> = {
    olive: true, coconut: true, palm: false, castor: true, shea: true,
  };
  return s[oil];
}

export function costPerKg(oil: SoapOil): number {
  const c: Record<SoapOil, number> = {
    olive: 8, coconut: 5, palm: 3, castor: 12, shea: 10,
  };
  return c[oil];
}

export function soapOils(): SoapOil[] {
  return ["olive", "coconut", "palm", "castor", "shea"];
}
