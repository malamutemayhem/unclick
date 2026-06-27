export type SoundingLeadType = "hand_lead" | "deep_sea_lead" | "armed_lead" | "chain_sounding" | "pole_sounding";

export function weightKg(type: SoundingLeadType): number {
  const w: Record<SoundingLeadType, number> = {
    hand_lead: 3, deep_sea_lead: 14, armed_lead: 4, chain_sounding: 8, pole_sounding: 1,
  };
  return w[type];
}

export function maxDepthMeters(type: SoundingLeadType): number {
  const d: Record<SoundingLeadType, number> = {
    hand_lead: 30, deep_sea_lead: 200, armed_lead: 30, chain_sounding: 50, pole_sounding: 5,
  };
  return d[type];
}

export function lineLengthMeters(type: SoundingLeadType): number {
  const l: Record<SoundingLeadType, number> = {
    hand_lead: 40, deep_sea_lead: 250, armed_lead: 40, chain_sounding: 60, pole_sounding: 0,
  };
  return l[type];
}

export function bottomSampleCapable(type: SoundingLeadType): boolean {
  return type === "armed_lead" || type === "deep_sea_lead";
}

export function castTimeSeconds(type: SoundingLeadType): number {
  const t: Record<SoundingLeadType, number> = {
    hand_lead: 15, deep_sea_lead: 120, armed_lead: 20, chain_sounding: 30, pole_sounding: 5,
  };
  return t[type];
}

export function crewRequired(type: SoundingLeadType): number {
  const c: Record<SoundingLeadType, number> = {
    hand_lead: 1, deep_sea_lead: 4, armed_lead: 1, chain_sounding: 2, pole_sounding: 1,
  };
  return c[type];
}

export function accuracyRating(type: SoundingLeadType): number {
  const a: Record<SoundingLeadType, number> = {
    hand_lead: 7, deep_sea_lead: 5, armed_lead: 7, chain_sounding: 8, pole_sounding: 9,
  };
  return a[type];
}

export function speedCompatible(type: SoundingLeadType): boolean {
  return type === "hand_lead" || type === "pole_sounding";
}

export function costEstimate(type: SoundingLeadType): number {
  const c: Record<SoundingLeadType, number> = {
    hand_lead: 50, deep_sea_lead: 200, armed_lead: 80, chain_sounding: 150, pole_sounding: 20,
  };
  return c[type];
}

export function soundingLeadTypes(): SoundingLeadType[] {
  return ["hand_lead", "deep_sea_lead", "armed_lead", "chain_sounding", "pole_sounding"];
}
