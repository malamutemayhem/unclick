export type JiggerType = "japanese_tall" | "bell_double" | "measured_pour_spout" | "oxo_angled" | "graduated_beaker";

export function pourAccuracy(t: JiggerType): number {
  const m: Record<JiggerType, number> = {
    japanese_tall: 10, bell_double: 7, measured_pour_spout: 5, oxo_angled: 9, graduated_beaker: 8,
  };
  return m[t];
}

export function pourSpeed(t: JiggerType): number {
  const m: Record<JiggerType, number> = {
    japanese_tall: 8, bell_double: 7, measured_pour_spout: 10, oxo_angled: 6, graduated_beaker: 5,
  };
  return m[t];
}

export function markReadability(t: JiggerType): number {
  const m: Record<JiggerType, number> = {
    japanese_tall: 7, bell_double: 4, measured_pour_spout: 3, oxo_angled: 10, graduated_beaker: 9,
  };
  return m[t];
}

export function spillResistance(t: JiggerType): number {
  const m: Record<JiggerType, number> = {
    japanese_tall: 6, bell_double: 5, measured_pour_spout: 8, oxo_angled: 7, graduated_beaker: 9,
  };
  return m[t];
}

export function jiggerCost(t: JiggerType): number {
  const m: Record<JiggerType, number> = {
    japanese_tall: 5, bell_double: 3, measured_pour_spout: 4, oxo_angled: 4, graduated_beaker: 3,
  };
  return m[t];
}

export function internalMarks(t: JiggerType): boolean {
  const m: Record<JiggerType, boolean> = {
    japanese_tall: true, bell_double: false, measured_pour_spout: false, oxo_angled: true, graduated_beaker: true,
  };
  return m[t];
}

export function stackable(t: JiggerType): boolean {
  const m: Record<JiggerType, boolean> = {
    japanese_tall: true, bell_double: true, measured_pour_spout: false, oxo_angled: false, graduated_beaker: true,
  };
  return m[t];
}

export function designStyle(t: JiggerType): string {
  const m: Record<JiggerType, string> = {
    japanese_tall: "slim_cone_stainless",
    bell_double: "hourglass_bell_shape",
    measured_pour_spout: "bottle_top_pour_count",
    oxo_angled: "mini_cup_angled_face",
    graduated_beaker: "mini_pitcher_ml_oz",
  };
  return m[t];
}

export function bestBartender(t: JiggerType): string {
  const m: Record<JiggerType, string> = {
    japanese_tall: "craft_cocktail_precision",
    bell_double: "classic_bar_standard",
    measured_pour_spout: "high_volume_speed_bar",
    oxo_angled: "home_mixologist_beginner",
    graduated_beaker: "recipe_testing_exact",
  };
  return m[t];
}

export function jiggers(): JiggerType[] {
  return ["japanese_tall", "bell_double", "measured_pour_spout", "oxo_angled", "graduated_beaker"];
}
