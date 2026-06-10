export type EtchingNeedleType = "echoppe_oval_swell" | "dry_point_diamond" | "carbide_tip_hard" | "roulette_wheel_texture" | "burnisher_flat_smooth";

export function lineQuality(t: EtchingNeedleType): number {
  const m: Record<EtchingNeedleType, number> = {
    echoppe_oval_swell: 10, dry_point_diamond: 8, carbide_tip_hard: 7, roulette_wheel_texture: 6, burnisher_flat_smooth: 5,
  };
  return m[t];
}

export function lineVariation(t: EtchingNeedleType): number {
  const m: Record<EtchingNeedleType, number> = {
    echoppe_oval_swell: 10, dry_point_diamond: 7, carbide_tip_hard: 5, roulette_wheel_texture: 3, burnisher_flat_smooth: 4,
  };
  return m[t];
}

export function plateWear(t: EtchingNeedleType): number {
  const m: Record<EtchingNeedleType, number> = {
    echoppe_oval_swell: 6, dry_point_diamond: 9, carbide_tip_hard: 10, roulette_wheel_texture: 7, burnisher_flat_smooth: 8,
  };
  return m[t];
}

export function controlFeel(t: EtchingNeedleType): number {
  const m: Record<EtchingNeedleType, number> = {
    echoppe_oval_swell: 8, dry_point_diamond: 9, carbide_tip_hard: 7, roulette_wheel_texture: 6, burnisher_flat_smooth: 10,
  };
  return m[t];
}

export function needleCost(t: EtchingNeedleType): number {
  const m: Record<EtchingNeedleType, number> = {
    echoppe_oval_swell: 2, dry_point_diamond: 3, carbide_tip_hard: 2, roulette_wheel_texture: 2, burnisher_flat_smooth: 1,
  };
  return m[t];
}

export function forDrypoint(t: EtchingNeedleType): boolean {
  const m: Record<EtchingNeedleType, boolean> = {
    echoppe_oval_swell: false, dry_point_diamond: true, carbide_tip_hard: true, roulette_wheel_texture: false, burnisher_flat_smooth: false,
  };
  return m[t];
}

export function forTexture(t: EtchingNeedleType): boolean {
  const m: Record<EtchingNeedleType, boolean> = {
    echoppe_oval_swell: false, dry_point_diamond: false, carbide_tip_hard: false, roulette_wheel_texture: true, burnisher_flat_smooth: false,
  };
  return m[t];
}

export function tipShape(t: EtchingNeedleType): string {
  const m: Record<EtchingNeedleType, string> = {
    echoppe_oval_swell: "oval_facet_angled",
    dry_point_diamond: "diamond_point_sharp",
    carbide_tip_hard: "conical_carbide_tip",
    roulette_wheel_texture: "toothed_wheel_roller",
    burnisher_flat_smooth: "curved_flat_polish",
  };
  return m[t];
}

export function bestPlate(t: EtchingNeedleType): string {
  const m: Record<EtchingNeedleType, string> = {
    echoppe_oval_swell: "copper_etch_ground",
    dry_point_diamond: "zinc_plate_direct",
    carbide_tip_hard: "plexiglass_acrylic",
    roulette_wheel_texture: "copper_aquatint_tone",
    burnisher_flat_smooth: "mezzotint_plate_scrape",
  };
  return m[t];
}

export function etchingNeedles(): EtchingNeedleType[] {
  return ["echoppe_oval_swell", "dry_point_diamond", "carbide_tip_hard", "roulette_wheel_texture", "burnisher_flat_smooth"];
}
