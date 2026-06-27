export type Tincture = "or" | "argent" | "gules" | "azure" | "sable" | "vert" | "purpure";

export function divisions(partitions: number): number {
  return Math.pow(2, partitions);
}

export function quarters(marshalling: number): number {
  return marshalling * 4;
}

export function blazonWords(charges: number, ordinaries: number, tinctures: number): number {
  return charges * 3 + ordinaries * 2 + tinctures;
}

export function ruleOfTincture(field: Tincture, charge: Tincture): boolean {
  const metals: Tincture[] = ["or", "argent"];
  const fieldIsMetal = metals.includes(field);
  const chargeIsMetal = metals.includes(charge);
  return fieldIsMetal !== chargeIsMetal;
}

export function cadencyMark(childPosition: number): string {
  const marks = ["label", "crescent", "mullet", "martlet", "annulet", "fleur-de-lis", "rose", "cross_moline", "octofoil"];
  return marks[Math.min(childPosition - 1, marks.length - 1)] || "label";
}

export function shieldAspectRatio(style: string): number {
  const ratios: Record<string, number> = {
    heater: 1.2, kite: 1.5, bouche: 1.15, lozenge: 1.0,
  };
  return ratios[style] || 1.2;
}

export function mantlingLayers(rank: string): number {
  const layers: Record<string, number> = {
    sovereign: 4, noble: 3, knight: 2, gentleman: 1,
  };
  return layers[rank] || 1;
}

export function supportersCount(rank: string): number {
  const supporters: Record<string, number> = {
    sovereign: 2, noble: 2, knight: 0, gentleman: 0,
  };
  return supporters[rank] || 0;
}

export function crestHeight(shieldHeight: number): number {
  return parseFloat((shieldHeight * 0.4).toFixed(1));
}

export function tinctures(): Tincture[] {
  return ["or", "argent", "gules", "azure", "sable", "vert", "purpure"];
}
