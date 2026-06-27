export type TransferPaperType = "graphite_carbon_sheet" | "wax_free_trace" | "saral_color_roll" | "iron_on_laser" | "acetone_inkjet_print";

export function lineClarity(t: TransferPaperType): number {
  const m: Record<TransferPaperType, number> = {
    graphite_carbon_sheet: 7, wax_free_trace: 8, saral_color_roll: 9, iron_on_laser: 10, acetone_inkjet_print: 6,
  };
  return m[t];
}

export function easeOfUse(t: TransferPaperType): number {
  const m: Record<TransferPaperType, number> = {
    graphite_carbon_sheet: 9, wax_free_trace: 8, saral_color_roll: 7, iron_on_laser: 5, acetone_inkjet_print: 6,
  };
  return m[t];
}

export function cleanRemove(t: TransferPaperType): number {
  const m: Record<TransferPaperType, number> = {
    graphite_carbon_sheet: 6, wax_free_trace: 9, saral_color_roll: 8, iron_on_laser: 4, acetone_inkjet_print: 5,
  };
  return m[t];
}

export function reusable(t: TransferPaperType): number {
  const m: Record<TransferPaperType, number> = {
    graphite_carbon_sheet: 8, wax_free_trace: 5, saral_color_roll: 9, iron_on_laser: 3, acetone_inkjet_print: 2,
  };
  return m[t];
}

export function paperCost(t: TransferPaperType): number {
  const m: Record<TransferPaperType, number> = {
    graphite_carbon_sheet: 1, wax_free_trace: 2, saral_color_roll: 2, iron_on_laser: 3, acetone_inkjet_print: 1,
  };
  return m[t];
}

export function waxFree(t: TransferPaperType): boolean {
  const m: Record<TransferPaperType, boolean> = {
    graphite_carbon_sheet: false, wax_free_trace: true, saral_color_roll: true, iron_on_laser: true, acetone_inkjet_print: true,
  };
  return m[t];
}

export function needsHeat(t: TransferPaperType): boolean {
  const m: Record<TransferPaperType, boolean> = {
    graphite_carbon_sheet: false, wax_free_trace: false, saral_color_roll: false, iron_on_laser: true, acetone_inkjet_print: false,
  };
  return m[t];
}

export function transferMed(t: TransferPaperType): string {
  const m: Record<TransferPaperType, string> = {
    graphite_carbon_sheet: "graphite_wax_layer",
    wax_free_trace: "chalk_powder_coat",
    saral_color_roll: "wax_free_pigment",
    iron_on_laser: "toner_heat_transfer",
    acetone_inkjet_print: "inkjet_solvent_lift",
  };
  return m[t];
}

export function bestUse(t: TransferPaperType): string {
  const m: Record<TransferPaperType, string> = {
    graphite_carbon_sheet: "quick_trace_outline",
    wax_free_trace: "clean_wood_transfer",
    saral_color_roll: "visible_dark_surface",
    iron_on_laser: "photo_detail_transfer",
    acetone_inkjet_print: "inkjet_image_lift",
  };
  return m[t];
}

export function transferPapers(): TransferPaperType[] {
  return ["graphite_carbon_sheet", "wax_free_trace", "saral_color_roll", "iron_on_laser", "acetone_inkjet_print"];
}
