export type SurfaceType = "wood" | "glass" | "metal" | "ceramic" | "fabric" | "cardboard";
export type SealerType = "mod_podge" | "pva" | "lacquer" | "resin" | "varnish";

export function surfacePrep(surface: SurfaceType): string {
  const prep: Record<SurfaceType, string> = {
    wood: "sand and prime", glass: "clean with alcohol", metal: "sand and prime",
    ceramic: "clean and dry", fabric: "starch and iron", cardboard: "seal with PVA",
  };
  return prep[surface];
}

export function paperLayers(thickness: "tissue" | "napkin" | "cardstock"): number {
  const layers: Record<string, number> = { tissue: 5, napkin: 3, cardstock: 1 };
  return layers[thickness];
}

export function adhesiveAmount(areaCm2: number, layers: number): number {
  return parseFloat((areaCm2 * layers * 0.02).toFixed(1));
}

export function sealerCoats(sealerType: SealerType): number {
  const coats: Record<SealerType, number> = {
    mod_podge: 3, pva: 4, lacquer: 2, resin: 1, varnish: 3,
  };
  return coats[sealerType];
}

export function dryingTimeMin(sealerType: SealerType): number {
  const mins: Record<SealerType, number> = {
    mod_podge: 20, pva: 30, lacquer: 60, resin: 1440, varnish: 120,
  };
  return mins[sealerType];
}

export function totalDryingTime(coats: number, dryingPerCoatMin: number): number {
  return coats * dryingPerCoatMin;
}

export function paperNeeded(areaCm2: number, overlapPct: number = 10): number {
  return parseFloat((areaCm2 * (1 + overlapPct / 100)).toFixed(0));
}

export function wrinklePrevention(paperType: "tissue" | "napkin" | "cardstock"): string {
  if (paperType === "tissue") return "apply adhesive to surface, lay paper, brush from center";
  if (paperType === "napkin") return "separate plies, use minimal adhesive";
  return "soak briefly, apply while damp";
}

export function cuttingTool(paperType: "tissue" | "napkin" | "cardstock"): string {
  if (paperType === "tissue") return "tear by hand for soft edges";
  if (paperType === "napkin") return "scissors or tear";
  return "craft knife for precision";
}

export function projectTime(areaCm2: number, layers: number, sealerType: SealerType): number {
  const prepMin = 15;
  const applyMin = areaCm2 * layers * 0.005;
  const drying = totalDryingTime(sealerCoats(sealerType), dryingTimeMin(sealerType));
  return Math.round(prepMin + applyMin + drying);
}

export function costEstimate(areaCm2: number, sealerType: SealerType): number {
  const sealerCost: Record<SealerType, number> = {
    mod_podge: 0.003, pva: 0.002, lacquer: 0.005, resin: 0.01, varnish: 0.004,
  };
  return parseFloat((areaCm2 * sealerCost[sealerType] + 2).toFixed(2));
}

export function surfaceTypes(): SurfaceType[] {
  return ["wood", "glass", "metal", "ceramic", "fabric", "cardboard"];
}
