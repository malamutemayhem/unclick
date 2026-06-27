export type RaptorType = "eagle" | "falcon" | "hawk" | "owl" | "osprey";

export function wingspanMeters(raptor: RaptorType): number {
  const m: Record<RaptorType, number> = {
    eagle: 2.3, falcon: 1.1, hawk: 1.2, owl: 1.5, osprey: 1.7,
  };
  return m[raptor];
}

export function divingSpeedKmh(raptor: RaptorType): number {
  const m: Record<RaptorType, number> = {
    eagle: 160, falcon: 390, hawk: 190, owl: 60, osprey: 130,
  };
  return m[raptor];
}

export function visionAcuity(raptor: RaptorType): number {
  const m: Record<RaptorType, number> = {
    eagle: 10, falcon: 9, hawk: 8, owl: 6, osprey: 7,
  };
  return m[raptor];
}

export function talonStrengthPsi(raptor: RaptorType): number {
  const m: Record<RaptorType, number> = {
    eagle: 400, falcon: 200, hawk: 250, owl: 300, osprey: 350,
  };
  return m[raptor];
}

export function huntingRange(raptor: RaptorType): number {
  const m: Record<RaptorType, number> = {
    eagle: 9, falcon: 7, hawk: 6, owl: 5, osprey: 8,
  };
  return m[raptor];
}

export function nocturnal(raptor: RaptorType): boolean {
  const m: Record<RaptorType, boolean> = {
    eagle: false, falcon: false, hawk: false, owl: true, osprey: false,
  };
  return m[raptor];
}

export function fishSpecialist(raptor: RaptorType): boolean {
  const m: Record<RaptorType, boolean> = {
    eagle: false, falcon: false, hawk: false, owl: false, osprey: true,
  };
  return m[raptor];
}

export function primaryPrey(raptor: RaptorType): string {
  const m: Record<RaptorType, string> = {
    eagle: "mammals", falcon: "birds", hawk: "rodents",
    owl: "small_mammals", osprey: "fish",
  };
  return m[raptor];
}

export function falconryValue(raptor: RaptorType): number {
  const m: Record<RaptorType, number> = {
    eagle: 7, falcon: 10, hawk: 8, owl: 2, osprey: 3,
  };
  return m[raptor];
}

export function raptorTypes(): RaptorType[] {
  return ["eagle", "falcon", "hawk", "owl", "osprey"];
}
