export interface WireSpec {
  gauge: number;
  diameterMm: number;
  diameterInch: number;
  areaMm2: number;
  resistancePerKm: number;
  maxCurrentA: number;
}

const AWG_DATA: { gauge: number; diamMm: number; resistOhmKm: number; maxAmp: number }[] = [
  { gauge: 0, diamMm: 8.251, resistOhmKm: 0.3224, maxAmp: 245 },
  { gauge: 1, diamMm: 7.348, resistOhmKm: 0.4066, maxAmp: 210 },
  { gauge: 2, diamMm: 6.544, resistOhmKm: 0.5127, maxAmp: 180 },
  { gauge: 4, diamMm: 5.189, resistOhmKm: 0.8153, maxAmp: 135 },
  { gauge: 6, diamMm: 4.115, resistOhmKm: 1.296, maxAmp: 100 },
  { gauge: 8, diamMm: 3.264, resistOhmKm: 2.061, maxAmp: 75 },
  { gauge: 10, diamMm: 2.588, resistOhmKm: 3.277, maxAmp: 55 },
  { gauge: 12, diamMm: 2.053, resistOhmKm: 5.211, maxAmp: 40 },
  { gauge: 14, diamMm: 1.628, resistOhmKm: 8.286, maxAmp: 30 },
  { gauge: 16, diamMm: 1.291, resistOhmKm: 13.17, maxAmp: 22 },
  { gauge: 18, diamMm: 1.024, resistOhmKm: 20.95, maxAmp: 16 },
  { gauge: 20, diamMm: 0.812, resistOhmKm: 33.31, maxAmp: 11 },
  { gauge: 22, diamMm: 0.644, resistOhmKm: 52.96, maxAmp: 7 },
  { gauge: 24, diamMm: 0.511, resistOhmKm: 84.22, maxAmp: 3.5 },
  { gauge: 26, diamMm: 0.405, resistOhmKm: 133.9, maxAmp: 2.2 },
  { gauge: 28, diamMm: 0.321, resistOhmKm: 212.9, maxAmp: 1.4 },
  { gauge: 30, diamMm: 0.255, resistOhmKm: 338.6, maxAmp: 0.86 },
];

export function getWireSpec(gauge: number): WireSpec | null {
  const entry = AWG_DATA.find(d => d.gauge === gauge);
  if (!entry) return null;
  const diamInch = entry.diamMm / 25.4;
  const areaMm2 = Math.PI * (entry.diamMm / 2) ** 2;
  return {
    gauge: entry.gauge,
    diameterMm: entry.diamMm,
    diameterInch: parseFloat(diamInch.toFixed(4)),
    areaMm2: parseFloat(areaMm2.toFixed(3)),
    resistancePerKm: entry.resistOhmKm,
    maxCurrentA: entry.maxAmp,
  };
}

export function awgDiameter(gauge: number): number {
  return 0.127 * Math.pow(92, (36 - gauge) / 39);
}

export function awgArea(gauge: number): number {
  const d = awgDiameter(gauge);
  return Math.PI * (d / 2) ** 2;
}

export function awgResistance(gauge: number): number {
  const areaMm2 = awgArea(gauge);
  return 17.241 / areaMm2;
}

export function voltageDrop(current: number, length: number, gauge: number): number {
  const resistPerKm = awgResistance(gauge);
  return current * resistPerKm * (length / 1000) * 2;
}

export function voltageDropPercent(current: number, length: number, gauge: number, voltage: number): number {
  return (voltageDrop(current, length, gauge) / voltage) * 100;
}

export function recommendGauge(current: number, maxDropPercent = 3, length = 30, voltage = 120): number {
  for (const entry of AWG_DATA) {
    if (entry.maxAmp >= current) {
      const dropPct = voltageDropPercent(current, length, entry.gauge, voltage);
      if (dropPct <= maxDropPercent) return entry.gauge;
    }
  }
  return 0;
}

export function powerLoss(current: number, length: number, gauge: number): number {
  const drop = voltageDrop(current, length, gauge);
  return current * drop;
}

export function maxDistance(current: number, gauge: number, voltage: number, maxDropPercent = 3): number {
  const resistPerKm = awgResistance(gauge);
  const maxDrop = voltage * maxDropPercent / 100;
  return (maxDrop / (current * resistPerKm * 2)) * 1000;
}

export function wireWeight(gauge: number, lengthM: number, material: "copper" | "aluminum" = "copper"): number {
  const areaMm2 = awgArea(gauge);
  const density = material === "copper" ? 8960 : 2700;
  const volumeM3 = (areaMm2 / 1e6) * lengthM;
  return volumeM3 * density;
}

export function conduitFill(gauges: number[], conduitDiamMm: number): { fillPercent: number; fits: boolean } {
  const conduitArea = Math.PI * (conduitDiamMm / 2) ** 2;
  let totalWireArea = 0;
  for (const g of gauges) {
    totalWireArea += awgArea(g);
  }
  const fillPercent = (totalWireArea / conduitArea) * 100;
  return { fillPercent: parseFloat(fillPercent.toFixed(1)), fits: fillPercent <= 40 };
}

export function getAvailableGauges(): number[] {
  return AWG_DATA.map(d => d.gauge);
}

export function gaugeComparison(gauge1: number, gauge2: number): { areaRatio: number; resistanceRatio: number } {
  const a1 = awgArea(gauge1);
  const a2 = awgArea(gauge2);
  const r1 = awgResistance(gauge1);
  const r2 = awgResistance(gauge2);
  return {
    areaRatio: parseFloat((a1 / a2).toFixed(3)),
    resistanceRatio: parseFloat((r1 / r2).toFixed(3)),
  };
}

export function temperatureDerating(baseAmp: number, ambientC: number, ratedC = 30): number {
  if (ambientC <= ratedC) return baseAmp;
  const factor = Math.sqrt((90 - ambientC) / (90 - ratedC));
  return parseFloat((baseAmp * factor).toFixed(1));
}
