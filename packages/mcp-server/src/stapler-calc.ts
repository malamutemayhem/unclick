export type StaplerType = "desktop_full_strip" | "mini_portable" | "heavy_duty_100" | "electric_automatic" | "staple_free_crimp";

export function sheetCapacity(t: StaplerType): number {
  const m: Record<StaplerType, number> = {
    desktop_full_strip: 6, mini_portable: 3, heavy_duty_100: 10, electric_automatic: 7, staple_free_crimp: 2,
  };
  return m[t];
}

export function easeOfUse(t: StaplerType): number {
  const m: Record<StaplerType, number> = {
    desktop_full_strip: 7, mini_portable: 6, heavy_duty_100: 4, electric_automatic: 10, staple_free_crimp: 8,
  };
  return m[t];
}

export function jamResistance(t: StaplerType): number {
  const m: Record<StaplerType, number> = {
    desktop_full_strip: 6, mini_portable: 4, heavy_duty_100: 8, electric_automatic: 9, staple_free_crimp: 10,
  };
  return m[t];
}

export function portability(t: StaplerType): number {
  const m: Record<StaplerType, number> = {
    desktop_full_strip: 5, mini_portable: 10, heavy_duty_100: 2, electric_automatic: 3, staple_free_crimp: 8,
  };
  return m[t];
}

export function staplerCost(t: StaplerType): number {
  const m: Record<StaplerType, number> = {
    desktop_full_strip: 2, mini_portable: 1, heavy_duty_100: 5, electric_automatic: 8, staple_free_crimp: 3,
  };
  return m[t];
}

export function needsStaples(t: StaplerType): boolean {
  const m: Record<StaplerType, boolean> = {
    desktop_full_strip: true, mini_portable: true, heavy_duty_100: true, electric_automatic: true, staple_free_crimp: false,
  };
  return m[t];
}

export function flatClinch(t: StaplerType): boolean {
  const m: Record<StaplerType, boolean> = {
    desktop_full_strip: true, mini_portable: false, heavy_duty_100: true, electric_automatic: true, staple_free_crimp: false,
  };
  return m[t];
}

export function driveType(t: StaplerType): string {
  const m: Record<StaplerType, string> = {
    desktop_full_strip: "spring_lever_manual",
    mini_portable: "compact_spring_press",
    heavy_duty_100: "lever_assist_heavy",
    electric_automatic: "motor_sensor_auto",
    staple_free_crimp: "paper_crimp_no_metal",
  };
  return m[t];
}

export function bestUse(t: StaplerType): string {
  const m: Record<StaplerType, string> = {
    desktop_full_strip: "general_office_desk",
    mini_portable: "backpack_travel_light",
    heavy_duty_100: "print_shop_bulk_bind",
    electric_automatic: "high_volume_mailroom",
    staple_free_crimp: "eco_friendly_school",
  };
  return m[t];
}

export function staplers(): StaplerType[] {
  return ["desktop_full_strip", "mini_portable", "heavy_duty_100", "electric_automatic", "staple_free_crimp"];
}
