export type HotPaletteType =
  | "griddle_palette_large"
  | "pancake_griddle_budget"
  | "anodized_palette_pro"
  | "travel_palette_small"
  | "multi_zone_palette";

const specs: Record<HotPaletteType, {
  heatEven: number; tempControl: number; surfaceArea: number;
  portability: number; cost: number; multiZone: boolean; anodized: boolean;
  surfaceType: string; use: string;
}> = {
  griddle_palette_large: {
    heatEven: 88, tempControl: 82, surfaceArea: 92,
    portability: 70, cost: 8, multiZone: false, anodized: false,
    surfaceType: "flat_steel_griddle", use: "general_studio_melt",
  },
  pancake_griddle_budget: {
    heatEven: 80, tempControl: 75, surfaceArea: 85,
    portability: 78, cost: 4, multiZone: false, anodized: false,
    surfaceType: "nonstick_flat_plate", use: "beginner_budget_setup",
  },
  anodized_palette_pro: {
    heatEven: 92, tempControl: 90, surfaceArea: 88,
    portability: 72, cost: 14, multiZone: false, anodized: true,
    surfaceType: "anodized_aluminum_top", use: "professional_even_melt",
  },
  travel_palette_small: {
    heatEven: 82, tempControl: 80, surfaceArea: 70,
    portability: 95, cost: 10, multiZone: false, anodized: false,
    surfaceType: "compact_plate_mini", use: "plein_air_portable",
  },
  multi_zone_palette: {
    heatEven: 85, tempControl: 95, surfaceArea: 90,
    portability: 68, cost: 16, multiZone: true, anodized: true,
    surfaceType: "sectioned_heat_zone", use: "multi_temp_color_mix",
  },
};

export function heatEven(t: HotPaletteType): number { return specs[t].heatEven; }
export function tempControl(t: HotPaletteType): number { return specs[t].tempControl; }
export function surfaceArea(t: HotPaletteType): number { return specs[t].surfaceArea; }
export function portability(t: HotPaletteType): number { return specs[t].portability; }
export function paletteCost(t: HotPaletteType): number { return specs[t].cost; }
export function multiZone(t: HotPaletteType): boolean { return specs[t].multiZone; }
export function anodized(t: HotPaletteType): boolean { return specs[t].anodized; }
export function surfaceType(t: HotPaletteType): string { return specs[t].surfaceType; }
export function bestUse(t: HotPaletteType): string { return specs[t].use; }
export function hotPalettes(): HotPaletteType[] { return Object.keys(specs) as HotPaletteType[]; }
