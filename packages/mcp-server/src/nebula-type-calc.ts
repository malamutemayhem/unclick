export type NebulaType = "emission" | "reflection" | "dark" | "planetary" | "supernova_remnant";

export function brightnessRating(nebula: NebulaType): number {
  const m: Record<NebulaType, number> = {
    emission: 8, reflection: 5, dark: 1, planetary: 7, supernova_remnant: 6,
  };
  return m[nebula];
}

export function sizeParsercs(nebula: NebulaType): number {
  const m: Record<NebulaType, number> = {
    emission: 50, reflection: 5, dark: 30, planetary: 1, supernova_remnant: 10,
  };
  return m[nebula];
}

export function temperatureK(nebula: NebulaType): number {
  const m: Record<NebulaType, number> = {
    emission: 10000, reflection: 100, dark: 20, planetary: 50000, supernova_remnant: 1000000,
  };
  return m[nebula];
}

export function densityRating(nebula: NebulaType): number {
  const m: Record<NebulaType, number> = {
    emission: 6, reflection: 7, dark: 9, planetary: 4, supernova_remnant: 3,
  };
  return m[nebula];
}

export function starFormingPotential(nebula: NebulaType): number {
  const m: Record<NebulaType, number> = {
    emission: 9, reflection: 5, dark: 8, planetary: 1, supernova_remnant: 3,
  };
  return m[nebula];
}

export function selfLuminous(nebula: NebulaType): boolean {
  const m: Record<NebulaType, boolean> = {
    emission: true, reflection: false, dark: false, planetary: true, supernova_remnant: true,
  };
  return m[nebula];
}

export function stellarEndProduct(nebula: NebulaType): boolean {
  const m: Record<NebulaType, boolean> = {
    emission: false, reflection: false, dark: false, planetary: true, supernova_remnant: true,
  };
  return m[nebula];
}

export function exampleNebula(nebula: NebulaType): string {
  const m: Record<NebulaType, string> = {
    emission: "orion_nebula", reflection: "witch_head", dark: "horsehead",
    planetary: "ring_nebula", supernova_remnant: "crab_nebula",
  };
  return m[nebula];
}

export function observabilityScore(nebula: NebulaType): number {
  const m: Record<NebulaType, number> = {
    emission: 9, reflection: 5, dark: 4, planetary: 7, supernova_remnant: 6,
  };
  return m[nebula];
}

export function nebulaTypes(): NebulaType[] {
  return ["emission", "reflection", "dark", "planetary", "supernova_remnant"];
}
