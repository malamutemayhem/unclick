export type RubberType = "natural" | "silicone" | "neoprene" | "nitrile" | "butyl";

export function elasticity(rubber: RubberType): number {
  const m: Record<RubberType, number> = {
    natural: 10, silicone: 7, neoprene: 6, nitrile: 5, butyl: 4,
  };
  return m[rubber];
}

export function heatResistanceCelsius(rubber: RubberType): number {
  const m: Record<RubberType, number> = {
    natural: 80, silicone: 250, neoprene: 120, nitrile: 130, butyl: 150,
  };
  return m[rubber];
}

export function chemicalResistance(rubber: RubberType): number {
  const m: Record<RubberType, number> = {
    natural: 3, silicone: 6, neoprene: 8, nitrile: 10, butyl: 7,
  };
  return m[rubber];
}

export function oilResistance(rubber: RubberType): number {
  const m: Record<RubberType, number> = {
    natural: 2, silicone: 4, neoprene: 7, nitrile: 10, butyl: 3,
  };
  return m[rubber];
}

export function gasImpermeability(rubber: RubberType): number {
  const m: Record<RubberType, number> = {
    natural: 4, silicone: 3, neoprene: 6, nitrile: 5, butyl: 10,
  };
  return m[rubber];
}

export function biodegradable(rubber: RubberType): boolean {
  const m: Record<RubberType, boolean> = {
    natural: true, silicone: false, neoprene: false, nitrile: false, butyl: false,
  };
  return m[rubber];
}

export function foodSafe(rubber: RubberType): boolean {
  const m: Record<RubberType, boolean> = {
    natural: true, silicone: true, neoprene: false, nitrile: true, butyl: false,
  };
  return m[rubber];
}

export function bestApplication(rubber: RubberType): string {
  const m: Record<RubberType, string> = {
    natural: "tires", silicone: "medical", neoprene: "wetsuit",
    nitrile: "gloves", butyl: "inner_tube",
  };
  return m[rubber];
}

export function costPerKg(rubber: RubberType): number {
  const m: Record<RubberType, number> = {
    natural: 2, silicone: 15, neoprene: 8, nitrile: 6, butyl: 5,
  };
  return m[rubber];
}

export function rubberTypes(): RubberType[] {
  return ["natural", "silicone", "neoprene", "nitrile", "butyl"];
}
