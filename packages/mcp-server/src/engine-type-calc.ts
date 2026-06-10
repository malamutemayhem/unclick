export type EngineType = "inline_four" | "v6" | "v8" | "flat_four" | "inline_six";

export function horsepowerRange(e: EngineType): number {
  const m: Record<EngineType, number> = {
    inline_four: 150, v6: 300, v8: 450, flat_four: 200, inline_six: 350,
  };
  return m[e];
}

export function fuelEfficiency(e: EngineType): number {
  const m: Record<EngineType, number> = {
    inline_four: 9, v6: 6, v8: 3, flat_four: 7, inline_six: 5,
  };
  return m[e];
}

export function smoothness(e: EngineType): number {
  const m: Record<EngineType, number> = {
    inline_four: 5, v6: 7, v8: 8, flat_four: 6, inline_six: 10,
  };
  return m[e];
}

export function compactness(e: EngineType): number {
  const m: Record<EngineType, number> = {
    inline_four: 9, v6: 5, v8: 3, flat_four: 7, inline_six: 4,
  };
  return m[e];
}

export function soundCharacter(e: EngineType): number {
  const m: Record<EngineType, number> = {
    inline_four: 4, v6: 6, v8: 10, flat_four: 8, inline_six: 7,
  };
  return m[e];
}

export function naturallyBalanced(e: EngineType): boolean {
  const m: Record<EngineType, boolean> = {
    inline_four: false, v6: false, v8: true, flat_four: true, inline_six: true,
  };
  return m[e];
}

export function lowCenterOfGravity(e: EngineType): boolean {
  const m: Record<EngineType, boolean> = {
    inline_four: false, v6: false, v8: false, flat_four: true, inline_six: false,
  };
  return m[e];
}

export function commonBrand(e: EngineType): string {
  const m: Record<EngineType, string> = {
    inline_four: "honda", v6: "toyota", v8: "chevrolet",
    flat_four: "subaru", inline_six: "bmw",
  };
  return m[e];
}

export function cylinderCount(e: EngineType): number {
  const m: Record<EngineType, number> = {
    inline_four: 4, v6: 6, v8: 8, flat_four: 4, inline_six: 6,
  };
  return m[e];
}

export function engineTypes(): EngineType[] {
  return ["inline_four", "v6", "v8", "flat_four", "inline_six"];
}
