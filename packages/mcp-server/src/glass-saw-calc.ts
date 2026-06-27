export type GlassSawType =
  | "ring_saw_curve"
  | "band_saw_straight"
  | "diamond_wire_thin"
  | "grinder_saw_combo"
  | "tile_saw_wet";

const specs: Record<GlassSawType, {
  cutPrecision: number; curveAbility: number; speedCut: number;
  thicknessRange: number; cost: number; wetCut: boolean; forCurve: boolean;
  bladeType: string; use: string;
}> = {
  ring_saw_curve: {
    cutPrecision: 90, curveAbility: 95, speedCut: 75,
    thicknessRange: 82, cost: 12, wetCut: true, forCurve: true,
    bladeType: "diamond_ring_blade", use: "intricate_curve_cut",
  },
  band_saw_straight: {
    cutPrecision: 85, curveAbility: 78, speedCut: 88,
    thicknessRange: 90, cost: 10, wetCut: true, forCurve: false,
    bladeType: "continuous_band_blade", use: "straight_production_cut",
  },
  diamond_wire_thin: {
    cutPrecision: 92, curveAbility: 88, speedCut: 70,
    thicknessRange: 75, cost: 8, wetCut: true, forCurve: true,
    bladeType: "diamond_coated_wire", use: "thin_delicate_cut",
  },
  grinder_saw_combo: {
    cutPrecision: 82, curveAbility: 80, speedCut: 85,
    thicknessRange: 85, cost: 14, wetCut: true, forCurve: false,
    bladeType: "diamond_grind_wheel", use: "cut_and_grind_combo",
  },
  tile_saw_wet: {
    cutPrecision: 80, curveAbility: 65, speedCut: 92,
    thicknessRange: 95, cost: 9, wetCut: true, forCurve: false,
    bladeType: "diamond_tile_disc", use: "bulk_straight_cut",
  },
};

export function cutPrecision(t: GlassSawType): number { return specs[t].cutPrecision; }
export function curveAbility(t: GlassSawType): number { return specs[t].curveAbility; }
export function speedCut(t: GlassSawType): number { return specs[t].speedCut; }
export function thicknessRange(t: GlassSawType): number { return specs[t].thicknessRange; }
export function sawCost(t: GlassSawType): number { return specs[t].cost; }
export function wetCut(t: GlassSawType): boolean { return specs[t].wetCut; }
export function forCurve(t: GlassSawType): boolean { return specs[t].forCurve; }
export function bladeType(t: GlassSawType): string { return specs[t].bladeType; }
export function bestUse(t: GlassSawType): string { return specs[t].use; }
export function glassSaws(): GlassSawType[] { return Object.keys(specs) as GlassSawType[]; }
