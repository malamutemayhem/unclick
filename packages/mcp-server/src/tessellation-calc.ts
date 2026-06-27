export type RegularPolygon = "triangle" | "square" | "hexagon";
export type TessType = "regular" | "semi_regular" | "penrose" | "voronoi" | "escher";

export function interiorAngle(sides: number): number {
  if (sides < 3) return 0;
  return parseFloat(((sides - 2) * 180 / sides).toFixed(2));
}

export function canTessellate(sides: number): boolean {
  const angle = interiorAngle(sides);
  return 360 % angle === 0;
}

export function tilesAtVertex(sides: number): number {
  const angle = interiorAngle(sides);
  if (angle <= 0) return 0;
  return parseFloat((360 / angle).toFixed(0));
}

export function tileArea(sideLengthCm: number, sides: number): number {
  if (sides < 3 || sideLengthCm <= 0) return 0;
  const area = (sides * sideLengthCm * sideLengthCm) / (4 * Math.tan(Math.PI / sides));
  return parseFloat(area.toFixed(2));
}

export function tilesNeeded(totalAreaCm2: number, tileAreaCm2: number): number {
  if (tileAreaCm2 <= 0) return 0;
  return Math.ceil(totalAreaCm2 / tileAreaCm2);
}

export function groutLength(tileCount: number, perimeterCm: number): number {
  return parseFloat((tileCount * perimeterCm / 2).toFixed(1));
}

export function symmetryOrder(polygon: RegularPolygon): number {
  const orders: Record<RegularPolygon, number> = {
    triangle: 6, square: 4, hexagon: 6,
  };
  return orders[polygon];
}

export function penroseTileRatio(): number {
  return parseFloat(((1 + Math.sqrt(5)) / 2).toFixed(6));
}

export function dualTessellation(polygon: RegularPolygon): RegularPolygon {
  const duals: Record<RegularPolygon, RegularPolygon> = {
    triangle: "hexagon", square: "square", hexagon: "triangle",
  };
  return duals[polygon];
}

export function colorMinimum(tessType: TessType): number {
  const colors: Record<TessType, number> = {
    regular: 3, semi_regular: 4, penrose: 4, voronoi: 4, escher: 2,
  };
  return colors[tessType];
}

export function tessTypes(): TessType[] {
  return ["regular", "semi_regular", "penrose", "voronoi", "escher"];
}
