export type DopWaxType = "brown_hard_stick" | "green_medium_temp" | "red_soft_low" | "black_extra_hard" | "shellac_flake_natural";

export function holdStrength(t: DopWaxType): number {
  const m: Record<DopWaxType, number> = {
    brown_hard_stick: 8, green_medium_temp: 7, red_soft_low: 5, black_extra_hard: 10, shellac_flake_natural: 9,
  };
  return m[t];
}

export function heatResist(t: DopWaxType): number {
  const m: Record<DopWaxType, number> = {
    brown_hard_stick: 8, green_medium_temp: 6, red_soft_low: 4, black_extra_hard: 10, shellac_flake_natural: 7,
  };
  return m[t];
}

export function easeOfRemoval(t: DopWaxType): number {
  const m: Record<DopWaxType, number> = {
    brown_hard_stick: 6, green_medium_temp: 8, red_soft_low: 10, black_extra_hard: 3, shellac_flake_natural: 5,
  };
  return m[t];
}

export function reusability(t: DopWaxType): number {
  const m: Record<DopWaxType, number> = {
    brown_hard_stick: 8, green_medium_temp: 7, red_soft_low: 6, black_extra_hard: 9, shellac_flake_natural: 5,
  };
  return m[t];
}

export function waxCost(t: DopWaxType): number {
  const m: Record<DopWaxType, number> = {
    brown_hard_stick: 1, green_medium_temp: 1, red_soft_low: 1, black_extra_hard: 2, shellac_flake_natural: 2,
  };
  return m[t];
}

export function naturalOrigin(t: DopWaxType): boolean {
  const m: Record<DopWaxType, boolean> = {
    brown_hard_stick: false, green_medium_temp: false, red_soft_low: false, black_extra_hard: false, shellac_flake_natural: true,
  };
  return m[t];
}

export function stickForm(t: DopWaxType): boolean {
  const m: Record<DopWaxType, boolean> = {
    brown_hard_stick: true, green_medium_temp: true, red_soft_low: true, black_extra_hard: true, shellac_flake_natural: false,
  };
  return m[t];
}

export function meltTemp(t: DopWaxType): string {
  const m: Record<DopWaxType, string> = {
    brown_hard_stick: "medium_high_160f",
    green_medium_temp: "medium_140f",
    red_soft_low: "low_120f",
    black_extra_hard: "high_180f",
    shellac_flake_natural: "high_170f",
  };
  return m[t];
}

export function bestUse(t: DopWaxType): string {
  const m: Record<DopWaxType, string> = {
    brown_hard_stick: "general_facet_dop",
    green_medium_temp: "heat_sensitive_stone",
    red_soft_low: "delicate_soft_gem",
    black_extra_hard: "aggressive_grind_hold",
    shellac_flake_natural: "traditional_lap_bond",
  };
  return m[t];
}

export function dopWaxes(): DopWaxType[] {
  return ["brown_hard_stick", "green_medium_temp", "red_soft_low", "black_extra_hard", "shellac_flake_natural"];
}
