export type PrecipitationType = "rain" | "snow" | "sleet" | "hail" | "freezing_rain";

export function fallSpeedMs(precip: PrecipitationType): number {
  const m: Record<PrecipitationType, number> = {
    rain: 9, snow: 1, sleet: 5, hail: 20, freezing_rain: 9,
  };
  return m[precip];
}

export function formationTempCelsius(precip: PrecipitationType): number {
  const m: Record<PrecipitationType, number> = {
    rain: 5, snow: -5, sleet: -2, hail: -20, freezing_rain: -1,
  };
  return m[precip];
}

export function accumulationRate(precip: PrecipitationType): number {
  const m: Record<PrecipitationType, number> = {
    rain: 8, snow: 5, sleet: 3, hail: 2, freezing_rain: 6,
  };
  return m[precip];
}

export function drivingHazard(precip: PrecipitationType): number {
  const m: Record<PrecipitationType, number> = {
    rain: 4, snow: 7, sleet: 8, hail: 6, freezing_rain: 10,
  };
  return m[precip];
}

export function cropDamage(precip: PrecipitationType): number {
  const m: Record<PrecipitationType, number> = {
    rain: 1, snow: 3, sleet: 5, hail: 10, freezing_rain: 8,
  };
  return m[precip];
}

export function frozen(precip: PrecipitationType): boolean {
  const m: Record<PrecipitationType, boolean> = {
    rain: false, snow: true, sleet: true, hail: true, freezing_rain: false,
  };
  return m[precip];
}

export function freezesOnContact(precip: PrecipitationType): boolean {
  const m: Record<PrecipitationType, boolean> = {
    rain: false, snow: false, sleet: false, hail: false, freezing_rain: true,
  };
  return m[precip];
}

export function typicalCloudType(precip: PrecipitationType): string {
  const m: Record<PrecipitationType, string> = {
    rain: "nimbostratus", snow: "nimbostratus", sleet: "altostratus",
    hail: "cumulonimbus", freezing_rain: "stratus",
  };
  return m[precip];
}

export function averageDurationHours(precip: PrecipitationType): number {
  const m: Record<PrecipitationType, number> = {
    rain: 3, snow: 6, sleet: 2, hail: 0.25, freezing_rain: 4,
  };
  return m[precip];
}

export function precipitationTypes(): PrecipitationType[] {
  return ["rain", "snow", "sleet", "hail", "freezing_rain"];
}
