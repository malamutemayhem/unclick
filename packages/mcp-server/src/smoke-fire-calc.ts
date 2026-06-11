export type SmokeFireType =
  | "horsehair_mark_line"
  | "feather_mark_fine"
  | "sugar_fumed_dark"
  | "copper_wire_flash"
  | "salt_crystal_bloom";

const specs: Record<SmokeFireType, {
  markDistinct: number; controlPlace: number; repeatConsist: number;
  colorRange: number; cost: number; metallic: boolean; organic: boolean;
  markSource: string; use: string;
}> = {
  horsehair_mark_line: {
    markDistinct: 92, controlPlace: 85, repeatConsist: 72,
    colorRange: 78, cost: 10, metallic: false, organic: true,
    markSource: "burned_hair_carbon", use: "fine_line_pattern",
  },
  feather_mark_fine: {
    markDistinct: 88, controlPlace: 80, repeatConsist: 68,
    colorRange: 75, cost: 5, metallic: false, organic: true,
    markSource: "burned_feather_ash", use: "delicate_organic_mark",
  },
  sugar_fumed_dark: {
    markDistinct: 85, controlPlace: 78, repeatConsist: 80,
    colorRange: 70, cost: 3, metallic: false, organic: true,
    markSource: "caramel_carbon_fume", use: "dark_carbon_surface",
  },
  copper_wire_flash: {
    markDistinct: 90, controlPlace: 88, repeatConsist: 82,
    colorRange: 92, cost: 15, metallic: true, organic: false,
    markSource: "copper_oxide_flash", use: "metallic_color_flash",
  },
  salt_crystal_bloom: {
    markDistinct: 82, controlPlace: 72, repeatConsist: 75,
    colorRange: 85, cost: 4, metallic: false, organic: false,
    markSource: "salt_vapor_deposit", use: "crystal_bloom_texture",
  },
};

export function markDistinct(t: SmokeFireType): number { return specs[t].markDistinct; }
export function controlPlace(t: SmokeFireType): number { return specs[t].controlPlace; }
export function repeatConsist(t: SmokeFireType): number { return specs[t].repeatConsist; }
export function colorRange(t: SmokeFireType): number { return specs[t].colorRange; }
export function smokeCost(t: SmokeFireType): number { return specs[t].cost; }
export function metallic(t: SmokeFireType): boolean { return specs[t].metallic; }
export function organic(t: SmokeFireType): boolean { return specs[t].organic; }
export function markSource(t: SmokeFireType): string { return specs[t].markSource; }
export function bestUse(t: SmokeFireType): string { return specs[t].use; }
export function smokeFires(): SmokeFireType[] { return Object.keys(specs) as SmokeFireType[]; }
