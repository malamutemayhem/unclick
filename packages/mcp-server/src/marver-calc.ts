export type MarverType = "graphite_flat_slab" | "steel_table_heavy" | "marble_cold_smooth" | "brass_plate_heat" | "ceramic_fiber_light";

export function heatRetain(t: MarverType): number {
  const m: Record<MarverType, number> = {
    graphite_flat_slab: 6, steel_table_heavy: 8, marble_cold_smooth: 4, brass_plate_heat: 10, ceramic_fiber_light: 7,
  };
  return m[t];
}

export function surfaceSmooth(t: MarverType): number {
  const m: Record<MarverType, number> = {
    graphite_flat_slab: 9, steel_table_heavy: 8, marble_cold_smooth: 10, brass_plate_heat: 7, ceramic_fiber_light: 6,
  };
  return m[t];
}

export function shapeControl(t: MarverType): number {
  const m: Record<MarverType, number> = {
    graphite_flat_slab: 10, steel_table_heavy: 8, marble_cold_smooth: 7, brass_plate_heat: 9, ceramic_fiber_light: 6,
  };
  return m[t];
}

export function durability(t: MarverType): number {
  const m: Record<MarverType, number> = {
    graphite_flat_slab: 7, steel_table_heavy: 10, marble_cold_smooth: 8, brass_plate_heat: 9, ceramic_fiber_light: 5,
  };
  return m[t];
}

export function marverCost(t: MarverType): number {
  const m: Record<MarverType, number> = {
    graphite_flat_slab: 3, steel_table_heavy: 4, marble_cold_smooth: 5, brass_plate_heat: 4, ceramic_fiber_light: 2,
  };
  return m[t];
}

export function nonStick(t: MarverType): boolean {
  const m: Record<MarverType, boolean> = {
    graphite_flat_slab: true, steel_table_heavy: false, marble_cold_smooth: false, brass_plate_heat: false, ceramic_fiber_light: true,
  };
  return m[t];
}

export function portable(t: MarverType): boolean {
  const m: Record<MarverType, boolean> = {
    graphite_flat_slab: true, steel_table_heavy: false, marble_cold_smooth: false, brass_plate_heat: true, ceramic_fiber_light: true,
  };
  return m[t];
}

export function surfaceMat(t: MarverType): string {
  const m: Record<MarverType, string> = {
    graphite_flat_slab: "solid_graphite_block",
    steel_table_heavy: "ground_steel_plate",
    marble_cold_smooth: "polished_marble_slab",
    brass_plate_heat: "machined_brass_plate",
    ceramic_fiber_light: "ceramic_fiber_board",
  };
  return m[t];
}

export function bestUse(t: MarverType): string {
  const m: Record<MarverType, string> = {
    graphite_flat_slab: "bead_shape_roll",
    steel_table_heavy: "production_glasswork",
    marble_cold_smooth: "cool_shape_form",
    brass_plate_heat: "heat_retain_shape",
    ceramic_fiber_light: "rest_pad_anneal",
  };
  return m[t];
}

export function marvers(): MarverType[] {
  return ["graphite_flat_slab", "steel_table_heavy", "marble_cold_smooth", "brass_plate_heat", "ceramic_fiber_light"];
}
