export type GreenhouseType = "cold_frame" | "hoop_house" | "glass" | "polycarbonate" | "lean_to";

export function temperatureControlRating(gh: GreenhouseType): number {
  const m: Record<GreenhouseType, number> = {
    cold_frame: 3, hoop_house: 5, glass: 9, polycarbonate: 8, lean_to: 6,
  };
  return m[gh];
}

export function lightTransmission(gh: GreenhouseType): number {
  const m: Record<GreenhouseType, number> = {
    cold_frame: 7, hoop_house: 8, glass: 10, polycarbonate: 8, lean_to: 7,
  };
  return m[gh];
}

export function buildCost(gh: GreenhouseType): number {
  const m: Record<GreenhouseType, number> = {
    cold_frame: 1, hoop_house: 3, glass: 10, polycarbonate: 7, lean_to: 5,
  };
  return m[gh];
}

export function durabilityYears(gh: GreenhouseType): number {
  const m: Record<GreenhouseType, number> = {
    cold_frame: 5, hoop_house: 3, glass: 30, polycarbonate: 15, lean_to: 20,
  };
  return m[gh];
}

export function growingAreaM2(gh: GreenhouseType): number {
  const m: Record<GreenhouseType, number> = {
    cold_frame: 2, hoop_house: 30, glass: 50, polycarbonate: 40, lean_to: 15,
  };
  return m[gh];
}

export function portable(gh: GreenhouseType): boolean {
  const m: Record<GreenhouseType, boolean> = {
    cold_frame: true, hoop_house: true, glass: false, polycarbonate: false, lean_to: false,
  };
  return m[gh];
}

export function heatable(gh: GreenhouseType): boolean {
  const m: Record<GreenhouseType, boolean> = {
    cold_frame: false, hoop_house: false, glass: true, polycarbonate: true, lean_to: true,
  };
  return m[gh];
}

export function bestCrop(gh: GreenhouseType): string {
  const m: Record<GreenhouseType, string> = {
    cold_frame: "salad_greens", hoop_house: "tomatoes", glass: "orchids",
    polycarbonate: "peppers", lean_to: "herbs",
  };
  return m[gh];
}

export function seasonExtensionMonths(gh: GreenhouseType): number {
  const m: Record<GreenhouseType, number> = {
    cold_frame: 2, hoop_house: 3, glass: 12, polycarbonate: 6, lean_to: 4,
  };
  return m[gh];
}

export function greenhouseTypes(): GreenhouseType[] {
  return ["cold_frame", "hoop_house", "glass", "polycarbonate", "lean_to"];
}
