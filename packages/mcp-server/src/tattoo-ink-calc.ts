export type TattooInk = "carbon_black" | "organic_pigment" | "vegan" | "uv_reactive" | "white";

export function colorVibrancy(i: TattooInk): number {
  const m: Record<TattooInk, number> = {
    carbon_black: 10, organic_pigment: 9, vegan: 7, uv_reactive: 6, white: 4,
  };
  return m[i];
}

export function fadeResistance(i: TattooInk): number {
  const m: Record<TattooInk, number> = {
    carbon_black: 10, organic_pigment: 7, vegan: 6, uv_reactive: 4, white: 3,
  };
  return m[i];
}

export function allergyRisk(i: TattooInk): number {
  const m: Record<TattooInk, number> = {
    carbon_black: 2, organic_pigment: 5, vegan: 3, uv_reactive: 8, white: 7,
  };
  return m[i];
}

export function laserRemovalEase(i: TattooInk): number {
  const m: Record<TattooInk, number> = {
    carbon_black: 9, organic_pigment: 6, vegan: 7, uv_reactive: 3, white: 2,
  };
  return m[i];
}

export function costPerOz(i: TattooInk): number {
  const m: Record<TattooInk, number> = {
    carbon_black: 4, organic_pigment: 6, vegan: 7, uv_reactive: 10, white: 5,
  };
  return m[i];
}

export function euCompliant(i: TattooInk): boolean {
  const m: Record<TattooInk, boolean> = {
    carbon_black: true, organic_pigment: false, vegan: true, uv_reactive: false, white: true,
  };
  return m[i];
}

export function visibleUnderNormalLight(i: TattooInk): boolean {
  const m: Record<TattooInk, boolean> = {
    carbon_black: true, organic_pigment: true, vegan: true, uv_reactive: false, white: true,
  };
  return m[i];
}

export function pigmentBase(i: TattooInk): string {
  const m: Record<TattooInk, string> = {
    carbon_black: "carbon_soot_magnetite", organic_pigment: "azo_compound",
    vegan: "plant_mineral_synthetic", uv_reactive: "phosphorescent_compound",
    white: "titanium_dioxide",
  };
  return m[i];
}

export function bestApplication(i: TattooInk): string {
  const m: Record<TattooInk, string> = {
    carbon_black: "linework_blackwork", organic_pigment: "color_realism",
    vegan: "ethical_studio", uv_reactive: "hidden_accent",
    white: "highlight_over_dark",
  };
  return m[i];
}

export function tattooInks(): TattooInk[] {
  return ["carbon_black", "organic_pigment", "vegan", "uv_reactive", "white"];
}
