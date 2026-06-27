export type ConcreteType = "normal" | "high_strength" | "self_compacting" | "fiber_reinforced" | "lightweight";

export function compressiveStrengthMpa(c: ConcreteType): number {
  const m: Record<ConcreteType, number> = {
    normal: 30, high_strength: 80, self_compacting: 50, fiber_reinforced: 60, lightweight: 20,
  };
  return m[c];
}

export function workability(c: ConcreteType): number {
  const m: Record<ConcreteType, number> = {
    normal: 6, high_strength: 4, self_compacting: 10, fiber_reinforced: 3, lightweight: 7,
  };
  return m[c];
}

export function costPerCubicMeter(c: ConcreteType): number {
  const m: Record<ConcreteType, number> = {
    normal: 2, high_strength: 7, self_compacting: 8, fiber_reinforced: 9, lightweight: 6,
  };
  return m[c];
}

export function durability(c: ConcreteType): number {
  const m: Record<ConcreteType, number> = {
    normal: 6, high_strength: 9, self_compacting: 8, fiber_reinforced: 10, lightweight: 5,
  };
  return m[c];
}

export function densityKgM3(c: ConcreteType): number {
  const m: Record<ConcreteType, number> = {
    normal: 2400, high_strength: 2500, self_compacting: 2350, fiber_reinforced: 2450, lightweight: 1800,
  };
  return m[c];
}

export function requiresVibration(c: ConcreteType): boolean {
  const m: Record<ConcreteType, boolean> = {
    normal: true, high_strength: true, self_compacting: false, fiber_reinforced: true, lightweight: true,
  };
  return m[c];
}

export function crackResistant(c: ConcreteType): boolean {
  const m: Record<ConcreteType, boolean> = {
    normal: false, high_strength: false, self_compacting: false, fiber_reinforced: true, lightweight: false,
  };
  return m[c];
}

export function bestApplication(c: ConcreteType): string {
  const m: Record<ConcreteType, string> = {
    normal: "general_construction", high_strength: "high_rise_columns",
    self_compacting: "complex_formwork", fiber_reinforced: "tunnel_lining",
    lightweight: "roof_deck_insulation",
  };
  return m[c];
}

export function curingTimeDays(c: ConcreteType): string {
  const m: Record<ConcreteType, string> = {
    normal: "28_standard", high_strength: "28_with_admixtures",
    self_compacting: "28_standard", fiber_reinforced: "28_standard",
    lightweight: "28_extended_care",
  };
  return m[c];
}

export function concreteTypes(): ConcreteType[] {
  return ["normal", "high_strength", "self_compacting", "fiber_reinforced", "lightweight"];
}
