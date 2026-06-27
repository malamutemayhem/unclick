export type ResistMethod = "wax_batik" | "tie_dye" | "shibori" | "paste_resist" | "stencil";

export function resistRemovalTemp(method: ResistMethod): number {
  const t: Record<ResistMethod, number> = {
    wax_batik: 100, tie_dye: 0, shibori: 0, paste_resist: 40, stencil: 0,
  };
  return t[method];
}

export function layersTypical(method: ResistMethod): number {
  const l: Record<ResistMethod, number> = {
    wax_batik: 5, tie_dye: 3, shibori: 4, paste_resist: 2, stencil: 1,
  };
  return l[method];
}

export function patternComplexity(method: ResistMethod): number {
  const c: Record<ResistMethod, number> = {
    wax_batik: 9, tie_dye: 4, shibori: 7, paste_resist: 8, stencil: 6,
  };
  return c[method];
}

export function repeatability(method: ResistMethod): number {
  const r: Record<ResistMethod, number> = {
    wax_batik: 5, tie_dye: 2, shibori: 6, paste_resist: 7, stencil: 9,
  };
  return r[method];
}

export function timePerPieceHours(method: ResistMethod): number {
  const t: Record<ResistMethod, number> = {
    wax_batik: 8, tie_dye: 2, shibori: 4, paste_resist: 6, stencil: 3,
  };
  return t[method];
}

export function heatRequired(method: ResistMethod): boolean {
  return method === "wax_batik";
}

export function toolsNeeded(method: ResistMethod): string {
  const t: Record<ResistMethod, string> = {
    wax_batik: "tjanting_tool", tie_dye: "rubber_bands",
    shibori: "thread_and_pole", paste_resist: "squeegee",
    stencil: "stencil_sheet",
  };
  return t[method];
}

export function bestFabric(method: ResistMethod): string {
  const f: Record<ResistMethod, string> = {
    wax_batik: "cotton", tie_dye: "cotton", shibori: "silk",
    paste_resist: "cotton", stencil: "linen",
  };
  return f[method];
}

export function costPerPiece(method: ResistMethod): number {
  const c: Record<ResistMethod, number> = {
    wax_batik: 25, tie_dye: 5, shibori: 15, paste_resist: 20, stencil: 10,
  };
  return c[method];
}

export function resistMethods(): ResistMethod[] {
  return ["wax_batik", "tie_dye", "shibori", "paste_resist", "stencil"];
}
