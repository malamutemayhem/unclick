import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function setopsCalculate(args: Record<string, unknown>) {
  const a = Array.isArray(args.set_a) ? args.set_a.map(String) : [];
  const b = Array.isArray(args.set_b) ? args.set_b.map(String) : [];
  if (a.length === 0 && b.length === 0) return { error: "At least one of set_a or set_b must be non-empty" };

  const setA = new Set(a);
  const setB = new Set(b);

  const union = new Set([...setA, ...setB]);
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const differenceAB = new Set([...setA].filter((x) => !setB.has(x)));
  const differenceBA = new Set([...setB].filter((x) => !setA.has(x)));
  const symmetricDiff = new Set([...differenceAB, ...differenceBA]);
  const isSubset = [...setA].every((x) => setB.has(x));
  const isSuperset = [...setB].every((x) => setA.has(x));

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Returns union, intersection, difference, symmetric difference, subset/superset checks"],
  };
  return stampMeta({
    set_a: [...setA],
    set_b: [...setB],
    union: [...union],
    intersection: [...intersection],
    difference_a_minus_b: [...differenceAB],
    difference_b_minus_a: [...differenceBA],
    symmetric_difference: [...symmetricDiff],
    is_subset: isSubset,
    is_superset: isSuperset,
  }, meta);
}
