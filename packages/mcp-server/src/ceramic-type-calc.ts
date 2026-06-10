export type CeramicType = "alumina" | "zirconia" | "silicon_carbide" | "porcelain" | "steatite";

export function hardnessMohs(ceramic: CeramicType): number {
  const m: Record<CeramicType, number> = {
    alumina: 9, zirconia: 8, silicon_carbide: 9.5, porcelain: 7, steatite: 5.5,
  };
  return m[ceramic];
}

export function maxTempCelsius(ceramic: CeramicType): number {
  const m: Record<CeramicType, number> = {
    alumina: 1750, zirconia: 2400, silicon_carbide: 1600, porcelain: 1260, steatite: 1000,
  };
  return m[ceramic];
}

export function fractureToughness(ceramic: CeramicType): number {
  const m: Record<CeramicType, number> = {
    alumina: 4, zirconia: 10, silicon_carbide: 3, porcelain: 2, steatite: 2,
  };
  return m[ceramic];
}

export function thermalConductivity(ceramic: CeramicType): number {
  const m: Record<CeramicType, number> = {
    alumina: 30, zirconia: 2, silicon_carbide: 120, porcelain: 1.5, steatite: 3,
  };
  return m[ceramic];
}

export function electricalInsulation(ceramic: CeramicType): number {
  const m: Record<CeramicType, number> = {
    alumina: 9, zirconia: 7, silicon_carbide: 3, porcelain: 8, steatite: 10,
  };
  return m[ceramic];
}

export function biocompatible(ceramic: CeramicType): boolean {
  const m: Record<CeramicType, boolean> = {
    alumina: true, zirconia: true, silicon_carbide: false, porcelain: true, steatite: false,
  };
  return m[ceramic];
}

export function transparent(ceramic: CeramicType): boolean {
  const m: Record<CeramicType, boolean> = {
    alumina: false, zirconia: true, silicon_carbide: false, porcelain: false, steatite: false,
  };
  return m[ceramic];
}

export function bestApplication(ceramic: CeramicType): string {
  const m: Record<CeramicType, string> = {
    alumina: "cutting_tools", zirconia: "dental_implants", silicon_carbide: "abrasives",
    porcelain: "dinnerware", steatite: "electrical_insulators",
  };
  return m[ceramic];
}

export function costPerKg(ceramic: CeramicType): number {
  const m: Record<CeramicType, number> = {
    alumina: 25, zirconia: 80, silicon_carbide: 40, porcelain: 5, steatite: 10,
  };
  return m[ceramic];
}

export function ceramicTypes(): CeramicType[] {
  return ["alumina", "zirconia", "silicon_carbide", "porcelain", "steatite"];
}
