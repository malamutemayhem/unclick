export type PianoKeyMaterial = "ivory" | "ebony" | "acrylic" | "spruce" | "ivorite";

export function tactileFeel(material: PianoKeyMaterial): number {
  const m: Record<PianoKeyMaterial, number> = {
    ivory: 9, ebony: 8, acrylic: 5, spruce: 6, ivorite: 7,
  };
  return m[material];
}

export function moistureAbsorption(material: PianoKeyMaterial): number {
  const m: Record<PianoKeyMaterial, number> = {
    ivory: 8, ebony: 3, acrylic: 1, spruce: 7, ivorite: 6,
  };
  return m[material];
}

export function durabilityYears(material: PianoKeyMaterial): number {
  const m: Record<PianoKeyMaterial, number> = {
    ivory: 100, ebony: 80, acrylic: 50, spruce: 30, ivorite: 60,
  };
  return m[material];
}

export function yellowingRisk(material: PianoKeyMaterial): number {
  const m: Record<PianoKeyMaterial, number> = {
    ivory: 8, ebony: 1, acrylic: 3, spruce: 5, ivorite: 2,
  };
  return m[material];
}

export function gripWhenWet(material: PianoKeyMaterial): number {
  const m: Record<PianoKeyMaterial, number> = {
    ivory: 9, ebony: 7, acrylic: 3, spruce: 6, ivorite: 8,
  };
  return m[material];
}

export function ethicallySourced(material: PianoKeyMaterial): boolean {
  const m: Record<PianoKeyMaterial, boolean> = {
    ivory: false, ebony: false, acrylic: true, spruce: true, ivorite: true,
  };
  return m[material];
}

export function whiteKey(material: PianoKeyMaterial): boolean {
  const m: Record<PianoKeyMaterial, boolean> = {
    ivory: true, ebony: false, acrylic: true, spruce: true, ivorite: true,
  };
  return m[material];
}

export function bestPianoType(material: PianoKeyMaterial): string {
  const m: Record<PianoKeyMaterial, string> = {
    ivory: "vintage_grand", ebony: "concert_grand", acrylic: "digital_piano",
    spruce: "practice_piano", ivorite: "modern_grand",
  };
  return m[material];
}

export function costPerKey(material: PianoKeyMaterial): number {
  const m: Record<PianoKeyMaterial, number> = {
    ivory: 50, ebony: 30, acrylic: 5, spruce: 8, ivorite: 15,
  };
  return m[material];
}

export function pianoKeyMaterials(): PianoKeyMaterial[] {
  return ["ivory", "ebony", "acrylic", "spruce", "ivorite"];
}
