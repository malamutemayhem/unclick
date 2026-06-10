export type MaltType = "pale" | "pilsner" | "munich" | "crystal" | "roasted";

export function colorLovibond(m_: MaltType): number {
  const m: Record<MaltType, number> = {
    pale: 3, pilsner: 2, munich: 8, crystal: 40, roasted: 300,
  };
  return m[m_];
}

export function diastatiPower(m_: MaltType): number {
  const m: Record<MaltType, number> = {
    pale: 9, pilsner: 10, munich: 5, crystal: 0, roasted: 0,
  };
  return m[m_];
}

export function fermentability(m_: MaltType): number {
  const m: Record<MaltType, number> = {
    pale: 8, pilsner: 9, munich: 6, crystal: 4, roasted: 2,
  };
  return m[m_];
}

export function flavorIntensity(m_: MaltType): number {
  const m: Record<MaltType, number> = {
    pale: 3, pilsner: 2, munich: 6, crystal: 7, roasted: 10,
  };
  return m[m_];
}

export function maxGristPercent(m_: MaltType): number {
  const m: Record<MaltType, number> = {
    pale: 100, pilsner: 100, munich: 60, crystal: 20, roasted: 10,
  };
  return m[m_];
}

export function isBaseMalt(m_: MaltType): boolean {
  const m: Record<MaltType, boolean> = {
    pale: true, pilsner: true, munich: true, crystal: false, roasted: false,
  };
  return m[m_];
}

export function needsMashing(m_: MaltType): boolean {
  const m: Record<MaltType, boolean> = {
    pale: true, pilsner: true, munich: true, crystal: false, roasted: false,
  };
  return m[m_];
}

export function typicalStyle(m_: MaltType): string {
  const m: Record<MaltType, string> = {
    pale: "english_ales", pilsner: "pilsners_lagers",
    munich: "oktoberfest_bock", crystal: "amber_red_ale",
    roasted: "stout_porter",
  };
  return m[m_];
}

export function kilnTreatment(m_: MaltType): string {
  const m: Record<MaltType, string> = {
    pale: "light_kiln", pilsner: "minimal_kiln",
    munich: "high_kiln", crystal: "stewed_crystallized",
    roasted: "drum_roasted",
  };
  return m[m_];
}

export function maltTypes(): MaltType[] {
  return ["pale", "pilsner", "munich", "crystal", "roasted"];
}
