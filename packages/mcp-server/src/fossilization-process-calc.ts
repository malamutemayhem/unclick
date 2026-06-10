export type FossilizationProcess = "permineralization" | "carbonization" | "amber" | "mold_cast" | "freeze_drying";

export function detailPreservation(f: FossilizationProcess): number {
  const m: Record<FossilizationProcess, number> = {
    permineralization: 8, carbonization: 6, amber: 10, mold_cast: 5, freeze_drying: 9,
  };
  return m[f];
}

export function timeRequired(f: FossilizationProcess): number {
  const m: Record<FossilizationProcess, number> = {
    permineralization: 9, carbonization: 7, amber: 3, mold_cast: 8, freeze_drying: 2,
  };
  return m[f];
}

export function softTissueChance(f: FossilizationProcess): number {
  const m: Record<FossilizationProcess, number> = {
    permineralization: 3, carbonization: 5, amber: 10, mold_cast: 1, freeze_drying: 9,
  };
  return m[f];
}

export function commonOccurrence(f: FossilizationProcess): number {
  const m: Record<FossilizationProcess, number> = {
    permineralization: 9, carbonization: 7, amber: 4, mold_cast: 8, freeze_drying: 2,
  };
  return m[f];
}

export function dnaRecoveryPotential(f: FossilizationProcess): number {
  const m: Record<FossilizationProcess, number> = {
    permineralization: 1, carbonization: 1, amber: 6, mold_cast: 1, freeze_drying: 10,
  };
  return m[f];
}

export function preserves3dStructure(f: FossilizationProcess): boolean {
  const m: Record<FossilizationProcess, boolean> = {
    permineralization: true, carbonization: false, amber: true, mold_cast: true, freeze_drying: true,
  };
  return m[f];
}

export function requiresSpecialConditions(f: FossilizationProcess): boolean {
  const m: Record<FossilizationProcess, boolean> = {
    permineralization: false, carbonization: false, amber: true, mold_cast: false, freeze_drying: true,
  };
  return m[f];
}

export function typicalOrganism(f: FossilizationProcess): string {
  const m: Record<FossilizationProcess, string> = {
    permineralization: "bone_wood_shell", carbonization: "leaf_fish_insect",
    amber: "insect_arachnid_plant", mold_cast: "shell_invertebrate",
    freeze_drying: "mammoth_ice_age_fauna",
  };
  return m[f];
}

export function mineralInvolved(f: FossilizationProcess): string {
  const m: Record<FossilizationProcess, string> = {
    permineralization: "silica_calcite_pyrite", carbonization: "carbon_film_residue",
    amber: "fossilized_tree_resin", mold_cast: "sediment_mineral_fill",
    freeze_drying: "permafrost_ice",
  };
  return m[f];
}

export function fossilizationProcesses(): FossilizationProcess[] {
  return ["permineralization", "carbonization", "amber", "mold_cast", "freeze_drying"];
}
