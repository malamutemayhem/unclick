export type PlanType = "latin_cross" | "greek_cross" | "basilican" | "rotunda" | "hall";

export function naveLength(totalLength: number, chancel: number, narthex: number): number {
  return parseFloat((totalLength - chancel - narthex).toFixed(1));
}

export function aisleWidth(naveWidth: number, ratio: number): number {
  return parseFloat((naveWidth * ratio).toFixed(1));
}

export function columnCount(naveLength: number, spacing: number, aisles: number): number {
  if (spacing <= 0) return 0;
  return Math.ceil(naveLength / spacing) * aisles * 2;
}

export function domeDiameter(crossingWidth: number): number {
  return parseFloat((crossingWidth * 0.95).toFixed(1));
}

export function domeHeight(diameter: number): number {
  return parseFloat((diameter * 0.5).toFixed(1));
}

export function apseRadius(chancelWidth: number): number {
  return parseFloat((chancelWidth / 2).toFixed(1));
}

export function clerestoryWindows(naveLength: number, windowSpacing: number): number {
  if (windowSpacing <= 0) return 0;
  return Math.floor(naveLength / windowSpacing) * 2;
}

export function floorAreaM2(plan: PlanType, lengthM: number, widthM: number): number {
  if (plan === "rotunda") {
    return parseFloat((Math.PI * (widthM / 2) * (widthM / 2)).toFixed(1));
  }
  if (plan === "greek_cross") {
    return parseFloat((lengthM * widthM * 0.8).toFixed(1));
  }
  return parseFloat((lengthM * widthM * 0.75).toFixed(1));
}

export function seatingCapacity(floorAreaM2: number): number {
  return Math.floor(floorAreaM2 / 0.7);
}

export function planTypes(): PlanType[] {
  return ["latin_cross", "greek_cross", "basilican", "rotunda", "hall"];
}
