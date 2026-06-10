export type PrintSqueegeeType = "sharp_edge_graphic" | "round_edge_textile" | "flat_edge_flood" | "v_notch_specialty" | "composite_dual_blade";

export function inkPush(t: PrintSqueegeeType): number {
  const m: Record<PrintSqueegeeType, number> = {
    sharp_edge_graphic: 10, round_edge_textile: 8, flat_edge_flood: 6, v_notch_specialty: 7, composite_dual_blade: 9,
  };
  return m[t];
}

export function edgeSharpness(t: PrintSqueegeeType): number {
  const m: Record<PrintSqueegeeType, number> = {
    sharp_edge_graphic: 10, round_edge_textile: 5, flat_edge_flood: 3, v_notch_specialty: 8, composite_dual_blade: 7,
  };
  return m[t];
}

export function inkDeposit(t: PrintSqueegeeType): number {
  const m: Record<PrintSqueegeeType, number> = {
    sharp_edge_graphic: 4, round_edge_textile: 9, flat_edge_flood: 10, v_notch_specialty: 6, composite_dual_blade: 7,
  };
  return m[t];
}

export function bladeLife(t: PrintSqueegeeType): number {
  const m: Record<PrintSqueegeeType, number> = {
    sharp_edge_graphic: 7, round_edge_textile: 8, flat_edge_flood: 9, v_notch_specialty: 6, composite_dual_blade: 10,
  };
  return m[t];
}

export function squeegeeCost(t: PrintSqueegeeType): number {
  const m: Record<PrintSqueegeeType, number> = {
    sharp_edge_graphic: 2, round_edge_textile: 1, flat_edge_flood: 1, v_notch_specialty: 3, composite_dual_blade: 3,
  };
  return m[t];
}

export function forGraphic(t: PrintSqueegeeType): boolean {
  const m: Record<PrintSqueegeeType, boolean> = {
    sharp_edge_graphic: true, round_edge_textile: false, flat_edge_flood: false, v_notch_specialty: true, composite_dual_blade: true,
  };
  return m[t];
}

export function forFloodCoat(t: PrintSqueegeeType): boolean {
  const m: Record<PrintSqueegeeType, boolean> = {
    sharp_edge_graphic: false, round_edge_textile: false, flat_edge_flood: true, v_notch_specialty: false, composite_dual_blade: false,
  };
  return m[t];
}

export function bladeMaterial(t: PrintSqueegeeType): string {
  const m: Record<PrintSqueegeeType, string> = {
    sharp_edge_graphic: "polyurethane_70_duro",
    round_edge_textile: "rubber_60_duro_soft",
    flat_edge_flood: "polyurethane_50_duro",
    v_notch_specialty: "polyurethane_80_duro",
    composite_dual_blade: "dual_layer_sandwich",
  };
  return m[t];
}

export function bestPrint(t: PrintSqueegeeType): string {
  const m: Record<PrintSqueegeeType, string> = {
    sharp_edge_graphic: "fine_detail_halftone",
    round_edge_textile: "thick_ink_garment",
    flat_edge_flood: "even_flood_base",
    v_notch_specialty: "uv_ink_industrial",
    composite_dual_blade: "multi_color_register",
  };
  return m[t];
}

export function printSqueegees(): PrintSqueegeeType[] {
  return ["sharp_edge_graphic", "round_edge_textile", "flat_edge_flood", "v_notch_specialty", "composite_dual_blade"];
}
