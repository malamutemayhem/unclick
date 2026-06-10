export type LearningStyle = "visual" | "auditory" | "kinesthetic" | "reading_writing" | "social";

export function retentionRate(l: LearningStyle): number {
  const m: Record<LearningStyle, number> = {
    visual: 7, auditory: 5, kinesthetic: 9, reading_writing: 6, social: 8,
  };
  return m[l];
}

export function engagementLevel(l: LearningStyle): number {
  const m: Record<LearningStyle, number> = {
    visual: 7, auditory: 5, kinesthetic: 10, reading_writing: 4, social: 9,
  };
  return m[l];
}

export function scalability(l: LearningStyle): number {
  const m: Record<LearningStyle, number> = {
    visual: 8, auditory: 9, kinesthetic: 3, reading_writing: 10, social: 5,
  };
  return m[l];
}

export function resourceCost(l: LearningStyle): number {
  const m: Record<LearningStyle, number> = {
    visual: 6, auditory: 4, kinesthetic: 9, reading_writing: 2, social: 7,
  };
  return m[l];
}

export function selfPaceAbility(l: LearningStyle): number {
  const m: Record<LearningStyle, number> = {
    visual: 8, auditory: 6, kinesthetic: 5, reading_writing: 10, social: 3,
  };
  return m[l];
}

export function requiresEquipment(l: LearningStyle): boolean {
  const m: Record<LearningStyle, boolean> = {
    visual: true, auditory: false, kinesthetic: true, reading_writing: false, social: false,
  };
  return m[l];
}

export function groupActivity(l: LearningStyle): boolean {
  const m: Record<LearningStyle, boolean> = {
    visual: false, auditory: false, kinesthetic: false, reading_writing: false, social: true,
  };
  return m[l];
}

export function bestMedium(l: LearningStyle): string {
  const m: Record<LearningStyle, string> = {
    visual: "diagrams", auditory: "lectures",
    kinesthetic: "hands_on_practice", reading_writing: "textbooks",
    social: "group_discussion",
  };
  return m[l];
}

export function brainArea(l: LearningStyle): string {
  const m: Record<LearningStyle, string> = {
    visual: "occipital_lobe", auditory: "temporal_lobe",
    kinesthetic: "cerebellum", reading_writing: "frontal_lobe",
    social: "prefrontal_cortex",
  };
  return m[l];
}

export function learningStyles(): LearningStyle[] {
  return ["visual", "auditory", "kinesthetic", "reading_writing", "social"];
}
