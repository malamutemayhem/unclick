export type DinosaurClade = "theropod" | "sauropod" | "ornithopod" | "ceratopsian" | "ankylosaur";

export function averageSize(c: DinosaurClade): number {
  const m: Record<DinosaurClade, number> = {
    theropod: 7, sauropod: 10, ornithopod: 6, ceratopsian: 7, ankylosaur: 6,
  };
  return m[c];
}

export function fossilCompleteness(c: DinosaurClade): number {
  const m: Record<DinosaurClade, number> = {
    theropod: 8, sauropod: 5, ornithopod: 7, ceratopsian: 9, ankylosaur: 6,
  };
  return m[c];
}

export function speciesDiversity(c: DinosaurClade): number {
  const m: Record<DinosaurClade, number> = {
    theropod: 10, sauropod: 7, ornithopod: 8, ceratopsian: 6, ankylosaur: 5,
  };
  return m[c];
}

export function geographicSpread(c: DinosaurClade): number {
  const m: Record<DinosaurClade, number> = {
    theropod: 10, sauropod: 9, ornithopod: 8, ceratopsian: 6, ankylosaur: 7,
  };
  return m[c];
}

export function armorLevel(c: DinosaurClade): number {
  const m: Record<DinosaurClade, number> = {
    theropod: 2, sauropod: 3, ornithopod: 1, ceratopsian: 7, ankylosaur: 10,
  };
  return m[c];
}

export function carnivorous(c: DinosaurClade): boolean {
  const m: Record<DinosaurClade, boolean> = {
    theropod: true, sauropod: false, ornithopod: false, ceratopsian: false, ankylosaur: false,
  };
  return m[c];
}

export function bipedal(c: DinosaurClade): boolean {
  const m: Record<DinosaurClade, boolean> = {
    theropod: true, sauropod: false, ornithopod: true, ceratopsian: false, ankylosaur: false,
  };
  return m[c];
}

export function iconicGenus(c: DinosaurClade): string {
  const m: Record<DinosaurClade, string> = {
    theropod: "tyrannosaurus_velociraptor", sauropod: "brachiosaurus_diplodocus",
    ornithopod: "iguanodon_parasaurolophus", ceratopsian: "triceratops_protoceratops",
    ankylosaur: "ankylosaurus_euoplocephalus",
  };
  return m[c];
}

export function dietaryStrategy(c: DinosaurClade): string {
  const m: Record<DinosaurClade, string> = {
    theropod: "active_predator", sauropod: "high_browser",
    ornithopod: "ground_level_grazer", ceratopsian: "low_browser_cropper",
    ankylosaur: "low_ground_forager",
  };
  return m[c];
}

export function dinosaurClades(): DinosaurClade[] {
  return ["theropod", "sauropod", "ornithopod", "ceratopsian", "ankylosaur"];
}
