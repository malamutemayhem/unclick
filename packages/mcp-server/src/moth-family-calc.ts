export type MothFamily = "sphingidae" | "saturniidae" | "noctuidae" | "geometridae" | "arctiidae";

export function wingspan(f: MothFamily): number {
  const m: Record<MothFamily, number> = {
    sphingidae: 8, saturniidae: 10, noctuidae: 5, geometridae: 4, arctiidae: 6,
  };
  return m[f];
}

export function flightSpeed(f: MothFamily): number {
  const m: Record<MothFamily, number> = {
    sphingidae: 10, saturniidae: 4, noctuidae: 6, geometridae: 5, arctiidae: 7,
  };
  return m[f];
}

export function camouflageAbility(f: MothFamily): number {
  const m: Record<MothFamily, number> = {
    sphingidae: 5, saturniidae: 6, noctuidae: 9, geometridae: 10, arctiidae: 3,
  };
  return m[f];
}

export function colorfulness(f: MothFamily): number {
  const m: Record<MothFamily, number> = {
    sphingidae: 6, saturniidae: 9, noctuidae: 3, geometridae: 4, arctiidae: 10,
  };
  return m[f];
}

export function speciesCount(f: MothFamily): number {
  const m: Record<MothFamily, number> = {
    sphingidae: 5, saturniidae: 4, noctuidae: 10, geometridae: 9, arctiidae: 6,
  };
  return m[f];
}

export function diurnal(f: MothFamily): boolean {
  const m: Record<MothFamily, boolean> = {
    sphingidae: true, saturniidae: false, noctuidae: false, geometridae: false, arctiidae: true,
  };
  return m[f];
}

export function agriculturalPest(f: MothFamily): boolean {
  const m: Record<MothFamily, boolean> = {
    sphingidae: true, saturniidae: false, noctuidae: true, geometridae: true, arctiidae: false,
  };
  return m[f];
}

export function commonName(f: MothFamily): string {
  const m: Record<MothFamily, string> = {
    sphingidae: "hawk_moths", saturniidae: "giant_silk_moths",
    noctuidae: "owlet_moths", geometridae: "geometer_inchworms",
    arctiidae: "tiger_moths",
  };
  return m[f];
}

export function defenseStrategy(f: MothFamily): string {
  const m: Record<MothFamily, string> = {
    sphingidae: "speed_hovering", saturniidae: "eyespot_startle",
    noctuidae: "cryptic_coloration", geometridae: "twig_mimicry",
    arctiidae: "warning_coloration_toxins",
  };
  return m[f];
}

export function mothFamilies(): MothFamily[] {
  return ["sphingidae", "saturniidae", "noctuidae", "geometridae", "arctiidae"];
}
