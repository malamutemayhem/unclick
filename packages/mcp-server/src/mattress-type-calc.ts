export type MattressType = "innerspring" | "memory_foam" | "latex" | "hybrid" | "airbed";

export function supportLevel(m_: MattressType): number {
  const m: Record<MattressType, number> = {
    innerspring: 7, memory_foam: 8, latex: 9, hybrid: 8, airbed: 6,
  };
  return m[m_];
}

export function pressureRelief(m_: MattressType): number {
  const m: Record<MattressType, number> = {
    innerspring: 5, memory_foam: 10, latex: 8, hybrid: 9, airbed: 6,
  };
  return m[m_];
}

export function motionIsolation(m_: MattressType): number {
  const m: Record<MattressType, number> = {
    innerspring: 3, memory_foam: 10, latex: 7, hybrid: 7, airbed: 9,
  };
  return m[m_];
}

export function breathability(m_: MattressType): number {
  const m: Record<MattressType, number> = {
    innerspring: 9, memory_foam: 4, latex: 8, hybrid: 7, airbed: 6,
  };
  return m[m_];
}

export function durabilityYears(m_: MattressType): number {
  const m: Record<MattressType, number> = {
    innerspring: 6, memory_foam: 7, latex: 10, hybrid: 7, airbed: 4,
  };
  return m[m_];
}

export function hypoallergenic(m_: MattressType): boolean {
  const m: Record<MattressType, boolean> = {
    innerspring: false, memory_foam: true, latex: true, hybrid: false, airbed: true,
  };
  return m[m_];
}

export function adjustableFirmness(m_: MattressType): boolean {
  const m: Record<MattressType, boolean> = {
    innerspring: false, memory_foam: false, latex: false, hybrid: false, airbed: true,
  };
  return m[m_];
}

export function bestSleepPosition(m_: MattressType): string {
  const m: Record<MattressType, string> = {
    innerspring: "back_stomach", memory_foam: "side_sleeper",
    latex: "all_positions", hybrid: "combination_sleeper",
    airbed: "adjustable_preference",
  };
  return m[m_];
}

export function coreMaterial(m_: MattressType): string {
  const m: Record<MattressType, string> = {
    innerspring: "steel_coils", memory_foam: "viscoelastic_foam",
    latex: "natural_synthetic_rubber", hybrid: "coils_plus_foam",
    airbed: "air_chambers",
  };
  return m[m_];
}

export function mattressTypes(): MattressType[] {
  return ["innerspring", "memory_foam", "latex", "hybrid", "airbed"];
}
