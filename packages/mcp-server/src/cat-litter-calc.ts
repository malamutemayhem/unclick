export type CatLitterType = "clumping_clay" | "crystal_silica" | "pine_pellet" | "corn_wheat" | "paper_recycled";

export function odorControl(t: CatLitterType): number {
  const m: Record<CatLitterType, number> = {
    clumping_clay: 8, crystal_silica: 10, pine_pellet: 7, corn_wheat: 6, paper_recycled: 4,
  };
  return m[t];
}

export function dustLevel(t: CatLitterType): number {
  const m: Record<CatLitterType, number> = {
    clumping_clay: 8, crystal_silica: 2, pine_pellet: 3, corn_wheat: 4, paper_recycled: 1,
  };
  return m[t];
}

export function absorbency(t: CatLitterType): number {
  const m: Record<CatLitterType, number> = {
    clumping_clay: 9, crystal_silica: 10, pine_pellet: 7, corn_wheat: 7, paper_recycled: 6,
  };
  return m[t];
}

export function trackingMess(t: CatLitterType): number {
  const m: Record<CatLitterType, number> = {
    clumping_clay: 8, crystal_silica: 3, pine_pellet: 4, corn_wheat: 6, paper_recycled: 2,
  };
  return m[t];
}

export function litterCost(t: CatLitterType): number {
  const m: Record<CatLitterType, number> = {
    clumping_clay: 3, crystal_silica: 7, pine_pellet: 4, corn_wheat: 5, paper_recycled: 6,
  };
  return m[t];
}

export function flushable(t: CatLitterType): boolean {
  const m: Record<CatLitterType, boolean> = {
    clumping_clay: false, crystal_silica: false, pine_pellet: false, corn_wheat: true, paper_recycled: false,
  };
  return m[t];
}

export function biodegradable(t: CatLitterType): boolean {
  const m: Record<CatLitterType, boolean> = {
    clumping_clay: false, crystal_silica: false, pine_pellet: true, corn_wheat: true, paper_recycled: true,
  };
  return m[t];
}

export function baseMaterial(t: CatLitterType): string {
  const m: Record<CatLitterType, string> = {
    clumping_clay: "sodium_bentonite_clay", crystal_silica: "silica_gel_beads",
    pine_pellet: "kiln_dried_pine_sawdust", corn_wheat: "ground_corn_kernel",
    paper_recycled: "compressed_recycled_paper",
  };
  return m[t];
}

export function bestCat(t: CatLitterType): string {
  const m: Record<CatLitterType, string> = {
    clumping_clay: "multi_cat_heavy_use", crystal_silica: "single_cat_low_maintain",
    pine_pellet: "eco_conscious_owner", corn_wheat: "kitten_safe_natural",
    paper_recycled: "post_surgery_sensitive_paw",
  };
  return m[t];
}

export function catLitters(): CatLitterType[] {
  return ["clumping_clay", "crystal_silica", "pine_pellet", "corn_wheat", "paper_recycled"];
}
