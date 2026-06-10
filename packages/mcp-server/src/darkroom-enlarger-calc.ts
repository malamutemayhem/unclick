export type DarkroomEnlargerType = "condenser_35mm" | "diffusion_medium" | "color_dichroic" | "cold_light_large" | "digital_hybrid";

export function printSharpness(t: DarkroomEnlargerType): number {
  const m: Record<DarkroomEnlargerType, number> = {
    condenser_35mm: 10, diffusion_medium: 7, color_dichroic: 8, cold_light_large: 6, digital_hybrid: 9,
  };
  return m[t];
}

export function toneEvenness(t: DarkroomEnlargerType): number {
  const m: Record<DarkroomEnlargerType, number> = {
    condenser_35mm: 5, diffusion_medium: 9, color_dichroic: 8, cold_light_large: 10, digital_hybrid: 7,
  };
  return m[t];
}

export function maxNegSize(t: DarkroomEnlargerType): number {
  const m: Record<DarkroomEnlargerType, number> = {
    condenser_35mm: 3, diffusion_medium: 7, color_dichroic: 7, cold_light_large: 10, digital_hybrid: 5,
  };
  return m[t];
}

export function setupEase(t: DarkroomEnlargerType): number {
  const m: Record<DarkroomEnlargerType, number> = {
    condenser_35mm: 8, diffusion_medium: 7, color_dichroic: 5, cold_light_large: 4, digital_hybrid: 9,
  };
  return m[t];
}

export function enlargerCost(t: DarkroomEnlargerType): number {
  const m: Record<DarkroomEnlargerType, number> = {
    condenser_35mm: 4, diffusion_medium: 6, color_dichroic: 8, cold_light_large: 7, digital_hybrid: 10,
  };
  return m[t];
}

export function colorPrinting(t: DarkroomEnlargerType): boolean {
  const m: Record<DarkroomEnlargerType, boolean> = {
    condenser_35mm: false, diffusion_medium: false, color_dichroic: true, cold_light_large: false, digital_hybrid: true,
  };
  return m[t];
}

export function filterlessContrast(t: DarkroomEnlargerType): boolean {
  const m: Record<DarkroomEnlargerType, boolean> = {
    condenser_35mm: false, diffusion_medium: false, color_dichroic: true, cold_light_large: false, digital_hybrid: true,
  };
  return m[t];
}

export function lightSource(t: DarkroomEnlargerType): string {
  const m: Record<DarkroomEnlargerType, string> = {
    condenser_35mm: "tungsten_bulb_condenser",
    diffusion_medium: "opal_bulb_mixing_box",
    color_dichroic: "halogen_dichroic_head",
    cold_light_large: "fluorescent_grid_tube",
    digital_hybrid: "led_lcd_negative_scan",
  };
  return m[t];
}

export function bestPrint(t: DarkroomEnlargerType): string {
  const m: Record<DarkroomEnlargerType, string> = {
    condenser_35mm: "small_format_sharp_bw",
    diffusion_medium: "portrait_smooth_tone",
    color_dichroic: "color_print_ra4",
    cold_light_large: "large_format_mural",
    digital_hybrid: "mixed_workflow_scan_print",
  };
  return m[t];
}

export function darkroomEnlargers(): DarkroomEnlargerType[] {
  return ["condenser_35mm", "diffusion_medium", "color_dichroic", "cold_light_large", "digital_hybrid"];
}
