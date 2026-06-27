export type EscalatorType = "standard" | "spiral" | "outdoor" | "moving_walkway" | "heavy_duty";

export function passengerCapacity(e: EscalatorType): number {
  const m: Record<EscalatorType, number> = {
    standard: 8, spiral: 5, outdoor: 7, moving_walkway: 10, heavy_duty: 9,
  };
  return m[e];
}

export function spaceRequired(e: EscalatorType): number {
  const m: Record<EscalatorType, number> = {
    standard: 7, spiral: 4, outdoor: 8, moving_walkway: 9, heavy_duty: 8,
  };
  return m[e];
}

export function maintenanceCost(e: EscalatorType): number {
  const m: Record<EscalatorType, number> = {
    standard: 5, spiral: 8, outdoor: 7, moving_walkway: 4, heavy_duty: 6,
  };
  return m[e];
}

export function weatherResistance(e: EscalatorType): number {
  const m: Record<EscalatorType, number> = {
    standard: 3, spiral: 3, outdoor: 10, moving_walkway: 4, heavy_duty: 7,
  };
  return m[e];
}

export function installComplexity(e: EscalatorType): number {
  const m: Record<EscalatorType, number> = {
    standard: 5, spiral: 10, outdoor: 7, moving_walkway: 4, heavy_duty: 6,
  };
  return m[e];
}

export function reversible(e: EscalatorType): boolean {
  const m: Record<EscalatorType, boolean> = {
    standard: true, spiral: true, outdoor: true, moving_walkway: true, heavy_duty: true,
  };
  return m[e];
}

export function adaAccessible(e: EscalatorType): boolean {
  const m: Record<EscalatorType, boolean> = {
    standard: false, spiral: false, outdoor: false, moving_walkway: true, heavy_duty: false,
  };
  return m[e];
}

export function typicalLocation(e: EscalatorType): string {
  const m: Record<EscalatorType, string> = {
    standard: "shopping_mall_office", spiral: "architectural_feature",
    outdoor: "transit_stations", moving_walkway: "airports_long_corridors",
    heavy_duty: "subway_metro",
  };
  return m[e];
}

export function stepWidth(e: EscalatorType): string {
  const m: Record<EscalatorType, string> = {
    standard: "800mm_1000mm", spiral: "600mm_800mm",
    outdoor: "800mm_1000mm", moving_walkway: "1000mm_1400mm",
    heavy_duty: "1000mm_1200mm",
  };
  return m[e];
}

export function escalatorTypes(): EscalatorType[] {
  return ["standard", "spiral", "outdoor", "moving_walkway", "heavy_duty"];
}
