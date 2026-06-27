export type OreType = "magnetite" | "hematite" | "limonite" | "siderite" | "bog_iron";

export function furnaceHeightCm(chargeKg: number): number {
  return parseFloat((chargeKg * 3 + 80).toFixed(1));
}

export function furnaceDiameterCm(heightCm: number): number {
  return parseFloat((heightCm * 0.3).toFixed(1));
}

export function charcoalKg(oreKg: number): number {
  return parseFloat((oreKg * 1.5).toFixed(1));
}

export function bloomWeightKg(oreKg: number, ore: OreType): number {
  const yields: Record<OreType, number> = {
    magnetite: 0.35, hematite: 0.30, limonite: 0.20, siderite: 0.25, bog_iron: 0.15,
  };
  return parseFloat((oreKg * yields[ore]).toFixed(1));
}

export function smeltingHours(oreKg: number): number {
  return parseFloat((oreKg * 0.3 + 4).toFixed(1));
}

export function tuyereDiameterCm(furnaceDiameterCm: number): number {
  return parseFloat((furnaceDiameterCm * 0.08).toFixed(1));
}

export function slagWeightKg(oreKg: number, ore: OreType): number {
  const slagRatio: Record<OreType, number> = {
    magnetite: 0.40, hematite: 0.45, limonite: 0.55, siderite: 0.50, bog_iron: 0.60,
  };
  return parseFloat((oreKg * slagRatio[ore]).toFixed(1));
}

export function airflowLpm(furnaceDiameterCm: number): number {
  return parseFloat((furnaceDiameterCm * furnaceDiameterCm * 0.1).toFixed(1));
}

export function temperatureCelsius(ore: OreType): number {
  const temps: Record<OreType, number> = {
    magnetite: 1300, hematite: 1250, limonite: 1200, siderite: 1150, bog_iron: 1100,
  };
  return temps[ore];
}

export function fuelCostPerSmelt(charcoalKg: number, costPerKg: number): number {
  return parseFloat((charcoalKg * costPerKg).toFixed(2));
}

export function oreTypes(): OreType[] {
  return ["magnetite", "hematite", "limonite", "siderite", "bog_iron"];
}
