export type ToiletSeatType = "standard_round" | "elongated_soft_close" | "heated_electric" | "bidet_integrated" | "child_family";

export function comfortLevel(t: ToiletSeatType): number {
  const m: Record<ToiletSeatType, number> = {
    standard_round: 5, elongated_soft_close: 7, heated_electric: 9, bidet_integrated: 10, child_family: 6,
  };
  return m[t];
}

export function durability(t: ToiletSeatType): number {
  const m: Record<ToiletSeatType, number> = {
    standard_round: 7, elongated_soft_close: 8, heated_electric: 6, bidet_integrated: 7, child_family: 5,
  };
  return m[t];
}

export function installEase(t: ToiletSeatType): number {
  const m: Record<ToiletSeatType, number> = {
    standard_round: 10, elongated_soft_close: 9, heated_electric: 5, bidet_integrated: 3, child_family: 9,
  };
  return m[t];
}

export function cleanability(t: ToiletSeatType): number {
  const m: Record<ToiletSeatType, number> = {
    standard_round: 6, elongated_soft_close: 8, heated_electric: 7, bidet_integrated: 10, child_family: 5,
  };
  return m[t];
}

export function seatCost(t: ToiletSeatType): number {
  const m: Record<ToiletSeatType, number> = {
    standard_round: 1, elongated_soft_close: 3, heated_electric: 6, bidet_integrated: 10, child_family: 3,
  };
  return m[t];
}

export function softClose(t: ToiletSeatType): boolean {
  const m: Record<ToiletSeatType, boolean> = {
    standard_round: false, elongated_soft_close: true, heated_electric: true, bidet_integrated: true, child_family: false,
  };
  return m[t];
}

export function needsOutlet(t: ToiletSeatType): boolean {
  const m: Record<ToiletSeatType, boolean> = {
    standard_round: false, elongated_soft_close: false, heated_electric: true, bidet_integrated: true, child_family: false,
  };
  return m[t];
}

export function hingeMaterial(t: ToiletSeatType): string {
  const m: Record<ToiletSeatType, string> = {
    standard_round: "plastic_bolt_basic",
    elongated_soft_close: "stainless_damped_hinge",
    heated_electric: "quick_release_bracket",
    bidet_integrated: "steel_plate_mount",
    child_family: "dual_seat_flip_hinge",
  };
  return m[t];
}

export function bestBathroom(t: ToiletSeatType): string {
  const m: Record<ToiletSeatType, string> = {
    standard_round: "budget_rental_basic",
    elongated_soft_close: "main_bath_quiet_close",
    heated_electric: "winter_comfort_luxury",
    bidet_integrated: "hygiene_spa_experience",
    child_family: "kids_potty_training",
  };
  return m[t];
}

export function toiletSeats(): ToiletSeatType[] {
  return ["standard_round", "elongated_soft_close", "heated_electric", "bidet_integrated", "child_family"];
}
