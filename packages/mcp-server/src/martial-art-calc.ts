export type MartialArt = "karate" | "judo" | "taekwondo" | "muay_thai" | "brazilian_jiu_jitsu";

export function strikingEmphasis(art: MartialArt): number {
  const m: Record<MartialArt, number> = {
    karate: 9, judo: 2, taekwondo: 10, muay_thai: 10, brazilian_jiu_jitsu: 1,
  };
  return m[art];
}

export function grapplingEmphasis(art: MartialArt): number {
  const m: Record<MartialArt, number> = {
    karate: 2, judo: 10, taekwondo: 1, muay_thai: 3, brazilian_jiu_jitsu: 10,
  };
  return m[art];
}

export function flexibilityRequired(art: MartialArt): number {
  const m: Record<MartialArt, number> = {
    karate: 7, judo: 5, taekwondo: 10, muay_thai: 6, brazilian_jiu_jitsu: 8,
  };
  return m[art];
}

export function beltLevels(art: MartialArt): number {
  const m: Record<MartialArt, number> = {
    karate: 10, judo: 10, taekwondo: 10, muay_thai: 0, brazilian_jiu_jitsu: 5,
  };
  return m[art];
}

export function selfDefenseRating(art: MartialArt): number {
  const m: Record<MartialArt, number> = {
    karate: 7, judo: 8, taekwondo: 6, muay_thai: 9, brazilian_jiu_jitsu: 9,
  };
  return m[art];
}

export function olympic(art: MartialArt): boolean {
  const m: Record<MartialArt, boolean> = {
    karate: true, judo: true, taekwondo: true, muay_thai: false, brazilian_jiu_jitsu: false,
  };
  return m[art];
}

export function usesWeapons(art: MartialArt): boolean {
  const m: Record<MartialArt, boolean> = {
    karate: false, judo: false, taekwondo: false, muay_thai: false, brazilian_jiu_jitsu: false,
  };
  return m[art];
}

export function originCountry(art: MartialArt): string {
  const m: Record<MartialArt, string> = {
    karate: "japan", judo: "japan", taekwondo: "korea",
    muay_thai: "thailand", brazilian_jiu_jitsu: "brazil",
  };
  return m[art];
}

export function fitnessScore(art: MartialArt): number {
  const m: Record<MartialArt, number> = {
    karate: 7, judo: 8, taekwondo: 8, muay_thai: 10, brazilian_jiu_jitsu: 9,
  };
  return m[art];
}

export function martialArts(): MartialArt[] {
  return ["karate", "judo", "taekwondo", "muay_thai", "brazilian_jiu_jitsu"];
}
