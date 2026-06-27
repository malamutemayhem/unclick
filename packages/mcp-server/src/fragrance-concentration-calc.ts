export type FragranceConcentration = "parfum" | "edp" | "edt" | "cologne" | "body_mist";

export function oilPercentage(c: FragranceConcentration): number {
  const m: Record<FragranceConcentration, number> = {
    parfum: 10, edp: 8, edt: 6, cologne: 4, body_mist: 2,
  };
  return m[c];
}

export function longevityRating(c: FragranceConcentration): number {
  const m: Record<FragranceConcentration, number> = {
    parfum: 10, edp: 8, edt: 6, cologne: 4, body_mist: 2,
  };
  return m[c];
}

export function projectionLevel(c: FragranceConcentration): number {
  const m: Record<FragranceConcentration, number> = {
    parfum: 9, edp: 8, edt: 6, cologne: 5, body_mist: 3,
  };
  return m[c];
}

export function pricePerMl(c: FragranceConcentration): number {
  const m: Record<FragranceConcentration, number> = {
    parfum: 10, edp: 7, edt: 5, cologne: 4, body_mist: 2,
  };
  return m[c];
}

export function skinSensitivity(c: FragranceConcentration): number {
  const m: Record<FragranceConcentration, number> = {
    parfum: 8, edp: 6, edt: 4, cologne: 3, body_mist: 2,
  };
  return m[c];
}

export function dailyWearSuitable(c: FragranceConcentration): boolean {
  const m: Record<FragranceConcentration, boolean> = {
    parfum: false, edp: true, edt: true, cologne: true, body_mist: true,
  };
  return m[c];
}

export function reapplicationNeeded(c: FragranceConcentration): boolean {
  const m: Record<FragranceConcentration, boolean> = {
    parfum: false, edp: false, edt: true, cologne: true, body_mist: true,
  };
  return m[c];
}

export function applicationMethod(c: FragranceConcentration): string {
  const m: Record<FragranceConcentration, string> = {
    parfum: "dab_pulse_points", edp: "spray_2_3_times",
    edt: "spray_3_4_times", cologne: "spray_liberally",
    body_mist: "spray_all_over",
  };
  return m[c];
}

export function typicalBottleSize(c: FragranceConcentration): string {
  const m: Record<FragranceConcentration, string> = {
    parfum: "15ml_30ml", edp: "50ml_100ml",
    edt: "50ml_100ml", cologne: "100ml_200ml",
    body_mist: "200ml_250ml",
  };
  return m[c];
}

export function fragranceConcentrations(): FragranceConcentration[] {
  return ["parfum", "edp", "edt", "cologne", "body_mist"];
}
