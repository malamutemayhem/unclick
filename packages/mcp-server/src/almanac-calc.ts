export type Season = "spring" | "summer" | "fall" | "winter";
export type MoonPhase = "new" | "waxing_crescent" | "first_quarter" | "waxing_gibbous" | "full" | "waning_gibbous" | "last_quarter" | "waning_crescent";

export function dayOfYear(month: number, day: number): number {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let total = 0;
  for (let i = 0; i < month - 1; i++) total += daysInMonth[i];
  return total + day;
}

export function season(dayOfYear: number, hemisphere: string): Season {
  if (hemisphere === "southern") {
    if (dayOfYear < 80 || dayOfYear >= 355) return "summer";
    if (dayOfYear < 172) return "fall";
    if (dayOfYear < 266) return "winter";
    return "spring";
  }
  if (dayOfYear < 80 || dayOfYear >= 355) return "winter";
  if (dayOfYear < 172) return "spring";
  if (dayOfYear < 266) return "summer";
  return "fall";
}

export function moonPhase(daysSinceNewMoon: number): MoonPhase {
  const phase = ((daysSinceNewMoon % 29.53) + 29.53) % 29.53;
  if (phase < 1.85) return "new";
  if (phase < 7.38) return "waxing_crescent";
  if (phase < 9.23) return "first_quarter";
  if (phase < 14.77) return "waxing_gibbous";
  if (phase < 16.61) return "full";
  if (phase < 22.15) return "waning_gibbous";
  if (phase < 23.99) return "last_quarter";
  return "waning_crescent";
}

export function sunriseApprox(latitude: number, dayOfYear: number): number {
  const decl = 23.45 * Math.sin(2 * Math.PI * (284 + dayOfYear) / 365);
  const lat = latitude * Math.PI / 180;
  const dec = decl * Math.PI / 180;
  const cosHa = -Math.tan(lat) * Math.tan(dec);
  if (cosHa <= -1) return 0;
  if (cosHa >= 1) return 12;
  const ha = Math.acos(cosHa) * 180 / Math.PI;
  return parseFloat((12 - ha / 15).toFixed(2));
}

export function sunsetApprox(latitude: number, dayOfYear: number): number {
  const sunrise = sunriseApprox(latitude, dayOfYear);
  const daylightHrs = 24 - 2 * (12 - (24 - 2 * sunrise) / 2);
  return parseFloat((sunrise + (24 - 2 * sunrise)).toFixed(2));
}

export function daylightMinutes(latitude: number, dayOfYear: number): number {
  const sunrise = sunriseApprox(latitude, dayOfYear);
  const sunset = sunsetApprox(latitude, dayOfYear);
  return parseFloat(((sunset - sunrise) * 60).toFixed(0));
}

export function frostRisk(tempC: number, humidity: number): string {
  if (tempC <= 0) return "high";
  if (tempC <= 4 && humidity < 60) return "moderate";
  return "low";
}

export function growingDegreeDays(highC: number, lowC: number, baseC: number): number {
  const avg = (highC + lowC) / 2;
  return parseFloat(Math.max(0, avg - baseC).toFixed(1));
}

export function moonPhases(): MoonPhase[] {
  return ["new", "waxing_crescent", "first_quarter", "waxing_gibbous", "full", "waning_gibbous", "last_quarter", "waning_crescent"];
}
