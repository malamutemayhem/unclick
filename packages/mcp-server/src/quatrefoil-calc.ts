export type FoilCount = 3 | 4 | 5 | 6 | 8;

export function outerRadius(inscribedCircleRadiusCm: number): number {
  return parseFloat((inscribedCircleRadiusCm * 1.15).toFixed(1));
}

export function lobeRadius(inscribedRadiusCm: number, foils: FoilCount): number {
  const angleBetween = (2 * Math.PI) / foils;
  return parseFloat((inscribedRadiusCm * Math.sin(angleBetween / 2) / (1 + Math.sin(angleBetween / 2))).toFixed(1));
}

export function cuspLength(lobeRadiusCm: number): number {
  return parseFloat((lobeRadiusCm * 0.6).toFixed(1));
}

export function openAreaCm2(inscribedRadiusCm: number, foils: FoilCount): number {
  const lobe = lobeRadius(inscribedRadiusCm, foils);
  const singleLobeArea = Math.PI * lobe * lobe;
  return parseFloat((singleLobeArea * foils).toFixed(0));
}

export function perimeterCm(inscribedRadiusCm: number, foils: FoilCount): number {
  const lobe = lobeRadius(inscribedRadiusCm, foils);
  return parseFloat((2 * Math.PI * lobe * foils * 0.75).toFixed(1));
}

export function stoneBarWidth(inscribedRadiusCm: number): number {
  return parseFloat((inscribedRadiusCm * 0.06).toFixed(1));
}

export function carvingHours(foils: FoilCount, radiusCm: number): number {
  return parseFloat((foils * radiusCm * 0.05).toFixed(1));
}

export function glazingPanelCount(foils: FoilCount): number {
  return foils + 1;
}

export function symmetryAxes(foils: FoilCount): number {
  return foils;
}

export function lightTransmissionPercent(openAreaCm2: number, totalAreaCm2: number): number {
  if (totalAreaCm2 <= 0) return 0;
  return parseFloat((openAreaCm2 / totalAreaCm2 * 100).toFixed(1));
}

export function foilCounts(): FoilCount[] {
  return [3, 4, 5, 6, 8];
}
