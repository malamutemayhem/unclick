export type WheelTechnique = "throwing" | "coiling" | "slab_building" | "pinching" | "slip_casting";

export function skillRequired(w: WheelTechnique): number {
  const m: Record<WheelTechnique, number> = {
    throwing: 8, coiling: 5, slab_building: 4, pinching: 3, slip_casting: 6,
  };
  return m[w];
}

export function productionSpeed(w: WheelTechnique): number {
  const m: Record<WheelTechnique, number> = {
    throwing: 8, coiling: 3, slab_building: 5, pinching: 2, slip_casting: 9,
  };
  return m[w];
}

export function wallUniformity(w: WheelTechnique): number {
  const m: Record<WheelTechnique, number> = {
    throwing: 9, coiling: 5, slab_building: 7, pinching: 3, slip_casting: 10,
  };
  return m[w];
}

export function sizeRange(w: WheelTechnique): number {
  const m: Record<WheelTechnique, number> = {
    throwing: 7, coiling: 9, slab_building: 8, pinching: 3, slip_casting: 6,
  };
  return m[w];
}

export function formFreedom(w: WheelTechnique): number {
  const m: Record<WheelTechnique, number> = {
    throwing: 5, coiling: 8, slab_building: 9, pinching: 7, slip_casting: 6,
  };
  return m[w];
}

export function requiresWheel(w: WheelTechnique): boolean {
  const m: Record<WheelTechnique, boolean> = {
    throwing: true, coiling: false, slab_building: false, pinching: false, slip_casting: false,
  };
  return m[w];
}

export function suitableForMassProduction(w: WheelTechnique): boolean {
  const m: Record<WheelTechnique, boolean> = {
    throwing: false, coiling: false, slab_building: false, pinching: false, slip_casting: true,
  };
  return m[w];
}

export function typicalProduct(w: WheelTechnique): string {
  const m: Record<WheelTechnique, string> = {
    throwing: "bowls_vases_cups", coiling: "large_vessels",
    slab_building: "tiles_boxes_platters", pinching: "small_bowls_figures",
    slip_casting: "identical_pieces_mugs",
  };
  return m[w];
}

export function surfaceFinish(w: WheelTechnique): string {
  const m: Record<WheelTechnique, string> = {
    throwing: "smooth_spiral_lines", coiling: "textured_layered",
    slab_building: "flat_geometric", pinching: "organic_fingermarks",
    slip_casting: "smooth_uniform",
  };
  return m[w];
}

export function wheelTechniques(): WheelTechnique[] {
  return ["throwing", "coiling", "slab_building", "pinching", "slip_casting"];
}
