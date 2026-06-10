export type PipetteType = "air_displacement" | "positive_displacement" | "multichannel" | "electronic" | "serological";

export function volumeAccuracy(p: PipetteType): number {
  const m: Record<PipetteType, number> = {
    air_displacement: 8, positive_displacement: 10, multichannel: 7, electronic: 9, serological: 5,
  };
  return m[p];
}

export function throughput(p: PipetteType): number {
  const m: Record<PipetteType, number> = {
    air_displacement: 4, positive_displacement: 3, multichannel: 10, electronic: 8, serological: 5,
  };
  return m[p];
}

export function ergonomicComfort(p: PipetteType): number {
  const m: Record<PipetteType, number> = {
    air_displacement: 6, positive_displacement: 5, multichannel: 4, electronic: 9, serological: 7,
  };
  return m[p];
}

export function costPerUnit(p: PipetteType): number {
  const m: Record<PipetteType, number> = {
    air_displacement: 4, positive_displacement: 7, multichannel: 8, electronic: 10, serological: 2,
  };
  return m[p];
}

export function viscousSampleHandling(p: PipetteType): number {
  const m: Record<PipetteType, number> = {
    air_displacement: 3, positive_displacement: 10, multichannel: 2, electronic: 5, serological: 7,
  };
  return m[p];
}

export function disposableTip(p: PipetteType): boolean {
  const m: Record<PipetteType, boolean> = {
    air_displacement: true, positive_displacement: true, multichannel: true, electronic: true, serological: false,
  };
  return m[p];
}

export function motorized(p: PipetteType): boolean {
  const m: Record<PipetteType, boolean> = {
    air_displacement: false, positive_displacement: false, multichannel: false, electronic: true, serological: false,
  };
  return m[p];
}

export function volumeRange(p: PipetteType): string {
  const m: Record<PipetteType, string> = {
    air_displacement: "0_5ul_to_5ml", positive_displacement: "1ul_to_1ml",
    multichannel: "0_5ul_to_300ul", electronic: "0_5ul_to_5ml",
    serological: "1ml_to_50ml",
  };
  return m[p];
}

export function bestApplication(p: PipetteType): string {
  const m: Record<PipetteType, string> = {
    air_displacement: "general_aqueous_liquid", positive_displacement: "volatile_viscous_dna",
    multichannel: "plate_based_assay_96well", electronic: "repetitive_dispensing_protocol",
    serological: "cell_culture_media_transfer",
  };
  return m[p];
}

export function pipetteTypes(): PipetteType[] {
  return ["air_displacement", "positive_displacement", "multichannel", "electronic", "serological"];
}
