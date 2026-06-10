export type TeaKettleType = "stovetop_whistle" | "electric_variable" | "gooseneck_pour" | "glass_infuser" | "cast_iron_tetsubin";

export function heatSpeed(t: TeaKettleType): number {
  const m: Record<TeaKettleType, number> = {
    stovetop_whistle: 6, electric_variable: 10, gooseneck_pour: 8, glass_infuser: 7, cast_iron_tetsubin: 3,
  };
  return m[t];
}

export function tempControl(t: TeaKettleType): number {
  const m: Record<TeaKettleType, number> = {
    stovetop_whistle: 2, electric_variable: 10, gooseneck_pour: 9, glass_infuser: 5, cast_iron_tetsubin: 3,
  };
  return m[t];
}

export function heatRetention(t: TeaKettleType): number {
  const m: Record<TeaKettleType, number> = {
    stovetop_whistle: 5, electric_variable: 4, gooseneck_pour: 3, glass_infuser: 2, cast_iron_tetsubin: 10,
  };
  return m[t];
}

export function pourPrecision(t: TeaKettleType): number {
  const m: Record<TeaKettleType, number> = {
    stovetop_whistle: 3, electric_variable: 6, gooseneck_pour: 10, glass_infuser: 5, cast_iron_tetsubin: 4,
  };
  return m[t];
}

export function kettleCost(t: TeaKettleType): number {
  const m: Record<TeaKettleType, number> = {
    stovetop_whistle: 2, electric_variable: 6, gooseneck_pour: 7, glass_infuser: 3, cast_iron_tetsubin: 9,
  };
  return m[t];
}

export function autoShutoff(t: TeaKettleType): boolean {
  const m: Record<TeaKettleType, boolean> = {
    stovetop_whistle: false, electric_variable: true, gooseneck_pour: true, glass_infuser: true, cast_iron_tetsubin: false,
  };
  return m[t];
}

export function keepWarm(t: TeaKettleType): boolean {
  const m: Record<TeaKettleType, boolean> = {
    stovetop_whistle: false, electric_variable: true, gooseneck_pour: true, glass_infuser: false, cast_iron_tetsubin: false,
  };
  return m[t];
}

export function bodyMaterial(t: TeaKettleType): string {
  const m: Record<TeaKettleType, string> = {
    stovetop_whistle: "stainless_steel_polished", electric_variable: "stainless_steel_double_wall",
    gooseneck_pour: "stainless_steel_slim_neck", glass_infuser: "borosilicate_glass_basket",
    cast_iron_tetsubin: "enameled_cast_iron_heavy",
  };
  return m[t];
}

export function bestBrew(t: TeaKettleType): string {
  const m: Record<TeaKettleType, string> = {
    stovetop_whistle: "basic_tea_boil_alert", electric_variable: "multi_tea_precise_temp",
    gooseneck_pour: "pour_over_coffee_tea", glass_infuser: "loose_leaf_visual_steep",
    cast_iron_tetsubin: "japanese_ceremony_aesthetic",
  };
  return m[t];
}

export function teaKettles(): TeaKettleType[] {
  return ["stovetop_whistle", "electric_variable", "gooseneck_pour", "glass_infuser", "cast_iron_tetsubin"];
}
