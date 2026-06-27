export type RainGauge = "tipping_bucket" | "weighing" | "optical" | "standard_manual" | "disdrometer";

export function measurementAccuracy(r: RainGauge): number {
  const m: Record<RainGauge, number> = {
    tipping_bucket: 7, weighing: 9, optical: 8, standard_manual: 6, disdrometer: 10,
  };
  return m[r];
}

export function temporalResolution(r: RainGauge): number {
  const m: Record<RainGauge, number> = {
    tipping_bucket: 8, weighing: 9, optical: 10, standard_manual: 1, disdrometer: 10,
  };
  return m[r];
}

export function heavyRainCapability(r: RainGauge): number {
  const m: Record<RainGauge, number> = {
    tipping_bucket: 5, weighing: 9, optical: 8, standard_manual: 7, disdrometer: 6,
  };
  return m[r];
}

export function maintenanceNeed(r: RainGauge): number {
  const m: Record<RainGauge, number> = {
    tipping_bucket: 5, weighing: 4, optical: 6, standard_manual: 2, disdrometer: 7,
  };
  return m[r];
}

export function instrumentCost(r: RainGauge): number {
  const m: Record<RainGauge, number> = {
    tipping_bucket: 4, weighing: 7, optical: 8, standard_manual: 1, disdrometer: 10,
  };
  return m[r];
}

export function automated(r: RainGauge): boolean {
  const m: Record<RainGauge, boolean> = {
    tipping_bucket: true, weighing: true, optical: true, standard_manual: false, disdrometer: true,
  };
  return m[r];
}

export function measuresDropSize(r: RainGauge): boolean {
  const m: Record<RainGauge, boolean> = {
    tipping_bucket: false, weighing: false, optical: true, standard_manual: false, disdrometer: true,
  };
  return m[r];
}

export function collectionMethod(r: RainGauge): string {
  const m: Record<RainGauge, string> = {
    tipping_bucket: "funnel_seesaw_bucket_tip", weighing: "collection_vessel_strain_gauge",
    optical: "laser_beam_drop_detection", standard_manual: "graduated_cylinder_funnel",
    disdrometer: "laser_acoustic_drop_spectrum",
  };
  return m[r];
}

export function bestApplication(r: RainGauge): string {
  const m: Record<RainGauge, string> = {
    tipping_bucket: "general_weather_network", weighing: "research_snowfall_mixed",
    optical: "present_weather_visibility", standard_manual: "citizen_science_garden",
    disdrometer: "precipitation_physics_research",
  };
  return m[r];
}

export function rainGauges(): RainGauge[] {
  return ["tipping_bucket", "weighing", "optical", "standard_manual", "disdrometer"];
}
