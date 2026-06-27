export type CarSeatType = "infant_rear_facing" | "convertible_both" | "booster_highback" | "backless_booster" | "all_in_one";

export function crashProtection(t: CarSeatType): number {
  const m: Record<CarSeatType, number> = {
    infant_rear_facing: 10, convertible_both: 9, booster_highback: 7, backless_booster: 5, all_in_one: 9,
  };
  return m[t];
}

export function comfortPadding(t: CarSeatType): number {
  const m: Record<CarSeatType, number> = {
    infant_rear_facing: 9, convertible_both: 8, booster_highback: 7, backless_booster: 4, all_in_one: 8,
  };
  return m[t];
}

export function installEase(t: CarSeatType): number {
  const m: Record<CarSeatType, number> = {
    infant_rear_facing: 7, convertible_both: 5, booster_highback: 8, backless_booster: 10, all_in_one: 4,
  };
  return m[t];
}

export function longevityYears(t: CarSeatType): number {
  const m: Record<CarSeatType, number> = {
    infant_rear_facing: 2, convertible_both: 7, booster_highback: 5, backless_booster: 4, all_in_one: 10,
  };
  return m[t];
}

export function seatCost(t: CarSeatType): number {
  const m: Record<CarSeatType, number> = {
    infant_rear_facing: 5, convertible_both: 6, booster_highback: 4, backless_booster: 1, all_in_one: 10,
  };
  return m[t];
}

export function latchSystem(t: CarSeatType): boolean {
  const m: Record<CarSeatType, boolean> = {
    infant_rear_facing: true, convertible_both: true, booster_highback: true, backless_booster: false, all_in_one: true,
  };
  return m[t];
}

export function removableCarrier(t: CarSeatType): boolean {
  const m: Record<CarSeatType, boolean> = {
    infant_rear_facing: true, convertible_both: false, booster_highback: false, backless_booster: false, all_in_one: false,
  };
  return m[t];
}

export function harnessType(t: CarSeatType): string {
  const m: Record<CarSeatType, string> = {
    infant_rear_facing: "five_point_rear_only", convertible_both: "five_point_to_belt_guide",
    booster_highback: "vehicle_belt_positioning", backless_booster: "vehicle_lap_shoulder_belt",
    all_in_one: "five_point_to_booster_belt",
  };
  return m[t];
}

export function bestAge(t: CarSeatType): string {
  const m: Record<CarSeatType, string> = {
    infant_rear_facing: "newborn_to_one_year", convertible_both: "birth_to_four_years",
    booster_highback: "four_to_eight_years", backless_booster: "eight_to_twelve_years",
    all_in_one: "birth_to_twelve_years",
  };
  return m[t];
}

export function carSeats(): CarSeatType[] {
  return ["infant_rear_facing", "convertible_both", "booster_highback", "backless_booster", "all_in_one"];
}
