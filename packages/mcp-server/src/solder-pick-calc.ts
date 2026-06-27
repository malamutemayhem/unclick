export type SolderPickType = "titanium_fine_point" | "steel_bent_hook" | "tungsten_carbide_tip" | "copper_heat_sink" | "graphite_probe_flat";

export function heatResist(t: SolderPickType): number {
  const m: Record<SolderPickType, number> = {
    titanium_fine_point: 9, steel_bent_hook: 7, tungsten_carbide_tip: 10, copper_heat_sink: 6, graphite_probe_flat: 8,
  };
  return m[t];
}

export function solderRelease(t: SolderPickType): number {
  const m: Record<SolderPickType, number> = {
    titanium_fine_point: 10, steel_bent_hook: 6, tungsten_carbide_tip: 8, copper_heat_sink: 4, graphite_probe_flat: 9,
  };
  return m[t];
}

export function tipPrecision(t: SolderPickType): number {
  const m: Record<SolderPickType, number> = {
    titanium_fine_point: 10, steel_bent_hook: 7, tungsten_carbide_tip: 9, copper_heat_sink: 5, graphite_probe_flat: 6,
  };
  return m[t];
}

export function durability(t: SolderPickType): number {
  const m: Record<SolderPickType, number> = {
    titanium_fine_point: 9, steel_bent_hook: 7, tungsten_carbide_tip: 10, copper_heat_sink: 6, graphite_probe_flat: 5,
  };
  return m[t];
}

export function pickCost(t: SolderPickType): number {
  const m: Record<SolderPickType, number> = {
    titanium_fine_point: 3, steel_bent_hook: 1, tungsten_carbide_tip: 3, copper_heat_sink: 1, graphite_probe_flat: 2,
  };
  return m[t];
}

export function nonStick(t: SolderPickType): boolean {
  const m: Record<SolderPickType, boolean> = {
    titanium_fine_point: true, steel_bent_hook: false, tungsten_carbide_tip: true, copper_heat_sink: false, graphite_probe_flat: true,
  };
  return m[t];
}

export function drawsHeat(t: SolderPickType): boolean {
  const m: Record<SolderPickType, boolean> = {
    titanium_fine_point: false, steel_bent_hook: false, tungsten_carbide_tip: false, copper_heat_sink: true, graphite_probe_flat: false,
  };
  return m[t];
}

export function tipAlloy(t: SolderPickType): string {
  const m: Record<SolderPickType, string> = {
    titanium_fine_point: "grade_2_titanium",
    steel_bent_hook: "spring_steel_tempered",
    tungsten_carbide_tip: "sintered_carbide_rod",
    copper_heat_sink: "pure_copper_rod",
    graphite_probe_flat: "synthetic_graphite",
  };
  return m[t];
}

export function bestUse(t: SolderPickType): string {
  const m: Record<SolderPickType, string> = {
    titanium_fine_point: "place_solder_pallion",
    steel_bent_hook: "position_wire_joint",
    tungsten_carbide_tip: "scrape_excess_solder",
    copper_heat_sink: "heat_draw_protect",
    graphite_probe_flat: "hold_piece_stable",
  };
  return m[t];
}

export function solderPicks(): SolderPickType[] {
  return ["titanium_fine_point", "steel_bent_hook", "tungsten_carbide_tip", "copper_heat_sink", "graphite_probe_flat"];
}
