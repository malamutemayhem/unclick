export type IrrigationMethod = "drip" | "sprinkler" | "flood" | "center_pivot" | "subsurface";

export function waterEfficiency(i: IrrigationMethod): number {
  const m: Record<IrrigationMethod, number> = {
    drip: 10, sprinkler: 6, flood: 2, center_pivot: 7, subsurface: 9,
  };
  return m[i];
}

export function installCost(i: IrrigationMethod): number {
  const m: Record<IrrigationMethod, number> = {
    drip: 8, sprinkler: 5, flood: 1, center_pivot: 9, subsurface: 10,
  };
  return m[i];
}

export function laborRequirement(i: IrrigationMethod): number {
  const m: Record<IrrigationMethod, number> = {
    drip: 2, sprinkler: 3, flood: 9, center_pivot: 1, subsurface: 2,
  };
  return m[i];
}

export function uniformity(i: IrrigationMethod): number {
  const m: Record<IrrigationMethod, number> = {
    drip: 10, sprinkler: 7, flood: 3, center_pivot: 8, subsurface: 9,
  };
  return m[i];
}

export function energyUse(i: IrrigationMethod): number {
  const m: Record<IrrigationMethod, number> = {
    drip: 3, sprinkler: 6, flood: 1, center_pivot: 7, subsurface: 4,
  };
  return m[i];
}

export function automatable(i: IrrigationMethod): boolean {
  const m: Record<IrrigationMethod, boolean> = {
    drip: true, sprinkler: true, flood: false, center_pivot: true, subsurface: true,
  };
  return m[i];
}

export function slopeCompatible(i: IrrigationMethod): boolean {
  const m: Record<IrrigationMethod, boolean> = {
    drip: true, sprinkler: true, flood: false, center_pivot: true, subsurface: true,
  };
  return m[i];
}

export function bestCropType(i: IrrigationMethod): string {
  const m: Record<IrrigationMethod, string> = {
    drip: "orchard_vineyard", sprinkler: "grain_pasture",
    flood: "rice_paddy", center_pivot: "large_field_crop",
    subsurface: "turf_greenhouse",
  };
  return m[i];
}

export function waterSource(i: IrrigationMethod): string {
  const m: Record<IrrigationMethod, string> = {
    drip: "pressurized_pipe", sprinkler: "pump_mainline",
    flood: "canal_diversion", center_pivot: "deep_well",
    subsurface: "pressurized_buried_pipe",
  };
  return m[i];
}

export function irrigationMethods(): IrrigationMethod[] {
  return ["drip", "sprinkler", "flood", "center_pivot", "subsurface"];
}
