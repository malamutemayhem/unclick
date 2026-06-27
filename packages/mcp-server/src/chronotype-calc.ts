export type Chronotype = "lion" | "bear" | "wolf" | "dolphin" | "third_bird";

export function morningAlertness(c: Chronotype): number {
  const m: Record<Chronotype, number> = {
    lion: 10, bear: 7, wolf: 2, dolphin: 5, third_bird: 6,
  };
  return m[c];
}

export function eveningProductivity(c: Chronotype): number {
  const m: Record<Chronotype, number> = {
    lion: 3, bear: 5, wolf: 10, dolphin: 7, third_bird: 6,
  };
  return m[c];
}

export function sleepQuality(c: Chronotype): number {
  const m: Record<Chronotype, number> = {
    lion: 9, bear: 8, wolf: 6, dolphin: 3, third_bird: 7,
  };
  return m[c];
}

export function socialJetLag(c: Chronotype): number {
  const m: Record<Chronotype, number> = {
    lion: 6, bear: 3, wolf: 9, dolphin: 7, third_bird: 4,
  };
  return m[c];
}

export function populationPercent(c: Chronotype): number {
  const m: Record<Chronotype, number> = {
    lion: 4, bear: 10, wolf: 5, dolphin: 2, third_bird: 3,
  };
  return m[c];
}

export function naturalEarlyRiser(c: Chronotype): boolean {
  const m: Record<Chronotype, boolean> = {
    lion: true, bear: false, wolf: false, dolphin: false, third_bird: false,
  };
  return m[c];
}

export function insomniaRisk(c: Chronotype): boolean {
  const m: Record<Chronotype, boolean> = {
    lion: false, bear: false, wolf: false, dolphin: true, third_bird: false,
  };
  return m[c];
}

export function idealWakeTime(c: Chronotype): string {
  const m: Record<Chronotype, string> = {
    lion: "5_30_am", bear: "7_00_am",
    wolf: "9_00_am", dolphin: "6_30_am",
    third_bird: "7_30_am",
  };
  return m[c];
}

export function peakFocusWindow(c: Chronotype): string {
  const m: Record<Chronotype, string> = {
    lion: "8am_to_12pm", bear: "10am_to_2pm",
    wolf: "5pm_to_9pm", dolphin: "3pm_to_9pm",
    third_bird: "11am_to_3pm",
  };
  return m[c];
}

export function chronotypes(): Chronotype[] {
  return ["lion", "bear", "wolf", "dolphin", "third_bird"];
}
