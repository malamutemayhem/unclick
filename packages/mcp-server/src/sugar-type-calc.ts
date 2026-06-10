export type SugarType = "granulated" | "brown" | "powdered" | "turbinado" | "muscovado";

export function sweetnessLevel(s: SugarType): number {
  const m: Record<SugarType, number> = {
    granulated: 8, brown: 7, powdered: 8, turbinado: 6, muscovado: 7,
  };
  return m[s];
}

export function molassesContent(s: SugarType): number {
  const m: Record<SugarType, number> = {
    granulated: 0, brown: 5, powdered: 0, turbinado: 3, muscovado: 9,
  };
  return m[s];
}

export function moistureLevel(s: SugarType): number {
  const m: Record<SugarType, number> = {
    granulated: 1, brown: 6, powdered: 1, turbinado: 2, muscovado: 8,
  };
  return m[s];
}

export function crystalSize(s: SugarType): number {
  const m: Record<SugarType, number> = {
    granulated: 5, brown: 4, powdered: 1, turbinado: 8, muscovado: 6,
  };
  return m[s];
}

export function processingLevel(s: SugarType): number {
  const m: Record<SugarType, number> = {
    granulated: 9, brown: 7, powdered: 10, turbinado: 4, muscovado: 2,
  };
  return m[s];
}

export function dissolvesFast(s: SugarType): boolean {
  const m: Record<SugarType, boolean> = {
    granulated: true, brown: false, powdered: true, turbinado: false, muscovado: false,
  };
  return m[s];
}

export function addsMoisture(s: SugarType): boolean {
  const m: Record<SugarType, boolean> = {
    granulated: false, brown: true, powdered: false, turbinado: false, muscovado: true,
  };
  return m[s];
}

export function bestUse(s: SugarType): string {
  const m: Record<SugarType, string> = {
    granulated: "general_baking", brown: "cookies_sauces",
    powdered: "icing_dusting", turbinado: "coffee_topping",
    muscovado: "toffee_barbecue",
  };
  return m[s];
}

export function flavorProfile(s: SugarType): string {
  const m: Record<SugarType, string> = {
    granulated: "neutral_sweet", brown: "caramel_toffee",
    powdered: "neutral_smooth", turbinado: "mild_honey",
    muscovado: "deep_molasses",
  };
  return m[s];
}

export function sugarTypes(): SugarType[] {
  return ["granulated", "brown", "powdered", "turbinado", "muscovado"];
}
