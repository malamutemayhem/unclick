export interface TfIdfScore {
  term: string;
  tf: number;
  idf: number;
  tfidf: number;
}

export class TfIdf {
  private documents: string[][] = [];

  addDocument(words: string[]): number {
    this.documents.push(words.map((w) => w.toLowerCase()));
    return this.documents.length - 1;
  }

  addDocumentFromText(text: string): number {
    const words = text.toLowerCase().split(/\s+/).filter((w) => w.length > 0);
    return this.addDocument(words);
  }

  tf(term: string, docIndex: number): number {
    const doc = this.documents[docIndex];
    if (!doc || doc.length === 0) return 0;
    const t = term.toLowerCase();
    const count = doc.filter((w) => w === t).length;
    return count / doc.length;
  }

  idf(term: string): number {
    const t = term.toLowerCase();
    const docsWithTerm = this.documents.filter((doc) => doc.includes(t)).length;
    if (docsWithTerm === 0) return 0;
    return Math.log(this.documents.length / docsWithTerm);
  }

  tfidf(term: string, docIndex: number): number {
    return Math.round(this.tf(term, docIndex) * this.idf(term) * 10000) / 10000;
  }

  scores(docIndex: number): TfIdfScore[] {
    const doc = this.documents[docIndex];
    if (!doc) return [];
    const uniqueTerms = [...new Set(doc)];
    return uniqueTerms
      .map((term) => ({
        term,
        tf: Math.round(this.tf(term, docIndex) * 10000) / 10000,
        idf: Math.round(this.idf(term) * 10000) / 10000,
        tfidf: this.tfidf(term, docIndex),
      }))
      .sort((a, b) => b.tfidf - a.tfidf);
  }

  topTerms(docIndex: number, n: number = 10): TfIdfScore[] {
    return this.scores(docIndex).slice(0, n);
  }

  search(query: string): Array<{ docIndex: number; score: number }> {
    const terms = query.toLowerCase().split(/\s+/);
    const results: Array<{ docIndex: number; score: number }> = [];
    for (let i = 0; i < this.documents.length; i++) {
      let score = 0;
      for (const term of terms) {
        score += this.tfidf(term, i);
      }
      if (score > 0) {
        results.push({ docIndex: i, score: Math.round(score * 10000) / 10000 });
      }
    }
    return results.sort((a, b) => b.score - a.score);
  }

  similarity(docA: number, docB: number): number {
    const termsA = new Set(this.documents[docA] || []);
    const termsB = new Set(this.documents[docB] || []);
    const allTerms = new Set([...termsA, ...termsB]);
    let dotProduct = 0;
    let magA = 0;
    let magB = 0;
    for (const term of allTerms) {
      const a = this.tfidf(term, docA);
      const b = this.tfidf(term, docB);
      dotProduct += a * b;
      magA += a * a;
      magB += b * b;
    }
    const denom = Math.sqrt(magA) * Math.sqrt(magB);
    return denom === 0 ? 0 : Math.round((dotProduct / denom) * 10000) / 10000;
  }

  documentCount(): number {
    return this.documents.length;
  }

  vocabulary(): string[] {
    const vocab = new Set<string>();
    for (const doc of this.documents) {
      for (const word of doc) vocab.add(word);
    }
    return [...vocab].sort();
  }
}
