export type ShockMountType = "elastic_suspension_spider" | "rubber_band_cradle" | "pistol_grip_handle" | "internal_capsule_float" | "magnetic_isolation_ring";

export function vibrationIsolate(t: ShockMountType): number {
  const m: Record<ShockMountType, number> = {
    elastic_suspension_spider: 9, rubber_band_cradle: 7, pistol_grip_handle: 6, internal_capsule_float: 10, magnetic_isolation_ring: 8,
  };
  return m[t];
}

export function micCompatibility(t: ShockMountType): number {
  const m: Record<ShockMountType, number> = {
    elastic_suspension_spider: 8, rubber_band_cradle: 7, pistol_grip_handle: 5, internal_capsule_float: 4, magnetic_isolation_ring: 6,
  };
  return m[t];
}

export function durability(t: ShockMountType): number {
  const m: Record<ShockMountType, number> = {
    elastic_suspension_spider: 6, rubber_band_cradle: 5, pistol_grip_handle: 9, internal_capsule_float: 8, magnetic_isolation_ring: 9,
  };
  return m[t];
}

export function adjustability(t: ShockMountType): number {
  const m: Record<ShockMountType, number> = {
    elastic_suspension_spider: 8, rubber_band_cradle: 7, pistol_grip_handle: 5, internal_capsule_float: 3, magnetic_isolation_ring: 7,
  };
  return m[t];
}

export function mountCost(t: ShockMountType): number {
  const m: Record<ShockMountType, number> = {
    elastic_suspension_spider: 2, rubber_band_cradle: 1, pistol_grip_handle: 2, internal_capsule_float: 3, magnetic_isolation_ring: 3,
  };
  return m[t];
}

export function replaceParts(t: ShockMountType): boolean {
  const m: Record<ShockMountType, boolean> = {
    elastic_suspension_spider: true, rubber_band_cradle: true, pistol_grip_handle: false, internal_capsule_float: false, magnetic_isolation_ring: false,
  };
  return m[t];
}

export function handheldUse(t: ShockMountType): boolean {
  const m: Record<ShockMountType, boolean> = {
    elastic_suspension_spider: false, rubber_band_cradle: false, pistol_grip_handle: true, internal_capsule_float: false, magnetic_isolation_ring: false,
  };
  return m[t];
}

export function suspensionType(t: ShockMountType): string {
  const m: Record<ShockMountType, string> = {
    elastic_suspension_spider: "elastic_cord_web",
    rubber_band_cradle: "rubber_o_ring_band",
    pistol_grip_handle: "rubber_gasket_internal",
    internal_capsule_float: "silicone_capsule_decoup",
    magnetic_isolation_ring: "neodymium_ring_float",
  };
  return m[t];
}

export function bestMic(t: ShockMountType): string {
  const m: Record<ShockMountType, string> = {
    elastic_suspension_spider: "large_diaphragm_condenser",
    rubber_band_cradle: "pencil_condenser_overhead",
    pistol_grip_handle: "shotgun_boom_field",
    internal_capsule_float: "premium_tube_mic",
    magnetic_isolation_ring: "ribbon_mic_studio",
  };
  return m[t];
}

export function shockMounts(): ShockMountType[] {
  return ["elastic_suspension_spider", "rubber_band_cradle", "pistol_grip_handle", "internal_capsule_float", "magnetic_isolation_ring"];
}
