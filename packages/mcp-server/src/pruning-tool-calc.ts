export type PruningTool = "bypass_secateurs" | "anvil_secateurs" | "loppers" | "pruning_saw" | "hedge_shears";

export function maxDiameterMm(tool: PruningTool): number {
  const m: Record<PruningTool, number> = {
    bypass_secateurs: 20, anvil_secateurs: 25, loppers: 50, pruning_saw: 150, hedge_shears: 10,
  };
  return m[tool];
}

export function cutCleanliness(tool: PruningTool): number {
  const m: Record<PruningTool, number> = {
    bypass_secateurs: 9, anvil_secateurs: 5, loppers: 7, pruning_saw: 6, hedge_shears: 4,
  };
  return m[tool];
}

export function effortRequired(tool: PruningTool): number {
  const m: Record<PruningTool, number> = {
    bypass_secateurs: 3, anvil_secateurs: 2, loppers: 5, pruning_saw: 7, hedge_shears: 6,
  };
  return m[tool];
}

export function speedRating(tool: PruningTool): number {
  const m: Record<PruningTool, number> = {
    bypass_secateurs: 8, anvil_secateurs: 7, loppers: 5, pruning_saw: 4, hedge_shears: 9,
  };
  return m[tool];
}

export function liveWoodSafe(tool: PruningTool): boolean {
  const m: Record<PruningTool, boolean> = {
    bypass_secateurs: true, anvil_secateurs: false, loppers: true, pruning_saw: true, hedge_shears: true,
  };
  return m[tool];
}

export function oneHanded(tool: PruningTool): boolean {
  const m: Record<PruningTool, boolean> = {
    bypass_secateurs: true, anvil_secateurs: true, loppers: false, pruning_saw: true, hedge_shears: false,
  };
  return m[tool];
}

export function bestTask(tool: PruningTool): string {
  const m: Record<PruningTool, string> = {
    bypass_secateurs: "rose_pruning", anvil_secateurs: "deadwood_removal",
    loppers: "branch_thinning", pruning_saw: "limb_removal", hedge_shears: "hedge_shaping",
  };
  return m[tool];
}

export function sharpeningDifficulty(tool: PruningTool): number {
  const m: Record<PruningTool, number> = {
    bypass_secateurs: 4, anvil_secateurs: 3, loppers: 5, pruning_saw: 7, hedge_shears: 6,
  };
  return m[tool];
}

export function costEstimate(tool: PruningTool): number {
  const m: Record<PruningTool, number> = {
    bypass_secateurs: 35, anvil_secateurs: 25, loppers: 50, pruning_saw: 40, hedge_shears: 30,
  };
  return m[tool];
}

export function pruningTools(): PruningTool[] {
  return ["bypass_secateurs", "anvil_secateurs", "loppers", "pruning_saw", "hedge_shears"];
}
