export type FiberReactType = "procion_mx_cold" | "remazol_vinyl_hot" | "cibacron_f_warm" | "drimarene_k_easy" | "procion_h_steam";

export function colorBright(t: FiberReactType): number {
  const m: Record<FiberReactType, number> = {
    procion_mx_cold: 10, remazol_vinyl_hot: 7, cibacron_f_warm: 8, drimarene_k_easy: 7, procion_h_steam: 9,
  };
  return m[t];
}

export function washFast(t: FiberReactType): number {
  const m: Record<FiberReactType, number> = {
    procion_mx_cold: 9, remazol_vinyl_hot: 8, cibacron_f_warm: 9, drimarene_k_easy: 7, procion_h_steam: 10,
  };
  return m[t];
}

export function easeOfUse(t: FiberReactType): number {
  const m: Record<FiberReactType, number> = {
    procion_mx_cold: 10, remazol_vinyl_hot: 5, cibacron_f_warm: 7, drimarene_k_easy: 9, procion_h_steam: 4,
  };
  return m[t];
}

export function colorRange(t: FiberReactType): number {
  const m: Record<FiberReactType, number> = {
    procion_mx_cold: 10, remazol_vinyl_hot: 7, cibacron_f_warm: 8, drimarene_k_easy: 6, procion_h_steam: 9,
  };
  return m[t];
}

export function dyeCost(t: FiberReactType): number {
  const m: Record<FiberReactType, number> = {
    procion_mx_cold: 3, remazol_vinyl_hot: 4, cibacron_f_warm: 4, drimarene_k_easy: 2, procion_h_steam: 5,
  };
  return m[t];
}

export function coldProcess(t: FiberReactType): boolean {
  const m: Record<FiberReactType, boolean> = {
    procion_mx_cold: true, remazol_vinyl_hot: false, cibacron_f_warm: false, drimarene_k_easy: true, procion_h_steam: false,
  };
  return m[t];
}

export function forCellulose(t: FiberReactType): boolean {
  const m: Record<FiberReactType, boolean> = {
    procion_mx_cold: true, remazol_vinyl_hot: true, cibacron_f_warm: true, drimarene_k_easy: true, procion_h_steam: true,
  };
  return m[t];
}

export function dyeChemistry(t: FiberReactType): string {
  const m: Record<FiberReactType, string> = {
    procion_mx_cold: "dichlorotriazine_reactive",
    remazol_vinyl_hot: "vinyl_sulfone_bond",
    cibacron_f_warm: "monochlorotriazine_fiber",
    drimarene_k_easy: "bifunctional_reactive",
    procion_h_steam: "monochlorotriazine_steam",
  };
  return m[t];
}

export function bestMethod(t: FiberReactType): string {
  const m: Record<FiberReactType, string> = {
    procion_mx_cold: "immersion_tie_dye",
    remazol_vinyl_hot: "exhaust_dyeing_hot",
    cibacron_f_warm: "pad_batch_warm",
    drimarene_k_easy: "direct_apply_easy",
    procion_h_steam: "print_steam_set",
  };
  return m[t];
}

export function fiberReacts(): FiberReactType[] {
  return ["procion_mx_cold", "remazol_vinyl_hot", "cibacron_f_warm", "drimarene_k_easy", "procion_h_steam"];
}
