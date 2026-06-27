export type MaskStyle = "venetian" | "colombina" | "bauta" | "moretta" | "medico";

export function maskWeight(material: string, areaCm2: number): number {
  const densities: Record<string, number> = {
    papier_mache: 0.003, leather: 0.008, ceramic: 0.015, metal: 0.025,
  };
  const d = densities[material] || 0.005;
  return parseFloat((areaCm2 * d).toFixed(0));
}

export function fieldOfView(style: MaskStyle): number {
  const degrees: Record<MaskStyle, number> = {
    venetian: 120, colombina: 160, bauta: 100, moretta: 90, medico: 80,
  };
  return degrees[style];
}

export function breathability(style: MaskStyle): number {
  const ratings: Record<MaskStyle, number> = {
    venetian: 7, colombina: 10, bauta: 5, moretta: 3, medico: 4,
  };
  return ratings[style];
}

export function decorationCost(feathers: number, gems: number, goldLeaf: boolean): number {
  return feathers * 5 + gems * 20 + (goldLeaf ? 50 : 0);
}

export function elasticLengthCm(headCircumferenceCm: number): number {
  return parseFloat((headCircumferenceCm * 0.8).toFixed(0));
}

export function moldDryingHours(layers: number): number {
  return layers * 4;
}

export function paintLayers(detail: string): number {
  const layers: Record<string, number> = {
    simple: 2, moderate: 4, elaborate: 6,
  };
  return layers[detail] || 4;
}

export function glueMl(areaCm2: number, layers: number): number {
  return parseFloat((areaCm2 * layers * 0.02).toFixed(0));
}

export function wearComfortHours(weightG: number, breathability: number): number {
  return parseFloat((breathability * 10 / Math.sqrt(weightG)).toFixed(1));
}

export function maskStyles(): MaskStyle[] {
  return ["venetian", "colombina", "bauta", "moretta", "medico"];
}
