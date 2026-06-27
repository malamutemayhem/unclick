export type StepwellStyle = "vav" | "baoli" | "pushkarani" | "kalyani" | "bawdi";

export function depthMeters(style: StepwellStyle): number {
  const d: Record<StepwellStyle, number> = {
    vav: 25, baoli: 20, pushkarani: 10, kalyani: 8, bawdi: 30,
  };
  return d[style];
}

export function stepsCount(style: StepwellStyle): number {
  const s: Record<StepwellStyle, number> = {
    vav: 150, baoli: 100, pushkarani: 40, kalyani: 30, bawdi: 200,
  };
  return s[style];
}

export function storageCapacityM3(style: StepwellStyle): number {
  const c: Record<StepwellStyle, number> = {
    vav: 500, baoli: 300, pushkarani: 800, kalyani: 200, bawdi: 400,
  };
  return c[style];
}

export function ornamentalLevel(style: StepwellStyle): number {
  const o: Record<StepwellStyle, number> = {
    vav: 9, baoli: 7, pushkarani: 5, kalyani: 6, bawdi: 8,
  };
  return o[style];
}

export function constructionYears(style: StepwellStyle): number {
  const y: Record<StepwellStyle, number> = {
    vav: 15, baoli: 8, pushkarani: 5, kalyani: 3, bawdi: 20,
  };
  return y[style];
}

export function coolingEffect(style: StepwellStyle): boolean {
  return style === "vav" || style === "baoli" || style === "bawdi";
}

export function communalGathering(style: StepwellStyle): boolean {
  return true;
}

export function primaryRegion(style: StepwellStyle): string {
  const r: Record<StepwellStyle, string> = {
    vav: "gujarat", baoli: "delhi", pushkarani: "karnataka",
    kalyani: "tamil_nadu", bawdi: "rajasthan",
  };
  return r[style];
}

export function restorationDifficulty(style: StepwellStyle): number {
  const d: Record<StepwellStyle, number> = {
    vav: 9, baoli: 7, pushkarani: 5, kalyani: 4, bawdi: 10,
  };
  return d[style];
}

export function stepwellStyles(): StepwellStyle[] {
  return ["vav", "baoli", "pushkarani", "kalyani", "bawdi"];
}
