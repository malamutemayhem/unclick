export type SwimFinType = "short_blade_training" | "long_blade_speed" | "split_fin_flutter" | "monofin_dolphin_kick" | "adjustable_strap_snorkel";

export function propulsion(t: SwimFinType): number {
  const m: Record<SwimFinType, number> = {
    short_blade_training: 6, long_blade_speed: 9, split_fin_flutter: 7, monofin_dolphin_kick: 10, adjustable_strap_snorkel: 7,
  };
  return m[t];
}

export function kickEfficiency(t: SwimFinType): number {
  const m: Record<SwimFinType, number> = {
    short_blade_training: 8, long_blade_speed: 7, split_fin_flutter: 9, monofin_dolphin_kick: 10, adjustable_strap_snorkel: 6,
  };
  return m[t];
}

export function comfort(t: SwimFinType): number {
  const m: Record<SwimFinType, number> = {
    short_blade_training: 9, long_blade_speed: 6, split_fin_flutter: 8, monofin_dolphin_kick: 4, adjustable_strap_snorkel: 8,
  };
  return m[t];
}

export function portability(t: SwimFinType): number {
  const m: Record<SwimFinType, number> = {
    short_blade_training: 9, long_blade_speed: 5, split_fin_flutter: 7, monofin_dolphin_kick: 3, adjustable_strap_snorkel: 6,
  };
  return m[t];
}

export function finCost(t: SwimFinType): number {
  const m: Record<SwimFinType, number> = {
    short_blade_training: 2, long_blade_speed: 3, split_fin_flutter: 3, monofin_dolphin_kick: 4, adjustable_strap_snorkel: 2,
  };
  return m[t];
}

export function adjustableFit(t: SwimFinType): boolean {
  const m: Record<SwimFinType, boolean> = {
    short_blade_training: false, long_blade_speed: false, split_fin_flutter: false, monofin_dolphin_kick: false, adjustable_strap_snorkel: true,
  };
  return m[t];
}

export function poolAllowed(t: SwimFinType): boolean {
  const m: Record<SwimFinType, boolean> = {
    short_blade_training: true, long_blade_speed: true, split_fin_flutter: true, monofin_dolphin_kick: true, adjustable_strap_snorkel: false,
  };
  return m[t];
}

export function bladeMaterial(t: SwimFinType): string {
  const m: Record<SwimFinType, string> = {
    short_blade_training: "soft_silicone_rubber",
    long_blade_speed: "stiff_polypropylene",
    split_fin_flutter: "split_channel_polymer",
    monofin_dolphin_kick: "fiberglass_carbon_plate",
    adjustable_strap_snorkel: "thermoplastic_rubber",
  };
  return m[t];
}

export function bestActivity(t: SwimFinType): string {
  const m: Record<SwimFinType, string> = {
    short_blade_training: "pool_lap_training",
    long_blade_speed: "sprint_race_drill",
    split_fin_flutter: "distance_endurance",
    monofin_dolphin_kick: "underwater_dolphin_swim",
    adjustable_strap_snorkel: "reef_snorkel_tour",
  };
  return m[t];
}

export function swimFins(): SwimFinType[] {
  return ["short_blade_training", "long_blade_speed", "split_fin_flutter", "monofin_dolphin_kick", "adjustable_strap_snorkel"];
}
