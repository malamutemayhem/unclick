export type SignalEncoding = "nrz" | "manchester" | "four_b_five_b" | "eight_b_ten_b" | "pam4";

export function clockRecovery(s: SignalEncoding): number {
  const m: Record<SignalEncoding, number> = {
    nrz: 2, manchester: 10, four_b_five_b: 7, eight_b_ten_b: 8, pam4: 5,
  };
  return m[s];
}

export function bandwidthEfficiency(s: SignalEncoding): number {
  const m: Record<SignalEncoding, number> = {
    nrz: 10, manchester: 5, four_b_five_b: 8, eight_b_ten_b: 8, pam4: 9,
  };
  return m[s];
}

export function errorDetection(s: SignalEncoding): number {
  const m: Record<SignalEncoding, number> = {
    nrz: 1, manchester: 5, four_b_five_b: 7, eight_b_ten_b: 9, pam4: 4,
  };
  return m[s];
}

export function implementationEase(s: SignalEncoding): number {
  const m: Record<SignalEncoding, number> = {
    nrz: 10, manchester: 7, four_b_five_b: 5, eight_b_ten_b: 4, pam4: 3,
  };
  return m[s];
}

export function signalLevels(s: SignalEncoding): number {
  const m: Record<SignalEncoding, number> = {
    nrz: 2, manchester: 2, four_b_five_b: 2, eight_b_ten_b: 2, pam4: 4,
  };
  return m[s];
}

export function dcBalanced(s: SignalEncoding): boolean {
  const m: Record<SignalEncoding, boolean> = {
    nrz: false, manchester: true, four_b_five_b: true, eight_b_ten_b: true, pam4: false,
  };
  return m[s];
}

export function selfClocking(s: SignalEncoding): boolean {
  const m: Record<SignalEncoding, boolean> = {
    nrz: false, manchester: true, four_b_five_b: false, eight_b_ten_b: false, pam4: false,
  };
  return m[s];
}

export function commonMedium(s: SignalEncoding): string {
  const m: Record<SignalEncoding, string> = {
    nrz: "serial_uart", manchester: "ethernet_10base",
    four_b_five_b: "fast_ethernet", eight_b_ten_b: "gigabit_ethernet",
    pam4: "high_speed_serdes",
  };
  return m[s];
}

export function transitionRate(s: SignalEncoding): string {
  const m: Record<SignalEncoding, string> = {
    nrz: "variable", manchester: "every_bit",
    four_b_five_b: "guaranteed_minimum", eight_b_ten_b: "guaranteed_minimum",
    pam4: "variable",
  };
  return m[s];
}

export function signalEncodings(): SignalEncoding[] {
  return ["nrz", "manchester", "four_b_five_b", "eight_b_ten_b", "pam4"];
}
