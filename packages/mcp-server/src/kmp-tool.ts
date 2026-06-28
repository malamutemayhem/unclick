import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function kmpSearch(args: Record<string, unknown>) {
  const text = String(args.text ?? "");
  const pattern = String(args.pattern ?? "");
  if (pattern.length === 0) throw new Error("pattern must be non-empty");

  function buildFailure(p: string): number[] {
    const fail = new Array(p.length).fill(0);
    let k = 0;
    for (let i = 1; i < p.length; i++) {
      while (k > 0 && p[k] !== p[i]) k = fail[k - 1];
      if (p[k] === p[i]) k++;
      fail[i] = k;
    }
    return fail;
  }

  const fail = buildFailure(pattern);
  const matches: number[] = [];
  let q = 0;

  for (let i = 0; i < text.length; i++) {
    while (q > 0 && pattern[q] !== text[i]) q = fail[q - 1];
    if (pattern[q] === text[i]) q++;
    if (q === pattern.length) {
      matches.push(i - pattern.length + 1);
      q = fail[q - 1];
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use KMP for efficient single-pattern string search"],
  };

  return stampMeta(
    {
      text_length: text.length,
      pattern_length: pattern.length,
      match_count: matches.length,
      matches,
      failure_function: pattern.length <= 100 ? fail : fail.slice(0, 100),
    },
    meta,
  );
}
