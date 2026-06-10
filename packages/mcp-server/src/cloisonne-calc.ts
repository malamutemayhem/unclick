export type CloisonneType = "fine_silver_wire" | "gold_cloisonne_wire" | "copper_flat_strip" | "brass_round_wire" | "silver_plated_base";

export function wireDetail(t: CloisonneType): number {
  const m: Record<CloisonneType, number> = {
    fine_silver_wire: 10, gold_cloisonne_wire: 10, copper_flat_strip: 6, brass_round_wire: 5, silver_plated_base: 7,
  };
  return m[t];
}

export function adhesion(t: CloisonneType): number {
  const m: Record<CloisonneType, number> = {
    fine_silver_wire: 9, gold_cloisonne_wire: 8, copper_flat_strip: 10, brass_round_wire: 7, silver_plated_base: 6,
  };
  return m[t];
}

export function bendEase(t: CloisonneType): number {
  const m: Record<CloisonneType, number> = {
    fine_silver_wire: 10, gold_cloisonne_wire: 9, copper_flat_strip: 7, brass_round_wire: 6, silver_plated_base: 8,
  };
  return m[t];
}

export function fireResist(t: CloisonneType): number {
  const m: Record<CloisonneType, number> = {
    fine_silver_wire: 10, gold_cloisonne_wire: 10, copper_flat_strip: 8, brass_round_wire: 6, silver_plated_base: 7,
  };
  return m[t];
}

export function wireCost(t: CloisonneType): number {
  const m: Record<CloisonneType, number> = {
    fine_silver_wire: 4, gold_cloisonne_wire: 5, copper_flat_strip: 1, brass_round_wire: 1, silver_plated_base: 2,
  };
  return m[t];
}

export function preciousMetal(t: CloisonneType): boolean {
  const m: Record<CloisonneType, boolean> = {
    fine_silver_wire: true, gold_cloisonne_wire: true, copper_flat_strip: false, brass_round_wire: false, silver_plated_base: false,
  };
  return m[t];
}

export function flatProfile(t: CloisonneType): boolean {
  const m: Record<CloisonneType, boolean> = {
    fine_silver_wire: true, gold_cloisonne_wire: true, copper_flat_strip: true, brass_round_wire: false, silver_plated_base: true,
  };
  return m[t];
}

export function wireAlloy(t: CloisonneType): string {
  const m: Record<CloisonneType, string> = {
    fine_silver_wire: "999_fine_silver",
    gold_cloisonne_wire: "24k_gold_flat",
    copper_flat_strip: "pure_copper_strip",
    brass_round_wire: "yellow_brass_round",
    silver_plated_base: "copper_core_plated",
  };
  return m[t];
}

export function bestUse(t: CloisonneType): string {
  const m: Record<CloisonneType, string> = {
    fine_silver_wire: "traditional_enamel_cell",
    gold_cloisonne_wire: "luxury_fine_detail",
    copper_flat_strip: "beginner_practice_cell",
    brass_round_wire: "decorative_outline",
    silver_plated_base: "affordable_silver_look",
  };
  return m[t];
}

export function cloisonneWires(): CloisonneType[] {
  return ["fine_silver_wire", "gold_cloisonne_wire", "copper_flat_strip", "brass_round_wire", "silver_plated_base"];
}
