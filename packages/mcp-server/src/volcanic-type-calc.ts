export type VolcanicType = "shield" | "stratovolcano" | "cinder_cone" | "caldera" | "lava_dome";

export function explosivityIndex(v: VolcanicType): number {
  const m: Record<VolcanicType, number> = {
    shield: 2, stratovolcano: 8, cinder_cone: 4, caldera: 10, lava_dome: 5,
  };
  return m[v];
}

export function heightMeters(v: VolcanicType): number {
  const m: Record<VolcanicType, number> = {
    shield: 4000, stratovolcano: 5000, cinder_cone: 300, caldera: 1500, lava_dome: 600,
  };
  return m[v];
}

export function lavaViscosity(v: VolcanicType): number {
  const m: Record<VolcanicType, number> = {
    shield: 2, stratovolcano: 8, cinder_cone: 5, caldera: 9, lava_dome: 10,
  };
  return m[v];
}

export function eruptionFrequency(v: VolcanicType): number {
  const m: Record<VolcanicType, number> = {
    shield: 9, stratovolcano: 5, cinder_cone: 7, caldera: 1, lava_dome: 4,
  };
  return m[v];
}

export function destructionRadius(v: VolcanicType): number {
  const m: Record<VolcanicType, number> = {
    shield: 3, stratovolcano: 8, cinder_cone: 2, caldera: 10, lava_dome: 4,
  };
  return m[v];
}

export function effusiveEruption(v: VolcanicType): boolean {
  const m: Record<VolcanicType, boolean> = {
    shield: true, stratovolcano: false, cinder_cone: true, caldera: false, lava_dome: true,
  };
  return m[v];
}

export function producesAshCloud(v: VolcanicType): boolean {
  const m: Record<VolcanicType, boolean> = {
    shield: false, stratovolcano: true, cinder_cone: true, caldera: true, lava_dome: false,
  };
  return m[v];
}

export function exampleVolcano(v: VolcanicType): string {
  const m: Record<VolcanicType, string> = {
    shield: "mauna_loa", stratovolcano: "mount_fuji",
    cinder_cone: "paricutin", caldera: "yellowstone",
    lava_dome: "mount_st_helens_dome",
  };
  return m[v];
}

export function primaryLavaType(v: VolcanicType): string {
  const m: Record<VolcanicType, string> = {
    shield: "basaltic", stratovolcano: "andesitic",
    cinder_cone: "basaltic", caldera: "rhyolitic",
    lava_dome: "dacitic",
  };
  return m[v];
}

export function volcanicTypes(): VolcanicType[] {
  return ["shield", "stratovolcano", "cinder_cone", "caldera", "lava_dome"];
}
