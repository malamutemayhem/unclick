export type AstrolabeType = "planispheric" | "universal" | "mariner" | "spherical";

export function stereographicX(azDeg: number, altDeg: number, radius: number): number {
  const azRad = azDeg * Math.PI / 180;
  const altRad = altDeg * Math.PI / 180;
  const r = radius * Math.cos(altRad) / (1 + Math.sin(altRad));
  return parseFloat((r * Math.sin(azRad)).toFixed(2));
}

export function stereographicY(azDeg: number, altDeg: number, radius: number): number {
  const azRad = azDeg * Math.PI / 180;
  const altRad = altDeg * Math.PI / 180;
  const r = radius * Math.cos(altRad) / (1 + Math.sin(altRad));
  return parseFloat((-r * Math.cos(azRad)).toFixed(2));
}

export function tropicRadius(obliquity: number, plateRadius: number): number {
  const rad = obliquity * Math.PI / 180;
  return parseFloat((plateRadius * Math.tan(Math.PI / 4 - rad / 2)).toFixed(2));
}

export function equatorRadius(plateRadius: number): number {
  return parseFloat((plateRadius * Math.tan(Math.PI / 4)).toFixed(2));
}

export function almucantarRadius(altitude: number, plateRadius: number): number {
  const altRad = altitude * Math.PI / 180;
  return parseFloat((plateRadius * Math.cos(altRad) / (1 + Math.sin(altRad))).toFixed(2));
}

export function reteStars(): number {
  return 30;
}

export function plateCount(type: AstrolabeType): number {
  const counts: Record<AstrolabeType, number> = {
    planispheric: 5, universal: 1, mariner: 3, spherical: 1,
  };
  return counts[type];
}

export function ruleLength(plateRadius: number): number {
  return parseFloat((plateRadius * 2).toFixed(1));
}

export function alidade(plateRadius: number): number {
  return parseFloat((plateRadius * 1.8).toFixed(1));
}

export function timeToDegrees(hours: number): number {
  return parseFloat((hours * 15).toFixed(1));
}

export function degreesToTime(degrees: number): number {
  return parseFloat((degrees / 15).toFixed(2));
}

export function astrolabeTypes(): AstrolabeType[] {
  return ["planispheric", "universal", "mariner", "spherical"];
}
