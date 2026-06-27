export type PulsarType = "radio" | "millisecond" | "magnetar" | "x_ray" | "binary";

export function rotationPeriodMs(pulsar: PulsarType): number {
  const m: Record<PulsarType, number> = {
    radio: 500, millisecond: 3, magnetar: 5000, x_ray: 1000, binary: 30,
  };
  return m[pulsar];
}

export function magneticFieldTesla(pulsar: PulsarType): number {
  const m: Record<PulsarType, number> = {
    radio: 1e8, millisecond: 1e5, magnetar: 1e11, x_ray: 1e9, binary: 1e6,
  };
  return m[pulsar];
}

export function ageMillionYears(pulsar: PulsarType): number {
  const m: Record<PulsarType, number> = {
    radio: 10, millisecond: 1000, magnetar: 0.01, x_ray: 1, binary: 500,
  };
  return m[pulsar];
}

export function luminosityRating(pulsar: PulsarType): number {
  const m: Record<PulsarType, number> = {
    radio: 5, millisecond: 3, magnetar: 10, x_ray: 8, binary: 6,
  };
  return m[pulsar];
}

export function timingPrecision(pulsar: PulsarType): number {
  const m: Record<PulsarType, number> = {
    radio: 7, millisecond: 10, magnetar: 1, x_ray: 4, binary: 8,
  };
  return m[pulsar];
}

export function emitsXRays(pulsar: PulsarType): boolean {
  const m: Record<PulsarType, boolean> = {
    radio: false, millisecond: false, magnetar: true, x_ray: true, binary: true,
  };
  return m[pulsar];
}

export function hasCompanion(pulsar: PulsarType): boolean {
  const m: Record<PulsarType, boolean> = {
    radio: false, millisecond: true, magnetar: false, x_ray: false, binary: true,
  };
  return m[pulsar];
}

export function primaryEmission(pulsar: PulsarType): string {
  const m: Record<PulsarType, string> = {
    radio: "radio_waves", millisecond: "radio_waves", magnetar: "gamma_rays",
    x_ray: "x_rays", binary: "x_rays",
  };
  return m[pulsar];
}

export function knownCount(pulsar: PulsarType): number {
  const m: Record<PulsarType, number> = {
    radio: 2000, millisecond: 400, magnetar: 30, x_ray: 200, binary: 300,
  };
  return m[pulsar];
}

export function pulsarTypes(): PulsarType[] {
  return ["radio", "millisecond", "magnetar", "x_ray", "binary"];
}
