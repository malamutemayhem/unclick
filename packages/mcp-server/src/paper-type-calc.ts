export type PaperType = "bond" | "vellum" | "glossy" | "newsprint" | "cardstock";

export function weightGsm(paper: PaperType): number {
  const m: Record<PaperType, number> = {
    bond: 90, vellum: 120, glossy: 150, newsprint: 50, cardstock: 300,
  };
  return m[paper];
}

export function opacity(paper: PaperType): number {
  const m: Record<PaperType, number> = {
    bond: 7, vellum: 4, glossy: 8, newsprint: 5, cardstock: 10,
  };
  return m[paper];
}

export function inkAbsorption(paper: PaperType): number {
  const m: Record<PaperType, number> = {
    bond: 7, vellum: 5, glossy: 3, newsprint: 10, cardstock: 6,
  };
  return m[paper];
}

export function smoothness(paper: PaperType): number {
  const m: Record<PaperType, number> = {
    bond: 6, vellum: 8, glossy: 10, newsprint: 3, cardstock: 7,
  };
  return m[paper];
}

export function durability(paper: PaperType): number {
  const m: Record<PaperType, number> = {
    bond: 7, vellum: 8, glossy: 6, newsprint: 2, cardstock: 9,
  };
  return m[paper];
}

export function translucent(paper: PaperType): boolean {
  const m: Record<PaperType, boolean> = {
    bond: false, vellum: true, glossy: false, newsprint: false, cardstock: false,
  };
  return m[paper];
}

export function coated(paper: PaperType): boolean {
  const m: Record<PaperType, boolean> = {
    bond: false, vellum: false, glossy: true, newsprint: false, cardstock: false,
  };
  return m[paper];
}

export function bestApplication(paper: PaperType): string {
  const m: Record<PaperType, string> = {
    bond: "letterhead", vellum: "tracing", glossy: "photography",
    newsprint: "newspaper", cardstock: "business_cards",
  };
  return m[paper];
}

export function costPerSheet(paper: PaperType): number {
  const m: Record<PaperType, number> = {
    bond: 3, vellum: 6, glossy: 5, newsprint: 1, cardstock: 4,
  };
  return m[paper];
}

export function paperTypes(): PaperType[] {
  return ["bond", "vellum", "glossy", "newsprint", "cardstock"];
}
