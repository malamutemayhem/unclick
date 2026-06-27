export type IglooSize = "emergency" | "single_family" | "double" | "qaggiq" | "hunting_camp";

export function diameterMeters(size: IglooSize): number {
  const d: Record<IglooSize, number> = {
    emergency: 2, single_family: 3.5, double: 5, qaggiq: 9, hunting_camp: 2.5,
  };
  return d[size];
}

export function blocksRequired(size: IglooSize): number {
  const b: Record<IglooSize, number> = {
    emergency: 20, single_family: 45, double: 80, qaggiq: 150, hunting_camp: 30,
  };
  return b[size];
}

export function buildTimeHours(size: IglooSize): number {
  const h: Record<IglooSize, number> = {
    emergency: 1, single_family: 3, double: 6, qaggiq: 12, hunting_camp: 2,
  };
  return h[size];
}

export function interiorTempCelsius(size: IglooSize): number {
  const t: Record<IglooSize, number> = {
    emergency: -5, single_family: 0, double: 2, qaggiq: 5, hunting_camp: -3,
  };
  return t[size];
}

export function occupancyPersons(size: IglooSize): number {
  const o: Record<IglooSize, number> = {
    emergency: 2, single_family: 5, double: 10, qaggiq: 40, hunting_camp: 3,
  };
  return o[size];
}

export function ventilationHoles(size: IglooSize): number {
  const v: Record<IglooSize, number> = {
    emergency: 1, single_family: 1, double: 2, qaggiq: 3, hunting_camp: 1,
  };
  return v[size];
}

export function hasEntryTunnel(size: IglooSize): boolean {
  return size !== "emergency";
}

export function snowPackDensity(size: IglooSize): number {
  const d: Record<IglooSize, number> = {
    emergency: 300, single_family: 350, double: 350, qaggiq: 400, hunting_camp: 320,
  };
  return d[size];
}

export function lifespanWeeks(size: IglooSize): number {
  const l: Record<IglooSize, number> = {
    emergency: 1, single_family: 12, double: 16, qaggiq: 8, hunting_camp: 4,
  };
  return l[size];
}

export function iglooSizes(): IglooSize[] {
  return ["emergency", "single_family", "double", "qaggiq", "hunting_camp"];
}
