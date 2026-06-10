export type StageFloor = "hardwood_sprung" | "marley_vinyl" | "painted_mdf" | "modular_deck" | "acrylic_glass";

export function danceability(s: StageFloor): number {
  const m: Record<StageFloor, number> = {
    hardwood_sprung: 10, marley_vinyl: 9, painted_mdf: 4, modular_deck: 5, acrylic_glass: 3,
  };
  return m[s];
}

export function loadBearing(s: StageFloor): number {
  const m: Record<StageFloor, number> = {
    hardwood_sprung: 7, marley_vinyl: 5, painted_mdf: 6, modular_deck: 10, acrylic_glass: 8,
  };
  return m[s];
}

export function surfaceTraction(s: StageFloor): number {
  const m: Record<StageFloor, number> = {
    hardwood_sprung: 7, marley_vinyl: 10, painted_mdf: 5, modular_deck: 6, acrylic_glass: 3,
  };
  return m[s];
}

export function portability(s: StageFloor): number {
  const m: Record<StageFloor, number> = {
    hardwood_sprung: 2, marley_vinyl: 8, painted_mdf: 3, modular_deck: 10, acrylic_glass: 4,
  };
  return m[s];
}

export function installCost(s: StageFloor): number {
  const m: Record<StageFloor, number> = {
    hardwood_sprung: 10, marley_vinyl: 4, painted_mdf: 3, modular_deck: 7, acrylic_glass: 9,
  };
  return m[s];
}

export function underLighting(s: StageFloor): boolean {
  const m: Record<StageFloor, boolean> = {
    hardwood_sprung: false, marley_vinyl: false, painted_mdf: false, modular_deck: false, acrylic_glass: true,
  };
  return m[s];
}

export function rollUpStorage(s: StageFloor): boolean {
  const m: Record<StageFloor, boolean> = {
    hardwood_sprung: false, marley_vinyl: true, painted_mdf: false, modular_deck: false, acrylic_glass: false,
  };
  return m[s];
}

export function surfaceMaterial(s: StageFloor): string {
  const m: Record<StageFloor, string> = {
    hardwood_sprung: "maple_oak_basket_weave_spring", marley_vinyl: "pvc_sheet_matte_roll",
    painted_mdf: "sealed_mdf_scenic_paint", modular_deck: "aluminum_frame_plywood_top",
    acrylic_glass: "tempered_acrylic_panel_led",
  };
  return m[s];
}

export function bestVenue(s: StageFloor): string {
  const m: Record<StageFloor, string> = {
    hardwood_sprung: "permanent_dance_studio", marley_vinyl: "ballet_contemporary_touring",
    painted_mdf: "scenic_set_piece", modular_deck: "outdoor_event_concert",
    acrylic_glass: "fashion_show_gala_effect",
  };
  return m[s];
}

export function stageFloors(): StageFloor[] {
  return ["hardwood_sprung", "marley_vinyl", "painted_mdf", "modular_deck", "acrylic_glass"];
}
