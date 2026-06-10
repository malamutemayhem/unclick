export type TypefaceClass = "serif" | "sans_serif" | "monospace" | "script" | "display";

export function readability(face: TypefaceClass): number {
  const m: Record<TypefaceClass, number> = {
    serif: 9, sans_serif: 8, monospace: 6, script: 4, display: 3,
  };
  return m[face];
}

export function screenLegibility(face: TypefaceClass): number {
  const m: Record<TypefaceClass, number> = {
    serif: 7, sans_serif: 10, monospace: 8, script: 3, display: 5,
  };
  return m[face];
}

export function formalityLevel(face: TypefaceClass): number {
  const m: Record<TypefaceClass, number> = {
    serif: 8, sans_serif: 5, monospace: 4, script: 9, display: 3,
  };
  return m[face];
}

export function versatility(face: TypefaceClass): number {
  const m: Record<TypefaceClass, number> = {
    serif: 9, sans_serif: 10, monospace: 5, script: 3, display: 4,
  };
  return m[face];
}

export function characterWidth(face: TypefaceClass): number {
  const m: Record<TypefaceClass, number> = {
    serif: 6, sans_serif: 5, monospace: 10, script: 7, display: 8,
  };
  return m[face];
}

export function fixedWidth(face: TypefaceClass): boolean {
  const m: Record<TypefaceClass, boolean> = {
    serif: false, sans_serif: false, monospace: true, script: false, display: false,
  };
  return m[face];
}

export function decorative(face: TypefaceClass): boolean {
  const m: Record<TypefaceClass, boolean> = {
    serif: false, sans_serif: false, monospace: false, script: true, display: true,
  };
  return m[face];
}

export function bestApplication(face: TypefaceClass): string {
  const m: Record<TypefaceClass, string> = {
    serif: "book_body", sans_serif: "ui_text", monospace: "code",
    script: "invitation", display: "headline",
  };
  return m[face];
}

export function exampleFont(face: TypefaceClass): string {
  const m: Record<TypefaceClass, string> = {
    serif: "times_new_roman", sans_serif: "helvetica", monospace: "courier",
    script: "brush_script", display: "impact",
  };
  return m[face];
}

export function typefaceClasses(): TypefaceClass[] {
  return ["serif", "sans_serif", "monospace", "script", "display"];
}
