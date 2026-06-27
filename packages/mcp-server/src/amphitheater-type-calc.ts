export type AmphitheaterType = "roman" | "greek" | "odeon" | "circus" | "stadium";

export function seatingCapacity(amp: AmphitheaterType): number {
  const m: Record<AmphitheaterType, number> = {
    roman: 50000, greek: 15000, odeon: 5000, circus: 250000, stadium: 40000,
  };
  return m[amp];
}

export function acousticQuality(amp: AmphitheaterType): number {
  const m: Record<AmphitheaterType, number> = {
    roman: 7, greek: 10, odeon: 9, circus: 3, stadium: 5,
  };
  return m[amp];
}

export function architecturalComplexity(amp: AmphitheaterType): number {
  const m: Record<AmphitheaterType, number> = {
    roman: 9, greek: 6, odeon: 7, circus: 5, stadium: 4,
  };
  return m[amp];
}

export function undergroundStructures(amp: AmphitheaterType): number {
  const m: Record<AmphitheaterType, number> = {
    roman: 10, greek: 2, odeon: 4, circus: 3, stadium: 1,
  };
  return m[amp];
}

export function sightlineQuality(amp: AmphitheaterType): number {
  const m: Record<AmphitheaterType, number> = {
    roman: 8, greek: 9, odeon: 8, circus: 5, stadium: 6,
  };
  return m[amp];
}

export function roofed(amp: AmphitheaterType): boolean {
  const m: Record<AmphitheaterType, boolean> = {
    roman: false, greek: false, odeon: true, circus: false, stadium: false,
  };
  return m[amp];
}

export function fullEllipse(amp: AmphitheaterType): boolean {
  const m: Record<AmphitheaterType, boolean> = {
    roman: true, greek: false, odeon: false, circus: false, stadium: false,
  };
  return m[amp];
}

export function primaryUse(amp: AmphitheaterType): string {
  const m: Record<AmphitheaterType, string> = {
    roman: "gladiatorial", greek: "drama", odeon: "music",
    circus: "chariot_racing", stadium: "athletic",
  };
  return m[amp];
}

export function survivingExamples(amp: AmphitheaterType): number {
  const m: Record<AmphitheaterType, number> = {
    roman: 230, greek: 150, odeon: 50, circus: 30, stadium: 20,
  };
  return m[amp];
}

export function amphitheaterTypes(): AmphitheaterType[] {
  return ["roman", "greek", "odeon", "circus", "stadium"];
}
