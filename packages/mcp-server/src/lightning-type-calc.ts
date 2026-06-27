export type LightningType = "cloud_to_ground" | "intracloud" | "cloud_to_cloud" | "ball_lightning" | "sprite";

export function peakCurrentKa(lightning: LightningType): number {
  const m: Record<LightningType, number> = {
    cloud_to_ground: 30, intracloud: 5, cloud_to_cloud: 10, ball_lightning: 1, sprite: 0.1,
  };
  return m[lightning];
}

export function durationMs(lightning: LightningType): number {
  const m: Record<LightningType, number> = {
    cloud_to_ground: 200, intracloud: 500, cloud_to_cloud: 300, ball_lightning: 5000, sprite: 10,
  };
  return m[lightning];
}

export function altitudeKm(lightning: LightningType): number {
  const m: Record<LightningType, number> = {
    cloud_to_ground: 5, intracloud: 8, cloud_to_cloud: 10, ball_lightning: 0.01, sprite: 70,
  };
  return m[lightning];
}

export function frequencyPercent(lightning: LightningType): number {
  const m: Record<LightningType, number> = {
    cloud_to_ground: 25, intracloud: 50, cloud_to_cloud: 20, ball_lightning: 0.1, sprite: 4.9,
  };
  return m[lightning];
}

export function dangerToHumans(lightning: LightningType): number {
  const m: Record<LightningType, number> = {
    cloud_to_ground: 10, intracloud: 2, cloud_to_cloud: 3, ball_lightning: 5, sprite: 0,
  };
  return m[lightning];
}

export function visibleFromGround(lightning: LightningType): boolean {
  const m: Record<LightningType, boolean> = {
    cloud_to_ground: true, intracloud: true, cloud_to_cloud: true, ball_lightning: true, sprite: false,
  };
  return m[lightning];
}

export function upperAtmosphere(lightning: LightningType): boolean {
  const m: Record<LightningType, boolean> = {
    cloud_to_ground: false, intracloud: false, cloud_to_cloud: false, ball_lightning: false, sprite: true,
  };
  return m[lightning];
}

export function associatedWith(lightning: LightningType): string {
  const m: Record<LightningType, string> = {
    cloud_to_ground: "thunderstorm", intracloud: "cumulonimbus", cloud_to_cloud: "storm_complex",
    ball_lightning: "unknown_mechanism", sprite: "mesospheric_discharge",
  };
  return m[lightning];
}

export function scientificInterest(lightning: LightningType): number {
  const m: Record<LightningType, number> = {
    cloud_to_ground: 6, intracloud: 5, cloud_to_cloud: 4, ball_lightning: 10, sprite: 9,
  };
  return m[lightning];
}

export function lightningTypes(): LightningType[] {
  return ["cloud_to_ground", "intracloud", "cloud_to_cloud", "ball_lightning", "sprite"];
}
