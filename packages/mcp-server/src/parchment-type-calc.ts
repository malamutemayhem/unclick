export type ParchmentType = "vellum" | "goatskin" | "sheepskin" | "papyrus" | "rice_paper";

export function durabilityYears(parchment: ParchmentType): number {
  const m: Record<ParchmentType, number> = {
    vellum: 1000, goatskin: 800, sheepskin: 500, papyrus: 300, rice_paper: 200,
  };
  return m[parchment];
}

export function smoothness(parchment: ParchmentType): number {
  const m: Record<ParchmentType, number> = {
    vellum: 9, goatskin: 7, sheepskin: 6, papyrus: 4, rice_paper: 8,
  };
  return m[parchment];
}

export function inkAbsorption(parchment: ParchmentType): number {
  const m: Record<ParchmentType, number> = {
    vellum: 5, goatskin: 6, sheepskin: 7, papyrus: 8, rice_paper: 9,
  };
  return m[parchment];
}

export function erasability(parchment: ParchmentType): number {
  const m: Record<ParchmentType, number> = {
    vellum: 8, goatskin: 6, sheepskin: 5, papyrus: 2, rice_paper: 1,
  };
  return m[parchment];
}

export function foldability(parchment: ParchmentType): number {
  const m: Record<ParchmentType, number> = {
    vellum: 7, goatskin: 8, sheepskin: 6, papyrus: 3, rice_paper: 9,
  };
  return m[parchment];
}

export function animalDerived(parchment: ParchmentType): boolean {
  const m: Record<ParchmentType, boolean> = {
    vellum: true, goatskin: true, sheepskin: true, papyrus: false, rice_paper: false,
  };
  return m[parchment];
}

export function transparencyPossible(parchment: ParchmentType): boolean {
  const m: Record<ParchmentType, boolean> = {
    vellum: true, goatskin: false, sheepskin: false, papyrus: false, rice_paper: true,
  };
  return m[parchment];
}

export function bestScript(parchment: ParchmentType): string {
  const m: Record<ParchmentType, string> = {
    vellum: "illuminated_manuscript", goatskin: "legal_document",
    sheepskin: "diploma", papyrus: "hieroglyphics", rice_paper: "east_asian_calligraphy",
  };
  return m[parchment];
}

export function costPerSheet(parchment: ParchmentType): number {
  const m: Record<ParchmentType, number> = {
    vellum: 50, goatskin: 30, sheepskin: 20, papyrus: 10, rice_paper: 5,
  };
  return m[parchment];
}

export function parchmentTypes(): ParchmentType[] {
  return ["vellum", "goatskin", "sheepskin", "papyrus", "rice_paper"];
}
