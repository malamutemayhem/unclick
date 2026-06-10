export type IntaglioMethod = "engraving" | "etching" | "drypoint" | "mezzotint" | "aquatint";

export function plateThicknessMm(method: IntaglioMethod): number {
  const thickness: Record<IntaglioMethod, number> = {
    engraving: 1.6, etching: 1.2, drypoint: 1.0, mezzotint: 2.0, aquatint: 1.2,
  };
  return thickness[method];
}

export function etchTimeMinutes(method: IntaglioMethod): number {
  const times: Record<IntaglioMethod, number> = {
    engraving: 0, etching: 20, drypoint: 0, mezzotint: 0, aquatint: 15,
  };
  return times[method];
}

export function acidType(method: IntaglioMethod): string {
  const acids: Record<IntaglioMethod, string> = {
    engraving: "none", etching: "ferric_chloride", drypoint: "none",
    mezzotint: "none", aquatint: "nitric_acid",
  };
  return acids[method];
}

export function lineQualityRating(method: IntaglioMethod): number {
  const ratings: Record<IntaglioMethod, number> = {
    engraving: 5, etching: 4, drypoint: 3, mezzotint: 2, aquatint: 3,
  };
  return ratings[method];
}

export function toneRangeRating(method: IntaglioMethod): number {
  const ratings: Record<IntaglioMethod, number> = {
    engraving: 3, etching: 3, drypoint: 2, mezzotint: 5, aquatint: 5,
  };
  return ratings[method];
}

export function editionsPerPlate(method: IntaglioMethod): number {
  const editions: Record<IntaglioMethod, number> = {
    engraving: 500, etching: 200, drypoint: 25, mezzotint: 50, aquatint: 100,
  };
  return editions[method];
}

export function pressureBar(): number {
  return 40;
}

export function inkGPerPrint(plateAreaCm2: number): number {
  return parseFloat((plateAreaCm2 * 0.02).toFixed(1));
}

export function costPerPlate(method: IntaglioMethod): number {
  const costs: Record<IntaglioMethod, number> = {
    engraving: 20, etching: 15, drypoint: 10, mezzotint: 30, aquatint: 15,
  };
  return costs[method];
}

export function intaglioMethods(): IntaglioMethod[] {
  return ["engraving", "etching", "drypoint", "mezzotint", "aquatint"];
}
