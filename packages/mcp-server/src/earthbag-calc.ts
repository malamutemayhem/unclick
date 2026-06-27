export type BagMaterial = "polypropylene" | "burlap" | "cotton" | "geotextile" | "hemp";

export function bagWidthCm(wallThicknessCm: number): number {
  return Math.round(wallThicknessCm * 1.5);
}

export function bagsPerCourse(perimeterM: number, bagLengthCm: number): number {
  if (bagLengthCm <= 0) return 0;
  return Math.ceil(perimeterM * 100 / bagLengthCm);
}

export function barbedWireStrandsPerCourse(): number {
  return 2;
}

export function tamperWeightKg(): number {
  return 8;
}

export function fillWeightKgPerBag(bagLengthCm: number): number {
  return Math.round(bagLengthCm * 0.5);
}

export function uvResistanceMonths(material: BagMaterial): number {
  const months: Record<BagMaterial, number> = {
    polypropylene: 6, burlap: 3, cotton: 2, geotextile: 24, hemp: 4,
  };
  return months[material];
}

export function tensileStrength(material: BagMaterial): number {
  const ratings: Record<BagMaterial, number> = {
    polypropylene: 5, burlap: 2, cotton: 1, geotextile: 4, hemp: 3,
  };
  return ratings[material];
}

export function biodegradable(material: BagMaterial): boolean {
  return material === "burlap" || material === "cotton" || material === "hemp";
}

export function costPerBag(material: BagMaterial): number {
  const costs: Record<BagMaterial, number> = {
    polypropylene: 0.3, burlap: 0.5, cotton: 0.8, geotextile: 1.5, hemp: 1.0,
  };
  return costs[material];
}

export function bagMaterials(): BagMaterial[] {
  return ["polypropylene", "burlap", "cotton", "geotextile", "hemp"];
}
