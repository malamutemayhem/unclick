export type RaptorSpecies = "peregrine" | "gyrfalcon" | "red_tail" | "harris" | "kestrel" | "merlin";

export function flyingWeight(captiveWeightG: number): number {
  return parseFloat((captiveWeightG * 0.92).toFixed(0));
}

export function dailyFoodG(bodyWeightG: number): number {
  return parseFloat((bodyWeightG * 0.06).toFixed(0));
}

export function jessLength(tarsusLengthMm: number): number {
  return parseFloat((tarsusLengthMm * 2.5).toFixed(0));
}

export function leashLength(jessLengthMm: number): number {
  return parseFloat((jessLengthMm * 3).toFixed(0));
}

export function creanceLength(species: RaptorSpecies): number {
  const meters: Record<RaptorSpecies, number> = {
    peregrine: 30, gyrfalcon: 40, red_tail: 25, harris: 20, kestrel: 15, merlin: 20,
  };
  return meters[species];
}

export function moultDuration(species: RaptorSpecies): number {
  const weeks: Record<RaptorSpecies, number> = {
    peregrine: 16, gyrfalcon: 18, red_tail: 14, harris: 12, kestrel: 10, merlin: 12,
  };
  return weeks[species];
}

export function weatheringTime(tempC: number): number {
  if (tempC < 5) return 30;
  if (tempC > 30) return 60;
  return parseFloat((30 + (tempC - 5) * 1.2).toFixed(0));
}

export function strikingSpeed(species: RaptorSpecies): number {
  const kmh: Record<RaptorSpecies, number> = {
    peregrine: 389, gyrfalcon: 209, red_tail: 190, harris: 150, kestrel: 60, merlin: 80,
  };
  return kmh[species];
}

export function huntingRange(species: RaptorSpecies): number {
  const km: Record<RaptorSpecies, number> = {
    peregrine: 5, gyrfalcon: 8, red_tail: 2, harris: 1.5, kestrel: 0.5, merlin: 1,
  };
  return km[species];
}

export function telemetryRange(transmitterMw: number): number {
  return parseFloat((Math.sqrt(transmitterMw) * 2).toFixed(1));
}

export function raptorSpecies(): RaptorSpecies[] {
  return ["peregrine", "gyrfalcon", "red_tail", "harris", "kestrel", "merlin"];
}
