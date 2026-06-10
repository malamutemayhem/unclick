export type BibType = "cotton_pullover_basic" | "silicone_catch_trough" | "smock_long_sleeve" | "bandana_drool_snap" | "disposable_paper_travel";

export function absorbency(t: BibType): number {
  const m: Record<BibType, number> = {
    cotton_pullover_basic: 8, silicone_catch_trough: 4, smock_long_sleeve: 7, bandana_drool_snap: 9, disposable_paper_travel: 5,
  };
  return m[t];
}

export function messProtect(t: BibType): number {
  const m: Record<BibType, number> = {
    cotton_pullover_basic: 6, silicone_catch_trough: 10, smock_long_sleeve: 10, bandana_drool_snap: 4, disposable_paper_travel: 7,
  };
  return m[t];
}

export function cleanEase(t: BibType): number {
  const m: Record<BibType, number> = {
    cotton_pullover_basic: 6, silicone_catch_trough: 10, smock_long_sleeve: 5, bandana_drool_snap: 6, disposable_paper_travel: 10,
  };
  return m[t];
}

export function babyComfort(t: BibType): number {
  const m: Record<BibType, number> = {
    cotton_pullover_basic: 8, silicone_catch_trough: 5, smock_long_sleeve: 6, bandana_drool_snap: 10, disposable_paper_travel: 7,
  };
  return m[t];
}

export function bibCost(t: BibType): number {
  const m: Record<BibType, number> = {
    cotton_pullover_basic: 1, silicone_catch_trough: 2, smock_long_sleeve: 2, bandana_drool_snap: 2, disposable_paper_travel: 1,
  };
  return m[t];
}

export function machineWash(t: BibType): boolean {
  const m: Record<BibType, boolean> = {
    cotton_pullover_basic: true, silicone_catch_trough: false, smock_long_sleeve: true, bandana_drool_snap: true, disposable_paper_travel: false,
  };
  return m[t];
}

export function hasCatchPocket(t: BibType): boolean {
  const m: Record<BibType, boolean> = {
    cotton_pullover_basic: false, silicone_catch_trough: true, smock_long_sleeve: false, bandana_drool_snap: false, disposable_paper_travel: false,
  };
  return m[t];
}

export function closureMethod(t: BibType): string {
  const m: Record<BibType, string> = {
    cotton_pullover_basic: "pullover_no_closure",
    silicone_catch_trough: "adjustable_neck_snap",
    smock_long_sleeve: "velcro_back_tie",
    bandana_drool_snap: "double_snap_back",
    disposable_paper_travel: "adhesive_tab_peel",
  };
  return m[t];
}

export function bestStage(t: BibType): string {
  const m: Record<BibType, string> = {
    cotton_pullover_basic: "daily_feeding_general",
    silicone_catch_trough: "solid_food_weaning",
    smock_long_sleeve: "messy_art_play",
    bandana_drool_snap: "teething_drool_phase",
    disposable_paper_travel: "restaurant_travel_quick",
  };
  return m[t];
}

export function bibs(): BibType[] {
  return ["cotton_pullover_basic", "silicone_catch_trough", "smock_long_sleeve", "bandana_drool_snap", "disposable_paper_travel"];
}
