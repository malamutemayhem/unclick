export type VaultType = "barrel" | "groin" | "ribbed" | "fan" | "cloister";

export function spanMeters(vault: VaultType): number {
  const m: Record<VaultType, number> = {
    barrel: 12, groin: 15, ribbed: 20, fan: 10, cloister: 8,
  };
  return m[vault];
}

export function loadDistribution(vault: VaultType): number {
  const m: Record<VaultType, number> = {
    barrel: 5, groin: 7, ribbed: 9, fan: 8, cloister: 6,
  };
  return m[vault];
}

export function lightAdmission(vault: VaultType): number {
  const m: Record<VaultType, number> = {
    barrel: 2, groin: 6, ribbed: 8, fan: 7, cloister: 4,
  };
  return m[vault];
}

export function buildComplexity(vault: VaultType): number {
  const m: Record<VaultType, number> = {
    barrel: 3, groin: 6, ribbed: 8, fan: 9, cloister: 5,
  };
  return m[vault];
}

export function decorativePotential(vault: VaultType): number {
  const m: Record<VaultType, number> = {
    barrel: 4, groin: 5, ribbed: 7, fan: 10, cloister: 6,
  };
  return m[vault];
}

export function needsExternalButtress(vault: VaultType): boolean {
  const m: Record<VaultType, boolean> = {
    barrel: true, groin: false, ribbed: true, fan: true, cloister: false,
  };
  return m[vault];
}

export function selfSupporting(vault: VaultType): boolean {
  const m: Record<VaultType, boolean> = {
    barrel: false, groin: true, ribbed: false, fan: false, cloister: true,
  };
  return m[vault];
}

export function bestApplication(vault: VaultType): string {
  const m: Record<VaultType, string> = {
    barrel: "tunnel", groin: "cathedral_nave", ribbed: "gothic_cathedral",
    fan: "chapel", cloister: "crypt",
  };
  return m[vault];
}

export function costPerM2(vault: VaultType): number {
  const m: Record<VaultType, number> = {
    barrel: 200, groin: 350, ribbed: 500, fan: 800, cloister: 300,
  };
  return m[vault];
}

export function vaultTypes(): VaultType[] {
  return ["barrel", "groin", "ribbed", "fan", "cloister"];
}
