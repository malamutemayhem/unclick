export type VolcanoType = "shield" | "stratovolcano" | "cinder_cone" | "caldera" | "lava_dome";

export function heightMeters(volcano: VolcanoType): number {
  const m: Record<VolcanoType, number> = {
    shield: 4000, stratovolcano: 5000, cinder_cone: 300, caldera: 1000, lava_dome: 500,
  };
  return m[volcano];
}

export function explosivityIndex(volcano: VolcanoType): number {
  const m: Record<VolcanoType, number> = {
    shield: 2, stratovolcano: 8, cinder_cone: 3, caldera: 10, lava_dome: 5,
  };
  return m[volcano];
}

export function lavaViscosity(volcano: VolcanoType): number {
  const m: Record<VolcanoType, number> = {
    shield: 2, stratovolcano: 7, cinder_cone: 4, caldera: 9, lava_dome: 10,
  };
  return m[volcano];
}

export function eruptionFrequency(volcano: VolcanoType): number {
  const m: Record<VolcanoType, number> = {
    shield: 9, stratovolcano: 5, cinder_cone: 7, caldera: 1, lava_dome: 4,
  };
  return m[volcano];
}

export function hazardRadius(volcano: VolcanoType): number {
  const m: Record<VolcanoType, number> = {
    shield: 3, stratovolcano: 8, cinder_cone: 2, caldera: 10, lava_dome: 4,
  };
  return m[volcano];
}

export function effusiveEruption(volcano: VolcanoType): boolean {
  const m: Record<VolcanoType, boolean> = {
    shield: true, stratovolcano: false, cinder_cone: true, caldera: false, lava_dome: false,
  };
  return m[volcano];
}

export function pyroclasticFlowRisk(volcano: VolcanoType): boolean {
  const m: Record<VolcanoType, boolean> = {
    shield: false, stratovolcano: true, cinder_cone: false, caldera: true, lava_dome: true,
  };
  return m[volcano];
}

export function exampleVolcano(volcano: VolcanoType): string {
  const m: Record<VolcanoType, string> = {
    shield: "mauna_loa", stratovolcano: "mt_fuji", cinder_cone: "paricutin",
    caldera: "yellowstone", lava_dome: "mt_st_helens_dome",
  };
  return m[volcano];
}

export function slopeAngleDegrees(volcano: VolcanoType): number {
  const m: Record<VolcanoType, number> = {
    shield: 5, stratovolcano: 30, cinder_cone: 35, caldera: 10, lava_dome: 25,
  };
  return m[volcano];
}

export function volcanoTypes(): VolcanoType[] {
  return ["shield", "stratovolcano", "cinder_cone", "caldera", "lava_dome"];
}
