export type SawBlade = "rip" | "crosscut" | "combination" | "dado" | "scroll";

export function toothCount(s: SawBlade): number {
  const m: Record<SawBlade, number> = {
    rip: 24, crosscut: 80, combination: 50, dado: 16, scroll: 12,
  };
  return m[s];
}

export function cutSpeed(s: SawBlade): number {
  const m: Record<SawBlade, number> = {
    rip: 9, crosscut: 5, combination: 7, dado: 6, scroll: 3,
  };
  return m[s];
}

export function cutSmoothness(s: SawBlade): number {
  const m: Record<SawBlade, number> = {
    rip: 4, crosscut: 10, combination: 7, dado: 5, scroll: 8,
  };
  return m[s];
}

export function versatility(s: SawBlade): number {
  const m: Record<SawBlade, number> = {
    rip: 4, crosscut: 5, combination: 10, dado: 3, scroll: 6,
  };
  return m[s];
}

export function kerfWidth(s: SawBlade): number {
  const m: Record<SawBlade, number> = {
    rip: 7, crosscut: 5, combination: 6, dado: 10, scroll: 2,
  };
  return m[s];
}

export function canCutCurves(s: SawBlade): boolean {
  const m: Record<SawBlade, boolean> = {
    rip: false, crosscut: false, combination: false, dado: false, scroll: true,
  };
  return m[s];
}

export function tablesSawCompatible(s: SawBlade): boolean {
  const m: Record<SawBlade, boolean> = {
    rip: true, crosscut: true, combination: true, dado: true, scroll: false,
  };
  return m[s];
}

export function primaryCut(s: SawBlade): string {
  const m: Record<SawBlade, string> = {
    rip: "along_grain", crosscut: "across_grain",
    combination: "both_directions", dado: "grooves_channels",
    scroll: "intricate_curves",
  };
  return m[s];
}

export function toothGeometry(s: SawBlade): string {
  const m: Record<SawBlade, string> = {
    rip: "flat_top_grind", crosscut: "alternate_top_bevel",
    combination: "mixed_ftg_atb", dado: "flat_chipper",
    scroll: "skip_tooth",
  };
  return m[s];
}

export function sawBlades(): SawBlade[] {
  return ["rip", "crosscut", "combination", "dado", "scroll"];
}
