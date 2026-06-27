export type Nucleotide = "A" | "T" | "G" | "C";
export type RNANucleotide = "A" | "U" | "G" | "C";

export function complement(dna: string): string {
  const map: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };
  return dna.split("").map(c => map[c] ?? c).join("");
}

export function reverseComplement(dna: string): string {
  return complement(dna).split("").reverse().join("");
}

export function transcribe(dna: string): string {
  return dna.replace(/T/g, "U");
}

export function reverseTranscribe(rna: string): string {
  return rna.replace(/U/g, "T");
}

const CODON_TABLE: Record<string, string> = {
  UUU: "F", UUC: "F", UUA: "L", UUG: "L",
  CUU: "L", CUC: "L", CUA: "L", CUG: "L",
  AUU: "I", AUC: "I", AUA: "I", AUG: "M",
  GUU: "V", GUC: "V", GUA: "V", GUG: "V",
  UCU: "S", UCC: "S", UCA: "S", UCG: "S",
  CCU: "P", CCC: "P", CCA: "P", CCG: "P",
  ACU: "T", ACC: "T", ACA: "T", ACG: "T",
  GCU: "A", GCC: "A", GCA: "A", GCG: "A",
  UAU: "Y", UAC: "Y", UAA: "*", UAG: "*",
  CAU: "H", CAC: "H", CAA: "Q", CAG: "Q",
  AAU: "N", AAC: "N", AAA: "K", AAG: "K",
  GAU: "D", GAC: "D", GAA: "E", GAG: "E",
  UGU: "C", UGC: "C", UGA: "*", UGG: "W",
  CGU: "R", CGC: "R", CGA: "R", CGG: "R",
  AGU: "S", AGC: "S", AGA: "R", AGG: "R",
  GGU: "G", GGC: "G", GGA: "G", GGG: "G",
};

export function translate(rna: string): string {
  let protein = "";
  for (let i = 0; i <= rna.length - 3; i += 3) {
    const codon = rna.substring(i, i + 3);
    const aa = CODON_TABLE[codon];
    if (!aa || aa === "*") break;
    protein += aa;
  }
  return protein;
}

export function translateAll(rna: string): string {
  let protein = "";
  for (let i = 0; i <= rna.length - 3; i += 3) {
    const codon = rna.substring(i, i + 3);
    const aa = CODON_TABLE[codon] ?? "?";
    protein += aa;
  }
  return protein;
}

export function gcContent(dna: string): number {
  const gc = dna.split("").filter(c => c === "G" || c === "C").length;
  return gc / dna.length;
}

export function meltingTemp(dna: string): number {
  if (dna.length < 14) {
    const at = dna.split("").filter(c => c === "A" || c === "T").length;
    const gc = dna.split("").filter(c => c === "G" || c === "C").length;
    return 2 * at + 4 * gc;
  }
  const gc = gcContent(dna);
  return 64.9 + 41 * (gc - 16.4 / dna.length);
}

export function nucleotideCount(dna: string): Record<string, number> {
  const counts: Record<string, number> = { A: 0, T: 0, G: 0, C: 0 };
  for (const c of dna) {
    if (c in counts) counts[c]++;
  }
  return counts;
}

export function molecularWeight(dna: string): number {
  const weights: Record<string, number> = { A: 331.2, T: 322.2, G: 347.2, C: 307.2 };
  let total = 0;
  for (const c of dna) {
    total += weights[c] ?? 0;
  }
  return parseFloat(total.toFixed(1));
}

export function findMotif(dna: string, motif: string): number[] {
  const positions: number[] = [];
  let idx = dna.indexOf(motif);
  while (idx !== -1) {
    positions.push(idx);
    idx = dna.indexOf(motif, idx + 1);
  }
  return positions;
}

export function openReadingFrames(dna: string): string[] {
  const rna = transcribe(dna);
  const orfs: string[] = [];

  for (let frame = 0; frame < 3; frame++) {
    let inOrf = false;
    let current = "";
    for (let i = frame; i <= rna.length - 3; i += 3) {
      const codon = rna.substring(i, i + 3);
      if (codon === "AUG" && !inOrf) {
        inOrf = true;
        current = "M";
      } else if (inOrf) {
        const aa = CODON_TABLE[codon];
        if (!aa || aa === "*") {
          if (current.length >= 3) orfs.push(current);
          current = "";
          inOrf = false;
        } else {
          current += aa;
        }
      }
    }
  }
  return orfs;
}

export function hammingDistance(a: string, b: string): number {
  let d = 0;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) d++;
  }
  return d + Math.abs(a.length - b.length);
}

export function isValidDNA(seq: string): boolean {
  return /^[ATGC]+$/i.test(seq);
}

export function isValidRNA(seq: string): boolean {
  return /^[AUGC]+$/i.test(seq);
}

export function randomSequence(length: number, seed?: number): string {
  const bases: Nucleotide[] = ["A", "T", "G", "C"];
  let s = seed ?? 42;
  const rng = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
  return Array.from({ length }, () => bases[Math.floor(rng() * 4)]).join("");
}

export function codonUsage(rna: string): Map<string, number> {
  const usage = new Map<string, number>();
  for (let i = 0; i <= rna.length - 3; i += 3) {
    const codon = rna.substring(i, i + 3);
    usage.set(codon, (usage.get(codon) ?? 0) + 1);
  }
  return usage;
}
