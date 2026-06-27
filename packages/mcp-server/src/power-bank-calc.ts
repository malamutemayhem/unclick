export type PowerBankType = "slim_5000mah_pocket" | "standard_10000mah_dual" | "rugged_20000mah_solar" | "laptop_26800mah_pd" | "magnetic_5000mah_magsafe";

export function capacity(t: PowerBankType): number {
  const m: Record<PowerBankType, number> = {
    slim_5000mah_pocket: 3, standard_10000mah_dual: 6, rugged_20000mah_solar: 9, laptop_26800mah_pd: 10, magnetic_5000mah_magsafe: 3,
  };
  return m[t];
}

export function portability(t: PowerBankType): number {
  const m: Record<PowerBankType, number> = {
    slim_5000mah_pocket: 10, standard_10000mah_dual: 7, rugged_20000mah_solar: 3, laptop_26800mah_pd: 2, magnetic_5000mah_magsafe: 9,
  };
  return m[t];
}

export function chargingSpeed(t: PowerBankType): number {
  const m: Record<PowerBankType, number> = {
    slim_5000mah_pocket: 5, standard_10000mah_dual: 7, rugged_20000mah_solar: 6, laptop_26800mah_pd: 10, magnetic_5000mah_magsafe: 4,
  };
  return m[t];
}

export function durability(t: PowerBankType): number {
  const m: Record<PowerBankType, number> = {
    slim_5000mah_pocket: 5, standard_10000mah_dual: 7, rugged_20000mah_solar: 10, laptop_26800mah_pd: 6, magnetic_5000mah_magsafe: 6,
  };
  return m[t];
}

export function bankCost(t: PowerBankType): number {
  const m: Record<PowerBankType, number> = {
    slim_5000mah_pocket: 2, standard_10000mah_dual: 4, rugged_20000mah_solar: 7, laptop_26800mah_pd: 9, magnetic_5000mah_magsafe: 5,
  };
  return m[t];
}

export function passThrough(t: PowerBankType): boolean {
  const m: Record<PowerBankType, boolean> = {
    slim_5000mah_pocket: false, standard_10000mah_dual: true, rugged_20000mah_solar: true, laptop_26800mah_pd: true, magnetic_5000mah_magsafe: false,
  };
  return m[t];
}

export function airlineApproved(t: PowerBankType): boolean {
  const m: Record<PowerBankType, boolean> = {
    slim_5000mah_pocket: true, standard_10000mah_dual: true, rugged_20000mah_solar: true, laptop_26800mah_pd: false, magnetic_5000mah_magsafe: true,
  };
  return m[t];
}

export function cellType(t: PowerBankType): string {
  const m: Record<PowerBankType, string> = {
    slim_5000mah_pocket: "li_poly_slim_flat",
    standard_10000mah_dual: "li_ion_18650_cell",
    rugged_20000mah_solar: "li_poly_solar_panel",
    laptop_26800mah_pd: "li_ion_high_density_pd",
    magnetic_5000mah_magsafe: "li_poly_magnetic_ring",
  };
  return m[t];
}

export function bestUse(t: PowerBankType): string {
  const m: Record<PowerBankType, string> = {
    slim_5000mah_pocket: "evening_out_emergency",
    standard_10000mah_dual: "daily_carry_commute",
    rugged_20000mah_solar: "camping_hiking_off_grid",
    laptop_26800mah_pd: "remote_work_laptop_charge",
    magnetic_5000mah_magsafe: "iphone_snap_on_boost",
  };
  return m[t];
}

export function powerBanks(): PowerBankType[] {
  return ["slim_5000mah_pocket", "standard_10000mah_dual", "rugged_20000mah_solar", "laptop_26800mah_pd", "magnetic_5000mah_magsafe"];
}
