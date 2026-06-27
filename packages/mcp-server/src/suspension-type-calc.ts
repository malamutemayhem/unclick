export type SuspensionType = "macpherson" | "double_wishbone" | "multi_link" | "solid_axle" | "air";

export function rideComfort(s: SuspensionType): number {
  const m: Record<SuspensionType, number> = {
    macpherson: 6, double_wishbone: 8, multi_link: 9, solid_axle: 4, air: 10,
  };
  return m[s];
}

export function handlingPrecision(s: SuspensionType): number {
  const m: Record<SuspensionType, number> = {
    macpherson: 6, double_wishbone: 10, multi_link: 9, solid_axle: 3, air: 7,
  };
  return m[s];
}

export function loadCapacity(s: SuspensionType): number {
  const m: Record<SuspensionType, number> = {
    macpherson: 5, double_wishbone: 6, multi_link: 5, solid_axle: 10, air: 8,
  };
  return m[s];
}

export function packagingSpace(s: SuspensionType): number {
  const m: Record<SuspensionType, number> = {
    macpherson: 10, double_wishbone: 4, multi_link: 5, solid_axle: 7, air: 6,
  };
  return m[s];
}

export function complexityLevel(s: SuspensionType): number {
  const m: Record<SuspensionType, number> = {
    macpherson: 3, double_wishbone: 7, multi_link: 9, solid_axle: 1, air: 8,
  };
  return m[s];
}

export function adjustable(s: SuspensionType): boolean {
  const m: Record<SuspensionType, boolean> = {
    macpherson: false, double_wishbone: false, multi_link: false, solid_axle: false, air: true,
  };
  return m[s];
}

export function independent(s: SuspensionType): boolean {
  const m: Record<SuspensionType, boolean> = {
    macpherson: true, double_wishbone: true, multi_link: true, solid_axle: false, air: true,
  };
  return m[s];
}

export function commonUsage(s: SuspensionType): string {
  const m: Record<SuspensionType, string> = {
    macpherson: "economy_car", double_wishbone: "sports_car",
    multi_link: "luxury_sedan", solid_axle: "truck", air: "luxury_suv",
  };
  return m[s];
}

export function maintenanceCost(s: SuspensionType): number {
  const m: Record<SuspensionType, number> = {
    macpherson: 3, double_wishbone: 6, multi_link: 7, solid_axle: 2, air: 9,
  };
  return m[s];
}

export function suspensionTypes(): SuspensionType[] {
  return ["macpherson", "double_wishbone", "multi_link", "solid_axle", "air"];
}
