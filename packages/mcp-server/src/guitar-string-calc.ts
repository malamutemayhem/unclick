export type GuitarString = "nylon" | "phosphor_bronze" | "nickel_wound" | "silk_steel" | "flatwound";

export function brightnessRating(str: GuitarString): number {
  const m: Record<GuitarString, number> = {
    nylon: 4, phosphor_bronze: 8, nickel_wound: 7, silk_steel: 5, flatwound: 3,
  };
  return m[str];
}

export function warmthRating(str: GuitarString): number {
  const m: Record<GuitarString, number> = {
    nylon: 8, phosphor_bronze: 5, nickel_wound: 6, silk_steel: 7, flatwound: 9,
  };
  return m[str];
}

export function tensionKg(str: GuitarString): number {
  const m: Record<GuitarString, number> = {
    nylon: 6, phosphor_bronze: 12, nickel_wound: 11, silk_steel: 8, flatwound: 10,
  };
  return m[str];
}

export function lifespanWeeks(str: GuitarString): number {
  const m: Record<GuitarString, number> = {
    nylon: 8, phosphor_bronze: 4, nickel_wound: 6, silk_steel: 5, flatwound: 12,
  };
  return m[str];
}

export function fingerNoise(str: GuitarString): number {
  const m: Record<GuitarString, number> = {
    nylon: 2, phosphor_bronze: 7, nickel_wound: 6, silk_steel: 4, flatwound: 1,
  };
  return m[str];
}

export function coated(str: GuitarString): boolean {
  const m: Record<GuitarString, boolean> = {
    nylon: false, phosphor_bronze: false, nickel_wound: false, silk_steel: false, flatwound: false,
  };
  return m[str];
}

export function magneticPickupCompatible(str: GuitarString): boolean {
  const m: Record<GuitarString, boolean> = {
    nylon: false, phosphor_bronze: false, nickel_wound: true, silk_steel: false, flatwound: true,
  };
  return m[str];
}

export function bestGenre(str: GuitarString): string {
  const m: Record<GuitarString, string> = {
    nylon: "classical", phosphor_bronze: "folk", nickel_wound: "rock",
    silk_steel: "fingerstyle", flatwound: "jazz",
  };
  return m[str];
}

export function costPerSet(str: GuitarString): number {
  const m: Record<GuitarString, number> = {
    nylon: 8, phosphor_bronze: 10, nickel_wound: 7, silk_steel: 12, flatwound: 18,
  };
  return m[str];
}

export function guitarStrings(): GuitarString[] {
  return ["nylon", "phosphor_bronze", "nickel_wound", "silk_steel", "flatwound"];
}
