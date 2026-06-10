export type TypographicGrid = "baseline" | "modular" | "column" | "manuscript" | "hierarchical";

export function verticalRhythm(g: TypographicGrid): number {
  const m: Record<TypographicGrid, number> = {
    baseline: 10, modular: 8, column: 5, manuscript: 7, hierarchical: 6,
  };
  return m[g];
}

export function layoutFlexibility(g: TypographicGrid): number {
  const m: Record<TypographicGrid, number> = {
    baseline: 4, modular: 10, column: 7, manuscript: 3, hierarchical: 8,
  };
  return m[g];
}

export function complexityLevel(g: TypographicGrid): number {
  const m: Record<TypographicGrid, number> = {
    baseline: 3, modular: 9, column: 6, manuscript: 2, hierarchical: 7,
  };
  return m[g];
}

export function designConsistency(g: TypographicGrid): number {
  const m: Record<TypographicGrid, number> = {
    baseline: 9, modular: 10, column: 7, manuscript: 6, hierarchical: 5,
  };
  return m[g];
}

export function learningCurve(g: TypographicGrid): number {
  const m: Record<TypographicGrid, number> = {
    baseline: 4, modular: 9, column: 5, manuscript: 2, hierarchical: 7,
  };
  return m[g];
}

export function responsiveFriendly(g: TypographicGrid): boolean {
  const m: Record<TypographicGrid, boolean> = {
    baseline: true, modular: true, column: true, manuscript: false, hierarchical: true,
  };
  return m[g];
}

export function suitableForBeginners(g: TypographicGrid): boolean {
  const m: Record<TypographicGrid, boolean> = {
    baseline: true, modular: false, column: true, manuscript: true, hierarchical: false,
  };
  return m[g];
}

export function primaryApplication(g: TypographicGrid): string {
  const m: Record<TypographicGrid, string> = {
    baseline: "body_text_alignment", modular: "magazine_editorial",
    column: "newspaper_web", manuscript: "book_single_column",
    hierarchical: "poster_landing_page",
  };
  return m[g];
}

export function originEra(g: TypographicGrid): string {
  const m: Record<TypographicGrid, string> = {
    baseline: "movable_type", modular: "swiss_international",
    column: "renaissance_print", manuscript: "medieval_scribes",
    hierarchical: "digital_modern",
  };
  return m[g];
}

export function typographicGrids(): TypographicGrid[] {
  return ["baseline", "modular", "column", "manuscript", "hierarchical"];
}
