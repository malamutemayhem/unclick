export type SemiconductorType = "silicon" | "germanium" | "gallium_arsenide" | "silicon_carbide" | "gallium_nitride";

export function bandgapEv(s: SemiconductorType): number {
  const m: Record<SemiconductorType, number> = {
    silicon: 1.12, germanium: 0.67, gallium_arsenide: 1.43, silicon_carbide: 3.26, gallium_nitride: 3.4,
  };
  return m[s];
}

export function electronMobility(s: SemiconductorType): number {
  const m: Record<SemiconductorType, number> = {
    silicon: 5, germanium: 6, gallium_arsenide: 9, silicon_carbide: 4, gallium_nitride: 7,
  };
  return m[s];
}

export function thermalConductivity(s: SemiconductorType): number {
  const m: Record<SemiconductorType, number> = {
    silicon: 6, germanium: 4, gallium_arsenide: 3, silicon_carbide: 10, gallium_nitride: 5,
  };
  return m[s];
}

export function maxOperatingTempC(s: SemiconductorType): number {
  const m: Record<SemiconductorType, number> = {
    silicon: 150, germanium: 85, gallium_arsenide: 200, silicon_carbide: 600, gallium_nitride: 400,
  };
  return m[s];
}

export function costScore(s: SemiconductorType): number {
  const m: Record<SemiconductorType, number> = {
    silicon: 1, germanium: 5, gallium_arsenide: 8, silicon_carbide: 7, gallium_nitride: 9,
  };
  return m[s];
}

export function directBandgap(s: SemiconductorType): boolean {
  const m: Record<SemiconductorType, boolean> = {
    silicon: false, germanium: false, gallium_arsenide: true, silicon_carbide: false, gallium_nitride: true,
  };
  return m[s];
}

export function elementalSemiconductor(s: SemiconductorType): boolean {
  const m: Record<SemiconductorType, boolean> = {
    silicon: true, germanium: true, gallium_arsenide: false, silicon_carbide: false, gallium_nitride: false,
  };
  return m[s];
}

export function primaryApplication(s: SemiconductorType): string {
  const m: Record<SemiconductorType, string> = {
    silicon: "integrated_circuits", germanium: "infrared_optics",
    gallium_arsenide: "solar_cells", silicon_carbide: "power_electronics",
    gallium_nitride: "leds",
  };
  return m[s];
}

export function crystalStructure(s: SemiconductorType): string {
  const m: Record<SemiconductorType, string> = {
    silicon: "diamond_cubic", germanium: "diamond_cubic",
    gallium_arsenide: "zinc_blende", silicon_carbide: "wurtzite",
    gallium_nitride: "wurtzite",
  };
  return m[s];
}

export function semiconductorTypes(): SemiconductorType[] {
  return ["silicon", "germanium", "gallium_arsenide", "silicon_carbide", "gallium_nitride"];
}
