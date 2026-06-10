export type AuroraType = "discrete_arc" | "diffuse" | "pulsating" | "corona" | "curtain";

export function brightnessKilorayleigh(aurora: AuroraType): number {
  const m: Record<AuroraType, number> = {
    discrete_arc: 100, diffuse: 5, pulsating: 10, corona: 200, curtain: 80,
  };
  return m[aurora];
}

export function altitudeKm(aurora: AuroraType): number {
  const m: Record<AuroraType, number> = {
    discrete_arc: 110, diffuse: 200, pulsating: 150, corona: 100, curtain: 120,
  };
  return m[aurora];
}

export function durationMinutes(aurora: AuroraType): number {
  const m: Record<AuroraType, number> = {
    discrete_arc: 30, diffuse: 120, pulsating: 60, corona: 10, curtain: 45,
  };
  return m[aurora];
}

export function dynamicMotion(aurora: AuroraType): number {
  const m: Record<AuroraType, number> = {
    discrete_arc: 7, diffuse: 2, pulsating: 8, corona: 10, curtain: 9,
  };
  return m[aurora];
}

export function photographicAppeal(aurora: AuroraType): number {
  const m: Record<AuroraType, number> = {
    discrete_arc: 8, diffuse: 3, pulsating: 6, corona: 10, curtain: 9,
  };
  return m[aurora];
}

export function visibleToNakedEye(aurora: AuroraType): boolean {
  const m: Record<AuroraType, boolean> = {
    discrete_arc: true, diffuse: false, pulsating: true, corona: true, curtain: true,
  };
  return m[aurora];
}

export function requiresStrongStorm(aurora: AuroraType): boolean {
  const m: Record<AuroraType, boolean> = {
    discrete_arc: false, diffuse: false, pulsating: false, corona: true, curtain: false,
  };
  return m[aurora];
}

export function dominantColor(aurora: AuroraType): string {
  const m: Record<AuroraType, string> = {
    discrete_arc: "green", diffuse: "red", pulsating: "green",
    corona: "multicolor", curtain: "green_purple",
  };
  return m[aurora];
}

export function frequencyPerYear(aurora: AuroraType): number {
  const m: Record<AuroraType, number> = {
    discrete_arc: 100, diffuse: 200, pulsating: 150, corona: 10, curtain: 80,
  };
  return m[aurora];
}

export function auroraTypes(): AuroraType[] {
  return ["discrete_arc", "diffuse", "pulsating", "corona", "curtain"];
}
