export type CarCoverType = "universal_polyester_basic" | "custom_fit_breathable" | "indoor_flannel_soft" | "all_weather_multi_layer" | "carport_portable_canopy";

export function weatherProtect(t: CarCoverType): number {
  const m: Record<CarCoverType, number> = {
    universal_polyester_basic: 5, custom_fit_breathable: 8, indoor_flannel_soft: 2, all_weather_multi_layer: 10, carport_portable_canopy: 9,
  };
  return m[t];
}

export function fitQuality(t: CarCoverType): number {
  const m: Record<CarCoverType, number> = {
    universal_polyester_basic: 4, custom_fit_breathable: 10, indoor_flannel_soft: 8, all_weather_multi_layer: 7, carport_portable_canopy: 3,
  };
  return m[t];
}

export function scratchProtect(t: CarCoverType): number {
  const m: Record<CarCoverType, number> = {
    universal_polyester_basic: 4, custom_fit_breathable: 8, indoor_flannel_soft: 10, all_weather_multi_layer: 7, carport_portable_canopy: 5,
  };
  return m[t];
}

export function breathability(t: CarCoverType): number {
  const m: Record<CarCoverType, number> = {
    universal_polyester_basic: 4, custom_fit_breathable: 10, indoor_flannel_soft: 8, all_weather_multi_layer: 6, carport_portable_canopy: 10,
  };
  return m[t];
}

export function coverCost(t: CarCoverType): number {
  const m: Record<CarCoverType, number> = {
    universal_polyester_basic: 2, custom_fit_breathable: 7, indoor_flannel_soft: 5, all_weather_multi_layer: 8, carport_portable_canopy: 9,
  };
  return m[t];
}

export function uvResist(t: CarCoverType): boolean {
  const m: Record<CarCoverType, boolean> = {
    universal_polyester_basic: true, custom_fit_breathable: true, indoor_flannel_soft: false, all_weather_multi_layer: true, carport_portable_canopy: true,
  };
  return m[t];
}

export function lockGrommet(t: CarCoverType): boolean {
  const m: Record<CarCoverType, boolean> = {
    universal_polyester_basic: false, custom_fit_breathable: true, indoor_flannel_soft: false, all_weather_multi_layer: true, carport_portable_canopy: false,
  };
  return m[t];
}

export function fabricLayers(t: CarCoverType): string {
  const m: Record<CarCoverType, string> = {
    universal_polyester_basic: "single_woven_polyester",
    custom_fit_breathable: "three_layer_polypropylene",
    indoor_flannel_soft: "cotton_flannel_fleece_lining",
    all_weather_multi_layer: "five_layer_silver_reflective",
    carport_portable_canopy: "heavy_duty_pe_tarp_frame",
  };
  return m[t];
}

export function bestStorage(t: CarCoverType): string {
  const m: Record<CarCoverType, string> = {
    universal_polyester_basic: "budget_outdoor_short_term",
    custom_fit_breathable: "long_term_driveway_stored",
    indoor_flannel_soft: "garage_showroom_collector",
    all_weather_multi_layer: "year_round_exposed_parking",
    carport_portable_canopy: "no_garage_permanent_shade",
  };
  return m[t];
}

export function carCovers(): CarCoverType[] {
  return ["universal_polyester_basic", "custom_fit_breathable", "indoor_flannel_soft", "all_weather_multi_layer", "carport_portable_canopy"];
}
