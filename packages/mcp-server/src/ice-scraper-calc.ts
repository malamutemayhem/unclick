export type IceScraperType = "basic_plastic_blade" | "brass_blade_heavy" | "telescoping_snow_brush" | "heated_electric_blade" | "mitt_glove_scraper";

export function scrapingPower(t: IceScraperType): number {
  const m: Record<IceScraperType, number> = {
    basic_plastic_blade: 5, brass_blade_heavy: 10, telescoping_snow_brush: 6, heated_electric_blade: 9, mitt_glove_scraper: 4,
  };
  return m[t];
}

export function reach(t: IceScraperType): number {
  const m: Record<IceScraperType, number> = {
    basic_plastic_blade: 3, brass_blade_heavy: 4, telescoping_snow_brush: 10, heated_electric_blade: 5, mitt_glove_scraper: 2,
  };
  return m[t];
}

export function handWarmth(t: IceScraperType): number {
  const m: Record<IceScraperType, number> = {
    basic_plastic_blade: 1, brass_blade_heavy: 1, telescoping_snow_brush: 3, heated_electric_blade: 5, mitt_glove_scraper: 10,
  };
  return m[t];
}

export function paintSafe(t: IceScraperType): number {
  const m: Record<IceScraperType, number> = {
    basic_plastic_blade: 8, brass_blade_heavy: 5, telescoping_snow_brush: 7, heated_electric_blade: 10, mitt_glove_scraper: 9,
  };
  return m[t];
}

export function scraperCost(t: IceScraperType): number {
  const m: Record<IceScraperType, number> = {
    basic_plastic_blade: 1, brass_blade_heavy: 3, telescoping_snow_brush: 4, heated_electric_blade: 7, mitt_glove_scraper: 2,
  };
  return m[t];
}

export function needsPower(t: IceScraperType): boolean {
  const m: Record<IceScraperType, boolean> = {
    basic_plastic_blade: false, brass_blade_heavy: false, telescoping_snow_brush: false, heated_electric_blade: true, mitt_glove_scraper: false,
  };
  return m[t];
}

export function hasSnowBrush(t: IceScraperType): boolean {
  const m: Record<IceScraperType, boolean> = {
    basic_plastic_blade: false, brass_blade_heavy: false, telescoping_snow_brush: true, heated_electric_blade: false, mitt_glove_scraper: false,
  };
  return m[t];
}

export function bladeType(t: IceScraperType): string {
  const m: Record<IceScraperType, string> = {
    basic_plastic_blade: "rigid_polycarbonate_edge",
    brass_blade_heavy: "solid_brass_beveled",
    telescoping_snow_brush: "abs_blade_foam_brush",
    heated_electric_blade: "ceramic_element_heated",
    mitt_glove_scraper: "built_in_acrylic_mini",
  };
  return m[t];
}

export function bestClimate(t: IceScraperType): string {
  const m: Record<IceScraperType, string> = {
    basic_plastic_blade: "light_frost_mild_winter",
    brass_blade_heavy: "thick_ice_extreme_cold",
    telescoping_snow_brush: "heavy_snow_suv_truck",
    heated_electric_blade: "daily_commute_cold_region",
    mitt_glove_scraper: "quick_frost_short_clear",
  };
  return m[t];
}

export function iceScrapers(): IceScraperType[] {
  return ["basic_plastic_blade", "brass_blade_heavy", "telescoping_snow_brush", "heated_electric_blade", "mitt_glove_scraper"];
}
