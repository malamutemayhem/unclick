export type FeatherType = "goose" | "swan" | "turkey" | "crow" | "ostrich";
export type InkType = "iron_gall" | "carbon" | "walnut" | "sepia" | "india";

export function featherLength(type: FeatherType): number {
  const cm: Record<FeatherType, number> = {
    goose: 30, swan: 35, turkey: 28, crow: 20, ostrich: 45,
  };
  return cm[type];
}

export function nibCutAngle(writing: "italic" | "copperplate" | "round"): number {
  const degrees: Record<string, number> = { italic: 45, copperplate: 30, round: 40 };
  return degrees[writing];
}

export function temperingTime(featherType: FeatherType): number {
  const minutes: Record<FeatherType, number> = {
    goose: 10, swan: 12, turkey: 8, crow: 5, ostrich: 15,
  };
  return minutes[featherType];
}

export function temperingTemp(): number {
  return 60;
}

export function inkViscosity(type: InkType): string {
  const visc: Record<InkType, string> = {
    iron_gall: "thin", carbon: "medium", walnut: "thin", sepia: "medium", india: "thick",
  };
  return visc[type];
}

export function dryingTime(inkType: InkType): number {
  const seconds: Record<InkType, number> = {
    iron_gall: 30, carbon: 60, walnut: 20, sepia: 45, india: 90,
  };
  return seconds[inkType];
}

export function inkPerPage(linesPerPage: number, charsPerLine: number): number {
  return parseFloat((linesPerPage * charsPerLine * 0.005).toFixed(2));
}

export function dipFrequency(nibCapacity: "small" | "medium" | "large"): number {
  const words: Record<string, number> = { small: 3, medium: 6, large: 10 };
  return words[nibCapacity];
}

export function writingSpeed(experience: "beginner" | "practiced" | "master"): number {
  const wpm: Record<string, number> = { beginner: 5, practiced: 12, master: 20 };
  return wpm[experience];
}

export function pageTime(words: number, wpm: number): number {
  if (wpm <= 0) return 0;
  return parseFloat((words / wpm).toFixed(1));
}

export function nibLifePages(featherType: FeatherType): number {
  const pages: Record<FeatherType, number> = {
    goose: 20, swan: 25, turkey: 15, crow: 10, ostrich: 30,
  };
  return pages[featherType];
}

export function sandDrying(needed: boolean): string {
  return needed ? "fine sand or blotting paper" : "air dry sufficient";
}

export function featherTypes(): FeatherType[] {
  return ["goose", "swan", "turkey", "crow", "ostrich"];
}
