export type WindTurbineType = "horizontal_axis" | "vertical_axis" | "offshore" | "micro" | "bladeless";

export function ratedPowerKw(turbine: WindTurbineType): number {
  const m: Record<WindTurbineType, number> = {
    horizontal_axis: 3000, vertical_axis: 500, offshore: 12000, micro: 5, bladeless: 100,
  };
  return m[turbine];
}

export function hubHeightMeters(turbine: WindTurbineType): number {
  const m: Record<WindTurbineType, number> = {
    horizontal_axis: 80, vertical_axis: 30, offshore: 120, micro: 15, bladeless: 12,
  };
  return m[turbine];
}

export function cutInSpeedMs(turbine: WindTurbineType): number {
  const m: Record<WindTurbineType, number> = {
    horizontal_axis: 3.5, vertical_axis: 2.0, offshore: 3.0, micro: 2.5, bladeless: 1.5,
  };
  return m[turbine];
}

export function noiseLevel(turbine: WindTurbineType): number {
  const m: Record<WindTurbineType, number> = {
    horizontal_axis: 7, vertical_axis: 4, offshore: 8, micro: 2, bladeless: 1,
  };
  return m[turbine];
}

export function birdSafetyRating(turbine: WindTurbineType): number {
  const m: Record<WindTurbineType, number> = {
    horizontal_axis: 3, vertical_axis: 6, offshore: 4, micro: 8, bladeless: 10,
  };
  return m[turbine];
}

export function requiresYawSystem(turbine: WindTurbineType): boolean {
  const m: Record<WindTurbineType, boolean> = {
    horizontal_axis: true, vertical_axis: false, offshore: true, micro: true, bladeless: false,
  };
  return m[turbine];
}

export function urbanSuitable(turbine: WindTurbineType): boolean {
  const m: Record<WindTurbineType, boolean> = {
    horizontal_axis: false, vertical_axis: true, offshore: false, micro: true, bladeless: true,
  };
  return m[turbine];
}

export function bestApplication(turbine: WindTurbineType): string {
  const m: Record<WindTurbineType, string> = {
    horizontal_axis: "wind_farm", vertical_axis: "rooftop", offshore: "ocean",
    micro: "rural_home", bladeless: "urban",
  };
  return m[turbine];
}

export function capacityFactor(turbine: WindTurbineType): number {
  const m: Record<WindTurbineType, number> = {
    horizontal_axis: 35, vertical_axis: 20, offshore: 45, micro: 15, bladeless: 10,
  };
  return m[turbine];
}

export function windTurbineTypes(): WindTurbineType[] {
  return ["horizontal_axis", "vertical_axis", "offshore", "micro", "bladeless"];
}
