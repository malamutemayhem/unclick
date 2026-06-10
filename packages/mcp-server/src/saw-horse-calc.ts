export type SawHorseType = "folding_steel_light" | "heavy_duty_fixed" | "plastic_stack_nest" | "adjustable_height_clamp" | "log_sawhorse_x_frame";

export function loadCapacity(t: SawHorseType): number {
  const m: Record<SawHorseType, number> = {
    folding_steel_light: 5, heavy_duty_fixed: 10, plastic_stack_nest: 4, adjustable_height_clamp: 7, log_sawhorse_x_frame: 8,
  };
  return m[t];
}

export function portability(t: SawHorseType): number {
  const m: Record<SawHorseType, number> = {
    folding_steel_light: 9, heavy_duty_fixed: 2, plastic_stack_nest: 10, adjustable_height_clamp: 6, log_sawhorse_x_frame: 3,
  };
  return m[t];
}

export function stability(t: SawHorseType): number {
  const m: Record<SawHorseType, number> = {
    folding_steel_light: 6, heavy_duty_fixed: 10, plastic_stack_nest: 5, adjustable_height_clamp: 7, log_sawhorse_x_frame: 9,
  };
  return m[t];
}

export function setupSpeed(t: SawHorseType): number {
  const m: Record<SawHorseType, number> = {
    folding_steel_light: 9, heavy_duty_fixed: 3, plastic_stack_nest: 10, adjustable_height_clamp: 6, log_sawhorse_x_frame: 4,
  };
  return m[t];
}

export function horseCost(t: SawHorseType): number {
  const m: Record<SawHorseType, number> = {
    folding_steel_light: 3, heavy_duty_fixed: 6, plastic_stack_nest: 2, adjustable_height_clamp: 7, log_sawhorse_x_frame: 5,
  };
  return m[t];
}

export function foldFlat(t: SawHorseType): boolean {
  const m: Record<SawHorseType, boolean> = {
    folding_steel_light: true, heavy_duty_fixed: false, plastic_stack_nest: false, adjustable_height_clamp: true, log_sawhorse_x_frame: false,
  };
  return m[t];
}

export function hasClamp(t: SawHorseType): boolean {
  const m: Record<SawHorseType, boolean> = {
    folding_steel_light: false, heavy_duty_fixed: false, plastic_stack_nest: false, adjustable_height_clamp: true, log_sawhorse_x_frame: false,
  };
  return m[t];
}

export function legMaterial(t: SawHorseType): string {
  const m: Record<SawHorseType, string> = {
    folding_steel_light: "tubular_steel_powder_coat",
    heavy_duty_fixed: "solid_steel_welded_frame",
    plastic_stack_nest: "high_density_polypropylene",
    adjustable_height_clamp: "aluminum_telescoping_leg",
    log_sawhorse_x_frame: "treated_lumber_cross_brace",
  };
  return m[t];
}

export function bestTask(t: SawHorseType): string {
  const m: Record<SawHorseType, string> = {
    folding_steel_light: "jobsite_cutting_station",
    heavy_duty_fixed: "permanent_workshop_bench",
    plastic_stack_nest: "painting_drying_rack",
    adjustable_height_clamp: "precision_woodworking_hold",
    log_sawhorse_x_frame: "firewood_bucking_outdoor",
  };
  return m[t];
}

export function sawHorses(): SawHorseType[] {
  return ["folding_steel_light", "heavy_duty_fixed", "plastic_stack_nest", "adjustable_height_clamp", "log_sawhorse_x_frame"];
}
