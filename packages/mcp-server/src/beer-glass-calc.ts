export type BeerGlassType = "pint_shaker" | "tulip_goblet" | "weizen_tall" | "snifter_brandy" | "pilsner_flute";

export function aromaCapture(t: BeerGlassType): number {
  const m: Record<BeerGlassType, number> = {
    pint_shaker: 3, tulip_goblet: 10, weizen_tall: 6, snifter_brandy: 9, pilsner_flute: 5,
  };
  return m[t];
}

export function headRetention(t: BeerGlassType): number {
  const m: Record<BeerGlassType, number> = {
    pint_shaker: 4, tulip_goblet: 8, weizen_tall: 10, snifter_brandy: 7, pilsner_flute: 9,
  };
  return m[t];
}

export function capacity(t: BeerGlassType): number {
  const m: Record<BeerGlassType, number> = {
    pint_shaker: 8, tulip_goblet: 6, weizen_tall: 10, snifter_brandy: 4, pilsner_flute: 5,
  };
  return m[t];
}

export function durability(t: BeerGlassType): number {
  const m: Record<BeerGlassType, number> = {
    pint_shaker: 10, tulip_goblet: 5, weizen_tall: 4, snifter_brandy: 5, pilsner_flute: 3,
  };
  return m[t];
}

export function glassCost(t: BeerGlassType): number {
  const m: Record<BeerGlassType, number> = {
    pint_shaker: 1, tulip_goblet: 5, weizen_tall: 4, snifter_brandy: 6, pilsner_flute: 4,
  };
  return m[t];
}

export function stackable(t: BeerGlassType): boolean {
  const m: Record<BeerGlassType, boolean> = {
    pint_shaker: true, tulip_goblet: false, weizen_tall: false, snifter_brandy: false, pilsner_flute: false,
  };
  return m[t];
}

export function nucleated(t: BeerGlassType): boolean {
  const m: Record<BeerGlassType, boolean> = {
    pint_shaker: false, tulip_goblet: true, weizen_tall: false, snifter_brandy: false, pilsner_flute: true,
  };
  return m[t];
}

export function glassShape(t: BeerGlassType): string {
  const m: Record<BeerGlassType, string> = {
    pint_shaker: "straight_tapered_cone",
    tulip_goblet: "bulb_flare_stem_foot",
    weizen_tall: "tall_curved_thin_wall",
    snifter_brandy: "wide_bowl_narrow_rim",
    pilsner_flute: "tall_narrow_taper_foot",
  };
  return m[t];
}

export function bestBeer(t: BeerGlassType): string {
  const m: Record<BeerGlassType, string> = {
    pint_shaker: "pub_ale_lager_general",
    tulip_goblet: "belgian_ipa_sour",
    weizen_tall: "hefeweizen_wheat_beer",
    snifter_brandy: "imperial_stout_barleywine",
    pilsner_flute: "czech_german_pilsner",
  };
  return m[t];
}

export function beerGlasses(): BeerGlassType[] {
  return ["pint_shaker", "tulip_goblet", "weizen_tall", "snifter_brandy", "pilsner_flute"];
}
