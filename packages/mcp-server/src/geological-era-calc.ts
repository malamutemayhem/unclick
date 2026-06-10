export type GeologicalEra = "precambrian" | "paleozoic" | "mesozoic" | "cenozoic" | "quaternary";

export function duration(e: GeologicalEra): number {
  const m: Record<GeologicalEra, number> = {
    precambrian: 10, paleozoic: 7, mesozoic: 5, cenozoic: 3, quaternary: 1,
  };
  return m[e];
}

export function fossilAbundance(e: GeologicalEra): number {
  const m: Record<GeologicalEra, number> = {
    precambrian: 2, paleozoic: 7, mesozoic: 9, cenozoic: 10, quaternary: 8,
  };
  return m[e];
}

export function biodiversity(e: GeologicalEra): number {
  const m: Record<GeologicalEra, number> = {
    precambrian: 2, paleozoic: 6, mesozoic: 8, cenozoic: 10, quaternary: 9,
  };
  return m[e];
}

export function oxygenLevel(e: GeologicalEra): number {
  const m: Record<GeologicalEra, number> = {
    precambrian: 2, paleozoic: 8, mesozoic: 7, cenozoic: 9, quaternary: 10,
  };
  return m[e];
}

export function researchInterest(e: GeologicalEra): number {
  const m: Record<GeologicalEra, number> = {
    precambrian: 7, paleozoic: 8, mesozoic: 10, cenozoic: 8, quaternary: 9,
  };
  return m[e];
}

export function landPlants(e: GeologicalEra): boolean {
  const m: Record<GeologicalEra, boolean> = {
    precambrian: false, paleozoic: true, mesozoic: true, cenozoic: true, quaternary: true,
  };
  return m[e];
}

export function humanPresence(e: GeologicalEra): boolean {
  const m: Record<GeologicalEra, boolean> = {
    precambrian: false, paleozoic: false, mesozoic: false, cenozoic: false, quaternary: true,
  };
  return m[e];
}

export function dominantLifeForm(e: GeologicalEra): string {
  const m: Record<GeologicalEra, string> = {
    precambrian: "single_cell_stromatolite", paleozoic: "trilobite_fish_amphibian",
    mesozoic: "dinosaur_reptile", cenozoic: "mammal_bird",
    quaternary: "human_mammal",
  };
  return m[e];
}

export function massExtinctionEvent(e: GeologicalEra): string {
  const m: Record<GeologicalEra, string> = {
    precambrian: "great_oxygenation", paleozoic: "permian_triassic",
    mesozoic: "cretaceous_paleogene", cenozoic: "eocene_oligocene",
    quaternary: "holocene_ongoing",
  };
  return m[e];
}

export function geologicalEras(): GeologicalEra[] {
  return ["precambrian", "paleozoic", "mesozoic", "cenozoic", "quaternary"];
}
