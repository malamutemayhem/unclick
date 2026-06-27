export type SeverityLevel = "minimal" | "minor" | "moderate" | "severe" | "extreme";

export interface WeatherCondition {
  type: string;
  severity: SeverityLevel;
  score: number;
  recommendation: string;
}

export function heatIndex(tempC: number, humidityPercent: number): number {
  const T = tempC * 9 / 5 + 32;
  const R = humidityPercent;
  if (T < 80) return parseFloat(((T * 5 / 9 - 32) * 5 / 9 + 32).toFixed(1));
  const hi = -42.379 + 2.04901523 * T + 10.14333127 * R
    - 0.22475541 * T * R - 0.00683783 * T * T
    - 0.05481717 * R * R + 0.00122874 * T * T * R
    + 0.00085282 * T * R * R - 0.00000199 * T * T * R * R;
  return parseFloat(((hi - 32) * 5 / 9).toFixed(1));
}

export function windChill(tempC: number, windSpeedKmh: number): number {
  if (tempC > 10 || windSpeedKmh < 4.8) return tempC;
  const wc = 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windSpeedKmh, 0.16)
    + 0.3965 * tempC * Math.pow(windSpeedKmh, 0.16);
  return parseFloat(wc.toFixed(1));
}

export function dewPoint(tempC: number, humidityPercent: number): number {
  const a = 17.27;
  const b = 237.7;
  const gamma = (a * tempC) / (b + tempC) + Math.log(humidityPercent / 100);
  return parseFloat(((b * gamma) / (a - gamma)).toFixed(1));
}

export function beaufortScale(windSpeedKmh: number): { force: number; description: string } {
  const thresholds: [number, number, string][] = [
    [0, 1, "Calm"], [1, 6, "Light air"], [2, 12, "Light breeze"],
    [3, 20, "Gentle breeze"], [4, 29, "Moderate breeze"], [5, 39, "Fresh breeze"],
    [6, 50, "Strong breeze"], [7, 62, "Near gale"], [8, 75, "Gale"],
    [9, 89, "Strong gale"], [10, 103, "Storm"], [11, 118, "Violent storm"],
  ];
  for (const [force, max, desc] of thresholds) {
    if (windSpeedKmh < max) return { force, description: desc };
  }
  return { force: 12, description: "Hurricane force" };
}

export function uvSeverity(uvIndex: number): SeverityLevel {
  if (uvIndex < 3) return "minimal";
  if (uvIndex < 6) return "moderate";
  if (uvIndex < 8) return "severe";
  if (uvIndex < 11) return "extreme";
  return "extreme";
}

export function visibilityCategory(visibilityKm: number): string {
  if (visibilityKm >= 10) return "clear";
  if (visibilityKm >= 4) return "moderate";
  if (visibilityKm >= 1) return "poor";
  if (visibilityKm >= 0.1) return "fog";
  return "dense fog";
}

export function thunderstormRisk(capeJkg: number, shearMs: number): SeverityLevel {
  if (capeJkg < 300) return "minimal";
  if (capeJkg < 1000) return shearMs > 15 ? "moderate" : "minor";
  if (capeJkg < 2500) return shearMs > 20 ? "severe" : "moderate";
  return shearMs > 25 ? "extreme" : "severe";
}

export function floodRisk(rainfallMm: number, durationHours: number, soilSaturation: number): SeverityLevel {
  const rate = rainfallMm / durationHours;
  const satFactor = soilSaturation > 80 ? 2 : soilSaturation > 50 ? 1.5 : 1;
  const adjusted = rate * satFactor;
  if (adjusted < 5) return "minimal";
  if (adjusted < 15) return "minor";
  if (adjusted < 30) return "moderate";
  if (adjusted < 60) return "severe";
  return "extreme";
}

export function airQualityCategory(aqi: number): string {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

export function pollenSeverity(grainsPm3: number): SeverityLevel {
  if (grainsPm3 < 20) return "minimal";
  if (grainsPm3 < 80) return "minor";
  if (grainsPm3 < 200) return "moderate";
  if (grainsPm3 < 500) return "severe";
  return "extreme";
}

export function frostRisk(tempC: number, dewPointC: number, windSpeedKmh: number): boolean {
  const wc = windChill(tempC, windSpeedKmh);
  return wc <= 2 || dewPointC <= 0;
}

export function saffirSimpson(windSpeedKmh: number): number {
  if (windSpeedKmh < 119) return 0;
  if (windSpeedKmh < 154) return 1;
  if (windSpeedKmh < 178) return 2;
  if (windSpeedKmh < 209) return 3;
  if (windSpeedKmh < 252) return 4;
  return 5;
}

export function tornadoEF(windSpeedKmh: number): number {
  if (windSpeedKmh < 105) return 0;
  if (windSpeedKmh < 138) return 1;
  if (windSpeedKmh < 179) return 2;
  if (windSpeedKmh < 219) return 3;
  if (windSpeedKmh < 267) return 4;
  return 5;
}

export function drivingCondition(
  tempC: number,
  visibilityKm: number,
  windSpeedKmh: number,
  precipMmh: number,
): string {
  if (visibilityKm < 0.5 || precipMmh > 50 || windSpeedKmh > 100) return "dangerous";
  if (visibilityKm < 2 || precipMmh > 20 || windSpeedKmh > 70 || tempC < -10) return "poor";
  if (visibilityKm < 5 || precipMmh > 5 || windSpeedKmh > 40 || tempC < 0) return "fair";
  return "good";
}

export function compositeScore(conditions: WeatherCondition[]): number {
  if (conditions.length === 0) return 0;
  return parseFloat((conditions.reduce((s, c) => s + c.score, 0) / conditions.length).toFixed(1));
}
