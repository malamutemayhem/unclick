export type StormType = "thunderstorm" | "hurricane" | "tornado" | "blizzard" | "derecho";

export function windSpeedKmh(storm: StormType): number {
  const m: Record<StormType, number> = {
    thunderstorm: 100, hurricane: 250, tornado: 500, blizzard: 70, derecho: 160,
  };
  return m[storm];
}

export function durationHours(storm: StormType): number {
  const m: Record<StormType, number> = {
    thunderstorm: 2, hurricane: 168, tornado: 0.5, blizzard: 24, derecho: 8,
  };
  return m[storm];
}

export function affectedAreaKm2(storm: StormType): number {
  const m: Record<StormType, number> = {
    thunderstorm: 50, hurricane: 500000, tornado: 5, blizzard: 100000, derecho: 50000,
  };
  return m[storm];
}

export function destructivePower(storm: StormType): number {
  const m: Record<StormType, number> = {
    thunderstorm: 4, hurricane: 10, tornado: 9, blizzard: 5, derecho: 7,
  };
  return m[storm];
}

export function predictability(storm: StormType): number {
  const m: Record<StormType, number> = {
    thunderstorm: 6, hurricane: 8, tornado: 2, blizzard: 7, derecho: 3,
  };
  return m[storm];
}

export function producesLightning(storm: StormType): boolean {
  const m: Record<StormType, boolean> = {
    thunderstorm: true, hurricane: true, tornado: true, blizzard: false, derecho: true,
  };
  return m[storm];
}

export function rotational(storm: StormType): boolean {
  const m: Record<StormType, boolean> = {
    thunderstorm: false, hurricane: true, tornado: true, blizzard: false, derecho: false,
  };
  return m[storm];
}

export function peakSeason(storm: StormType): string {
  const m: Record<StormType, string> = {
    thunderstorm: "summer", hurricane: "late_summer", tornado: "spring",
    blizzard: "winter", derecho: "summer",
  };
  return m[storm];
}

export function warningLeadMinutes(storm: StormType): number {
  const m: Record<StormType, number> = {
    thunderstorm: 60, hurricane: 4320, tornado: 13, blizzard: 1440, derecho: 30,
  };
  return m[storm];
}

export function stormTypes(): StormType[] {
  return ["thunderstorm", "hurricane", "tornado", "blizzard", "derecho"];
}
