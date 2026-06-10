export type FinishType = "lacquer" | "polyurethane" | "shellac" | "tung_oil" | "wax";

export function durability(f: FinishType): number {
  const m: Record<FinishType, number> = {
    lacquer: 8, polyurethane: 10, shellac: 5, tung_oil: 6, wax: 3,
  };
  return m[f];
}

export function applicationEase(f: FinishType): number {
  const m: Record<FinishType, number> = {
    lacquer: 5, polyurethane: 6, shellac: 8, tung_oil: 9, wax: 10,
  };
  return m[f];
}

export function dryingTimeScore(f: FinishType): number {
  const m: Record<FinishType, number> = {
    lacquer: 10, polyurethane: 3, shellac: 9, tung_oil: 2, wax: 8,
  };
  return m[f];
}

export function repairability(f: FinishType): number {
  const m: Record<FinishType, number> = {
    lacquer: 7, polyurethane: 3, shellac: 10, tung_oil: 9, wax: 10,
  };
  return m[f];
}

export function naturalFeel(f: FinishType): number {
  const m: Record<FinishType, number> = {
    lacquer: 4, polyurethane: 3, shellac: 6, tung_oil: 9, wax: 10,
  };
  return m[f];
}

export function waterResistant(f: FinishType): boolean {
  const m: Record<FinishType, boolean> = {
    lacquer: true, polyurethane: true, shellac: false, tung_oil: true, wax: false,
  };
  return m[f];
}

export function foodSafe(f: FinishType): boolean {
  const m: Record<FinishType, boolean> = {
    lacquer: false, polyurethane: false, shellac: true, tung_oil: true, wax: true,
  };
  return m[f];
}

export function bestApplication(f: FinishType): string {
  const m: Record<FinishType, string> = {
    lacquer: "instruments_furniture", polyurethane: "floors_tabletops",
    shellac: "antiques_french_polish", tung_oil: "cutting_boards_bowls",
    wax: "decorative_light_use",
  };
  return m[f];
}

export function sheenLevel(f: FinishType): string {
  const m: Record<FinishType, string> = {
    lacquer: "high_gloss", polyurethane: "satin_to_gloss",
    shellac: "warm_amber_gloss", tung_oil: "low_natural",
    wax: "soft_matte",
  };
  return m[f];
}

export function finishTypes(): FinishType[] {
  return ["lacquer", "polyurethane", "shellac", "tung_oil", "wax"];
}
