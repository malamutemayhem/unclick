export type StarClass = "red_dwarf" | "yellow_dwarf" | "blue_giant" | "red_giant" | "white_dwarf";

export function surfaceTempK(star: StarClass): number {
  const m: Record<StarClass, number> = {
    red_dwarf: 3000, yellow_dwarf: 5800, blue_giant: 20000, red_giant: 4000, white_dwarf: 15000,
  };
  return m[star];
}

export function luminositySolar(star: StarClass): number {
  const m: Record<StarClass, number> = {
    red_dwarf: 0.01, yellow_dwarf: 1, blue_giant: 10000, red_giant: 100, white_dwarf: 0.001,
  };
  return m[star];
}

export function massSolar(star: StarClass): number {
  const m: Record<StarClass, number> = {
    red_dwarf: 0.3, yellow_dwarf: 1, blue_giant: 20, red_giant: 1.5, white_dwarf: 0.6,
  };
  return m[star];
}

export function lifespanBillionYears(star: StarClass): number {
  const m: Record<StarClass, number> = {
    red_dwarf: 100, yellow_dwarf: 10, blue_giant: 0.01, red_giant: 0.5, white_dwarf: 50,
  };
  return m[star];
}

export function radiusSolar(star: StarClass): number {
  const m: Record<StarClass, number> = {
    red_dwarf: 0.3, yellow_dwarf: 1, blue_giant: 10, red_giant: 50, white_dwarf: 0.01,
  };
  return m[star];
}

export function mainSequence(star: StarClass): boolean {
  const m: Record<StarClass, boolean> = {
    red_dwarf: true, yellow_dwarf: true, blue_giant: true, red_giant: false, white_dwarf: false,
  };
  return m[star];
}

export function habZonePossible(star: StarClass): boolean {
  const m: Record<StarClass, boolean> = {
    red_dwarf: true, yellow_dwarf: true, blue_giant: false, red_giant: false, white_dwarf: false,
  };
  return m[star];
}

export function exampleStar(star: StarClass): string {
  const m: Record<StarClass, string> = {
    red_dwarf: "proxima_centauri", yellow_dwarf: "sun", blue_giant: "rigel",
    red_giant: "betelgeuse", white_dwarf: "sirius_b",
  };
  return m[star];
}

export function abundanceInGalaxy(star: StarClass): number {
  const m: Record<StarClass, number> = {
    red_dwarf: 10, yellow_dwarf: 6, blue_giant: 1, red_giant: 3, white_dwarf: 5,
  };
  return m[star];
}

export function starClasses(): StarClass[] {
  return ["red_dwarf", "yellow_dwarf", "blue_giant", "red_giant", "white_dwarf"];
}
