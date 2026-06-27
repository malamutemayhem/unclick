export type MetamorphosisType = "complete" | "incomplete" | "ametabolous" | "hypermetamorphosis" | "hemimetabolous";

export function stageCount(m_: MetamorphosisType): number {
  const m: Record<MetamorphosisType, number> = {
    complete: 8, incomplete: 6, ametabolous: 2, hypermetamorphosis: 10, hemimetabolous: 6,
  };
  return m[m_];
}

export function bodyRemodeling(m_: MetamorphosisType): number {
  const m: Record<MetamorphosisType, number> = {
    complete: 10, incomplete: 5, ametabolous: 1, hypermetamorphosis: 10, hemimetabolous: 5,
  };
  return m[m_];
}

export function ecologicalAdaptation(m_: MetamorphosisType): number {
  const m: Record<MetamorphosisType, number> = {
    complete: 9, incomplete: 6, ametabolous: 3, hypermetamorphosis: 10, hemimetabolous: 6,
  };
  return m[m_];
}

export function developmentTime(m_: MetamorphosisType): number {
  const m: Record<MetamorphosisType, number> = {
    complete: 7, incomplete: 5, ametabolous: 3, hypermetamorphosis: 9, hemimetabolous: 5,
  };
  return m[m_];
}

export function speciesDiversity(m_: MetamorphosisType): number {
  const m: Record<MetamorphosisType, number> = {
    complete: 10, incomplete: 6, ametabolous: 2, hypermetamorphosis: 3, hemimetabolous: 6,
  };
  return m[m_];
}

export function hasPupalStage(m_: MetamorphosisType): boolean {
  const m: Record<MetamorphosisType, boolean> = {
    complete: true, incomplete: false, ametabolous: false, hypermetamorphosis: true, hemimetabolous: false,
  };
  return m[m_];
}

export function nymphResemblesAdult(m_: MetamorphosisType): boolean {
  const m: Record<MetamorphosisType, boolean> = {
    complete: false, incomplete: true, ametabolous: true, hypermetamorphosis: false, hemimetabolous: true,
  };
  return m[m_];
}

export function exampleInsect(m_: MetamorphosisType): string {
  const m: Record<MetamorphosisType, string> = {
    complete: "butterflies_beetles_flies", incomplete: "grasshoppers_dragonflies",
    ametabolous: "silverfish_springtails", hypermetamorphosis: "blister_beetles_mantispids",
    hemimetabolous: "true_bugs_cicadas",
  };
  return m[m_];
}

export function lifeStages(m_: MetamorphosisType): string {
  const m: Record<MetamorphosisType, string> = {
    complete: "egg_larva_pupa_adult", incomplete: "egg_nymph_adult",
    ametabolous: "egg_to_miniature_adult", hypermetamorphosis: "egg_multiple_larval_pupa_adult",
    hemimetabolous: "egg_nymph_instars_adult",
  };
  return m[m_];
}

export function metamorphosisTypes(): MetamorphosisType[] {
  return ["complete", "incomplete", "ametabolous", "hypermetamorphosis", "hemimetabolous"];
}
