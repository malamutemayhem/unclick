export type WatchMovement = "manual_wind" | "automatic" | "quartz" | "solar" | "spring_drive";

export function accuracyPerDay(m_: WatchMovement): number {
  const m: Record<WatchMovement, number> = {
    manual_wind: 5, automatic: 6, quartz: 9, solar: 9, spring_drive: 10,
  };
  return m[m_];
}

export function powerReserve(m_: WatchMovement): number {
  const m: Record<WatchMovement, number> = {
    manual_wind: 6, automatic: 7, quartz: 9, solar: 10, spring_drive: 8,
  };
  return m[m_];
}

export function maintenanceCost(m_: WatchMovement): number {
  const m: Record<WatchMovement, number> = {
    manual_wind: 7, automatic: 8, quartz: 2, solar: 3, spring_drive: 9,
  };
  return m[m_];
}

export function craftsmanshipValue(m_: WatchMovement): number {
  const m: Record<WatchMovement, number> = {
    manual_wind: 10, automatic: 9, quartz: 3, solar: 4, spring_drive: 10,
  };
  return m[m_];
}

export function thickness(m_: WatchMovement): number {
  const m: Record<WatchMovement, number> = {
    manual_wind: 3, automatic: 7, quartz: 2, solar: 4, spring_drive: 6,
  };
  return m[m_];
}

export function requiresBattery(m_: WatchMovement): boolean {
  const m: Record<WatchMovement, boolean> = {
    manual_wind: false, automatic: false, quartz: true, solar: false, spring_drive: false,
  };
  return m[m_];
}

export function sweepSecondHand(m_: WatchMovement): boolean {
  const m: Record<WatchMovement, boolean> = {
    manual_wind: true, automatic: true, quartz: false, solar: false, spring_drive: true,
  };
  return m[m_];
}

export function energySource(m_: WatchMovement): string {
  const m: Record<WatchMovement, string> = {
    manual_wind: "mainspring_hand_wound", automatic: "mainspring_rotor_wound",
    quartz: "battery_crystal_oscillator", solar: "light_rechargeable_cell",
    spring_drive: "mainspring_tri_synchro",
  };
  return m[m_];
}

export function serviceInterval(m_: WatchMovement): string {
  const m: Record<WatchMovement, string> = {
    manual_wind: "3_to_5_years", automatic: "3_to_5_years",
    quartz: "battery_every_2_years", solar: "10_plus_years",
    spring_drive: "3_to_5_years",
  };
  return m[m_];
}

export function watchMovements(): WatchMovement[] {
  return ["manual_wind", "automatic", "quartz", "solar", "spring_drive"];
}
