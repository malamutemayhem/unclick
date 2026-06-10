export type ScriptType = "serif_roman" | "uncial" | "blackletter" | "copperplate" | "devanagari";

export function strokeComplexity(script: ScriptType): number {
  const m: Record<ScriptType, number> = {
    serif_roman: 5, uncial: 4, blackletter: 9, copperplate: 8, devanagari: 7,
  };
  return m[script];
}

export function readability(script: ScriptType): number {
  const m: Record<ScriptType, number> = {
    serif_roman: 10, uncial: 6, blackletter: 3, copperplate: 7, devanagari: 8,
  };
  return m[script];
}

export function writingAngleDegrees(script: ScriptType): number {
  const m: Record<ScriptType, number> = {
    serif_roman: 0, uncial: 15, blackletter: 45, copperplate: 55, devanagari: 0,
  };
  return m[script];
}

export function penPressureVariation(script: ScriptType): number {
  const m: Record<ScriptType, number> = {
    serif_roman: 4, uncial: 3, blackletter: 6, copperplate: 10, devanagari: 5,
  };
  return m[script];
}

export function formalityLevel(script: ScriptType): number {
  const m: Record<ScriptType, number> = {
    serif_roman: 7, uncial: 5, blackletter: 9, copperplate: 10, devanagari: 7,
  };
  return m[script];
}

export function cursive(script: ScriptType): boolean {
  const m: Record<ScriptType, boolean> = {
    serif_roman: false, uncial: false, blackletter: false, copperplate: true, devanagari: false,
  };
  return m[script];
}

export function usesHeadline(script: ScriptType): boolean {
  const m: Record<ScriptType, boolean> = {
    serif_roman: false, uncial: false, blackletter: false, copperplate: false, devanagari: true,
  };
  return m[script];
}

export function historicalPeriod(script: ScriptType): string {
  const m: Record<ScriptType, string> = {
    serif_roman: "roman_empire", uncial: "early_medieval", blackletter: "gothic",
    copperplate: "18th_century", devanagari: "7th_century",
  };
  return m[script];
}

export function bestToolType(script: ScriptType): string {
  const m: Record<ScriptType, string> = {
    serif_roman: "broad_nib", uncial: "broad_nib", blackletter: "broad_nib",
    copperplate: "pointed_nib", devanagari: "flat_nib",
  };
  return m[script];
}

export function scriptTypes(): ScriptType[] {
  return ["serif_roman", "uncial", "blackletter", "copperplate", "devanagari"];
}
