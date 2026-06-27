export type PaintMedium = "oil" | "acrylic" | "watercolor" | "gouache" | "encaustic";

export function dryingTimeHours(p: PaintMedium): number {
  const m: Record<PaintMedium, number> = {
    oil: 72, acrylic: 1, watercolor: 0.5, gouache: 0.5, encaustic: 0.1,
  };
  return m[p];
}

export function colorVibrancy(p: PaintMedium): number {
  const m: Record<PaintMedium, number> = {
    oil: 10, acrylic: 8, watercolor: 6, gouache: 7, encaustic: 9,
  };
  return m[p];
}

export function blendability(p: PaintMedium): number {
  const m: Record<PaintMedium, number> = {
    oil: 10, acrylic: 6, watercolor: 8, gouache: 5, encaustic: 7,
  };
  return m[p];
}

export function archivalQuality(p: PaintMedium): number {
  const m: Record<PaintMedium, number> = {
    oil: 10, acrylic: 8, watercolor: 6, gouache: 5, encaustic: 10,
  };
  return m[p];
}

export function toxicity(p: PaintMedium): number {
  const m: Record<PaintMedium, number> = {
    oil: 7, acrylic: 2, watercolor: 1, gouache: 1, encaustic: 5,
  };
  return m[p];
}

export function waterSoluble(p: PaintMedium): boolean {
  const m: Record<PaintMedium, boolean> = {
    oil: false, acrylic: true, watercolor: true, gouache: true, encaustic: false,
  };
  return m[p];
}

export function requiresHeat(p: PaintMedium): boolean {
  const m: Record<PaintMedium, boolean> = {
    oil: false, acrylic: false, watercolor: false, gouache: false, encaustic: true,
  };
  return m[p];
}

export function bestSurface(p: PaintMedium): string {
  const m: Record<PaintMedium, string> = {
    oil: "canvas", acrylic: "canvas", watercolor: "paper",
    gouache: "illustration_board", encaustic: "wood_panel",
  };
  return m[p];
}

export function famousArtist(p: PaintMedium): string {
  const m: Record<PaintMedium, string> = {
    oil: "rembrandt", acrylic: "warhol", watercolor: "turner",
    gouache: "matisse", encaustic: "jasper_johns",
  };
  return m[p];
}

export function paintMediums(): PaintMedium[] {
  return ["oil", "acrylic", "watercolor", "gouache", "encaustic"];
}
