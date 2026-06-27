export type WeaveType = "plain" | "twill" | "satin" | "basket" | "jacquard";

export function durability(w: WeaveType): number {
  const m: Record<WeaveType, number> = {
    plain: 8, twill: 9, satin: 4, basket: 6, jacquard: 7,
  };
  return m[w];
}

export function drapability(w: WeaveType): number {
  const m: Record<WeaveType, number> = {
    plain: 4, twill: 7, satin: 10, basket: 3, jacquard: 8,
  };
  return m[w];
}

export function productionComplexity(w: WeaveType): number {
  const m: Record<WeaveType, number> = {
    plain: 1, twill: 4, satin: 5, basket: 3, jacquard: 10,
  };
  return m[w];
}

export function lustLevel(w: WeaveType): number {
  const m: Record<WeaveType, number> = {
    plain: 3, twill: 5, satin: 10, basket: 2, jacquard: 7,
  };
  return m[w];
}

export function wrinkleResistance(w: WeaveType): number {
  const m: Record<WeaveType, number> = {
    plain: 3, twill: 7, satin: 5, basket: 4, jacquard: 6,
  };
  return m[w];
}

export function reversible(w: WeaveType): boolean {
  const m: Record<WeaveType, boolean> = {
    plain: true, twill: false, satin: false, basket: true, jacquard: false,
  };
  return m[w];
}

export function showsDiagonal(w: WeaveType): boolean {
  const m: Record<WeaveType, boolean> = {
    plain: false, twill: true, satin: false, basket: false, jacquard: false,
  };
  return m[w];
}

export function commonFabric(w: WeaveType): string {
  const m: Record<WeaveType, string> = {
    plain: "muslin_chiffon", twill: "denim_gabardine",
    satin: "charmeuse_duchess", basket: "oxford_canvas",
    jacquard: "brocade_damask",
  };
  return m[w];
}

export function floatLength(w: WeaveType): string {
  const m: Record<WeaveType, string> = {
    plain: "shortest_one_over_one", twill: "medium_diagonal",
    satin: "long_floats", basket: "grouped_short",
    jacquard: "variable_pattern",
  };
  return m[w];
}

export function weaveTypes(): WeaveType[] {
  return ["plain", "twill", "satin", "basket", "jacquard"];
}
