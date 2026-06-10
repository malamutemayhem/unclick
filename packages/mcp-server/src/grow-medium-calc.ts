export type GrowMedium = "rockwool" | "perlite" | "coco_coir" | "clay_pebbles" | "vermiculite";

export function waterRetention(g: GrowMedium): number {
  const m: Record<GrowMedium, number> = {
    rockwool: 8, perlite: 3, coco_coir: 9, clay_pebbles: 2, vermiculite: 10,
  };
  return m[g];
}

export function airPorosity(g: GrowMedium): number {
  const m: Record<GrowMedium, number> = {
    rockwool: 6, perlite: 10, coco_coir: 7, clay_pebbles: 9, vermiculite: 4,
  };
  return m[g];
}

export function phStability(g: GrowMedium): number {
  const m: Record<GrowMedium, number> = {
    rockwool: 5, perlite: 9, coco_coir: 7, clay_pebbles: 10, vermiculite: 8,
  };
  return m[g];
}

export function costPerLiter(g: GrowMedium): number {
  const m: Record<GrowMedium, number> = {
    rockwool: 6, perlite: 3, coco_coir: 4, clay_pebbles: 7, vermiculite: 5,
  };
  return m[g];
}

export function reusability(g: GrowMedium): number {
  const m: Record<GrowMedium, number> = {
    rockwool: 2, perlite: 6, coco_coir: 3, clay_pebbles: 10, vermiculite: 4,
  };
  return m[g];
}

export function biodegradable(g: GrowMedium): boolean {
  const m: Record<GrowMedium, boolean> = {
    rockwool: false, perlite: false, coco_coir: true, clay_pebbles: false, vermiculite: false,
  };
  return m[g];
}

export function requiresPreTreatment(g: GrowMedium): boolean {
  const m: Record<GrowMedium, boolean> = {
    rockwool: true, perlite: false, coco_coir: true, clay_pebbles: true, vermiculite: false,
  };
  return m[g];
}

export function composition(g: GrowMedium): string {
  const m: Record<GrowMedium, string> = {
    rockwool: "spun_basite_fiber", perlite: "expanded_volcanic_glass",
    coco_coir: "coconut_husk_fiber", clay_pebbles: "fired_expanded_clay",
    vermiculite: "heated_mica_mineral",
  };
  return m[g];
}

export function bestSystem(g: GrowMedium): string {
  const m: Record<GrowMedium, string> = {
    rockwool: "drip_nft_commercial", perlite: "ebb_flow_mix_blend",
    coco_coir: "hand_water_drip_organic", clay_pebbles: "dwc_ebb_flow_reuse",
    vermiculite: "seed_starting_mix",
  };
  return m[g];
}

export function growMedia(): GrowMedium[] {
  return ["rockwool", "perlite", "coco_coir", "clay_pebbles", "vermiculite"];
}
