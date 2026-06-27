export type ChiselType = "straight" | "skew" | "fishtail" | "v_parting" | "gouge";

export function bladeWidthMm(chisel: ChiselType): number {
  const b: Record<ChiselType, number> = {
    straight: 20, skew: 15, fishtail: 18, v_parting: 6, gouge: 12,
  };
  return b[chisel];
}

export function versatility(chisel: ChiselType): number {
  const v: Record<ChiselType, number> = {
    straight: 8, skew: 6, fishtail: 7, v_parting: 4, gouge: 9,
  };
  return v[chisel];
}

export function detailWork(chisel: ChiselType): number {
  const d: Record<ChiselType, number> = {
    straight: 5, skew: 8, fishtail: 9, v_parting: 10, gouge: 7,
  };
  return d[chisel];
}

export function backgroundRemoval(chisel: ChiselType): number {
  const b: Record<ChiselType, number> = {
    straight: 7, skew: 3, fishtail: 9, v_parting: 2, gouge: 8,
  };
  return b[chisel];
}

export function sharpeningDifficulty(chisel: ChiselType): number {
  const s: Record<ChiselType, number> = {
    straight: 3, skew: 5, fishtail: 4, v_parting: 8, gouge: 7,
  };
  return s[chisel];
}

export function curvedBlade(chisel: ChiselType): boolean {
  const c: Record<ChiselType, boolean> = {
    straight: false, skew: false, fishtail: false, v_parting: false, gouge: true,
  };
  return c[chisel];
}

export function bestTechnique(chisel: ChiselType): string {
  const b: Record<ChiselType, string> = {
    straight: "paring", skew: "corner_cleaning", fishtail: "tight_spaces",
    v_parting: "outlining", gouge: "hollowing",
  };
  return b[chisel];
}

export function beginnerPriority(chisel: ChiselType): number {
  const p: Record<ChiselType, number> = {
    straight: 10, skew: 4, fishtail: 3, v_parting: 7, gouge: 9,
  };
  return p[chisel];
}

export function costEstimate(chisel: ChiselType): number {
  const c: Record<ChiselType, number> = {
    straight: 25, skew: 30, fishtail: 35, v_parting: 28, gouge: 32,
  };
  return c[chisel];
}

export function chiselTypes(): ChiselType[] {
  return ["straight", "skew", "fishtail", "v_parting", "gouge"];
}
