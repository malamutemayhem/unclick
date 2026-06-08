import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function tfidfCalculate(args: Record<string, unknown>) {
  const documents = Array.isArray(args.documents) ? args.documents.filter((d) => typeof d === "string") : [];
  if (documents.length === 0) return { error: "documents is required (array of strings)" };

  const query = typeof args.query === "string" ? args.query.toLowerCase().trim() : "";
  if (!query) return { error: "query is required" };

  const queryTerms = query.match(/[\w'-]+/g) || [];
  const docWordSets = documents.map((doc: string) => {
    const words = doc.toLowerCase().match(/[\w'-]+/g) || [];
    const freq: Record<string, number> = {};
    for (const w of words) freq[w] = (freq[w] || 0) + 1;
    return { words, freq, total: words.length };
  });

  const N = documents.length;

  const scores = docWordSets.map((doc, idx) => {
    let totalScore = 0;
    const termScores: Record<string, number> = {};
    for (const term of queryTerms) {
      const tf = (doc.freq[term] || 0) / (doc.total || 1);
      const docsWithTerm = docWordSets.filter((d) => d.freq[term]).length;
      const idf = docsWithTerm > 0 ? Math.log(N / docsWithTerm) : 0;
      const score = +(tf * idf).toFixed(6);
      termScores[term] = score;
      totalScore += score;
    }
    return { document_index: idx, score: +totalScore.toFixed(6), term_scores: termScores };
  });

  scores.sort((a, b) => b.score - a.score);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Higher scores indicate greater relevance to the query"],
  };
  return stampMeta({ query, document_count: N, rankings: scores }, meta);
}
