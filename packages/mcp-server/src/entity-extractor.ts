export interface ExtractedEntity {
  type: string;
  value: string;
  start: number;
  end: number;
}

export function extractEmails(text: string): ExtractedEntity[] {
  return matchAll(text, /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "email");
}

export function extractUrls(text: string): ExtractedEntity[] {
  return matchAll(text, /https?:\/\/[^\s<>"{}|\\^`[\]]+/g, "url");
}

export function extractDates(text: string): ExtractedEntity[] {
  const patterns = [
    /\d{4}-\d{2}-\d{2}/g,
    /\d{1,2}\/\d{1,2}\/\d{2,4}/g,
    /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s*\d{4}/gi,
  ];
  const results: ExtractedEntity[] = [];
  for (const p of patterns) results.push(...matchAll(text, p, "date"));
  return results.sort((a, b) => a.start - b.start);
}

export function extractAmounts(text: string): ExtractedEntity[] {
  return matchAll(text, /[$€£]\s?\d+(?:,\d{3})*(?:\.\d{1,2})?|\d+(?:,\d{3})*(?:\.\d{1,2})?\s?(?:USD|EUR|GBP|AUD)/g, "amount");
}

export function extractPhoneNumbers(text: string): ExtractedEntity[] {
  return matchAll(text, /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, "phone");
}

export function extractHashtags(text: string): ExtractedEntity[] {
  return matchAll(text, /#[a-zA-Z_]\w*/g, "hashtag");
}

export function extractMentions(text: string): ExtractedEntity[] {
  return matchAll(text, /@[a-zA-Z_]\w*/g, "mention");
}

export function extractAll(text: string): ExtractedEntity[] {
  return [
    ...extractEmails(text),
    ...extractUrls(text),
    ...extractDates(text),
    ...extractAmounts(text),
    ...extractPhoneNumbers(text),
    ...extractHashtags(text),
    ...extractMentions(text),
  ].sort((a, b) => a.start - b.start);
}

function matchAll(text: string, pattern: RegExp, type: string): ExtractedEntity[] {
  const entities: ExtractedEntity[] = [];
  let match;
  while ((match = pattern.exec(text)) !== null) {
    entities.push({ type, value: match[0], start: match.index, end: match.index + match[0].length });
  }
  return entities;
}
