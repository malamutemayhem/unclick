export type DieCutting = "flatbed" | "rotary" | "laser" | "steel_rule" | "digital";

export function cuttingPrecision(d: DieCutting): number {
  const m: Record<DieCutting, number> = {
    flatbed: 7, rotary: 6, laser: 10, steel_rule: 5, digital: 9,
  };
  return m[d];
}

export function productionSpeed(d: DieCutting): number {
  const m: Record<DieCutting, number> = {
    flatbed: 5, rotary: 10, laser: 4, steel_rule: 6, digital: 7,
  };
  return m[d];
}

export function materialVersatility(d: DieCutting): number {
  const m: Record<DieCutting, number> = {
    flatbed: 8, rotary: 6, laser: 10, steel_rule: 7, digital: 5,
  };
  return m[d];
}

export function setupTime(d: DieCutting): number {
  const m: Record<DieCutting, number> = {
    flatbed: 6, rotary: 8, laser: 2, steel_rule: 7, digital: 1,
  };
  return m[d];
}

export function equipmentCost(d: DieCutting): number {
  const m: Record<DieCutting, number> = {
    flatbed: 6, rotary: 9, laser: 10, steel_rule: 3, digital: 8,
  };
  return m[d];
}

export function requiresPhysicalDie(d: DieCutting): boolean {
  const m: Record<DieCutting, boolean> = {
    flatbed: true, rotary: true, laser: false, steel_rule: true, digital: false,
  };
  return m[d];
}

export function contactlessCut(d: DieCutting): boolean {
  const m: Record<DieCutting, boolean> = {
    flatbed: false, rotary: false, laser: true, steel_rule: false, digital: true,
  };
  return m[d];
}

export function cuttingMechanism(d: DieCutting): string {
  const m: Record<DieCutting, string> = {
    flatbed: "platen_press_steel_die", rotary: "cylindrical_die_continuous_feed",
    laser: "focused_beam_vaporization", steel_rule: "bent_blade_foam_base",
    digital: "oscillating_blade_plotter",
  };
  return m[d];
}

export function bestProduct(d: DieCutting): string {
  const m: Record<DieCutting, string> = {
    flatbed: "complex_packaging_display", rotary: "high_volume_label_tag",
    laser: "intricate_paper_craft", steel_rule: "corrugated_box_folder",
    digital: "short_run_prototype",
  };
  return m[d];
}

export function dieCuttings(): DieCutting[] {
  return ["flatbed", "rotary", "laser", "steel_rule", "digital"];
}
