export type StarType = "red_dwarf" | "yellow_dwarf" | "blue_giant" | "red_giant" | "white_dwarf";

export function surfaceTemperatureK(s: StarType): number {
  const m: Record<StarType, number> = {
    red_dwarf: 3000, yellow_dwarf: 5800, blue_giant: 20000, red_giant: 4000, white_dwarf: 10000,
  };
  return m[s];
}

export function luminosity(s: StarType): number {
  const m: Record<StarType, number> = {
    red_dwarf: 1, yellow_dwarf: 5, blue_giant: 10, red_giant: 8, white_dwarf: 2,
  };
  return m[s];
}

export function lifespanBillionYears(s: StarType): number {
  const m: Record<StarType, number> = {
    red_dwarf: 100, yellow_dwarf: 10, blue_giant: 0.1, red_giant: 1, white_dwarf: 50,
  };
  return m[s];
}

export function massSolarUnits(s: StarType): number {
  const m: Record<StarType, number> = {
    red_dwarf: 0.3, yellow_dwarf: 1, blue_giant: 20, red_giant: 3, white_dwarf: 0.6,
  };
  return m[s];
}

export function habitableZoneLikelihood(s: StarType): number {
  const m: Record<StarType, number> = {
    red_dwarf: 5, yellow_dwarf: 10, blue_giant: 1, red_giant: 2, white_dwarf: 3,
  };
  return m[s];
}

export function mainSequence(s: StarType): boolean {
  const m: Record<StarType, boolean> = {
    red_dwarf: true, yellow_dwarf: true, blue_giant: false, red_giant: false, white_dwarf: false,
  };
  return m[s];
}

export function fusesHydrogen(s: StarType): boolean {
  const m: Record<StarType, boolean> = {
    red_dwarf: true, yellow_dwarf: true, blue_giant: true, red_giant: false, white_dwarf: false,
  };
  return m[s];
}

export function spectralClass(s: StarType): string {
  const m: Record<StarType, string> = {
    red_dwarf: "M", yellow_dwarf: "G", blue_giant: "O",
    red_giant: "K", white_dwarf: "DA",
  };
  return m[s];
}

export function exampleStar(s: StarType): string {
  const m: Record<StarType, string> = {
    red_dwarf: "proxima_centauri", yellow_dwarf: "sun",
    blue_giant: "rigel", red_giant: "betelgeuse",
    white_dwarf: "sirius_b",
  };
  return m[s];
}

export function starTypes(): StarType[] {
  return ["red_dwarf", "yellow_dwarf", "blue_giant", "red_giant", "white_dwarf"];
}
