export type EmotionType = "joy" | "sadness" | "anger" | "fear" | "surprise";

export function arousalLevel(e: EmotionType): number {
  const m: Record<EmotionType, number> = {
    joy: 7, sadness: 2, anger: 9, fear: 8, surprise: 10,
  };
  return m[e];
}

export function durationMinutes(e: EmotionType): number {
  const m: Record<EmotionType, number> = {
    joy: 30, sadness: 120, anger: 20, fear: 10, surprise: 5,
  };
  return m[e];
}

export function socialSignaling(e: EmotionType): number {
  const m: Record<EmotionType, number> = {
    joy: 10, sadness: 7, anger: 8, fear: 9, surprise: 6,
  };
  return m[e];
}

export function cognitiveImpact(e: EmotionType): number {
  const m: Record<EmotionType, number> = {
    joy: 4, sadness: 7, anger: 8, fear: 9, surprise: 6,
  };
  return m[e];
}

export function evolutionaryPurpose(e: EmotionType): number {
  const m: Record<EmotionType, number> = {
    joy: 7, sadness: 6, anger: 8, fear: 10, surprise: 9,
  };
  return m[e];
}

export function positiveValence(e: EmotionType): boolean {
  const m: Record<EmotionType, boolean> = {
    joy: true, sadness: false, anger: false, fear: false, surprise: false,
  };
  return m[e];
}

export function approachMotivation(e: EmotionType): boolean {
  const m: Record<EmotionType, boolean> = {
    joy: true, sadness: false, anger: true, fear: false, surprise: false,
  };
  return m[e];
}

export function facialExpression(e: EmotionType): string {
  const m: Record<EmotionType, string> = {
    joy: "smile", sadness: "frown", anger: "furrowed_brow",
    fear: "wide_eyes", surprise: "raised_eyebrows",
  };
  return m[e];
}

export function associatedHormone(e: EmotionType): string {
  const m: Record<EmotionType, string> = {
    joy: "dopamine", sadness: "cortisol", anger: "adrenaline",
    fear: "cortisol", surprise: "norepinephrine",
  };
  return m[e];
}

export function emotionTypes(): EmotionType[] {
  return ["joy", "sadness", "anger", "fear", "surprise"];
}
