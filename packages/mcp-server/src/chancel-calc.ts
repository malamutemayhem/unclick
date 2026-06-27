export type VaultType = "barrel" | "groin" | "rib" | "fan" | "stellar";

export function floorArea(lengthM: number, widthM: number): number {
  return parseFloat((lengthM * widthM).toFixed(1));
}

export function vaultHeight(spanM: number, vaultType: VaultType): number {
  const ratio: Record<VaultType, number> = { barrel: 0.5, groin: 0.5, rib: 0.6, fan: 0.7, stellar: 0.65 };
  return parseFloat((spanM * ratio[vaultType]).toFixed(1));
}

export function windowArea(wallHeightM: number, wallWidthM: number, windowRatio: number): number {
  return parseFloat((wallHeightM * wallWidthM * windowRatio).toFixed(1));
}

export function choirStalls(lengthM: number, stallWidthCm: number): number {
  if (stallWidthCm <= 0) return 0;
  return Math.floor(lengthM * 100 / stallWidthCm) * 2;
}

export function altarSteps(heightDiffCm: number, riserCm: number): number {
  if (riserCm <= 0) return 0;
  return Math.ceil(heightDiffCm / riserCm);
}

export function roodScreenPanels(widthM: number, panelWidthCm: number): number {
  if (panelWidthCm <= 0) return 0;
  return Math.ceil(widthM * 100 / panelWidthCm);
}

export function acousticReverbS(volumeM3: number, absorptionCoeff: number): number {
  if (absorptionCoeff <= 0) return 0;
  return parseFloat((0.161 * volumeM3 / absorptionCoeff).toFixed(1));
}

export function lightLevel(windowAreaM2: number, floorAreaM2: number): string {
  if (floorAreaM2 <= 0) return "dark";
  const ratio = windowAreaM2 / floorAreaM2;
  if (ratio > 0.3) return "bright";
  if (ratio > 0.15) return "moderate";
  return "dim";
}

export function stoneworkM3(lengthM: number, widthM: number, wallThickM: number, heightM: number): number {
  const perimeter = 2 * (lengthM + widthM);
  return parseFloat((perimeter * wallThickM * heightM).toFixed(1));
}

export function vaultTypes(): VaultType[] {
  return ["barrel", "groin", "rib", "fan", "stellar"];
}
