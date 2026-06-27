export type TextileWeave = "plain" | "twill" | "satin" | "jacquard" | "tapestry";

export function threadDensity(weave: TextileWeave): number {
  const m: Record<TextileWeave, number> = {
    plain: 5, twill: 7, satin: 9, jacquard: 8, tapestry: 6,
  };
  return m[weave];
}

export function drape(weave: TextileWeave): number {
  const m: Record<TextileWeave, number> = {
    plain: 4, twill: 6, satin: 10, jacquard: 7, tapestry: 2,
  };
  return m[weave];
}

export function durability(weave: TextileWeave): number {
  const m: Record<TextileWeave, number> = {
    plain: 8, twill: 9, satin: 4, jacquard: 6, tapestry: 7,
  };
  return m[weave];
}

export function patternComplexity(weave: TextileWeave): number {
  const m: Record<TextileWeave, number> = {
    plain: 1, twill: 4, satin: 3, jacquard: 10, tapestry: 9,
  };
  return m[weave];
}

export function productionSpeed(weave: TextileWeave): number {
  const m: Record<TextileWeave, number> = {
    plain: 10, twill: 7, satin: 6, jacquard: 3, tapestry: 1,
  };
  return m[weave];
}

export function reversible(weave: TextileWeave): boolean {
  const m: Record<TextileWeave, boolean> = {
    plain: true, twill: false, satin: false, jacquard: false, tapestry: true,
  };
  return m[weave];
}

export function shiny(weave: TextileWeave): boolean {
  const m: Record<TextileWeave, boolean> = {
    plain: false, twill: false, satin: true, jacquard: false, tapestry: false,
  };
  return m[weave];
}

export function bestApplication(weave: TextileWeave): string {
  const m: Record<TextileWeave, string> = {
    plain: "shirts", twill: "denim", satin: "evening_wear",
    jacquard: "upholstery", tapestry: "wall_hanging",
  };
  return m[weave];
}

export function costPerMeter(weave: TextileWeave): number {
  const m: Record<TextileWeave, number> = {
    plain: 5, twill: 12, satin: 25, jacquard: 40, tapestry: 100,
  };
  return m[weave];
}

export function textileWeaves(): TextileWeave[] {
  return ["plain", "twill", "satin", "jacquard", "tapestry"];
}
