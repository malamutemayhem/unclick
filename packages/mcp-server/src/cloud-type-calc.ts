export type CloudType = "cumulus" | "stratus" | "cirrus" | "cumulonimbus" | "nimbostratus";

export function altitudeMeters(cloud: CloudType): number {
  const m: Record<CloudType, number> = {
    cumulus: 2000, stratus: 500, cirrus: 8000, cumulonimbus: 12000, nimbostratus: 3000,
  };
  return m[cloud];
}

export function precipitationRisk(cloud: CloudType): number {
  const m: Record<CloudType, number> = {
    cumulus: 3, stratus: 5, cirrus: 1, cumulonimbus: 10, nimbostratus: 9,
  };
  return m[cloud];
}

export function verticalExtent(cloud: CloudType): number {
  const m: Record<CloudType, number> = {
    cumulus: 4, stratus: 1, cirrus: 2, cumulonimbus: 10, nimbostratus: 5,
  };
  return m[cloud];
}

export function iceCrystalContent(cloud: CloudType): number {
  const m: Record<CloudType, number> = {
    cumulus: 2, stratus: 1, cirrus: 10, cumulonimbus: 7, nimbostratus: 4,
  };
  return m[cloud];
}

export function durationHours(cloud: CloudType): number {
  const m: Record<CloudType, number> = {
    cumulus: 2, stratus: 12, cirrus: 6, cumulonimbus: 1, nimbostratus: 8,
  };
  return m[cloud];
}

export function producesThunder(cloud: CloudType): boolean {
  const m: Record<CloudType, boolean> = {
    cumulus: false, stratus: false, cirrus: false, cumulonimbus: true, nimbostratus: false,
  };
  return m[cloud];
}

export function fairWeather(cloud: CloudType): boolean {
  const m: Record<CloudType, boolean> = {
    cumulus: true, stratus: false, cirrus: true, cumulonimbus: false, nimbostratus: false,
  };
  return m[cloud];
}

export function weatherIndication(cloud: CloudType): string {
  const m: Record<CloudType, string> = {
    cumulus: "fair_weather", stratus: "overcast", cirrus: "approaching_front",
    cumulonimbus: "severe_storm", nimbostratus: "steady_rain",
  };
  return m[cloud];
}

export function photographyAppeal(cloud: CloudType): number {
  const m: Record<CloudType, number> = {
    cumulus: 8, stratus: 3, cirrus: 7, cumulonimbus: 10, nimbostratus: 2,
  };
  return m[cloud];
}

export function cloudTypes(): CloudType[] {
  return ["cumulus", "stratus", "cirrus", "cumulonimbus", "nimbostratus"];
}
