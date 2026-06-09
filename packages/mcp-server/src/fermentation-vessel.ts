export type VesselType = "carboy" | "bucket" | "conical" | "barrel" | "demijohn" | "amphora";
export type Material = "glass" | "plastic" | "stainless" | "oak" | "ceramic";

export function vesselVolume(type: VesselType): number {
  const liters: Record<VesselType, number> = {
    carboy: 23, bucket: 25, conical: 30, barrel: 225, demijohn: 54, amphora: 40,
  };
  return liters[type];
}

export function headspace(batchLiters: number, vesselLiters: number): number {
  return parseFloat(((1 - batchLiters / vesselLiters) * 100).toFixed(1));
}

export function idealHeadspace(stage: "primary" | "secondary"): number {
  return stage === "primary" ? 25 : 5;
}

export function airlockBubbles(fermentDay: number, peakDay: number = 3): number {
  const peak = 60;
  const decay = Math.exp(-0.3 * Math.abs(fermentDay - peakDay));
  return Math.round(peak * decay);
}

export function temperatureControl(material: Material): string {
  if (material === "stainless") return "excellent (conductive, jacketed option)";
  if (material === "ceramic" || material === "oak") return "good (natural insulation)";
  if (material === "glass") return "moderate (visible but fragile)";
  return "fair (insulate externally)";
}

export function cleaningVolume(vesselLiters: number): number {
  return parseFloat((vesselLiters * 0.1).toFixed(1));
}

export function sanitizerAmount(vesselLiters: number, concentrationMlPerL: number = 1): number {
  return parseFloat((vesselLiters * concentrationMlPerL).toFixed(0));
}

export function oxygenExposure(material: Material): string {
  const levels: Record<Material, string> = {
    glass: "none", plastic: "slight", stainless: "none", oak: "micro-oxygenation", ceramic: "minimal",
  };
  return levels[material];
}

export function rackingLoss(vesselLiters: number, rackings: number): number {
  return parseFloat((vesselLiters * 0.02 * rackings).toFixed(1));
}

export function samplingVolume(tastings: number): number {
  return parseFloat((tastings * 0.05).toFixed(2));
}

export function weightFull(vesselLiters: number, emptyKg: number): number {
  return parseFloat((emptyKg + vesselLiters * 1.05).toFixed(1));
}

export function stackable(type: VesselType): boolean {
  return type === "bucket" || type === "barrel";
}

export function vesselTypes(): VesselType[] {
  return ["carboy", "bucket", "conical", "barrel", "demijohn", "amphora"];
}
