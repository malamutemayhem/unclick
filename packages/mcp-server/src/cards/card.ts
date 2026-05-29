export interface ConversationalCard {
  headline: string;
  summary: string;
  keyFacts: string[];
  nextActions: string[];
  deepLink?: string;
  // Optional plain-language quality note. Used by tools whose output quality
  // depends on the caller's chat model (e.g. Crews v1 inline-loop engine).
  quality_note?: string;
}

export function buildCard(fields: ConversationalCard): ConversationalCard {
  return fields;
}