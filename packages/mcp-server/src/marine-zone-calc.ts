export type MarineZone = "intertidal" | "neritic" | "oceanic" | "benthic" | "pelagic";

export function areaKm2(z: MarineZone): number {
  const m: Record<MarineZone, number> = {
    intertidal: 1, neritic: 5, oceanic: 10, benthic: 9, pelagic: 10,
  };
  return m[z];
}

export function nutrientAvailability(z: MarineZone): number {
  const m: Record<MarineZone, number> = {
    intertidal: 9, neritic: 8, oceanic: 3, benthic: 5, pelagic: 4,
  };
  return m[z];
}

export function speciesDiversity(z: MarineZone): number {
  const m: Record<MarineZone, number> = {
    intertidal: 7, neritic: 10, oceanic: 5, benthic: 6, pelagic: 8,
  };
  return m[z];
}

export function humanImpact(z: MarineZone): number {
  const m: Record<MarineZone, number> = {
    intertidal: 10, neritic: 8, oceanic: 3, benthic: 4, pelagic: 5,
  };
  return m[z];
}

export function researchAccessibility(z: MarineZone): number {
  const m: Record<MarineZone, number> = {
    intertidal: 10, neritic: 8, oceanic: 4, benthic: 2, pelagic: 5,
  };
  return m[z];
}

export function exposedAtLowTide(z: MarineZone): boolean {
  const m: Record<MarineZone, boolean> = {
    intertidal: true, neritic: false, oceanic: false, benthic: false, pelagic: false,
  };
  return m[z];
}

export function bottomDwelling(z: MarineZone): boolean {
  const m: Record<MarineZone, boolean> = {
    intertidal: false, neritic: false, oceanic: false, benthic: true, pelagic: false,
  };
  return m[z];
}

export function dominantProducer(z: MarineZone): string {
  const m: Record<MarineZone, string> = {
    intertidal: "algae_seaweed", neritic: "phytoplankton",
    oceanic: "cyanobacteria", benthic: "chemosynthetic_bacteria",
    pelagic: "diatoms",
  };
  return m[z];
}

export function keyChallenge(z: MarineZone): string {
  const m: Record<MarineZone, string> = {
    intertidal: "desiccation_wave_force", neritic: "fishing_pressure",
    oceanic: "nutrient_scarcity", benthic: "extreme_pressure",
    pelagic: "predation_exposure",
  };
  return m[z];
}

export function marineZones(): MarineZone[] {
  return ["intertidal", "neritic", "oceanic", "benthic", "pelagic"];
}
