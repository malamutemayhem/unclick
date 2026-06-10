export type SoilTest = "spt" | "cpt" | "vane_shear" | "plate_load" | "pressuremeter";

export function depthCapability(s: SoilTest): number {
  const m: Record<SoilTest, number> = {
    spt: 8, cpt: 9, vane_shear: 5, plate_load: 2, pressuremeter: 10,
  };
  return m[s];
}

export function dataContinuity(s: SoilTest): number {
  const m: Record<SoilTest, number> = {
    spt: 3, cpt: 10, vane_shear: 2, plate_load: 1, pressuremeter: 7,
  };
  return m[s];
}

export function parameterRange(s: SoilTest): number {
  const m: Record<SoilTest, number> = {
    spt: 6, cpt: 9, vane_shear: 4, plate_load: 5, pressuremeter: 10,
  };
  return m[s];
}

export function fieldSpeed(s: SoilTest): number {
  const m: Record<SoilTest, number> = {
    spt: 6, cpt: 9, vane_shear: 7, plate_load: 2, pressuremeter: 4,
  };
  return m[s];
}

export function testCost(s: SoilTest): number {
  const m: Record<SoilTest, number> = {
    spt: 4, cpt: 7, vane_shear: 3, plate_load: 8, pressuremeter: 10,
  };
  return m[s];
}

export function requiresBorehole(s: SoilTest): boolean {
  const m: Record<SoilTest, boolean> = {
    spt: true, cpt: false, vane_shear: true, plate_load: false, pressuremeter: true,
  };
  return m[s];
}

export function retrievesSample(s: SoilTest): boolean {
  const m: Record<SoilTest, boolean> = {
    spt: true, cpt: false, vane_shear: false, plate_load: false, pressuremeter: false,
  };
  return m[s];
}

export function measurementMethod(s: SoilTest): string {
  const m: Record<SoilTest, string> = {
    spt: "blow_count_split_spoon", cpt: "cone_tip_friction_sleeve",
    vane_shear: "rotating_blade_torque", plate_load: "loaded_plate_settlement",
    pressuremeter: "expandable_probe_pressure",
  };
  return m[s];
}

export function bestSoilType(s: SoilTest): string {
  const m: Record<SoilTest, string> = {
    spt: "granular_sand_gravel", cpt: "soft_clay_silt_sand",
    vane_shear: "soft_sensitive_clay", plate_load: "shallow_bearing_capacity",
    pressuremeter: "rock_stiff_clay_sand",
  };
  return m[s];
}

export function soilTests(): SoilTest[] {
  return ["spt", "cpt", "vane_shear", "plate_load", "pressuremeter"];
}
