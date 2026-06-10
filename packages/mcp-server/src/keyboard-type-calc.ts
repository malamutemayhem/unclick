export type KeyboardType = "grand_piano" | "upright_piano" | "harpsichord" | "organ" | "synthesizer";

export function keyCount(kb: KeyboardType): number {
  const m: Record<KeyboardType, number> = {
    grand_piano: 88, upright_piano: 88, harpsichord: 61, organ: 61, synthesizer: 61,
  };
  return m[kb];
}

export function dynamicRange(kb: KeyboardType): number {
  const m: Record<KeyboardType, number> = {
    grand_piano: 10, upright_piano: 7, harpsichord: 2, organ: 8, synthesizer: 9,
  };
  return m[kb];
}

export function sustainCapability(kb: KeyboardType): number {
  const m: Record<KeyboardType, number> = {
    grand_piano: 10, upright_piano: 7, harpsichord: 3, organ: 10, synthesizer: 10,
  };
  return m[kb];
}

export function polyphony(kb: KeyboardType): number {
  const m: Record<KeyboardType, number> = {
    grand_piano: 10, upright_piano: 10, harpsichord: 6, organ: 10, synthesizer: 8,
  };
  return m[kb];
}

export function weightKg(kb: KeyboardType): number {
  const m: Record<KeyboardType, number> = {
    grand_piano: 400, upright_piano: 200, harpsichord: 80, organ: 500, synthesizer: 10,
  };
  return m[kb];
}

export function acoustic(kb: KeyboardType): boolean {
  const m: Record<KeyboardType, boolean> = {
    grand_piano: true, upright_piano: true, harpsichord: true, organ: true, synthesizer: false,
  };
  return m[kb];
}

export function velocitySensitive(kb: KeyboardType): boolean {
  const m: Record<KeyboardType, boolean> = {
    grand_piano: true, upright_piano: true, harpsichord: false, organ: false, synthesizer: true,
  };
  return m[kb];
}

export function bestGenre(kb: KeyboardType): string {
  const m: Record<KeyboardType, string> = {
    grand_piano: "classical", upright_piano: "pop", harpsichord: "baroque",
    organ: "sacred", synthesizer: "electronic",
  };
  return m[kb];
}

export function averagePriceUsd(kb: KeyboardType): number {
  const m: Record<KeyboardType, number> = {
    grand_piano: 50000, upright_piano: 5000, harpsichord: 15000, organ: 100000, synthesizer: 1000,
  };
  return m[kb];
}

export function keyboardTypes(): KeyboardType[] {
  return ["grand_piano", "upright_piano", "harpsichord", "organ", "synthesizer"];
}
