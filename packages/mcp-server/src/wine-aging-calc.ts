export type WineAging = "stainless_steel" | "french_oak" | "american_oak" | "concrete_egg" | "amphora";

export function flavorImpact(a: WineAging): number {
  const m: Record<WineAging, number> = {
    stainless_steel: 1, french_oak: 8, american_oak: 9, concrete_egg: 3, amphora: 4,
  };
  return m[a];
}

export function oxygenExposure(a: WineAging): number {
  const m: Record<WineAging, number> = {
    stainless_steel: 1, french_oak: 7, american_oak: 8, concrete_egg: 4, amphora: 6,
  };
  return m[a];
}

export function costPerUnit(a: WineAging): number {
  const m: Record<WineAging, number> = {
    stainless_steel: 4, french_oak: 10, american_oak: 7, concrete_egg: 6, amphora: 8,
  };
  return m[a];
}

export function tanninAddition(a: WineAging): number {
  const m: Record<WineAging, number> = {
    stainless_steel: 0, french_oak: 7, american_oak: 9, concrete_egg: 1, amphora: 2,
  };
  return m[a];
}

export function temperatureControl(a: WineAging): number {
  const m: Record<WineAging, number> = {
    stainless_steel: 10, french_oak: 4, american_oak: 4, concrete_egg: 7, amphora: 3,
  };
  return m[a];
}

export function impartsWoodFlavor(a: WineAging): boolean {
  const m: Record<WineAging, boolean> = {
    stainless_steel: false, french_oak: true, american_oak: true, concrete_egg: false, amphora: false,
  };
  return m[a];
}

export function preservesFruitCharacter(a: WineAging): boolean {
  const m: Record<WineAging, boolean> = {
    stainless_steel: true, french_oak: false, american_oak: false, concrete_egg: true, amphora: true,
  };
  return m[a];
}

export function flavorNotes(a: WineAging): string {
  const m: Record<WineAging, string> = {
    stainless_steel: "pure_fruit_crisp", french_oak: "vanilla_spice_subtle",
    american_oak: "coconut_dill_bold", concrete_egg: "mineral_texture",
    amphora: "earthy_oxidative",
  };
  return m[a];
}

export function bestForWineType(a: WineAging): string {
  const m: Record<WineAging, string> = {
    stainless_steel: "aromatic_whites", french_oak: "premium_reds_whites",
    american_oak: "bold_reds_bourbon", concrete_egg: "natural_wines",
    amphora: "orange_wine_experimental",
  };
  return m[a];
}

export function wineAgingMethods(): WineAging[] {
  return ["stainless_steel", "french_oak", "american_oak", "concrete_egg", "amphora"];
}
