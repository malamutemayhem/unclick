export type FontCategory = "serif" | "sans_serif" | "monospace" | "display" | "handwriting";

export function readabilityBody(f: FontCategory): number {
  const m: Record<FontCategory, number> = {
    serif: 9, sans_serif: 8, monospace: 5, display: 3, handwriting: 4,
  };
  return m[f];
}

export function screenOptimization(f: FontCategory): number {
  const m: Record<FontCategory, number> = {
    serif: 6, sans_serif: 9, monospace: 8, display: 5, handwriting: 3,
  };
  return m[f];
}

export function printQuality(f: FontCategory): number {
  const m: Record<FontCategory, number> = {
    serif: 10, sans_serif: 7, monospace: 6, display: 8, handwriting: 5,
  };
  return m[f];
}

export function versatility(f: FontCategory): number {
  const m: Record<FontCategory, number> = {
    serif: 8, sans_serif: 9, monospace: 4, display: 3, handwriting: 3,
  };
  return m[f];
}

export function characterWidth(f: FontCategory): number {
  const m: Record<FontCategory, number> = {
    serif: 6, sans_serif: 5, monospace: 10, display: 7, handwriting: 6,
  };
  return m[f];
}

export function hasSerifs(f: FontCategory): boolean {
  const m: Record<FontCategory, boolean> = {
    serif: true, sans_serif: false, monospace: false, display: false, handwriting: false,
  };
  return m[f];
}

export function fixedWidth(f: FontCategory): boolean {
  const m: Record<FontCategory, boolean> = {
    serif: false, sans_serif: false, monospace: true, display: false, handwriting: false,
  };
  return m[f];
}

export function bestUseCase(f: FontCategory): string {
  const m: Record<FontCategory, string> = {
    serif: "books_newspapers", sans_serif: "web_ui",
    monospace: "code_terminals", display: "headlines_logos",
    handwriting: "invitations_greeting",
  };
  return m[f];
}

export function exampleFont(f: FontCategory): string {
  const m: Record<FontCategory, string> = {
    serif: "times_new_roman", sans_serif: "helvetica_arial",
    monospace: "courier_consolas", display: "impact_lobster",
    handwriting: "comic_sans_pacifico",
  };
  return m[f];
}

export function fontCategories(): FontCategory[] {
  return ["serif", "sans_serif", "monospace", "display", "handwriting"];
}
