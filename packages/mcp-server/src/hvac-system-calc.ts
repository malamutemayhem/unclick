export type HvacSystem = "split" | "packaged" | "ductless_mini" | "geothermal" | "vrf";

export function efficiencySeer(h: HvacSystem): number {
  const m: Record<HvacSystem, number> = {
    split: 16, packaged: 14, ductless_mini: 20, geothermal: 25, vrf: 22,
  };
  return m[h];
}

export function installCost(h: HvacSystem): number {
  const m: Record<HvacSystem, number> = {
    split: 5, packaged: 4, ductless_mini: 6, geothermal: 10, vrf: 9,
  };
  return m[h];
}

export function operatingCost(h: HvacSystem): number {
  const m: Record<HvacSystem, number> = {
    split: 5, packaged: 6, ductless_mini: 3, geothermal: 2, vrf: 3,
  };
  return m[h];
}

export function zoneControl(h: HvacSystem): number {
  const m: Record<HvacSystem, number> = {
    split: 4, packaged: 3, ductless_mini: 9, geothermal: 5, vrf: 10,
  };
  return m[h];
}

export function noiseLevel(h: HvacSystem): number {
  const m: Record<HvacSystem, number> = {
    split: 5, packaged: 7, ductless_mini: 3, geothermal: 2, vrf: 3,
  };
  return m[h];
}

export function requiresDuctwork(h: HvacSystem): boolean {
  const m: Record<HvacSystem, boolean> = {
    split: true, packaged: true, ductless_mini: false, geothermal: true, vrf: false,
  };
  return m[h];
}

export function providesHeatingAndCooling(h: HvacSystem): boolean {
  const m: Record<HvacSystem, boolean> = {
    split: true, packaged: true, ductless_mini: true, geothermal: true, vrf: true,
  };
  return m[h];
}

export function bestApplication(h: HvacSystem): string {
  const m: Record<HvacSystem, string> = {
    split: "residential_standard", packaged: "commercial_rooftop",
    ductless_mini: "room_addition_retrofit", geothermal: "new_construction_eco",
    vrf: "commercial_multi_zone",
  };
  return m[h];
}

export function refrigerantType(h: HvacSystem): string {
  const m: Record<HvacSystem, string> = {
    split: "r410a", packaged: "r410a",
    ductless_mini: "r32", geothermal: "r410a",
    vrf: "r410a_r32",
  };
  return m[h];
}

export function hvacSystems(): HvacSystem[] {
  return ["split", "packaged", "ductless_mini", "geothermal", "vrf"];
}
