export type PhoneCaseType = "clear_tpu_slim" | "rugged_armor_heavy" | "leather_folio_wallet" | "silicone_soft_grip" | "magsafe_magnetic_snap";

export function dropProtection(t: PhoneCaseType): number {
  const m: Record<PhoneCaseType, number> = {
    clear_tpu_slim: 5, rugged_armor_heavy: 10, leather_folio_wallet: 6, silicone_soft_grip: 7, magsafe_magnetic_snap: 6,
  };
  return m[t];
}

export function slimProfile(t: PhoneCaseType): number {
  const m: Record<PhoneCaseType, number> = {
    clear_tpu_slim: 10, rugged_armor_heavy: 2, leather_folio_wallet: 4, silicone_soft_grip: 8, magsafe_magnetic_snap: 7,
  };
  return m[t];
}

export function gripFeel(t: PhoneCaseType): number {
  const m: Record<PhoneCaseType, number> = {
    clear_tpu_slim: 6, rugged_armor_heavy: 8, leather_folio_wallet: 7, silicone_soft_grip: 10, magsafe_magnetic_snap: 7,
  };
  return m[t];
}

export function style(t: PhoneCaseType): number {
  const m: Record<PhoneCaseType, number> = {
    clear_tpu_slim: 7, rugged_armor_heavy: 4, leather_folio_wallet: 10, silicone_soft_grip: 6, magsafe_magnetic_snap: 8,
  };
  return m[t];
}

export function caseCost(t: PhoneCaseType): number {
  const m: Record<PhoneCaseType, number> = {
    clear_tpu_slim: 2, rugged_armor_heavy: 6, leather_folio_wallet: 7, silicone_soft_grip: 3, magsafe_magnetic_snap: 6,
  };
  return m[t];
}

export function screenCover(t: PhoneCaseType): boolean {
  const m: Record<PhoneCaseType, boolean> = {
    clear_tpu_slim: false, rugged_armor_heavy: true, leather_folio_wallet: true, silicone_soft_grip: false, magsafe_magnetic_snap: false,
  };
  return m[t];
}

export function wirelessChargeThrough(t: PhoneCaseType): boolean {
  const m: Record<PhoneCaseType, boolean> = {
    clear_tpu_slim: true, rugged_armor_heavy: false, leather_folio_wallet: false, silicone_soft_grip: true, magsafe_magnetic_snap: true,
  };
  return m[t];
}

export function caseMaterial(t: PhoneCaseType): string {
  const m: Record<PhoneCaseType, string> = {
    clear_tpu_slim: "thermoplastic_polyurethane",
    rugged_armor_heavy: "polycarbonate_tpu_hybrid",
    leather_folio_wallet: "genuine_leather_card_slot",
    silicone_soft_grip: "liquid_silicone_microfiber",
    magsafe_magnetic_snap: "polycarbonate_magnet_ring",
  };
  return m[t];
}

export function bestUser(t: PhoneCaseType): string {
  const m: Record<PhoneCaseType, string> = {
    clear_tpu_slim: "show_off_phone_design",
    rugged_armor_heavy: "construction_outdoor_active",
    leather_folio_wallet: "professional_no_wallet_carry",
    silicone_soft_grip: "everyday_comfortable_hold",
    magsafe_magnetic_snap: "apple_ecosystem_accessory",
  };
  return m[t];
}

export function phoneCases(): PhoneCaseType[] {
  return ["clear_tpu_slim", "rugged_armor_heavy", "leather_folio_wallet", "silicone_soft_grip", "magsafe_magnetic_snap"];
}
