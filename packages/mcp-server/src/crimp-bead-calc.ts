export type CrimpBeadType = "round_crimp_basic" | "tube_crimp_smooth" | "crimp_cover_hide" | "fold_over_clasp" | "knot_cover_cup";

export function holdStrength(t: CrimpBeadType): number {
  const m: Record<CrimpBeadType, number> = {
    round_crimp_basic: 7, tube_crimp_smooth: 9, crimp_cover_hide: 6, fold_over_clasp: 8, knot_cover_cup: 5,
  };
  return m[t];
}

export function cleanFinish(t: CrimpBeadType): number {
  const m: Record<CrimpBeadType, number> = {
    round_crimp_basic: 5, tube_crimp_smooth: 8, crimp_cover_hide: 10, fold_over_clasp: 7, knot_cover_cup: 9,
  };
  return m[t];
}

export function easeOfUse(t: CrimpBeadType): number {
  const m: Record<CrimpBeadType, number> = {
    round_crimp_basic: 9, tube_crimp_smooth: 7, crimp_cover_hide: 6, fold_over_clasp: 8, knot_cover_cup: 7,
  };
  return m[t];
}

export function wireRange(t: CrimpBeadType): number {
  const m: Record<CrimpBeadType, number> = {
    round_crimp_basic: 8, tube_crimp_smooth: 10, crimp_cover_hide: 6, fold_over_clasp: 7, knot_cover_cup: 5,
  };
  return m[t];
}

export function crimpCost(t: CrimpBeadType): number {
  const m: Record<CrimpBeadType, number> = {
    round_crimp_basic: 1, tube_crimp_smooth: 2, crimp_cover_hide: 3, fold_over_clasp: 2, knot_cover_cup: 2,
  };
  return m[t];
}

export function hidesConnection(t: CrimpBeadType): boolean {
  const m: Record<CrimpBeadType, boolean> = {
    round_crimp_basic: false, tube_crimp_smooth: false, crimp_cover_hide: true, fold_over_clasp: false, knot_cover_cup: true,
  };
  return m[t];
}

export function needsPliers(t: CrimpBeadType): boolean {
  const m: Record<CrimpBeadType, boolean> = {
    round_crimp_basic: true, tube_crimp_smooth: true, crimp_cover_hide: true, fold_over_clasp: true, knot_cover_cup: false,
  };
  return m[t];
}

export function crimpMetal(t: CrimpBeadType): string {
  const m: Record<CrimpBeadType, string> = {
    round_crimp_basic: "brass_silver_plated",
    tube_crimp_smooth: "sterling_silver_tube",
    crimp_cover_hide: "gold_filled_round",
    fold_over_clasp: "base_metal_fold",
    knot_cover_cup: "silver_cup_shell",
  };
  return m[t];
}

export function bestUse(t: CrimpBeadType): string {
  const m: Record<CrimpBeadType, string> = {
    round_crimp_basic: "basic_stringing_end",
    tube_crimp_smooth: "professional_finish",
    crimp_cover_hide: "elegant_hide_crimp",
    fold_over_clasp: "cord_leather_end",
    knot_cover_cup: "knotted_strand_cover",
  };
  return m[t];
}

export function crimpBeads(): CrimpBeadType[] {
  return ["round_crimp_basic", "tube_crimp_smooth", "crimp_cover_hide", "fold_over_clasp", "knot_cover_cup"];
}
