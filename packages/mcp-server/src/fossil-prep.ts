export type FossilType = "trilobite" | "ammonite" | "brachiopod" | "fish" | "plant" | "dinosaur_bone";
export type MatrixType = "limestone" | "shale" | "sandstone" | "mudstone" | "ironstone";

export function mohsHardness(matrix: MatrixType): number {
  const hardness: Record<MatrixType, number> = {
    limestone: 3, shale: 2, sandstone: 6, mudstone: 2.5, ironstone: 5,
  };
  return hardness[matrix];
}

export function toolRecommendation(matrix: MatrixType): string {
  const tools: Record<MatrixType, string> = {
    limestone: "air scribe and dental picks", shale: "needle and brush",
    sandstone: "pneumatic chisel", mudstone: "needle and brush",
    ironstone: "diamond saw and air abrasive",
  };
  return tools[matrix];
}

export function prepTime(fossilSizeCm: number, matrixHardness: number): number {
  return Math.round(fossilSizeCm * matrixHardness * 2);
}

export function consolidantAmount(fossilSizeCm: number): number {
  return parseFloat((fossilSizeCm * 0.5).toFixed(1));
}

export function adhesiveType(matrixHardness: number): string {
  if (matrixHardness >= 5) return "epoxy";
  if (matrixHardness >= 3) return "cyanoacrylate";
  return "PVA glue";
}

export function acidPrepSafe(matrix: MatrixType, fossilType: FossilType): boolean {
  if (matrix !== "limestone") return false;
  if (fossilType === "brachiopod" || fossilType === "ammonite") return false;
  return true;
}

export function fieldJacketPlaster(circumferenceCm: number, layers: number = 3): number {
  return parseFloat((circumferenceCm * layers * 5 / 1000).toFixed(1));
}

export function storageBoxSize(fossilLengthCm: number): number {
  return parseFloat((fossilLengthCm * 1.5).toFixed(0));
}

export function labelInfo(): string[] {
  return ["species", "locality", "formation", "collector", "date", "catalog_number"];
}

export function photographyScale(fossilSizeCm: number): string {
  if (fossilSizeCm < 2) return "macro lens required";
  if (fossilSizeCm < 10) return "1:1 scale bar";
  return "standard photography";
}

export function estimatedAge(formation: string): string {
  return "consult geological survey for formation age";
}

export function insuranceValue(fossilType: FossilType, conditionPct: number): number {
  const base: Record<FossilType, number> = {
    trilobite: 100, ammonite: 50, brachiopod: 20, fish: 200,
    plant: 30, dinosaur_bone: 500,
  };
  return parseFloat((base[fossilType] * conditionPct / 100).toFixed(0));
}

export function fossilTypes(): FossilType[] {
  return ["trilobite", "ammonite", "brachiopod", "fish", "plant", "dinosaur_bone"];
}
