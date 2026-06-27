export type BrushHair = "kolinsky" | "hog" | "squirrel" | "synthetic_nylon" | "badger";

export function springiness(hair: BrushHair): number {
  const s: Record<BrushHair, number> = {
    kolinsky: 10, hog: 8, squirrel: 2, synthetic_nylon: 7, badger: 5,
  };
  return s[hair];
}

export function colorCapacity(hair: BrushHair): number {
  const c: Record<BrushHair, number> = {
    kolinsky: 10, hog: 6, squirrel: 9, synthetic_nylon: 5, badger: 7,
  };
  return c[hair];
}

export function pointRetention(hair: BrushHair): number {
  const p: Record<BrushHair, number> = {
    kolinsky: 10, hog: 4, squirrel: 3, synthetic_nylon: 7, badger: 5,
  };
  return p[hair];
}

export function durability(hair: BrushHair): number {
  const d: Record<BrushHair, number> = {
    kolinsky: 7, hog: 9, squirrel: 4, synthetic_nylon: 8, badger: 6,
  };
  return d[hair];
}

export function stiffness(hair: BrushHair): number {
  const s: Record<BrushHair, number> = {
    kolinsky: 6, hog: 10, squirrel: 1, synthetic_nylon: 7, badger: 4,
  };
  return s[hair];
}

export function veganFriendly(hair: BrushHair): boolean {
  const v: Record<BrushHair, boolean> = {
    kolinsky: false, hog: false, squirrel: false, synthetic_nylon: true, badger: false,
  };
  return v[hair];
}

export function bestMedium(hair: BrushHair): string {
  const b: Record<BrushHair, string> = {
    kolinsky: "watercolor", hog: "oil", squirrel: "wash",
    synthetic_nylon: "acrylic", badger: "blending",
  };
  return b[hair];
}

export function waterAbsorption(hair: BrushHair): number {
  const w: Record<BrushHair, number> = {
    kolinsky: 9, hog: 4, squirrel: 10, synthetic_nylon: 3, badger: 6,
  };
  return w[hair];
}

export function costPerBrush(hair: BrushHair): number {
  const c: Record<BrushHair, number> = {
    kolinsky: 80, hog: 10, squirrel: 30, synthetic_nylon: 8, badger: 25,
  };
  return c[hair];
}

export function brushHairs(): BrushHair[] {
  return ["kolinsky", "hog", "squirrel", "synthetic_nylon", "badger"];
}
