export type CoinError = "double_die" | "off_center" | "clipped_planchet" | "wrong_planchet" | "brockage";

export function rarityScore(e: CoinError): number {
  const m: Record<CoinError, number> = {
    double_die: 8, off_center: 5, clipped_planchet: 4, wrong_planchet: 10, brockage: 9,
  };
  return m[e];
}

export function valuePremium(e: CoinError): number {
  const m: Record<CoinError, number> = {
    double_die: 9, off_center: 6, clipped_planchet: 4, wrong_planchet: 10, brockage: 8,
  };
  return m[e];
}

export function detectability(e: CoinError): number {
  const m: Record<CoinError, number> = {
    double_die: 7, off_center: 10, clipped_planchet: 9, wrong_planchet: 6, brockage: 8,
  };
  return m[e];
}

export function frequencyOfOccurrence(e: CoinError): number {
  const m: Record<CoinError, number> = {
    double_die: 4, off_center: 7, clipped_planchet: 6, wrong_planchet: 1, brockage: 2,
  };
  return m[e];
}

export function authenticityChallenge(e: CoinError): number {
  const m: Record<CoinError, number> = {
    double_die: 7, off_center: 3, clipped_planchet: 4, wrong_planchet: 8, brockage: 6,
  };
  return m[e];
}

export function affectsDesign(e: CoinError): boolean {
  const m: Record<CoinError, boolean> = {
    double_die: true, off_center: true, clipped_planchet: true, wrong_planchet: false, brockage: true,
  };
  return m[e];
}

export function mintProcessError(e: CoinError): boolean {
  const m: Record<CoinError, boolean> = {
    double_die: true, off_center: true, clipped_planchet: true, wrong_planchet: true, brockage: true,
  };
  return m[e];
}

export function errorStage(e: CoinError): string {
  const m: Record<CoinError, string> = {
    double_die: "die_preparation", off_center: "striking",
    clipped_planchet: "planchet_cutting", wrong_planchet: "planchet_feeding",
    brockage: "ejection_failure",
  };
  return m[e];
}

export function famousExample(e: CoinError): string {
  const m: Record<CoinError, string> = {
    double_die: "1955_lincoln_cent", off_center: "various_denominations",
    clipped_planchet: "curved_clip_cents", wrong_planchet: "sacagawea_on_state_quarter",
    brockage: "mirror_image_strikes",
  };
  return m[e];
}

export function coinErrors(): CoinError[] {
  return ["double_die", "off_center", "clipped_planchet", "wrong_planchet", "brockage"];
}
