export type ShinGuardType = "slip_in_shell" | "ankle_guard_attached" | "compression_sleeve_pad" | "custom_molded_pro" | "sock_integrated_youth";

export function protection(t: ShinGuardType): number {
  const m: Record<ShinGuardType, number> = {
    slip_in_shell: 7, ankle_guard_attached: 10, compression_sleeve_pad: 5, custom_molded_pro: 9, sock_integrated_youth: 6,
  };
  return m[t];
}

export function comfort(t: ShinGuardType): number {
  const m: Record<ShinGuardType, number> = {
    slip_in_shell: 7, ankle_guard_attached: 5, compression_sleeve_pad: 10, custom_molded_pro: 8, sock_integrated_youth: 9,
  };
  return m[t];
}

export function mobility(t: ShinGuardType): number {
  const m: Record<ShinGuardType, number> = {
    slip_in_shell: 8, ankle_guard_attached: 5, compression_sleeve_pad: 10, custom_molded_pro: 7, sock_integrated_youth: 9,
  };
  return m[t];
}

export function stayInPlace(t: ShinGuardType): number {
  const m: Record<ShinGuardType, number> = {
    slip_in_shell: 5, ankle_guard_attached: 9, compression_sleeve_pad: 8, custom_molded_pro: 10, sock_integrated_youth: 9,
  };
  return m[t];
}

export function guardCost(t: ShinGuardType): number {
  const m: Record<ShinGuardType, number> = {
    slip_in_shell: 3, ankle_guard_attached: 6, compression_sleeve_pad: 5, custom_molded_pro: 10, sock_integrated_youth: 4,
  };
  return m[t];
}

export function ankleProtect(t: ShinGuardType): boolean {
  const m: Record<ShinGuardType, boolean> = {
    slip_in_shell: false, ankle_guard_attached: true, compression_sleeve_pad: false, custom_molded_pro: false, sock_integrated_youth: false,
  };
  return m[t];
}

export function machineWash(t: ShinGuardType): boolean {
  const m: Record<ShinGuardType, boolean> = {
    slip_in_shell: false, ankle_guard_attached: false, compression_sleeve_pad: true, custom_molded_pro: false, sock_integrated_youth: true,
  };
  return m[t];
}

export function shellMaterial(t: ShinGuardType): string {
  const m: Record<ShinGuardType, string> = {
    slip_in_shell: "polypropylene_hard_shell",
    ankle_guard_attached: "fiberglass_foam_ankle_cup",
    compression_sleeve_pad: "neoprene_eva_foam_pad",
    custom_molded_pro: "carbon_fiber_custom_form",
    sock_integrated_youth: "lightweight_pp_sewn_sock",
  };
  return m[t];
}

export function bestPlayer(t: ShinGuardType): string {
  const m: Record<ShinGuardType, string> = {
    slip_in_shell: "experienced_minimal_bulk",
    ankle_guard_attached: "defender_full_contact",
    compression_sleeve_pad: "speed_forward_agility",
    custom_molded_pro: "professional_exact_fit",
    sock_integrated_youth: "youth_easy_on_off",
  };
  return m[t];
}

export function shinGuards(): ShinGuardType[] {
  return ["slip_in_shell", "ankle_guard_attached", "compression_sleeve_pad", "custom_molded_pro", "sock_integrated_youth"];
}
