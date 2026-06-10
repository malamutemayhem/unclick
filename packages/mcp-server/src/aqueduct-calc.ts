export type ChannelShape = "rectangular" | "trapezoidal" | "semicircular" | "horseshoe";

export function flowRate(crossSectionM2: number, velocityMs: number): number {
  return parseFloat((crossSectionM2 * velocityMs).toFixed(3));
}

export function gradient(dropM: number, lengthM: number): number {
  if (lengthM <= 0) return 0;
  return parseFloat((dropM / lengthM).toFixed(6));
}

export function velocity(gradient: number, hydraulicRadius: number): number {
  return parseFloat((50 * Math.pow(hydraulicRadius, 2 / 3) * Math.sqrt(gradient)).toFixed(3));
}

export function crossSection(shape: ChannelShape, width: number, depth: number): number {
  if (shape === "semicircular") {
    return parseFloat((Math.PI * (width / 2) * (width / 2) / 2).toFixed(3));
  }
  if (shape === "trapezoidal") {
    return parseFloat(((width + width * 1.5) / 2 * depth).toFixed(3));
  }
  return parseFloat((width * depth).toFixed(3));
}

export function hydraulicRadius(area: number, wettedPerimeter: number): number {
  if (wettedPerimeter <= 0) return 0;
  return parseFloat((area / wettedPerimeter).toFixed(4));
}

export function archSpan(valleyWidth: number): number {
  return parseFloat((valleyWidth * 1.1).toFixed(1));
}

export function pillarCount(length: number, spanM: number): number {
  if (spanM <= 0) return 0;
  return Math.ceil(length / spanM) + 1;
}

export function settlingBasinVolume(flowRateM3s: number, retentionMinutes: number): number {
  return parseFloat((flowRateM3s * retentionMinutes * 60).toFixed(1));
}

export function evaporationLoss(surfaceAreaM2: number, tempC: number): number {
  return parseFloat((surfaceAreaM2 * tempC * 0.0001).toFixed(3));
}

export function channelShapes(): ChannelShape[] {
  return ["rectangular", "trapezoidal", "semicircular", "horseshoe"];
}
