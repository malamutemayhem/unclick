export type HairDryer = "ionic" | "ceramic" | "tourmaline" | "titanium" | "infrared";

export function dryingSpeed(h: HairDryer): number {
  const m: Record<HairDryer, number> = {
    ionic: 8, ceramic: 7, tourmaline: 9, titanium: 10, infrared: 6,
  };
  return m[h];
}

export function frizzReduction(h: HairDryer): number {
  const m: Record<HairDryer, number> = {
    ionic: 10, ceramic: 7, tourmaline: 9, titanium: 5, infrared: 8,
  };
  return m[h];
}

export function heatDistribution(h: HairDryer): number {
  const m: Record<HairDryer, number> = {
    ionic: 7, ceramic: 10, tourmaline: 9, titanium: 6, infrared: 8,
  };
  return m[h];
}

export function hairProtection(h: HairDryer): number {
  const m: Record<HairDryer, number> = {
    ionic: 8, ceramic: 9, tourmaline: 8, titanium: 4, infrared: 10,
  };
  return m[h];
}

export function unitCost(h: HairDryer): number {
  const m: Record<HairDryer, number> = {
    ionic: 5, ceramic: 6, tourmaline: 8, titanium: 7, infrared: 9,
  };
  return m[h];
}

export function suitableForFineHair(h: HairDryer): boolean {
  const m: Record<HairDryer, boolean> = {
    ionic: true, ceramic: true, tourmaline: true, titanium: false, infrared: true,
  };
  return m[h];
}

export function professionalGrade(h: HairDryer): boolean {
  const m: Record<HairDryer, boolean> = {
    ionic: true, ceramic: true, tourmaline: true, titanium: true, infrared: false,
  };
  return m[h];
}

export function heatingElement(h: HairDryer): string {
  const m: Record<HairDryer, string> = {
    ionic: "negative_ion_generator_coil", ceramic: "ceramic_coated_heating_element",
    tourmaline: "crushed_tourmaline_gem_coated", titanium: "lightweight_titanium_barrel",
    infrared: "infrared_heat_lamp_gentle",
  };
  return m[h];
}

export function bestHairType(h: HairDryer): string {
  const m: Record<HairDryer, string> = {
    ionic: "frizzy_thick_curly", ceramic: "damaged_color_treated",
    tourmaline: "all_types_professional", titanium: "thick_coarse_fast_dry",
    infrared: "fine_thin_delicate",
  };
  return m[h];
}

export function hairDryers(): HairDryer[] {
  return ["ionic", "ceramic", "tourmaline", "titanium", "infrared"];
}
