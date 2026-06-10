export type VacuumBagType = "upright_disposable_paper" | "hepa_cloth_reusable" | "canister_flat_compact" | "shop_vac_wet_dry" | "robotic_dustbin_auto";

export function filtration(t: VacuumBagType): number {
  const m: Record<VacuumBagType, number> = {
    upright_disposable_paper: 5, hepa_cloth_reusable: 10, canister_flat_compact: 7, shop_vac_wet_dry: 4, robotic_dustbin_auto: 8,
  };
  return m[t];
}

export function capacity(t: VacuumBagType): number {
  const m: Record<VacuumBagType, number> = {
    upright_disposable_paper: 7, hepa_cloth_reusable: 6, canister_flat_compact: 5, shop_vac_wet_dry: 10, robotic_dustbin_auto: 3,
  };
  return m[t];
}

export function changeEase(t: VacuumBagType): number {
  const m: Record<VacuumBagType, number> = {
    upright_disposable_paper: 9, hepa_cloth_reusable: 6, canister_flat_compact: 8, shop_vac_wet_dry: 5, robotic_dustbin_auto: 10,
  };
  return m[t];
}

export function costPerUse(t: VacuumBagType): number {
  const m: Record<VacuumBagType, number> = {
    upright_disposable_paper: 4, hepa_cloth_reusable: 9, canister_flat_compact: 5, shop_vac_wet_dry: 3, robotic_dustbin_auto: 10,
  };
  return m[t];
}

export function bagCost(t: VacuumBagType): number {
  const m: Record<VacuumBagType, number> = {
    upright_disposable_paper: 3, hepa_cloth_reusable: 7, canister_flat_compact: 4, shop_vac_wet_dry: 4, robotic_dustbin_auto: 8,
  };
  return m[t];
}

export function reusable(t: VacuumBagType): boolean {
  const m: Record<VacuumBagType, boolean> = {
    upright_disposable_paper: false, hepa_cloth_reusable: true, canister_flat_compact: false, shop_vac_wet_dry: false, robotic_dustbin_auto: true,
  };
  return m[t];
}

export function allergenSeal(t: VacuumBagType): boolean {
  const m: Record<VacuumBagType, boolean> = {
    upright_disposable_paper: false, hepa_cloth_reusable: true, canister_flat_compact: true, shop_vac_wet_dry: false, robotic_dustbin_auto: true,
  };
  return m[t];
}

export function bagMaterial(t: VacuumBagType): string {
  const m: Record<VacuumBagType, string> = {
    upright_disposable_paper: "multi_layer_paper_filter",
    hepa_cloth_reusable: "synthetic_hepa_cloth",
    canister_flat_compact: "microfiber_electrostatic",
    shop_vac_wet_dry: "woven_collection_liner",
    robotic_dustbin_auto: "self_empty_dock_bag",
  };
  return m[t];
}

export function bestVacuum(t: VacuumBagType): string {
  const m: Record<VacuumBagType, string> = {
    upright_disposable_paper: "traditional_upright_home",
    hepa_cloth_reusable: "allergy_asthma_sensitive",
    canister_flat_compact: "compact_canister_apartment",
    shop_vac_wet_dry: "garage_workshop_jobsite",
    robotic_dustbin_auto: "robot_auto_empty_smart",
  };
  return m[t];
}

export function vacuumBags(): VacuumBagType[] {
  return ["upright_disposable_paper", "hepa_cloth_reusable", "canister_flat_compact", "shop_vac_wet_dry", "robotic_dustbin_auto"];
}
