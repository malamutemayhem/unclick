export type CarWaxType = "carnauba_paste" | "synthetic_sealant" | "ceramic_coating" | "spray_quick" | "hybrid_ceramic_wax";

export function glossLevel(t: CarWaxType): number {
  const m: Record<CarWaxType, number> = {
    carnauba_paste: 10, synthetic_sealant: 7, ceramic_coating: 9, spray_quick: 5, hybrid_ceramic_wax: 8,
  };
  return m[t];
}

export function durabilityMonths(t: CarWaxType): number {
  const m: Record<CarWaxType, number> = {
    carnauba_paste: 3, synthetic_sealant: 7, ceramic_coating: 10, spray_quick: 1, hybrid_ceramic_wax: 5,
  };
  return m[t];
}

export function applicationEase(t: CarWaxType): number {
  const m: Record<CarWaxType, number> = {
    carnauba_paste: 3, synthetic_sealant: 6, ceramic_coating: 2, spray_quick: 10, hybrid_ceramic_wax: 8,
  };
  return m[t];
}

export function waterBeading(t: CarWaxType): number {
  const m: Record<CarWaxType, number> = {
    carnauba_paste: 7, synthetic_sealant: 8, ceramic_coating: 10, spray_quick: 5, hybrid_ceramic_wax: 9,
  };
  return m[t];
}

export function waxCost(t: CarWaxType): number {
  const m: Record<CarWaxType, number> = {
    carnauba_paste: 5, synthetic_sealant: 4, ceramic_coating: 10, spray_quick: 2, hybrid_ceramic_wax: 6,
  };
  return m[t];
}

export function uvProtection(t: CarWaxType): boolean {
  const m: Record<CarWaxType, boolean> = {
    carnauba_paste: true, synthetic_sealant: true, ceramic_coating: true, spray_quick: false, hybrid_ceramic_wax: true,
  };
  return m[t];
}

export function fillsSwirls(t: CarWaxType): boolean {
  const m: Record<CarWaxType, boolean> = {
    carnauba_paste: true, synthetic_sealant: false, ceramic_coating: false, spray_quick: false, hybrid_ceramic_wax: false,
  };
  return m[t];
}

export function applicationMethod(t: CarWaxType): string {
  const m: Record<CarWaxType, string> = {
    carnauba_paste: "hand_apply_foam_pad", synthetic_sealant: "dual_action_polisher",
    ceramic_coating: "microfiber_applicator_cure", spray_quick: "spray_wipe_off",
    hybrid_ceramic_wax: "spray_spread_buff",
  };
  return m[t];
}

export function bestFor(t: CarWaxType): string {
  const m: Record<CarWaxType, string> = {
    carnauba_paste: "show_car_deep_warm_glow", synthetic_sealant: "daily_driver_long_protect",
    ceramic_coating: "permanent_hydrophobic_shield", spray_quick: "maintenance_wash_top_up",
    hybrid_ceramic_wax: "easy_ceramic_benefit_diy",
  };
  return m[t];
}

export function carWaxes(): CarWaxType[] {
  return ["carnauba_paste", "synthetic_sealant", "ceramic_coating", "spray_quick", "hybrid_ceramic_wax"];
}
