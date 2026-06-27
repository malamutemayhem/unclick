export type EspressoMachine = "manual_lever" | "semi_auto" | "fully_auto" | "super_auto" | "capsule_pod";

export function shotQuality(e: EspressoMachine): number {
  const m: Record<EspressoMachine, number> = {
    manual_lever: 10, semi_auto: 9, fully_auto: 7, super_auto: 6, capsule_pod: 4,
  };
  return m[e];
}

export function consistency(e: EspressoMachine): number {
  const m: Record<EspressoMachine, number> = {
    manual_lever: 4, semi_auto: 7, fully_auto: 9, super_auto: 10, capsule_pod: 8,
  };
  return m[e];
}

export function userControl(e: EspressoMachine): number {
  const m: Record<EspressoMachine, number> = {
    manual_lever: 10, semi_auto: 9, fully_auto: 5, super_auto: 3, capsule_pod: 1,
  };
  return m[e];
}

export function convenienceScore(e: EspressoMachine): number {
  const m: Record<EspressoMachine, number> = {
    manual_lever: 2, semi_auto: 4, fully_auto: 7, super_auto: 9, capsule_pod: 10,
  };
  return m[e];
}

export function machineCost(e: EspressoMachine): number {
  const m: Record<EspressoMachine, number> = {
    manual_lever: 7, semi_auto: 6, fully_auto: 8, super_auto: 10, capsule_pod: 3,
  };
  return m[e];
}

export function builtInGrinder(e: EspressoMachine): boolean {
  const m: Record<EspressoMachine, boolean> = {
    manual_lever: false, semi_auto: false, fully_auto: true, super_auto: true, capsule_pod: false,
  };
  return m[e];
}

export function steamWand(e: EspressoMachine): boolean {
  const m: Record<EspressoMachine, boolean> = {
    manual_lever: true, semi_auto: true, fully_auto: true, super_auto: true, capsule_pod: false,
  };
  return m[e];
}

export function brewMethod(e: EspressoMachine): string {
  const m: Record<EspressoMachine, string> = {
    manual_lever: "piston_direct_pressure_pull", semi_auto: "pump_manual_start_stop",
    fully_auto: "pump_volumetric_auto_dose", super_auto: "bean_to_cup_one_touch",
    capsule_pod: "sealed_pod_pressure_pierce",
  };
  return m[e];
}

export function bestUser(e: EspressoMachine): string {
  const m: Record<EspressoMachine, string> = {
    manual_lever: "enthusiast_craft_ritual", semi_auto: "home_barista_learning",
    fully_auto: "daily_driver_consistent", super_auto: "office_convenience_variety",
    capsule_pod: "quick_no_mess_minimal",
  };
  return m[e];
}

export function espressoMachines(): EspressoMachine[] {
  return ["manual_lever", "semi_auto", "fully_auto", "super_auto", "capsule_pod"];
}
