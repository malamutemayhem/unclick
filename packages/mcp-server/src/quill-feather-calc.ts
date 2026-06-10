export type QuillFeather = "goose" | "swan" | "turkey" | "crow" | "eagle";

export function stiffness(feather: QuillFeather): number {
  const m: Record<QuillFeather, number> = {
    goose: 7, swan: 8, turkey: 6, crow: 4, eagle: 9,
  };
  return m[feather];
}

export function barrelDiameter(feather: QuillFeather): number {
  const m: Record<QuillFeather, number> = {
    goose: 7, swan: 9, turkey: 8, crow: 3, eagle: 8,
  };
  return m[feather];
}

export function inkCapacity(feather: QuillFeather): number {
  const m: Record<QuillFeather, number> = {
    goose: 7, swan: 9, turkey: 8, crow: 4, eagle: 6,
  };
  return m[feather];
}

export function lineVariation(feather: QuillFeather): number {
  const m: Record<QuillFeather, number> = {
    goose: 7, swan: 8, turkey: 6, crow: 9, eagle: 5,
  };
  return m[feather];
}

export function durabilityHours(feather: QuillFeather): number {
  const m: Record<QuillFeather, number> = {
    goose: 4, swan: 6, turkey: 3, crow: 2, eagle: 5,
  };
  return m[feather];
}

export function readilyAvailable(feather: QuillFeather): boolean {
  const m: Record<QuillFeather, boolean> = {
    goose: true, swan: false, turkey: true, crow: true, eagle: false,
  };
  return m[feather];
}

export function leftHandSuitable(feather: QuillFeather): boolean {
  const m: Record<QuillFeather, boolean> = {
    goose: true, swan: true, turkey: true, crow: false, eagle: false,
  };
  return m[feather];
}

export function bestScript(feather: QuillFeather): string {
  const m: Record<QuillFeather, string> = {
    goose: "copperplate", swan: "italic", turkey: "roundhand",
    crow: "fine_detail", eagle: "bold_strokes",
  };
  return m[feather];
}

export function costPerQuill(feather: QuillFeather): number {
  const m: Record<QuillFeather, number> = {
    goose: 2, swan: 8, turkey: 1, crow: 3, eagle: 15,
  };
  return m[feather];
}

export function quillFeathers(): QuillFeather[] {
  return ["goose", "swan", "turkey", "crow", "eagle"];
}
