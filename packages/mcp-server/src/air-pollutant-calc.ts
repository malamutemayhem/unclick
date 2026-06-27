export type AirPollutant = "pm25" | "pm10" | "ozone" | "nitrogen_dioxide" | "sulfur_dioxide";

export function healthImpactScore(a: AirPollutant): number {
  const m: Record<AirPollutant, number> = {
    pm25: 10, pm10: 7, ozone: 6, nitrogen_dioxide: 5, sulfur_dioxide: 8,
  };
  return m[a];
}

export function atmosphericLifetimeHours(a: AirPollutant): number {
  const m: Record<AirPollutant, number> = {
    pm25: 168, pm10: 48, ozone: 72, nitrogen_dioxide: 24, sulfur_dioxide: 96,
  };
  return m[a];
}

export function regulatoryLimitUgM3(a: AirPollutant): number {
  const m: Record<AirPollutant, number> = {
    pm25: 25, pm10: 50, ozone: 100, nitrogen_dioxide: 40, sulfur_dioxide: 20,
  };
  return m[a];
}

export function indoorPenetration(a: AirPollutant): number {
  const m: Record<AirPollutant, number> = {
    pm25: 9, pm10: 5, ozone: 3, nitrogen_dioxide: 7, sulfur_dioxide: 4,
  };
  return m[a];
}

export function climateImpact(a: AirPollutant): number {
  const m: Record<AirPollutant, number> = {
    pm25: 4, pm10: 3, ozone: 8, nitrogen_dioxide: 5, sulfur_dioxide: 6,
  };
  return m[a];
}

export function visibleSmog(a: AirPollutant): boolean {
  const m: Record<AirPollutant, boolean> = {
    pm25: true, pm10: true, ozone: false, nitrogen_dioxide: true, sulfur_dioxide: true,
  };
  return m[a];
}

export function greenhouse(a: AirPollutant): boolean {
  const m: Record<AirPollutant, boolean> = {
    pm25: false, pm10: false, ozone: true, nitrogen_dioxide: false, sulfur_dioxide: false,
  };
  return m[a];
}

export function primarySource(a: AirPollutant): string {
  const m: Record<AirPollutant, string> = {
    pm25: "combustion", pm10: "dust_construction", ozone: "photochemical_reaction",
    nitrogen_dioxide: "vehicle_exhaust", sulfur_dioxide: "coal_burning",
  };
  return m[a];
}

export function healthEffect(a: AirPollutant): string {
  const m: Record<AirPollutant, string> = {
    pm25: "lung_penetration", pm10: "respiratory_irritation",
    ozone: "chest_pain", nitrogen_dioxide: "airway_inflammation",
    sulfur_dioxide: "bronchospasm",
  };
  return m[a];
}

export function airPollutants(): AirPollutant[] {
  return ["pm25", "pm10", "ozone", "nitrogen_dioxide", "sulfur_dioxide"];
}
