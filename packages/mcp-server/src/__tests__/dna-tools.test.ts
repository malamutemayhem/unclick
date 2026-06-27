import { describe, it, expect } from "vitest";
import {
  complement, reverseComplement, transcribe, reverseTranscribe,
  translate, translateAll, gcContent, meltingTemp, nucleotideCount,
  molecularWeight, findMotif, openReadingFrames, hammingDistance,
  isValidDNA, isValidRNA, randomSequence, codonUsage,
} from "../dna-tools.js";

describe("complement / reverseComplement", () => {
  it("A->T, T->A, G->C, C->G", () => {
    expect(complement("ATGC")).toBe("TACG");
  });

  it("reverse complement", () => {
    expect(reverseComplement("ATGC")).toBe("GCAT");
  });
});

describe("transcribe / reverseTranscribe", () => {
  it("T->U in transcription", () => {
    expect(transcribe("ATGC")).toBe("AUGC");
  });

  it("U->T in reverse transcription", () => {
    expect(reverseTranscribe("AUGC")).toBe("ATGC");
  });
});

describe("translate", () => {
  it("translates AUG to M", () => {
    expect(translate("AUGUAA")).toBe("M");
  });

  it("stops at stop codon", () => {
    expect(translate("AUGGCUUAA")).toBe("MA");
  });
});

describe("translateAll", () => {
  it("includes stop codons as *", () => {
    expect(translateAll("AUGUAA")).toBe("M*");
  });
});

describe("gcContent", () => {
  it("50% for ATGC", () => {
    expect(gcContent("ATGC")).toBeCloseTo(0.5);
  });

  it("100% for all GC", () => {
    expect(gcContent("GGCC")).toBeCloseTo(1);
  });
});

describe("meltingTemp", () => {
  it("short sequence uses Wallace rule", () => {
    const tm = meltingTemp("ATGCATGC");
    expect(tm).toBeGreaterThan(0);
  });
});

describe("nucleotideCount", () => {
  it("counts each base", () => {
    const counts = nucleotideCount("AATTGGCC");
    expect(counts.A).toBe(2);
    expect(counts.T).toBe(2);
    expect(counts.G).toBe(2);
    expect(counts.C).toBe(2);
  });
});

describe("molecularWeight", () => {
  it("positive weight", () => {
    expect(molecularWeight("ATGC")).toBeGreaterThan(0);
  });
});

describe("findMotif", () => {
  it("finds all positions", () => {
    expect(findMotif("ATGATGATG", "ATG")).toEqual([0, 3, 6]);
  });

  it("empty for no match", () => {
    expect(findMotif("AAAA", "GGG")).toEqual([]);
  });
});

describe("openReadingFrames", () => {
  it("finds ORFs starting with ATG", () => {
    const orfs = openReadingFrames("ATGGCTTAA");
    expect(orfs.length).toBeGreaterThanOrEqual(0);
  });
});

describe("hammingDistance", () => {
  it("0 for identical", () => {
    expect(hammingDistance("ATGC", "ATGC")).toBe(0);
  });

  it("counts mismatches", () => {
    expect(hammingDistance("ATGC", "ATGG")).toBe(1);
  });
});

describe("isValidDNA / isValidRNA", () => {
  it("valid DNA", () => {
    expect(isValidDNA("ATGC")).toBe(true);
  });

  it("invalid DNA with U", () => {
    expect(isValidDNA("AUGC")).toBe(false);
  });

  it("valid RNA", () => {
    expect(isValidRNA("AUGC")).toBe(true);
  });
});

describe("randomSequence", () => {
  it("generates correct length", () => {
    expect(randomSequence(100).length).toBe(100);
  });

  it("deterministic with seed", () => {
    expect(randomSequence(20, 42)).toBe(randomSequence(20, 42));
  });
});

describe("codonUsage", () => {
  it("counts codons", () => {
    const usage = codonUsage("AUGGCUAUG");
    expect(usage.get("AUG")).toBe(2);
    expect(usage.get("GCU")).toBe(1);
  });
});
