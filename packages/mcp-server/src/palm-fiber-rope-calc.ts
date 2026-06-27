export type PalmFiber = "coir" | "raffia" | "date_palm" | "palmyra" | "doum_palm";

export function breakStrengthKg(fiber: PalmFiber): number {
  const b: Record<PalmFiber, number> = {
    coir: 50, raffia: 15, date_palm: 35, palmyra: 40, doum_palm: 25,
  };
  return b[fiber];
}

export function fiberLengthCm(fiber: PalmFiber): number {
  const l: Record<PalmFiber, number> = {
    coir: 25, raffia: 100, date_palm: 40, palmyra: 30, doum_palm: 20,
  };
  return l[fiber];
}

export function waterResistance(fiber: PalmFiber): number {
  const w: Record<PalmFiber, number> = {
    coir: 10, raffia: 3, date_palm: 7, palmyra: 8, doum_palm: 5,
  };
  return w[fiber];
}

export function rottingResistance(fiber: PalmFiber): number {
  const r: Record<PalmFiber, number> = {
    coir: 9, raffia: 2, date_palm: 6, palmyra: 7, doum_palm: 4,
  };
  return r[fiber];
}

export function flexibility(fiber: PalmFiber): number {
  const f: Record<PalmFiber, number> = {
    coir: 5, raffia: 9, date_palm: 6, palmyra: 4, doum_palm: 7,
  };
  return f[fiber];
}

export function saltWaterSafe(fiber: PalmFiber): boolean {
  return fiber === "coir" || fiber === "palmyra";
}

export function primaryUse(fiber: PalmFiber): string {
  const u: Record<PalmFiber, string> = {
    coir: "marine_rope", raffia: "garden_twine", date_palm: "basket_cordage",
    palmyra: "fishing_line", doum_palm: "binding_cord",
  };
  return u[fiber];
}

export function processingHours(fiber: PalmFiber): number {
  const h: Record<PalmFiber, number> = {
    coir: 8, raffia: 2, date_palm: 5, palmyra: 6, doum_palm: 4,
  };
  return h[fiber];
}

export function costPerKg(fiber: PalmFiber): number {
  const c: Record<PalmFiber, number> = {
    coir: 3, raffia: 8, date_palm: 5, palmyra: 4, doum_palm: 6,
  };
  return c[fiber];
}

export function palmFibers(): PalmFiber[] {
  return ["coir", "raffia", "date_palm", "palmyra", "doum_palm"];
}
