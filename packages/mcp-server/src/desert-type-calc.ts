export type DesertType = "hot_sandy" | "cold" | "coastal" | "rain_shadow" | "polar";

export function avgTempCelsius(desert: DesertType): number {
  const m: Record<DesertType, number> = {
    hot_sandy: 38, cold: -5, coastal: 22, rain_shadow: 25, polar: -30,
  };
  return m[desert];
}

export function annualRainfallMm(desert: DesertType): number {
  const m: Record<DesertType, number> = {
    hot_sandy: 50, cold: 150, coastal: 100, rain_shadow: 200, polar: 50,
  };
  return m[desert];
}

export function diurnalRangeCelsius(desert: DesertType): number {
  const m: Record<DesertType, number> = {
    hot_sandy: 35, cold: 20, coastal: 10, rain_shadow: 25, polar: 15,
  };
  return m[desert];
}

export function sandDuneCoverage(desert: DesertType): number {
  const m: Record<DesertType, number> = {
    hot_sandy: 10, cold: 2, coastal: 6, rain_shadow: 3, polar: 0,
  };
  return m[desert];
}

export function vegetationCover(desert: DesertType): number {
  const m: Record<DesertType, number> = {
    hot_sandy: 2, cold: 4, coastal: 5, rain_shadow: 6, polar: 1,
  };
  return m[desert];
}

export function fogMoisture(desert: DesertType): boolean {
  const m: Record<DesertType, boolean> = {
    hot_sandy: false, cold: false, coastal: true, rain_shadow: false, polar: false,
  };
  return m[desert];
}

export function permafrost(desert: DesertType): boolean {
  const m: Record<DesertType, boolean> = {
    hot_sandy: false, cold: true, coastal: false, rain_shadow: false, polar: true,
  };
  return m[desert];
}

export function exampleDesert(desert: DesertType): string {
  const m: Record<DesertType, string> = {
    hot_sandy: "sahara", cold: "gobi", coastal: "atacama",
    rain_shadow: "great_basin", polar: "antarctic",
  };
  return m[desert];
}

export function solarPotential(desert: DesertType): number {
  const m: Record<DesertType, number> = {
    hot_sandy: 10, cold: 5, coastal: 7, rain_shadow: 8, polar: 3,
  };
  return m[desert];
}

export function desertTypes(): DesertType[] {
  return ["hot_sandy", "cold", "coastal", "rain_shadow", "polar"];
}
