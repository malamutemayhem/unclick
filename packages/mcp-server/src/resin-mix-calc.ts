export type ResinMixType = "epoxy_two_part_clear" | "polyester_casting_fast" | "polyurethane_flex_tough" | "uv_cure_instant" | "silicone_resin_heat";

export function clarity(t: ResinMixType): number {
  const m: Record<ResinMixType, number> = {
    epoxy_two_part_clear: 10, polyester_casting_fast: 7, polyurethane_flex_tough: 6, uv_cure_instant: 9, silicone_resin_heat: 5,
  };
  return m[t];
}

export function cureTime(t: ResinMixType): number {
  const m: Record<ResinMixType, number> = {
    epoxy_two_part_clear: 4, polyester_casting_fast: 7, polyurethane_flex_tough: 6, uv_cure_instant: 10, silicone_resin_heat: 5,
  };
  return m[t];
}

export function hardness(t: ResinMixType): number {
  const m: Record<ResinMixType, number> = {
    epoxy_two_part_clear: 9, polyester_casting_fast: 8, polyurethane_flex_tough: 5, uv_cure_instant: 7, silicone_resin_heat: 4,
  };
  return m[t];
}

export function bubbleFree(t: ResinMixType): number {
  const m: Record<ResinMixType, number> = {
    epoxy_two_part_clear: 7, polyester_casting_fast: 5, polyurethane_flex_tough: 6, uv_cure_instant: 9, silicone_resin_heat: 8,
  };
  return m[t];
}

export function resinCost(t: ResinMixType): number {
  const m: Record<ResinMixType, number> = {
    epoxy_two_part_clear: 2, polyester_casting_fast: 1, polyurethane_flex_tough: 2, uv_cure_instant: 3, silicone_resin_heat: 3,
  };
  return m[t];
}

export function selfLeveling(t: ResinMixType): boolean {
  const m: Record<ResinMixType, boolean> = {
    epoxy_two_part_clear: true, polyester_casting_fast: false, polyurethane_flex_tough: false, uv_cure_instant: true, silicone_resin_heat: false,
  };
  return m[t];
}

export function uvCure(t: ResinMixType): boolean {
  const m: Record<ResinMixType, boolean> = {
    epoxy_two_part_clear: false, polyester_casting_fast: false, polyurethane_flex_tough: false, uv_cure_instant: true, silicone_resin_heat: false,
  };
  return m[t];
}

export function mixRatio(t: ResinMixType): string {
  const m: Record<ResinMixType, string> = {
    epoxy_two_part_clear: "one_to_one_volume",
    polyester_casting_fast: "catalyst_drop_ratio",
    polyurethane_flex_tough: "one_to_one_weight",
    uv_cure_instant: "single_component_uv",
    silicone_resin_heat: "ten_to_one_catalyst",
  };
  return m[t];
}

export function bestProject(t: ResinMixType): string {
  const m: Record<ResinMixType, string> = {
    epoxy_two_part_clear: "river_table_clear",
    polyester_casting_fast: "embedding_specimen",
    polyurethane_flex_tough: "flexible_prop_part",
    uv_cure_instant: "jewelry_bezel_fill",
    silicone_resin_heat: "heat_resistant_mold",
  };
  return m[t];
}

export function resinMixes(): ResinMixType[] {
  return ["epoxy_two_part_clear", "polyester_casting_fast", "polyurethane_flex_tough", "uv_cure_instant", "silicone_resin_heat"];
}
