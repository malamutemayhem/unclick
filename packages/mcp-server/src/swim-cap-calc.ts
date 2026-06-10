export type SwimCapType = "latex_thin_classic" | "silicone_durable_smooth" | "lycra_fabric_comfort" | "neoprene_thermal_warm" | "bubble_textured_retro";

export function hydrodynamics(t: SwimCapType): number {
  const m: Record<SwimCapType, number> = {
    latex_thin_classic: 8, silicone_durable_smooth: 10, lycra_fabric_comfort: 4, neoprene_thermal_warm: 6, bubble_textured_retro: 5,
  };
  return m[t];
}

export function comfort(t: SwimCapType): number {
  const m: Record<SwimCapType, number> = {
    latex_thin_classic: 4, silicone_durable_smooth: 7, lycra_fabric_comfort: 10, neoprene_thermal_warm: 6, bubble_textured_retro: 5,
  };
  return m[t];
}

export function durability(t: SwimCapType): number {
  const m: Record<SwimCapType, number> = {
    latex_thin_classic: 3, silicone_durable_smooth: 9, lycra_fabric_comfort: 5, neoprene_thermal_warm: 8, bubble_textured_retro: 7,
  };
  return m[t];
}

export function warmth(t: SwimCapType): number {
  const m: Record<SwimCapType, number> = {
    latex_thin_classic: 3, silicone_durable_smooth: 4, lycra_fabric_comfort: 5, neoprene_thermal_warm: 10, bubble_textured_retro: 6,
  };
  return m[t];
}

export function capCost(t: SwimCapType): number {
  const m: Record<SwimCapType, number> = {
    latex_thin_classic: 1, silicone_durable_smooth: 3, lycra_fabric_comfort: 2, neoprene_thermal_warm: 5, bubble_textured_retro: 2,
  };
  return m[t];
}

export function waterTight(t: SwimCapType): boolean {
  const m: Record<SwimCapType, boolean> = {
    latex_thin_classic: true, silicone_durable_smooth: true, lycra_fabric_comfort: false, neoprene_thermal_warm: true, bubble_textured_retro: true,
  };
  return m[t];
}

export function easyOnOff(t: SwimCapType): boolean {
  const m: Record<SwimCapType, boolean> = {
    latex_thin_classic: false, silicone_durable_smooth: true, lycra_fabric_comfort: true, neoprene_thermal_warm: false, bubble_textured_retro: false,
  };
  return m[t];
}

export function capMaterial(t: SwimCapType): string {
  const m: Record<SwimCapType, string> = {
    latex_thin_classic: "natural_latex_thin",
    silicone_durable_smooth: "medical_grade_silicone",
    lycra_fabric_comfort: "nylon_lycra_stretch",
    neoprene_thermal_warm: "neoprene_insulated",
    bubble_textured_retro: "embossed_silicone_bubble",
  };
  return m[t];
}

export function bestSwim(t: SwimCapType): string {
  const m: Record<SwimCapType, string> = {
    latex_thin_classic: "competition_race_day",
    silicone_durable_smooth: "training_daily_laps",
    lycra_fabric_comfort: "recreational_aqua_class",
    neoprene_thermal_warm: "open_water_cold_swim",
    bubble_textured_retro: "leisure_style_social",
  };
  return m[t];
}

export function swimCaps(): SwimCapType[] {
  return ["latex_thin_classic", "silicone_durable_smooth", "lycra_fabric_comfort", "neoprene_thermal_warm", "bubble_textured_retro"];
}
