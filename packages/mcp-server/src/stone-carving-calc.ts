export type StoneType = "limestone" | "sandstone" | "marble" | "granite" | "soapstone";

export function mohsHardness(type: StoneType): number {
  const h: Record<StoneType, number> = {
    limestone: 3, sandstone: 4, marble: 3.5, granite: 7, soapstone: 1,
  };
  return h[type];
}

export function carvingSpeedRating(type: StoneType): number {
  const s: Record<StoneType, number> = {
    limestone: 8, sandstone: 7, marble: 6, granite: 2, soapstone: 10,
  };
  return s[type];
}

export function detailResolution(type: StoneType): number {
  const d: Record<StoneType, number> = {
    limestone: 7, sandstone: 5, marble: 9, granite: 6, soapstone: 8,
  };
  return d[type];
}

export function polishCapability(type: StoneType): boolean {
  return type === "marble" || type === "granite" || type === "soapstone";
}

export function chiselTypeRecommended(type: StoneType): string {
  const c: Record<StoneType, string> = {
    limestone: "flat_chisel", sandstone: "point_chisel",
    marble: "tooth_chisel", granite: "carbide_point",
    soapstone: "rasp",
  };
  return c[type];
}

export function dustHazard(type: StoneType): number {
  const d: Record<StoneType, number> = {
    limestone: 6, sandstone: 9, marble: 5, granite: 8, soapstone: 3,
  };
  return d[type];
}

export function weatherDurability(type: StoneType): number {
  const w: Record<StoneType, number> = {
    limestone: 5, sandstone: 4, marble: 6, granite: 10, soapstone: 3,
  };
  return w[type];
}

export function weightKgPerM3(type: StoneType): number {
  const w: Record<StoneType, number> = {
    limestone: 2500, sandstone: 2300, marble: 2700, granite: 2650, soapstone: 2750,
  };
  return w[type];
}

export function costPerKg(type: StoneType): number {
  const c: Record<StoneType, number> = {
    limestone: 0.5, sandstone: 0.8, marble: 3, granite: 2, soapstone: 1.5,
  };
  return c[type];
}

export function stoneTypes(): StoneType[] {
  return ["limestone", "sandstone", "marble", "granite", "soapstone"];
}
