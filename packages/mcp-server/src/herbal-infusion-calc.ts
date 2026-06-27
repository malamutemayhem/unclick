export type HerbalInfusion = "hot_water" | "cold_brew" | "decoction" | "sun_tea" | "double_infusion";

export function steepMinutes(method: HerbalInfusion): number {
  const m: Record<HerbalInfusion, number> = {
    hot_water: 10, cold_brew: 480, decoction: 30, sun_tea: 240, double_infusion: 20,
  };
  return m[method];
}

export function extractionStrength(method: HerbalInfusion): number {
  const m: Record<HerbalInfusion, number> = {
    hot_water: 6, cold_brew: 5, decoction: 9, sun_tea: 4, double_infusion: 8,
  };
  return m[method];
}

export function bitterness(method: HerbalInfusion): number {
  const m: Record<HerbalInfusion, number> = {
    hot_water: 5, cold_brew: 2, decoction: 8, sun_tea: 3, double_infusion: 6,
  };
  return m[method];
}

export function nutrientRetention(method: HerbalInfusion): number {
  const m: Record<HerbalInfusion, number> = {
    hot_water: 7, cold_brew: 8, decoction: 5, sun_tea: 7, double_infusion: 6,
  };
  return m[method];
}

export function shelfLifeHours(method: HerbalInfusion): number {
  const m: Record<HerbalInfusion, number> = {
    hot_water: 24, cold_brew: 48, decoction: 72, sun_tea: 12, double_infusion: 24,
  };
  return m[method];
}

export function heatRequired(method: HerbalInfusion): boolean {
  const m: Record<HerbalInfusion, boolean> = {
    hot_water: true, cold_brew: false, decoction: true, sun_tea: false, double_infusion: true,
  };
  return m[method];
}

export function bestPlantPart(method: HerbalInfusion): string {
  const m: Record<HerbalInfusion, string> = {
    hot_water: "leaves_flowers", cold_brew: "delicate_herbs", decoction: "roots_bark",
    sun_tea: "light_herbs", double_infusion: "mixed_herbs",
  };
  return m[method];
}

export function equipmentNeeded(method: HerbalInfusion): number {
  const m: Record<HerbalInfusion, number> = {
    hot_water: 2, cold_brew: 2, decoction: 4, sun_tea: 1, double_infusion: 3,
  };
  return m[method];
}

export function costPerServing(method: HerbalInfusion): number {
  const m: Record<HerbalInfusion, number> = {
    hot_water: 0.5, cold_brew: 0.8, decoction: 1.0, sun_tea: 0.3, double_infusion: 1.2,
  };
  return m[method];
}

export function herbalInfusions(): HerbalInfusion[] {
  return ["hot_water", "cold_brew", "decoction", "sun_tea", "double_infusion"];
}
