export type BivvyBagType = "goretex_breathable_shell" | "emergency_mylar_reflective" | "hooped_pole_mini_tent" | "waterproof_nylon_basic" | "modular_zip_system";

export function weatherProtect(t: BivvyBagType): number {
  const m: Record<BivvyBagType, number> = {
    goretex_breathable_shell: 10, emergency_mylar_reflective: 6, hooped_pole_mini_tent: 9, waterproof_nylon_basic: 8, modular_zip_system: 8,
  };
  return m[t];
}

export function breathability(t: BivvyBagType): number {
  const m: Record<BivvyBagType, number> = {
    goretex_breathable_shell: 10, emergency_mylar_reflective: 1, hooped_pole_mini_tent: 7, waterproof_nylon_basic: 4, modular_zip_system: 6,
  };
  return m[t];
}

export function packWeight(t: BivvyBagType): number {
  const m: Record<BivvyBagType, number> = {
    goretex_breathable_shell: 7, emergency_mylar_reflective: 10, hooped_pole_mini_tent: 4, waterproof_nylon_basic: 8, modular_zip_system: 5,
  };
  return m[t];
}

export function livability(t: BivvyBagType): number {
  const m: Record<BivvyBagType, number> = {
    goretex_breathable_shell: 5, emergency_mylar_reflective: 2, hooped_pole_mini_tent: 9, waterproof_nylon_basic: 4, modular_zip_system: 8,
  };
  return m[t];
}

export function bivvyCost(t: BivvyBagType): number {
  const m: Record<BivvyBagType, number> = {
    goretex_breathable_shell: 3, emergency_mylar_reflective: 1, hooped_pole_mini_tent: 3, waterproof_nylon_basic: 1, modular_zip_system: 3,
  };
  return m[t];
}

export function reusable(t: BivvyBagType): boolean {
  const m: Record<BivvyBagType, boolean> = {
    goretex_breathable_shell: true, emergency_mylar_reflective: false, hooped_pole_mini_tent: true, waterproof_nylon_basic: true, modular_zip_system: true,
  };
  return m[t];
}

export function hasHoop(t: BivvyBagType): boolean {
  const m: Record<BivvyBagType, boolean> = {
    goretex_breathable_shell: false, emergency_mylar_reflective: false, hooped_pole_mini_tent: true, waterproof_nylon_basic: false, modular_zip_system: false,
  };
  return m[t];
}

export function shellFabric(t: BivvyBagType): string {
  const m: Record<BivvyBagType, string> = {
    goretex_breathable_shell: "goretex_membrane_nylon",
    emergency_mylar_reflective: "aluminized_mylar_film",
    hooped_pole_mini_tent: "ripstop_nylon_mesh",
    waterproof_nylon_basic: "pu_coated_nylon_210d",
    modular_zip_system: "event_fabric_panels",
  };
  return m[t];
}

export function bestUse(t: BivvyBagType): string {
  const m: Record<BivvyBagType, string> = {
    goretex_breathable_shell: "alpine_fast_light_bivy",
    emergency_mylar_reflective: "survival_kit_emergency",
    hooped_pole_mini_tent: "solo_backpack_comfort",
    waterproof_nylon_basic: "budget_wild_camp",
    modular_zip_system: "multi_season_adaptable",
  };
  return m[t];
}

export function bivvyBags(): BivvyBagType[] {
  return ["goretex_breathable_shell", "emergency_mylar_reflective", "hooped_pole_mini_tent", "waterproof_nylon_basic", "modular_zip_system"];
}
