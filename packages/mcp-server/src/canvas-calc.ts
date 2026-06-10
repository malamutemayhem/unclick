export type CanvasType = "cotton_stretched" | "linen_fine" | "canvas_panel" | "canvas_pad" | "raw_unstretched";

export function paintAbsorption(t: CanvasType): number {
  const m: Record<CanvasType, number> = {
    cotton_stretched: 7, linen_fine: 5, canvas_panel: 7, canvas_pad: 8, raw_unstretched: 10,
  };
  return m[t];
}

export function surfaceTexture(t: CanvasType): number {
  const m: Record<CanvasType, number> = {
    cotton_stretched: 7, linen_fine: 10, canvas_panel: 6, canvas_pad: 5, raw_unstretched: 9,
  };
  return m[t];
}

export function archivalQuality(t: CanvasType): number {
  const m: Record<CanvasType, number> = {
    cotton_stretched: 7, linen_fine: 10, canvas_panel: 6, canvas_pad: 3, raw_unstretched: 8,
  };
  return m[t];
}

export function portability(t: CanvasType): number {
  const m: Record<CanvasType, number> = {
    cotton_stretched: 3, linen_fine: 3, canvas_panel: 8, canvas_pad: 10, raw_unstretched: 9,
  };
  return m[t];
}

export function canvasCost(t: CanvasType): number {
  const m: Record<CanvasType, number> = {
    cotton_stretched: 4, linen_fine: 9, canvas_panel: 3, canvas_pad: 2, raw_unstretched: 5,
  };
  return m[t];
}

export function preStretched(t: CanvasType): boolean {
  const m: Record<CanvasType, boolean> = {
    cotton_stretched: true, linen_fine: true, canvas_panel: false, canvas_pad: false, raw_unstretched: false,
  };
  return m[t];
}

export function preGessoed(t: CanvasType): boolean {
  const m: Record<CanvasType, boolean> = {
    cotton_stretched: true, linen_fine: true, canvas_panel: true, canvas_pad: true, raw_unstretched: false,
  };
  return m[t];
}

export function weaveType(t: CanvasType): string {
  const m: Record<CanvasType, string> = {
    cotton_stretched: "medium_duck_weave",
    linen_fine: "tight_linen_plain_weave",
    canvas_panel: "cotton_on_cardboard_back",
    canvas_pad: "sheet_bound_paper_weight",
    raw_unstretched: "unprimed_loose_roll",
  };
  return m[t];
}

export function bestMedium(t: CanvasType): string {
  const m: Record<CanvasType, string> = {
    cotton_stretched: "acrylic_oil_general",
    linen_fine: "oil_paint_fine_detail",
    canvas_panel: "student_practice_plein_air",
    canvas_pad: "sketch_study_disposable",
    raw_unstretched: "custom_size_mixed_media",
  };
  return m[t];
}

export function canvases(): CanvasType[] {
  return ["cotton_stretched", "linen_fine", "canvas_panel", "canvas_pad", "raw_unstretched"];
}
