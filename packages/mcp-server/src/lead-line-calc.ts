export type BottomType = "sand" | "mud" | "rock" | "coral" | "shell";

export function lineMarkingAtFathom(fathom: number): string {
  const marks: Record<number, string> = {
    2: "leather_2_strips", 3: "leather_3_strips", 5: "white_cotton",
    7: "red_bunting", 10: "leather_hole", 13: "blue_serge",
    15: "white_cotton", 17: "red_bunting", 20: "cord_2_knots",
  };
  return marks[fathom] ?? "unmarked";
}

export function leadWeightKg(depthFathoms: number): number {
  if (depthFathoms <= 20) return 3;
  if (depthFathoms <= 100) return 14;
  return 30;
}

export function tallowRequired(): boolean {
  return true;
}

export function bottomIdentification(type: BottomType): string {
  const desc: Record<BottomType, string> = {
    sand: "grains_in_tallow", mud: "dark_smear", rock: "no_sample",
    coral: "white_fragments", shell: "shell_fragments",
  };
  return desc[type];
}

export function castingDistanceM(depthFathoms: number): number {
  return Math.min(50, Math.round(depthFathoms * 1.8));
}

export function soundingTimeSeconds(depthFathoms: number): number {
  return Math.round(depthFathoms * 1.2);
}

export function accuracyFathoms(depthFathoms: number): number {
  if (depthFathoms <= 20) return 0.25;
  if (depthFathoms <= 100) return 1;
  return 3;
}

export function lineLength(depthFathoms: number): number {
  return Math.ceil(depthFathoms * 1.5);
}

export function costEstimate(depthFathoms: number): number {
  if (depthFathoms <= 20) return 15;
  if (depthFathoms <= 100) return 40;
  return 80;
}

export function bottomTypes(): BottomType[] {
  return ["sand", "mud", "rock", "coral", "shell"];
}
