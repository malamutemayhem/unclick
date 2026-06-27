export type CompostBinType = "tumbler_barrel" | "stationary_open" | "worm_vermi" | "electric_counter" | "bokashi_ferment";

export function decompostSpeed(t: CompostBinType): number {
  const m: Record<CompostBinType, number> = {
    tumbler_barrel: 8, stationary_open: 5, worm_vermi: 7, electric_counter: 10, bokashi_ferment: 9,
  };
  return m[t];
}

export function capacity(t: CompostBinType): number {
  const m: Record<CompostBinType, number> = {
    tumbler_barrel: 7, stationary_open: 10, worm_vermi: 4, electric_counter: 2, bokashi_ferment: 3,
  };
  return m[t];
}

export function odorControl(t: CompostBinType): number {
  const m: Record<CompostBinType, number> = {
    tumbler_barrel: 8, stationary_open: 3, worm_vermi: 7, electric_counter: 10, bokashi_ferment: 9,
  };
  return m[t];
}

export function maintenanceLevel(t: CompostBinType): number {
  const m: Record<CompostBinType, number> = {
    tumbler_barrel: 7, stationary_open: 5, worm_vermi: 4, electric_counter: 9, bokashi_ferment: 7,
  };
  return m[t];
}

export function binCost(t: CompostBinType): number {
  const m: Record<CompostBinType, number> = {
    tumbler_barrel: 6, stationary_open: 2, worm_vermi: 4, electric_counter: 10, bokashi_ferment: 5,
  };
  return m[t];
}

export function indoorSafe(t: CompostBinType): boolean {
  const m: Record<CompostBinType, boolean> = {
    tumbler_barrel: false, stationary_open: false, worm_vermi: true, electric_counter: true, bokashi_ferment: true,
  };
  return m[t];
}

export function acceptsMeat(t: CompostBinType): boolean {
  const m: Record<CompostBinType, boolean> = {
    tumbler_barrel: false, stationary_open: false, worm_vermi: false, electric_counter: true, bokashi_ferment: true,
  };
  return m[t];
}

export function processType(t: CompostBinType): string {
  const m: Record<CompostBinType, string> = {
    tumbler_barrel: "aerobic_tumble_rotation", stationary_open: "aerobic_pile_natural",
    worm_vermi: "vermiculture_worm_digest", electric_counter: "heat_dry_grind_cycle",
    bokashi_ferment: "anaerobic_fermentation_bran",
  };
  return m[t];
}

export function bestSetup(t: CompostBinType): string {
  const m: Record<CompostBinType, string> = {
    tumbler_barrel: "suburban_yard_fast_batch", stationary_open: "large_garden_high_volume",
    worm_vermi: "indoor_apartment_vermi", electric_counter: "kitchen_counter_quick",
    bokashi_ferment: "small_space_all_food_waste",
  };
  return m[t];
}

export function compostBins(): CompostBinType[] {
  return ["tumbler_barrel", "stationary_open", "worm_vermi", "electric_counter", "bokashi_ferment"];
}
