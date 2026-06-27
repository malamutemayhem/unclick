export type KnifeCut = "julienne" | "brunoise" | "chiffonade" | "tournee" | "batonnet";

export function sizeMm(cut: KnifeCut): number {
  const m: Record<KnifeCut, number> = {
    julienne: 3, brunoise: 3, chiffonade: 1, tournee: 50, batonnet: 6,
  };
  return m[cut];
}

export function precisionRequired(cut: KnifeCut): number {
  const m: Record<KnifeCut, number> = {
    julienne: 7, brunoise: 9, chiffonade: 4, tournee: 10, batonnet: 5,
  };
  return m[cut];
}

export function speedRating(cut: KnifeCut): number {
  const m: Record<KnifeCut, number> = {
    julienne: 5, brunoise: 3, chiffonade: 8, tournee: 2, batonnet: 7,
  };
  return m[cut];
}

export function wastePercent(cut: KnifeCut): number {
  const m: Record<KnifeCut, number> = {
    julienne: 5, brunoise: 8, chiffonade: 2, tournee: 30, batonnet: 5,
  };
  return m[cut];
}

export function cookingEvenness(cut: KnifeCut): number {
  const m: Record<KnifeCut, number> = {
    julienne: 8, brunoise: 10, chiffonade: 5, tournee: 9, batonnet: 7,
  };
  return m[cut];
}

export function requiresRocking(cut: KnifeCut): boolean {
  const m: Record<KnifeCut, boolean> = {
    julienne: false, brunoise: false, chiffonade: true, tournee: false, batonnet: false,
  };
  return m[cut];
}

export function usesTourneeKnife(cut: KnifeCut): boolean {
  const m: Record<KnifeCut, boolean> = {
    julienne: false, brunoise: false, chiffonade: false, tournee: true, batonnet: false,
  };
  return m[cut];
}

export function bestIngredient(cut: KnifeCut): string {
  const m: Record<KnifeCut, string> = {
    julienne: "carrots", brunoise: "onion", chiffonade: "basil",
    tournee: "potato", batonnet: "celery",
  };
  return m[cut];
}

export function culinaryLevel(cut: KnifeCut): string {
  const m: Record<KnifeCut, string> = {
    julienne: "intermediate", brunoise: "advanced", chiffonade: "beginner",
    tournee: "professional", batonnet: "beginner",
  };
  return m[cut];
}

export function knifeCuts(): KnifeCut[] {
  return ["julienne", "brunoise", "chiffonade", "tournee", "batonnet"];
}
