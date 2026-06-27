export type PuppetType = "hand" | "marionette" | "rod" | "shadow" | "finger" | "ventriloquist";
export type Material = "fabric" | "foam" | "wood" | "papier_mache" | "felt" | "latex";

export function stringCount(type: PuppetType): number {
  const strings: Record<PuppetType, number> = {
    hand: 0, marionette: 9, rod: 2, shadow: 0, finger: 0, ventriloquist: 0,
  };
  return strings[type];
}

export function operatorCount(type: PuppetType): number {
  const ops: Record<PuppetType, number> = {
    hand: 1, marionette: 1, rod: 2, shadow: 1, finger: 1, ventriloquist: 1,
  };
  return ops[type];
}

export function buildHours(type: PuppetType, complexity: number): number {
  const base: Record<PuppetType, number> = {
    hand: 4, marionette: 20, rod: 12, shadow: 3, finger: 1, ventriloquist: 30,
  };
  return Math.round(base[type] * (1 + (complexity - 1) * 0.5));
}

export function materialCost(material: Material, sizeCm: number): number {
  const costPerCm: Record<Material, number> = {
    fabric: 0.3, foam: 0.2, wood: 0.5, papier_mache: 0.1, felt: 0.25, latex: 0.6,
  };
  return parseFloat((costPerCm[material] * sizeCm).toFixed(2));
}

export function mouthPlateSize(headWidthCm: number): number {
  return parseFloat((headWidthCm * 0.7).toFixed(1));
}

export function controlBarLength(puppetHeightCm: number): number {
  return parseFloat((puppetHeightCm * 0.4).toFixed(1));
}

export function stageWidth(puppetCount: number, puppetWidthCm: number): number {
  return parseFloat((puppetCount * puppetWidthCm * 2.5).toFixed(0));
}

export function stageHeight(puppetHeightCm: number): number {
  return parseFloat((puppetHeightCm * 3).toFixed(0));
}

export function screenOpacity(type: PuppetType): string {
  if (type === "shadow") return "translucent (backlit screen)";
  return "opaque (audience facing)";
}

export function voiceProjection(distance: number): string {
  if (distance < 3) return "conversational";
  if (distance < 8) return "projected";
  return "amplified recommended";
}

export function showDuration(acts: number, minutesPerAct: number = 15): number {
  return acts * minutesPerAct;
}

export function rehearsalHours(showMinutes: number, complexity: number): number {
  return Math.round(showMinutes * complexity * 0.5);
}

export function audienceCapacity(venueType: "intimate" | "small" | "medium" | "large"): number {
  const cap: Record<string, number> = { intimate: 30, small: 80, medium: 200, large: 500 };
  return cap[venueType];
}

export function puppetTypes(): PuppetType[] {
  return ["hand", "marionette", "rod", "shadow", "finger", "ventriloquist"];
}
