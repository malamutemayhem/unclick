export type SaggarMaterial = "fireclay" | "cordierite" | "mullite" | "silicon_carbide" | "castable";

export function wallThicknessMm(diameterCm: number): number {
  return Math.round(diameterCm * 0.8 + 5);
}

export function maxFiringTempCelsius(material: SaggarMaterial): number {
  const temps: Record<SaggarMaterial, number> = {
    fireclay: 1200, cordierite: 1300, mullite: 1400, silicon_carbide: 1500, castable: 1100,
  };
  return temps[material];
}

export function thermalShockResistance(material: SaggarMaterial): number {
  const ratings: Record<SaggarMaterial, number> = {
    fireclay: 2, cordierite: 5, mullite: 3, silicon_carbide: 4, castable: 2,
  };
  return ratings[material];
}

export function lifespanFirings(material: SaggarMaterial): number {
  const firings: Record<SaggarMaterial, number> = {
    fireclay: 30, cordierite: 100, mullite: 80, silicon_carbide: 200, castable: 20,
  };
  return firings[material];
}

export function internalVolumeLiters(diameterCm: number, heightCm: number): number {
  const radiusCm = diameterCm / 2;
  return parseFloat((Math.PI * radiusCm * radiusCm * heightCm / 1000).toFixed(1));
}

export function weightKg(material: SaggarMaterial, volumeLiters: number): number {
  const density: Record<SaggarMaterial, number> = {
    fireclay: 2.0, cordierite: 1.8, mullite: 2.2, silicon_carbide: 2.5, castable: 2.1,
  };
  return parseFloat((volumeLiters * density[material]).toFixed(1));
}

export function combustibleLoadG(volumeLiters: number): number {
  return Math.round(volumeLiters * 50);
}

export function lidRequired(): boolean {
  return true;
}

export function costEstimate(material: SaggarMaterial): number {
  const costs: Record<SaggarMaterial, number> = {
    fireclay: 25, cordierite: 60, mullite: 45, silicon_carbide: 80, castable: 15,
  };
  return costs[material];
}

export function saggarMaterials(): SaggarMaterial[] {
  return ["fireclay", "cordierite", "mullite", "silicon_carbide", "castable"];
}
