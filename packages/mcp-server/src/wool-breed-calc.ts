export type WoolBreed = "merino" | "corriedale" | "lincoln" | "shetland" | "alpaca";

export function fiberDiameterMicrons(breed: WoolBreed): number {
  const f: Record<WoolBreed, number> = {
    merino: 18, corriedale: 26, lincoln: 38, shetland: 23, alpaca: 22,
  };
  return f[breed];
}

export function stapleLengthCm(breed: WoolBreed): number {
  const s: Record<WoolBreed, number> = {
    merino: 8, corriedale: 12, lincoln: 20, shetland: 9, alpaca: 15,
  };
  return s[breed];
}

export function softnessRating(breed: WoolBreed): number {
  const r: Record<WoolBreed, number> = {
    merino: 10, corriedale: 7, lincoln: 3, shetland: 8, alpaca: 9,
  };
  return r[breed];
}

export function durability(breed: WoolBreed): number {
  const d: Record<WoolBreed, number> = {
    merino: 5, corriedale: 7, lincoln: 9, shetland: 6, alpaca: 4,
  };
  return d[breed];
}

export function luster(breed: WoolBreed): number {
  const l: Record<WoolBreed, number> = {
    merino: 4, corriedale: 5, lincoln: 10, shetland: 6, alpaca: 8,
  };
  return l[breed];
}

export function feltability(breed: WoolBreed): number {
  const f: Record<WoolBreed, number> = {
    merino: 10, corriedale: 7, lincoln: 3, shetland: 8, alpaca: 2,
  };
  return f[breed];
}

export function lanolin(breed: WoolBreed): boolean {
  const l: Record<WoolBreed, boolean> = {
    merino: true, corriedale: true, lincoln: true, shetland: true, alpaca: false,
  };
  return l[breed];
}

export function bestUse(breed: WoolBreed): string {
  const b: Record<WoolBreed, string> = {
    merino: "next_to_skin", corriedale: "outerwear", lincoln: "rugs",
    shetland: "lace", alpaca: "scarves",
  };
  return b[breed];
}

export function costPerKg(breed: WoolBreed): number {
  const c: Record<WoolBreed, number> = {
    merino: 35, corriedale: 20, lincoln: 15, shetland: 40, alpaca: 50,
  };
  return c[breed];
}

export function woolBreeds(): WoolBreed[] {
  return ["merino", "corriedale", "lincoln", "shetland", "alpaca"];
}
