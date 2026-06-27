export type AmplifierClass = "class_a" | "class_ab" | "class_d" | "class_h" | "tube";

export function audioFidelity(a: AmplifierClass): number {
  const m: Record<AmplifierClass, number> = {
    class_a: 10, class_ab: 8, class_d: 7, class_h: 7, tube: 9,
  };
  return m[a];
}

export function powerEfficiency(a: AmplifierClass): number {
  const m: Record<AmplifierClass, number> = {
    class_a: 2, class_ab: 5, class_d: 10, class_h: 8, tube: 3,
  };
  return m[a];
}

export function heatGeneration(a: AmplifierClass): number {
  const m: Record<AmplifierClass, number> = {
    class_a: 10, class_ab: 6, class_d: 2, class_h: 4, tube: 9,
  };
  return m[a];
}

export function outputPower(a: AmplifierClass): number {
  const m: Record<AmplifierClass, number> = {
    class_a: 4, class_ab: 7, class_d: 9, class_h: 10, tube: 5,
  };
  return m[a];
}

export function costLevel(a: AmplifierClass): number {
  const m: Record<AmplifierClass, number> = {
    class_a: 9, class_ab: 6, class_d: 4, class_h: 7, tube: 10,
  };
  return m[a];
}

export function solidState(a: AmplifierClass): boolean {
  const m: Record<AmplifierClass, boolean> = {
    class_a: true, class_ab: true, class_d: true, class_h: true, tube: false,
  };
  return m[a];
}

export function portableSuitable(a: AmplifierClass): boolean {
  const m: Record<AmplifierClass, boolean> = {
    class_a: false, class_ab: false, class_d: true, class_h: true, tube: false,
  };
  return m[a];
}

export function bestApplication(a: AmplifierClass): string {
  const m: Record<AmplifierClass, string> = {
    class_a: "audiophile_headphone", class_ab: "home_stereo_studio",
    class_d: "portable_pa_subwoofer", class_h: "professional_pa_concert",
    tube: "guitar_vintage_hifi",
  };
  return m[a];
}

export function distortionCharacter(a: AmplifierClass): string {
  const m: Record<AmplifierClass, string> = {
    class_a: "lowest_thd", class_ab: "low_crossover_artifact",
    class_d: "switching_noise", class_h: "rail_switching_artifact",
    tube: "warm_even_harmonic",
  };
  return m[a];
}

export function amplifierClasses(): AmplifierClass[] {
  return ["class_a", "class_ab", "class_d", "class_h", "tube"];
}
