export type SundialType = "horizontal" | "vertical" | "equatorial" | "analemmatic" | "portable";

export function accuracyMinutes(dial: SundialType): number {
  const m: Record<SundialType, number> = {
    horizontal: 5, vertical: 8, equatorial: 3, analemmatic: 10, portable: 15,
  };
  return m[dial];
}

export function installDifficulty(dial: SundialType): number {
  const m: Record<SundialType, number> = {
    horizontal: 5, vertical: 7, equatorial: 6, analemmatic: 8, portable: 2,
  };
  return m[dial];
}

export function latitudeSensitivity(dial: SundialType): number {
  const m: Record<SundialType, number> = {
    horizontal: 8, vertical: 7, equatorial: 3, analemmatic: 9, portable: 5,
  };
  return m[dial];
}

export function readability(dial: SundialType): number {
  const m: Record<SundialType, number> = {
    horizontal: 8, vertical: 6, equatorial: 7, analemmatic: 5, portable: 4,
  };
  return m[dial];
}

export function decorativeValue(dial: SundialType): number {
  const m: Record<SundialType, number> = {
    horizontal: 8, vertical: 9, equatorial: 6, analemmatic: 7, portable: 5,
  };
  return m[dial];
}

export function wallMounted(dial: SundialType): boolean {
  const m: Record<SundialType, boolean> = {
    horizontal: false, vertical: true, equatorial: false, analemmatic: false, portable: false,
  };
  return m[dial];
}

export function humanGnomon(dial: SundialType): boolean {
  const m: Record<SundialType, boolean> = {
    horizontal: false, vertical: false, equatorial: false, analemmatic: true, portable: false,
  };
  return m[dial];
}

export function bestLocation(dial: SundialType): string {
  const m: Record<SundialType, string> = {
    horizontal: "garden_pedestal", vertical: "south_facing_wall", equatorial: "observatory",
    analemmatic: "public_park", portable: "field_navigation",
  };
  return m[dial];
}

export function buildCost(dial: SundialType): number {
  const m: Record<SundialType, number> = {
    horizontal: 200, vertical: 300, equatorial: 500, analemmatic: 150, portable: 50,
  };
  return m[dial];
}

export function sundialTypes(): SundialType[] {
  return ["horizontal", "vertical", "equatorial", "analemmatic", "portable"];
}
