export type LineCoding = "nrz" | "manchester" | "ami" | "hdb3" | "pam4";

export function bandwidthEfficiency(l: LineCoding): number {
  const m: Record<LineCoding, number> = {
    nrz: 8, manchester: 4, ami: 7, hdb3: 7, pam4: 10,
  };
  return m[l];
}

export function clockRecovery(l: LineCoding): number {
  const m: Record<LineCoding, number> = {
    nrz: 2, manchester: 10, ami: 6, hdb3: 8, pam4: 7,
  };
  return m[l];
}

export function dcBalance(l: LineCoding): number {
  const m: Record<LineCoding, number> = {
    nrz: 2, manchester: 10, ami: 9, hdb3: 9, pam4: 6,
  };
  return m[l];
}

export function errorDetection(l: LineCoding): number {
  const m: Record<LineCoding, number> = {
    nrz: 1, manchester: 5, ami: 7, hdb3: 7, pam4: 4,
  };
  return m[l];
}

export function implementationSimplicity(l: LineCoding): number {
  const m: Record<LineCoding, number> = {
    nrz: 10, manchester: 7, ami: 6, hdb3: 4, pam4: 3,
  };
  return m[l];
}

export function bipolar(l: LineCoding): boolean {
  const m: Record<LineCoding, boolean> = {
    nrz: false, manchester: false, ami: true, hdb3: true, pam4: false,
  };
  return m[l];
}

export function multilevel(l: LineCoding): boolean {
  const m: Record<LineCoding, boolean> = {
    nrz: false, manchester: false, ami: false, hdb3: false, pam4: true,
  };
  return m[l];
}

export function signalLevels(l: LineCoding): string {
  const m: Record<LineCoding, string> = {
    nrz: "two_level_unipolar", manchester: "two_level_transition",
    ami: "three_level_bipolar", hdb3: "three_level_substitution",
    pam4: "four_level_amplitude",
  };
  return m[l];
}

export function typicalApplication(l: LineCoding): string {
  const m: Record<LineCoding, string> = {
    nrz: "serial_uart_rs232", manchester: "ethernet_10base",
    ami: "t1_e1_isdn", hdb3: "e1_e3_european_telecom",
    pam4: "400g_ethernet_pcie6",
  };
  return m[l];
}

export function lineCodings(): LineCoding[] {
  return ["nrz", "manchester", "ami", "hdb3", "pam4"];
}
