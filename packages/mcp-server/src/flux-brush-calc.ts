export type FluxBrushType = "acid_bristle_stiff" | "paste_applicator_dab" | "liquid_flow_pen" | "no_clean_foam_tip" | "fiberglass_prep_stick";

export function coverage(t: FluxBrushType): number {
  const m: Record<FluxBrushType, number> = {
    acid_bristle_stiff: 8, paste_applicator_dab: 6, liquid_flow_pen: 5, no_clean_foam_tip: 7, fiberglass_prep_stick: 4,
  };
  return m[t];
}

export function precision(t: FluxBrushType): number {
  const m: Record<FluxBrushType, number> = {
    acid_bristle_stiff: 5, paste_applicator_dab: 7, liquid_flow_pen: 10, no_clean_foam_tip: 6, fiberglass_prep_stick: 8,
  };
  return m[t];
}

export function cleanUp(t: FluxBrushType): number {
  const m: Record<FluxBrushType, number> = {
    acid_bristle_stiff: 4, paste_applicator_dab: 5, liquid_flow_pen: 7, no_clean_foam_tip: 10, fiberglass_prep_stick: 8,
  };
  return m[t];
}

export function durability(t: FluxBrushType): number {
  const m: Record<FluxBrushType, number> = {
    acid_bristle_stiff: 8, paste_applicator_dab: 5, liquid_flow_pen: 9, no_clean_foam_tip: 3, fiberglass_prep_stick: 7,
  };
  return m[t];
}

export function brushCost(t: FluxBrushType): number {
  const m: Record<FluxBrushType, number> = {
    acid_bristle_stiff: 1, paste_applicator_dab: 1, liquid_flow_pen: 3, no_clean_foam_tip: 1, fiberglass_prep_stick: 2,
  };
  return m[t];
}

export function disposable(t: FluxBrushType): boolean {
  const m: Record<FluxBrushType, boolean> = {
    acid_bristle_stiff: false, paste_applicator_dab: true, liquid_flow_pen: false, no_clean_foam_tip: true, fiberglass_prep_stick: false,
  };
  return m[t];
}

export function selfContained(t: FluxBrushType): boolean {
  const m: Record<FluxBrushType, boolean> = {
    acid_bristle_stiff: false, paste_applicator_dab: false, liquid_flow_pen: true, no_clean_foam_tip: false, fiberglass_prep_stick: false,
  };
  return m[t];
}

export function tipMaterial(t: FluxBrushType): string {
  const m: Record<FluxBrushType, string> = {
    acid_bristle_stiff: "natural_hog_bristle",
    paste_applicator_dab: "cotton_swab_wrap",
    liquid_flow_pen: "felt_tip_reservoir",
    no_clean_foam_tip: "polyurethane_foam",
    fiberglass_prep_stick: "fiberglass_bundle",
  };
  return m[t];
}

export function bestUse(t: FluxBrushType): string {
  const m: Record<FluxBrushType, string> = {
    acid_bristle_stiff: "heavy_flux_coat",
    paste_applicator_dab: "paste_flux_apply",
    liquid_flow_pen: "precise_flux_line",
    no_clean_foam_tip: "clean_solder_prep",
    fiberglass_prep_stick: "surface_oxide_clean",
  };
  return m[t];
}

export function fluxBrushes(): FluxBrushType[] {
  return ["acid_bristle_stiff", "paste_applicator_dab", "liquid_flow_pen", "no_clean_foam_tip", "fiberglass_prep_stick"];
}
