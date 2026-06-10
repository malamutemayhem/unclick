export type FixativeSprayType = "workable_rework_light" | "final_permanent_seal" | "matte_no_gloss_flat" | "gloss_shine_finish" | "uv_protect_archival";

export function protectionLevel(t: FixativeSprayType): number {
  const m: Record<FixativeSprayType, number> = {
    workable_rework_light: 5, final_permanent_seal: 10, matte_no_gloss_flat: 8, gloss_shine_finish: 8, uv_protect_archival: 10,
  };
  return m[t];
}

export function smudgeResist(t: FixativeSprayType): number {
  const m: Record<FixativeSprayType, number> = {
    workable_rework_light: 5, final_permanent_seal: 10, matte_no_gloss_flat: 8, gloss_shine_finish: 9, uv_protect_archival: 9,
  };
  return m[t];
}

export function reworkAbility(t: FixativeSprayType): number {
  const m: Record<FixativeSprayType, number> = {
    workable_rework_light: 10, final_permanent_seal: 1, matte_no_gloss_flat: 3, gloss_shine_finish: 2, uv_protect_archival: 2,
  };
  return m[t];
}

export function colorShift(t: FixativeSprayType): number {
  const m: Record<FixativeSprayType, number> = {
    workable_rework_light: 2, final_permanent_seal: 4, matte_no_gloss_flat: 2, gloss_shine_finish: 5, uv_protect_archival: 1,
  };
  return m[t];
}

export function sprayCost(t: FixativeSprayType): number {
  const m: Record<FixativeSprayType, number> = {
    workable_rework_light: 2, final_permanent_seal: 3, matte_no_gloss_flat: 3, gloss_shine_finish: 3, uv_protect_archival: 5,
  };
  return m[t];
}

export function archivalGrade(t: FixativeSprayType): boolean {
  const m: Record<FixativeSprayType, boolean> = {
    workable_rework_light: false, final_permanent_seal: true, matte_no_gloss_flat: false, gloss_shine_finish: false, uv_protect_archival: true,
  };
  return m[t];
}

export function matteFinish(t: FixativeSprayType): boolean {
  const m: Record<FixativeSprayType, boolean> = {
    workable_rework_light: true, final_permanent_seal: false, matte_no_gloss_flat: true, gloss_shine_finish: false, uv_protect_archival: true,
  };
  return m[t];
}

export function sprayBase(t: FixativeSprayType): string {
  const m: Record<FixativeSprayType, string> = {
    workable_rework_light: "light_resin_mist",
    final_permanent_seal: "heavy_acrylic_coat",
    matte_no_gloss_flat: "matte_resin_diffuse",
    gloss_shine_finish: "gloss_acrylic_polymer",
    uv_protect_archival: "uv_inhibitor_varnish",
  };
  return m[t];
}

export function bestMedium(t: FixativeSprayType): string {
  const m: Record<FixativeSprayType, string> = {
    workable_rework_light: "charcoal_pastel_wip",
    final_permanent_seal: "finished_pencil_drawing",
    matte_no_gloss_flat: "graphite_sketch_exhibit",
    gloss_shine_finish: "color_pencil_vibrant",
    uv_protect_archival: "museum_display_archive",
  };
  return m[t];
}

export function fixativeSprays(): FixativeSprayType[] {
  return ["workable_rework_light", "final_permanent_seal", "matte_no_gloss_flat", "gloss_shine_finish", "uv_protect_archival"];
}
