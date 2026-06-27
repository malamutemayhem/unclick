export type EmbroideryTransferType = "iron_on_pencil" | "water_soluble_pen" | "carbon_tracing_paper" | "prick_pounce_powder" | "lightbox_trace_through";

export function lineClarity(t: EmbroideryTransferType): number {
  const m: Record<EmbroideryTransferType, number> = {
    iron_on_pencil: 8, water_soluble_pen: 9, carbon_tracing_paper: 7, prick_pounce_powder: 6, lightbox_trace_through: 10,
  };
  return m[t];
}

export function removalEase(t: EmbroideryTransferType): number {
  const m: Record<EmbroideryTransferType, number> = {
    iron_on_pencil: 4, water_soluble_pen: 10, carbon_tracing_paper: 6, prick_pounce_powder: 8, lightbox_trace_through: 10,
  };
  return m[t];
}

export function detailLevel(t: EmbroideryTransferType): number {
  const m: Record<EmbroideryTransferType, number> = {
    iron_on_pencil: 7, water_soluble_pen: 9, carbon_tracing_paper: 8, prick_pounce_powder: 5, lightbox_trace_through: 10,
  };
  return m[t];
}

export function fabricRange(t: EmbroideryTransferType): number {
  const m: Record<EmbroideryTransferType, number> = {
    iron_on_pencil: 6, water_soluble_pen: 7, carbon_tracing_paper: 8, prick_pounce_powder: 10, lightbox_trace_through: 4,
  };
  return m[t];
}

export function transferCost(t: EmbroideryTransferType): number {
  const m: Record<EmbroideryTransferType, number> = {
    iron_on_pencil: 1, water_soluble_pen: 1, carbon_tracing_paper: 1, prick_pounce_powder: 2, lightbox_trace_through: 3,
  };
  return m[t];
}

export function noIronNeeded(t: EmbroideryTransferType): boolean {
  const m: Record<EmbroideryTransferType, boolean> = {
    iron_on_pencil: false, water_soluble_pen: true, carbon_tracing_paper: true, prick_pounce_powder: true, lightbox_trace_through: true,
  };
  return m[t];
}

export function reusablePattern(t: EmbroideryTransferType): boolean {
  const m: Record<EmbroideryTransferType, boolean> = {
    iron_on_pencil: false, water_soluble_pen: false, carbon_tracing_paper: true, prick_pounce_powder: true, lightbox_trace_through: true,
  };
  return m[t];
}

export function markType(t: EmbroideryTransferType): string {
  const m: Record<EmbroideryTransferType, string> = {
    iron_on_pencil: "heat_transfer_wax",
    water_soluble_pen: "water_erasable_ink",
    carbon_tracing_paper: "carbon_pressure_line",
    prick_pounce_powder: "chalk_powder_dot",
    lightbox_trace_through: "pencil_trace_direct",
  };
  return m[t];
}

export function bestUse(t: EmbroideryTransferType): string {
  const m: Record<EmbroideryTransferType, string> = {
    iron_on_pencil: "simple_motif_repeat",
    water_soluble_pen: "freehand_draw_direct",
    carbon_tracing_paper: "printed_pattern_copy",
    prick_pounce_powder: "dark_fabric_mark",
    lightbox_trace_through: "sheer_fabric_precise",
  };
  return m[t];
}

export function embroideryTransfers(): EmbroideryTransferType[] {
  return ["iron_on_pencil", "water_soluble_pen", "carbon_tracing_paper", "prick_pounce_powder", "lightbox_trace_through"];
}
