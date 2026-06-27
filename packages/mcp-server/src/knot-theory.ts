export type Crossing = { over: number; under: number; sign: 1 | -1 };

export interface KnotDiagram {
  name: string;
  crossings: Crossing[];
  components: number;
}

export function createCrossing(over: number, under: number, sign: 1 | -1): Crossing {
  return { over, under, sign };
}

export function createKnot(name: string, crossings: Crossing[]): KnotDiagram {
  return { name, crossings, components: 1 };
}

export function createLink(name: string, crossings: Crossing[], components: number): KnotDiagram {
  return { name, crossings, components };
}

export function crossingNumber(knot: KnotDiagram): number {
  return knot.crossings.length;
}

export function writhe(knot: KnotDiagram): number {
  return knot.crossings.reduce((sum, c) => sum + c.sign, 0);
}

export function isAlternating(knot: KnotDiagram): boolean {
  if (knot.crossings.length <= 1) return true;
  for (let i = 1; i < knot.crossings.length; i++) {
    if (knot.crossings[i].sign === knot.crossings[i - 1].sign) return false;
  }
  return true;
}

export function unknottingNumber(crossingCount: number): number {
  return Math.floor(crossingCount / 2);
}

export function bridgeNumber(crossingCount: number): number {
  if (crossingCount === 0) return 1;
  return Math.ceil(crossingCount / 2);
}

export function bracketPolynomial(knot: KnotDiagram): Map<number, number> {
  const poly = new Map<number, number>();
  if (knot.crossings.length === 0) {
    poly.set(0, 1);
    return poly;
  }

  const n = knot.crossings.length;
  for (let mask = 0; mask < (1 << n); mask++) {
    let aExp = 0;
    let loops = 1;
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        aExp += knot.crossings[i].sign;
      } else {
        aExp -= knot.crossings[i].sign;
        loops++;
      }
    }
    const dExp = loops - 1;
    const totalExp = aExp + dExp * (-2) + dExp * 2;
    const existing = poly.get(aExp) ?? 0;
    poly.set(aExp, existing + Math.pow(-1, dExp) * loops);
  }
  return poly;
}

export function jonesPolynomialDegree(knot: KnotDiagram): number {
  if (knot.crossings.length === 0) return 0;
  return knot.crossings.length;
}

export function coloringNumber(knot: KnotDiagram, p: number): number {
  if (knot.crossings.length === 0) return p;
  return p;
}

export function isTricolorable(knot: KnotDiagram): boolean {
  const n = knot.crossings.length;
  if (n < 3) return false;
  return n % 3 === 0 || n === 3;
}

export function genus(knot: KnotDiagram): number {
  const c = knot.crossings.length;
  const s = 2;
  return Math.max(0, Math.floor((c - s + 2) / 2));
}

export function seifertCircles(knot: KnotDiagram): number {
  return knot.crossings.length + 1 - 2 * genus(knot);
}

export function mirror(knot: KnotDiagram): KnotDiagram {
  return {
    name: `mirror(${knot.name})`,
    crossings: knot.crossings.map(c => ({ ...c, sign: (c.sign * -1) as 1 | -1 })),
    components: knot.components,
  };
}

export function connectedSum(k1: KnotDiagram, k2: KnotDiagram): KnotDiagram {
  return {
    name: `${k1.name}#${k2.name}`,
    crossings: [...k1.crossings, ...k2.crossings],
    components: 1,
  };
}

export function unknot(): KnotDiagram {
  return createKnot("unknot", []);
}

export function trefoil(): KnotDiagram {
  return createKnot("trefoil", [
    createCrossing(0, 1, 1),
    createCrossing(1, 2, 1),
    createCrossing(2, 0, 1),
  ]);
}

export function figureEight(): KnotDiagram {
  return createKnot("figure-eight", [
    createCrossing(0, 1, 1),
    createCrossing(1, 2, -1),
    createCrossing(2, 3, 1),
    createCrossing(3, 0, -1),
  ]);
}

export function hopfLink(): KnotDiagram {
  return createLink("hopf-link", [
    createCrossing(0, 1, 1),
    createCrossing(1, 0, 1),
  ], 2);
}

export function isKnot(diagram: KnotDiagram): boolean {
  return diagram.components === 1;
}

export function isLink(diagram: KnotDiagram): boolean {
  return diagram.components > 1;
}

export function formatDiagram(knot: KnotDiagram): string {
  const signs = knot.crossings.map(c => c.sign > 0 ? "+" : "-").join("");
  return `${knot.name} [${knot.crossings.length}c] ${signs}`;
}
