export type WoodType = "basswood" | "pine" | "balsa" | "butternut" | "cherry" | "walnut";
export type KnifeType = "sloyd" | "detail" | "chip" | "hook" | "roughout";

export function hardness(wood: WoodType): number {
  const janka: Record<WoodType, number> = {
    balsa: 100, basswood: 410, pine: 690, butternut: 490, cherry: 950, walnut: 1010,
  };
  return janka[wood];
}

export function difficulty(wood: WoodType): string {
  const h = hardness(wood);
  if (h < 300) return "very easy";
  if (h < 500) return "easy";
  if (h < 700) return "moderate";
  return "challenging";
}

export function blankSize(finishedCm: number): number {
  return parseFloat((finishedCm * 1.3).toFixed(1));
}

export function carvingTime(volumeCm3: number, hardness: number): number {
  return Math.round(volumeCm3 * hardness / 500);
}

export function knifeAngle(knifeType: KnifeType): number {
  const angles: Record<KnifeType, number> = {
    sloyd: 25, detail: 20, chip: 30, hook: 25, roughout: 20,
  };
  return angles[knifeType];
}

export function sharpeningInterval(minutesCarved: number): number {
  return Math.max(1, Math.floor(minutesCarved / 20));
}

export function stopStrops(dullness: number): number {
  return Math.round(dullness * 10);
}

export function grainDirection(cutsAcross: boolean): string {
  return cutsAcross ? "cut with grain for smoother finish" : "across grain ok for rough shaping";
}

export function finishCoats(wood: WoodType): number {
  const h = hardness(wood);
  if (h < 500) return 3;
  return 2;
}

export function oilAmount(surfaceAreaCm2: number): number {
  return parseFloat((surfaceAreaCm2 * 0.02).toFixed(1));
}

export function bandaidEstimate(experience: "beginner" | "intermediate" | "expert"): number {
  const cuts: Record<string, number> = { beginner: 5, intermediate: 2, expert: 0 };
  return cuts[experience];
}

export function projectIdeas(skillLevel: number): string[] {
  const ideas = ["spoon", "butter knife"];
  if (skillLevel >= 3) ideas.push("figurine", "bowl");
  if (skillLevel >= 5) ideas.push("chain link", "ball in cage");
  return ideas;
}

export function woodTypes(): WoodType[] {
  return ["basswood", "pine", "balsa", "butternut", "cherry", "walnut"];
}
