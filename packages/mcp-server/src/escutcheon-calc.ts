export type ShieldShape = "heater" | "kite" | "round" | "lozenge" | "cartouche";

export function shieldArea(widthCm: number, heightCm: number, shape: ShieldShape): number {
  const factors: Record<ShieldShape, number> = {
    heater: 0.75, kite: 0.65, round: 0.785, lozenge: 0.5, cartouche: 0.7,
  };
  return parseFloat((widthCm * heightCm * factors[shape] / 10000).toFixed(3));
}

export function fieldDivisions(ordinaries: number, charges: number): number {
  return ordinaries + charges + 1;
}

export function tinctureLayers(fieldDivisions: number): number {
  return Math.ceil(fieldDivisions * 1.5);
}

export function gildingAreaCm2(totalAreaCm2: number, goldPercent: number): number {
  return parseFloat((totalAreaCm2 * goldPercent / 100).toFixed(1));
}

export function carvingDepthMm(material: string): number {
  const depths: Record<string, number> = {
    wood: 8, stone: 5, metal: 2, plaster: 6, marble: 4,
  };
  return depths[material] || 3;
}

export function paintLayers(outdoor: boolean): number {
  return outdoor ? 5 : 3;
}

export function mantlingLength(shieldHeightCm: number): number {
  return parseFloat((shieldHeightCm * 2.5).toFixed(1));
}

export function crestHeight(shieldHeightCm: number): number {
  return parseFloat((shieldHeightCm * 0.6).toFixed(1));
}

export function blazonComplexity(ordinaries: number, charges: number, tinctures: number): number {
  return ordinaries * 2 + charges * 3 + tinctures;
}

export function restorationHours(areaCm2: number, damagePercent: number): number {
  return parseFloat((areaCm2 / 100 * damagePercent / 100 * 5).toFixed(1));
}

export function shieldShapes(): ShieldShape[] {
  return ["heater", "kite", "round", "lozenge", "cartouche"];
}
