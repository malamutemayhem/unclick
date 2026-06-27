export type CurlingIron = "spring_clamp" | "clipless_wand" | "marcel" | "auto_rotating" | "triple_barrel";

export function curlDefinition(c: CurlingIron): number {
  const m: Record<CurlingIron, number> = {
    spring_clamp: 7, clipless_wand: 9, marcel: 10, auto_rotating: 6, triple_barrel: 5,
  };
  return m[c];
}

export function heatRecovery(c: CurlingIron): number {
  const m: Record<CurlingIron, number> = {
    spring_clamp: 7, clipless_wand: 8, marcel: 6, auto_rotating: 9, triple_barrel: 7,
  };
  return m[c];
}

export function versatility(c: CurlingIron): number {
  const m: Record<CurlingIron, number> = {
    spring_clamp: 8, clipless_wand: 7, marcel: 6, auto_rotating: 5, triple_barrel: 4,
  };
  return m[c];
}

export function easeOfUse(c: CurlingIron): number {
  const m: Record<CurlingIron, number> = {
    spring_clamp: 9, clipless_wand: 5, marcel: 3, auto_rotating: 10, triple_barrel: 6,
  };
  return m[c];
}

export function toolCost(c: CurlingIron): number {
  const m: Record<CurlingIron, number> = {
    spring_clamp: 3, clipless_wand: 5, marcel: 7, auto_rotating: 8, triple_barrel: 6,
  };
  return m[c];
}

export function hasClamp(c: CurlingIron): boolean {
  const m: Record<CurlingIron, boolean> = {
    spring_clamp: true, clipless_wand: false, marcel: true, auto_rotating: true, triple_barrel: false,
  };
  return m[c];
}

export function professionalOnly(c: CurlingIron): boolean {
  const m: Record<CurlingIron, boolean> = {
    spring_clamp: false, clipless_wand: false, marcel: true, auto_rotating: false, triple_barrel: false,
  };
  return m[c];
}

export function barrelMaterial(c: CurlingIron): string {
  const m: Record<CurlingIron, string> = {
    spring_clamp: "ceramic_tourmaline_coated", clipless_wand: "titanium_tapered_cone",
    marcel: "chrome_polished_traditional", auto_rotating: "ceramic_ionic_motorized",
    triple_barrel: "ceramic_triple_wave_barrel",
  };
  return m[c];
}

export function bestCurlType(c: CurlingIron): string {
  const m: Record<CurlingIron, string> = {
    spring_clamp: "classic_uniform_ringlet", clipless_wand: "beachy_natural_wave",
    marcel: "vintage_hollywood_wave", auto_rotating: "effortless_bouncy_curl",
    triple_barrel: "mermaid_wave_crimp",
  };
  return m[c];
}

export function curlingIrons(): CurlingIron[] {
  return ["spring_clamp", "clipless_wand", "marcel", "auto_rotating", "triple_barrel"];
}
