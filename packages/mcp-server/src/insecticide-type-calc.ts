export type InsecticideType = "pyrethroid" | "organophosphate" | "neonicotinoid" | "biological" | "insect_growth_regulator";

export function broadSpectrumKill(i: InsecticideType): number {
  const m: Record<InsecticideType, number> = {
    pyrethroid: 9, organophosphate: 10, neonicotinoid: 7, biological: 4, insect_growth_regulator: 3,
  };
  return m[i];
}

export function residualActivity(i: InsecticideType): number {
  const m: Record<InsecticideType, number> = {
    pyrethroid: 8, organophosphate: 5, neonicotinoid: 9, biological: 3, insect_growth_regulator: 7,
  };
  return m[i];
}

export function mammalianToxicity(i: InsecticideType): number {
  const m: Record<InsecticideType, number> = {
    pyrethroid: 3, organophosphate: 9, neonicotinoid: 4, biological: 1, insect_growth_regulator: 2,
  };
  return m[i];
}

export function environmentalPersistence(i: InsecticideType): number {
  const m: Record<InsecticideType, number> = {
    pyrethroid: 5, organophosphate: 4, neonicotinoid: 8, biological: 1, insect_growth_regulator: 3,
  };
  return m[i];
}

export function applicationCost(i: InsecticideType): number {
  const m: Record<InsecticideType, number> = {
    pyrethroid: 4, organophosphate: 5, neonicotinoid: 6, biological: 8, insect_growth_regulator: 7,
  };
  return m[i];
}

export function organicApproved(i: InsecticideType): boolean {
  const m: Record<InsecticideType, boolean> = {
    pyrethroid: false, organophosphate: false, neonicotinoid: false, biological: true, insect_growth_regulator: false,
  };
  return m[i];
}

export function systemicAction(i: InsecticideType): boolean {
  const m: Record<InsecticideType, boolean> = {
    pyrethroid: false, organophosphate: false, neonicotinoid: true, biological: false, insect_growth_regulator: false,
  };
  return m[i];
}

export function modeOfAction(i: InsecticideType): string {
  const m: Record<InsecticideType, string> = {
    pyrethroid: "sodium_channel_disruptor", organophosphate: "acetylcholinesterase_inhibitor",
    neonicotinoid: "nicotinic_receptor_agonist", biological: "bacillus_thuringiensis_toxin",
    insect_growth_regulator: "chitin_synthesis_inhibitor",
  };
  return m[i];
}

export function bestTarget(i: InsecticideType): string {
  const m: Record<InsecticideType, string> = {
    pyrethroid: "crawling_flying_household", organophosphate: "agricultural_heavy_infestation",
    neonicotinoid: "sap_feeding_termite_soil", biological: "caterpillar_mosquito_larvae",
    insect_growth_regulator: "flea_cockroach_lifecycle",
  };
  return m[i];
}

export function insecticideTypes(): InsecticideType[] {
  return ["pyrethroid", "organophosphate", "neonicotinoid", "biological", "insect_growth_regulator"];
}
