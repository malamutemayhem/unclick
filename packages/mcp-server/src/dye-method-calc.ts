export type DyeMethod = "reactive" | "acid" | "disperse" | "natural" | "vat";

export function colorFastness(d: DyeMethod): number {
  const m: Record<DyeMethod, number> = {
    reactive: 9, acid: 7, disperse: 8, natural: 4, vat: 10,
  };
  return m[d];
}

export function colorRange(d: DyeMethod): number {
  const m: Record<DyeMethod, number> = {
    reactive: 10, acid: 8, disperse: 7, natural: 4, vat: 5,
  };
  return m[d];
}

export function environmentalImpact(d: DyeMethod): number {
  const m: Record<DyeMethod, number> = {
    reactive: 7, acid: 6, disperse: 8, natural: 1, vat: 5,
  };
  return m[d];
}

export function processingCost(d: DyeMethod): number {
  const m: Record<DyeMethod, number> = {
    reactive: 5, acid: 6, disperse: 4, natural: 8, vat: 7,
  };
  return m[d];
}

export function washFastness(d: DyeMethod): number {
  const m: Record<DyeMethod, number> = {
    reactive: 9, acid: 6, disperse: 8, natural: 3, vat: 10,
  };
  return m[d];
}

export function requiresHeat(d: DyeMethod): boolean {
  const m: Record<DyeMethod, boolean> = {
    reactive: true, acid: true, disperse: true, natural: true, vat: true,
  };
  return m[d];
}

export function syntheticDye(d: DyeMethod): boolean {
  const m: Record<DyeMethod, boolean> = {
    reactive: true, acid: true, disperse: true, natural: false, vat: true,
  };
  return m[d];
}

export function bestFiber(d: DyeMethod): string {
  const m: Record<DyeMethod, string> = {
    reactive: "cellulose_cotton", acid: "protein_wool_silk",
    disperse: "polyester_nylon", natural: "cellulose_protein",
    vat: "cellulose_cotton",
  };
  return m[d];
}

export function famousExample(d: DyeMethod): string {
  const m: Record<DyeMethod, string> = {
    reactive: "procion_mx", acid: "acid_blue_25",
    disperse: "disperse_red_1", natural: "indigo_madder",
    vat: "indanthrene_blue",
  };
  return m[d];
}

export function dyeMethods(): DyeMethod[] {
  return ["reactive", "acid", "disperse", "natural", "vat"];
}
