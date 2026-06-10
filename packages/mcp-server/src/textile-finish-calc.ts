export type TextileFinish = "mercerized" | "sanforized" | "calendered" | "napped" | "waterproof";

export function lustReLevel(f: TextileFinish): number {
  const m: Record<TextileFinish, number> = {
    mercerized: 10, sanforized: 3, calendered: 8, napped: 2, waterproof: 4,
  };
  return m[f];
}

export function shrinkageReduction(f: TextileFinish): number {
  const m: Record<TextileFinish, number> = {
    mercerized: 5, sanforized: 10, calendered: 3, napped: 2, waterproof: 4,
  };
  return m[f];
}

export function softness(f: TextileFinish): number {
  const m: Record<TextileFinish, number> = {
    mercerized: 7, sanforized: 6, calendered: 4, napped: 10, waterproof: 3,
  };
  return m[f];
}

export function durability(f: TextileFinish): number {
  const m: Record<TextileFinish, number> = {
    mercerized: 8, sanforized: 7, calendered: 6, napped: 4, waterproof: 9,
  };
  return m[f];
}

export function processCost(f: TextileFinish): number {
  const m: Record<TextileFinish, number> = {
    mercerized: 7, sanforized: 5, calendered: 4, napped: 3, waterproof: 8,
  };
  return m[f];
}

export function chemical(f: TextileFinish): boolean {
  const m: Record<TextileFinish, boolean> = {
    mercerized: true, sanforized: false, calendered: false, napped: false, waterproof: true,
  };
  return m[f];
}

export function mechanical(f: TextileFinish): boolean {
  const m: Record<TextileFinish, boolean> = {
    mercerized: false, sanforized: true, calendered: true, napped: true, waterproof: false,
  };
  return m[f];
}

export function bestFabric(f: TextileFinish): string {
  const m: Record<TextileFinish, string> = {
    mercerized: "cotton", sanforized: "denim", calendered: "chintz",
    napped: "flannel", waterproof: "outerwear",
  };
  return m[f];
}

export function permanence(f: TextileFinish): number {
  const m: Record<TextileFinish, number> = {
    mercerized: 10, sanforized: 9, calendered: 5, napped: 6, waterproof: 7,
  };
  return m[f];
}

export function textileFinishes(): TextileFinish[] {
  return ["mercerized", "sanforized", "calendered", "napped", "waterproof"];
}
