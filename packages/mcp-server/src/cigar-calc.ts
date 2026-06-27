export type CigarShape = "parejo" | "torpedo" | "figurado" | "perfecto" | "pyramid" | "culebra";
export type WrapperType = "natural" | "maduro" | "oscuro" | "claro" | "connecticut" | "corojo";

export function ringGaugeToMm(ringGauge: number): number {
  return parseFloat((ringGauge * 0.397).toFixed(1));
}

export function mmToRingGauge(mm: number): number {
  return Math.round(mm / 0.397);
}

export function smokingTime(lengthInch: number, ringGauge: number): number {
  return Math.round(lengthInch * ringGauge / 10);
}

export function humidorCapacity(widthCm: number, depthCm: number, heightCm: number, avgCigarVolCm3: number = 15): number {
  const usableVolume = widthCm * depthCm * heightCm * 0.7;
  return Math.floor(usableVolume / avgCigarVolCm3);
}

export function humidityTarget(): number {
  return 70;
}

export function temperatureTarget(): { minC: number; maxC: number } {
  return { minC: 16, maxC: 21 };
}

export function bovedaPackCount(humidorVolumeLiters: number): number {
  return Math.ceil(humidorVolumeLiters / 25);
}

export function agingMonths(wrapper: WrapperType): number {
  const months: Record<WrapperType, number> = {
    natural: 3, maduro: 6, oscuro: 12, claro: 1, connecticut: 3, corojo: 6,
  };
  return months[wrapper];
}

export function cutType(shape: CigarShape): string {
  const cuts: Record<CigarShape, string> = {
    parejo: "straight or guillotine",
    torpedo: "straight cut at the tip",
    figurado: "v-cut recommended",
    perfecto: "punch or v-cut",
    pyramid: "straight cut near cap",
    culebra: "unwind and cut each",
  };
  return cuts[shape];
}

export function pairingSuggestion(strength: "mild" | "medium" | "full"): string {
  const pairings: Record<string, string> = {
    mild: "light coffee or white wine",
    medium: "bourbon or amber ale",
    full: "scotch or espresso",
  };
  return pairings[strength];
}

export function costPerMinute(price: number, smokingTimeMin: number): number {
  if (smokingTimeMin === 0) return 0;
  return parseFloat((price / smokingTimeMin).toFixed(2));
}

export function ashLength(ringGauge: number): number {
  return parseFloat((ringGauge * 0.04).toFixed(1));
}

export function cigarShapes(): CigarShape[] {
  return ["parejo", "torpedo", "figurado", "perfecto", "pyramid", "culebra"];
}
