export type PickleMethod = "vinegar" | "lacto_ferment" | "quick" | "relish" | "chutney";

export function vinegarMlPerKg(method: PickleMethod): number {
  const ml: Record<PickleMethod, number> = {
    vinegar: 500, lacto_ferment: 0, quick: 400, relish: 300, chutney: 250,
  };
  return ml[method];
}

export function sugarGPerKg(method: PickleMethod): number {
  const g: Record<PickleMethod, number> = {
    vinegar: 100, lacto_ferment: 0, quick: 150, relish: 200, chutney: 300,
  };
  return g[method];
}

export function saltGPerKg(method: PickleMethod): number {
  const g: Record<PickleMethod, number> = {
    vinegar: 30, lacto_ferment: 35, quick: 25, relish: 20, chutney: 15,
  };
  return g[method];
}

export function processingTempCelsius(method: PickleMethod): number {
  const temps: Record<PickleMethod, number> = {
    vinegar: 85, lacto_ferment: 20, quick: 90, relish: 95, chutney: 95,
  };
  return temps[method];
}

export function fermentationDays(method: PickleMethod): number {
  const days: Record<PickleMethod, number> = {
    vinegar: 0, lacto_ferment: 7, quick: 0, relish: 0, chutney: 0,
  };
  return days[method];
}

export function jarSizeMl(method: PickleMethod): number {
  const sizes: Record<PickleMethod, number> = {
    vinegar: 500, lacto_ferment: 1000, quick: 250, relish: 300, chutney: 350,
  };
  return sizes[method];
}

export function shelfLifeMonths(method: PickleMethod): number {
  const months: Record<PickleMethod, number> = {
    vinegar: 18, lacto_ferment: 6, quick: 3, relish: 12, chutney: 24,
  };
  return months[method];
}

export function headspaceMm(method: PickleMethod): number {
  const mm: Record<PickleMethod, number> = {
    vinegar: 12, lacto_ferment: 25, quick: 6, relish: 12, chutney: 12,
  };
  return mm[method];
}

export function costPerJar(method: PickleMethod): number {
  const costs: Record<PickleMethod, number> = {
    vinegar: 3, lacto_ferment: 2, quick: 2.5, relish: 4, chutney: 5,
  };
  return costs[method];
}

export function pickleMethods(): PickleMethod[] {
  return ["vinegar", "lacto_ferment", "quick", "relish", "chutney"];
}
