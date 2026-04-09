/**
 * UnClick Humanize - rule-based AI text humanizer.
 *
 * All endpoints sit under /v1/humanize and inherit the global auth + rate-limit
 * middleware; no external AI API calls are made.
 *
 * Scope: humanize:use
 *
 *   POST /v1/humanize          - combined detect + rewrite (gold standard endpoint)
 *   POST /v1/humanize/rewrite  - rewrite AI text to sound more natural
 *   POST /v1/humanize/detect   - score text for AI-writing patterns (0-100)
 *   POST /v1/humanize/suggest  - return specific improvement suggestions
 */
import { Hono } from 'hono';
import { z } from 'zod';
import { ok } from '@unclick/core';
import { zv } from '../middleware/validate.js';
import type { AppVariables } from '../middleware/types.js';
import { requireScope } from '../middleware/auth.js';

// ---------------------------------------------------------------------------
// Validation schemas
// ---------------------------------------------------------------------------

const HumanizeSchema = z.object({
  text: z.string().min(1).max(50_000),
  tone: z.enum(['conversational', 'formal', 'casual', 'academic']).default('conversational'),
});

const RewriteSchema = z.object({
  text: z.string().min(1).max(50_000),
  tone: z.enum(['casual', 'professional', 'conversational', 'formal', 'academic']).default('conversational'),
  strength: z.enum(['light', 'medium', 'heavy']).default('medium'),
});

const DetectSchema = z.object({
  text: z.string().min(1).max(50_000),
});

const SuggestSchema = z.object({
  text: z.string().min(1).max(50_000),
});

// ---------------------------------------------------------------------------
// Word replacement maps
// ---------------------------------------------------------------------------

// tone order: casual, professional, conversational, formal, academic
const WORD_MAP: [RegExp, Record<string, string>][] = [
  [/\bdelve\b/gi,              { casual: 'dig', professional: 'explore', conversational: 'look into', formal: 'examine', academic: 'examine' }],
  [/\btapestry\b/gi,           { casual: 'mix', professional: 'combination', conversational: 'mix', formal: 'combination', academic: 'combination' }],
  [/\blandscape\b/gi,          { casual: 'field', professional: 'field', conversational: 'area', formal: 'domain', academic: 'domain' }],
  [/\bleverage\b/gi,           { casual: 'use', professional: 'use', conversational: 'use', formal: 'use', academic: 'use' }],
  [/\brobust\b/gi,             { casual: 'solid', professional: 'strong', conversational: 'solid', formal: 'strong', academic: 'strong' }],
  [/\bseamless\b/gi,           { casual: 'smooth', professional: 'smooth', conversational: 'smooth', formal: 'smooth', academic: 'smooth' }],
  [/\bcutting-edge\b/gi,       { casual: 'new', professional: 'modern', conversational: 'new', formal: 'modern', academic: 'current' }],
  [/\bparadigm\b/gi,           { casual: 'approach', professional: 'model', conversational: 'approach', formal: 'model', academic: 'model' }],
  [/\bsynergy\b/gi,            { casual: 'teamwork', professional: 'collaboration', conversational: 'working together', formal: 'collaboration', academic: 'collaboration' }],
  [/\bholistic\b/gi,           { casual: 'full', professional: 'comprehensive', conversational: 'overall', formal: 'comprehensive', academic: 'comprehensive' }],
  [/\bstreamline\b/gi,         { casual: 'simplify', professional: 'simplify', conversational: 'simplify', formal: 'simplify', academic: 'simplify' }],
  [/\binnovative\b/gi,         { casual: 'new', professional: 'novel', conversational: 'new', formal: 'novel', academic: 'novel' }],
  [/\butilize\b/gi,            { casual: 'use', professional: 'use', conversational: 'use', formal: 'use', academic: 'use' }],
  [/\bfurthermore\b/gi,        { casual: 'also', professional: 'additionally', conversational: 'also', formal: 'in addition', academic: 'in addition' }],
  [/\bmoreover\b/gi,           { casual: 'plus', professional: 'in addition', conversational: 'also', formal: 'in addition', academic: 'in addition' }],
  [/\bcomprehensive\b/gi,      { casual: 'full', professional: 'thorough', conversational: 'thorough', formal: 'thorough', academic: 'thorough' }],
  [/\bmultifaceted\b/gi,       { casual: 'complex', professional: 'complex', conversational: 'varied', formal: 'complex', academic: 'complex' }],
  [/\bpivotal\b/gi,            { casual: 'key', professional: 'critical', conversational: 'key', formal: 'critical', academic: 'critical' }],
  [/\bcrucial\b/gi,            { casual: 'key', professional: 'critical', conversational: 'important', formal: 'critical', academic: 'critical' }],
  [/\bfoster\b/gi,             { casual: 'build', professional: 'cultivate', conversational: 'build', formal: 'cultivate', academic: 'cultivate' }],
  [/\bharness\b/gi,            { casual: 'use', professional: 'use', conversational: 'tap into', formal: 'use', academic: 'use' }],
  [/\bnavigate\b/gi,           { casual: 'handle', professional: 'manage', conversational: 'deal with', formal: 'manage', academic: 'manage' }],
  [/\bspearhead\b/gi,          { casual: 'lead', professional: 'lead', conversational: 'lead', formal: 'lead', academic: 'lead' }],
  [/\bunderscore\b/gi,         { casual: 'show', professional: 'highlight', conversational: 'highlight', formal: 'highlight', academic: 'demonstrate' }],
  [/\brealm\b/gi,              { casual: 'area', professional: 'domain', conversational: 'area', formal: 'domain', academic: 'domain' }],
  [/\bfacilitate\b/gi,         { casual: 'help', professional: 'enable', conversational: 'help', formal: 'enable', academic: 'enable' }],
  [/\boptimize\b/gi,           { casual: 'improve', professional: 'improve', conversational: 'improve', formal: 'improve', academic: 'improve' }],
  [/\benhancing\b/gi,          { casual: 'improving', professional: 'improving', conversational: 'improving', formal: 'improving', academic: 'improving' }],
  [/\baforementioned\b/gi,     { casual: 'this', professional: 'the above', conversational: 'this', formal: 'the above', academic: 'the above' }],
  [/\bnoteworthy\b/gi,         { casual: 'worth noting', professional: 'significant', conversational: 'worth noting', formal: 'significant', academic: 'notable' }],
  [/\btransformative\b/gi,     { casual: 'big', professional: 'major', conversational: 'big', formal: 'significant', academic: 'significant' }],
  [/\bgame-changing\b/gi,      { casual: 'big', professional: 'major', conversational: 'big', formal: 'significant', academic: 'significant' }],
  [/\brevolutionize\b/gi,      { casual: 'change', professional: 'transform', conversational: 'change', formal: 'transform', academic: 'transform' }],
  [/\bunlock\b/gi,             { casual: 'open up', professional: 'enable', conversational: 'open up', formal: 'enable', academic: 'enable' }],
  [/\bempower\b/gi,            { casual: 'help', professional: 'enable', conversational: 'help', formal: 'enable', academic: 'enable' }],
  [/\becosystem\b/gi,          { casual: 'network', professional: 'network', conversational: 'network', formal: 'network', academic: 'system' }],
  [/\bprovide assistance\b/gi, { casual: 'help', professional: 'help', conversational: 'help', formal: 'help', academic: 'help' }],
  [/\bin order to\b/gi,        { casual: 'to', professional: 'to', conversational: 'to', formal: 'to', academic: 'to' }],
  [/\bdue to the fact that\b/gi, { casual: 'because', professional: 'because', conversational: 'because', formal: 'because', academic: 'because' }],
];

// Excessive adverbs to strip
const ADVERB_PATTERNS: RegExp[] = [
  /\bsignificantly\b/gi,
  /\bfundamentally\b/gi,
  /\bessentially\b/gi,
  /\binherently\b/gi,
  /\bsubstantially\b/gi,
  /\bprofoundly\b/gi,
  /\bmarkedly\b/gi,
  /\bstrikingly\b/gi,
  /\bundeniably\b/gi,
  /\birrefutably\b/gi,
];

// Hedging phrases to remove or simplify
const HEDGING_PATTERNS: [RegExp, string][] = [
  [/It(?:'s| is) important to note that[,\s]*/gi, ''],
  [/It(?:'s| is) worth (noting|mentioning) that[,\s]*/gi, ''],
  [/It should be noted that[,\s]*/gi, ''],
  [/It(?:'s| is) (also )?worth (pointing out|emphasizing) that[,\s]*/gi, ''],
  [/One must (also )?consider that[,\s]*/gi, ''],
  [/Needless to say[,\s]*/gi, ''],
  [/It goes without saying that[,\s]*/gi, ''],
  [/As (previously|mentioned) (stated|noted|discussed)[,\s]*/gi, ''],
  [/when it comes to\s+/gi, 'for '],
  [/not only ([^,]+?) but also\s+/gi, '$1 and '],
  [/not just ([^,]+?) but ([^,.]+)/gi, '$1 and $2'],
];

// Filler transitions to strip
const FILLER_PATTERNS: [RegExp, string][] = [
  [/In today's (rapidly evolving|fast-paced|ever-changing|modern|digital) (world|landscape|environment|era)[,\s]*/gi, ''],
  [/In the (rapidly evolving|fast-paced|ever-changing|modern|digital) (world|landscape|environment|era)[,\s]*/gi, ''],
  [/In an (increasingly|ever-changing) (complex|digital|connected) (world|landscape)[,\s]*/gi, ''],
  [/At the end of the day[,\s]*/gi, ''],
  [/When all is said and done[,\s]*/gi, ''],
  [/The fact of the matter is[,\s]*/gi, ''],
  [/In light of (this|these) (considerations?|factors?)?[,\s]*/gi, ''],
];

// Banned transition starters — AI sentences that begin with these are a tell
const TRANSITION_STARTERS = [
  'Additionally', 'Furthermore', 'Moreover', 'Consequently', 'Subsequently',
  'Importantly', 'Notably', 'Similarly', 'Specifically', 'Therefore',
  'Thus', 'Ultimately', 'Indeed', 'Essentially',
];

// Contraction pairs: [expanded, contraction]
const CONTRACTIONS: [RegExp, string][] = [
  [/\bdo not\b/g, "don't"],
  [/\bwill not\b/g, "won't"],
  [/\bcannot\b/g, "can't"],
  [/\bcan not\b/g, "can't"],
  [/\bit is\b/g, "it's"],
  [/\bthat is\b/g, "that's"],
  [/\bthere is\b/g, "there's"],
  [/\bthey are\b/g, "they're"],
  [/\bwe are\b/g, "we're"],
  [/\byou are\b/g, "you're"],
  [/\bI am\b/g, "I'm"],
  [/\bwould not\b/g, "wouldn't"],
  [/\bshould not\b/g, "shouldn't"],
  [/\bcould not\b/g, "couldn't"],
  [/\bis not\b/g, "isn't"],
  [/\bare not\b/g, "aren't"],
  [/\bwas not\b/g, "wasn't"],
  [/\bwere not\b/g, "weren't"],
  [/\bhave not\b/g, "haven't"],
  [/\bhas not\b/g, "hasn't"],
  [/\bhad not\b/g, "hadn't"],
  [/\bdoes not\b/g, "doesn't"],
  [/\bdid not\b/g, "didn't"],
];

// AI overused vocabulary (for detection scoring)
const AI_PHRASES: RegExp[] = [
  /\bdelve\b/gi,
  /\btapestry\b/gi,
  /\bleverage\b/gi,
  /\bseamless(ly)?\b/gi,
  /\bcutting-edge\b/gi,
  /\bparadigm\b/gi,
  /\bsynergy\b/gi,
  /\bholistic(ally)?\b/gi,
  /\bstreamline[sd]?\b/gi,
  /\binnovative\b/gi,
  /\butilize[sd]?\b/gi,
  /\bfurthermore\b/gi,
  /\bmoreover\b/gi,
  /\bcomprehensive(ly)?\b/gi,
  /\bmultifaceted\b/gi,
  /\bpivotal\b/gi,
  /\bcrucial(ly)?\b/gi,
  /\bfoster[sed]?\b/gi,
  /\bharness(ed|ing)?\b/gi,
  /\bspearhead(ing|ed)?\b/gi,
  /\bunderscore[sd]?\b/gi,
  /\brealm\b/gi,
  /\bfacilitate[sd]?\b/gi,
  /\boptimize[sd]?\b/gi,
  /\baforementioned\b/gi,
  /\bnoteworthy\b/gi,
  /\brobust\b/gi,
  /\binherent(ly)?\b/gi,
  /\blandscape\b/gi,
  /\btransformative\b/gi,
  /\bgame-changing\b/gi,
  /\brevolutionize[sd]?\b/gi,
  /\bunlock\b/gi,
  /\bempower(s|ed|ing)?\b/gi,
  /\becosystem\b/gi,
];

// Passive voice patterns (heuristic — catches most common constructions)
const PASSIVE_VOICE_PATTERNS: RegExp[] = [
  /\b(is|are|was|were|be|been|being)\s+\w+ed\b/gi,
  /\b(has|have|had)\s+been\s+\w+ed\b/gi,
  /\bwill\s+be\s+\w+ed\b/gi,
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface Change {
  type: string;
  description: string;
}

function getSentenceLengths(text: string): number[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [];
  return sentences.map((s) => s.trim().split(/\s+/).length);
}

function avgSentenceLength(text: string): number {
  const lengths = getSentenceLengths(text);
  if (lengths.length === 0) return 0;
  return Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
}

function sentenceLengthVariance(lengths: number[]): number {
  if (lengths.length < 2) return 0;
  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((sum, l) => sum + Math.pow(l - mean, 2), 0) / lengths.length;
  return Math.sqrt(variance);
}

function countContractionsInText(text: string): number {
  const matches = text.match(/\b\w+n't\b|\bI'm\b|\bwe're\b|\bthey're\b|\byou're\b|\bhe's\b|\bshe's\b|\bit's\b|\bthat's\b|\bthere's\b/gi);
  return matches ? matches.length : 0;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function applyWordReplacements(text: string, tone: string, changes: Change[]): string {
  let result = text;
  for (const [pattern, replacements] of WORD_MAP) {
    const replacement = replacements[tone] ?? replacements['conversational'];
    const before = result;
    result = result.replace(pattern, (match) => {
      if (match[0] === match[0].toUpperCase() && match[0] !== match[0].toLowerCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
    if (result !== before) {
      changes.push({ type: 'word_replacement', description: 'Replaced AI vocabulary with simpler alternatives' });
    }
  }
  return result;
}

function applyHedgingRemoval(text: string, changes: Change[]): string {
  let result = text;
  for (const [pattern, replacement] of HEDGING_PATTERNS) {
    const before = result;
    result = result.replace(pattern, replacement);
    if (result !== before) {
      changes.push({ type: 'hedging_removal', description: 'Removed hedging phrase' });
    }
  }
  return result;
}

function applyFillerRemoval(text: string, changes: Change[]): string {
  let result = text;
  for (const [pattern, replacement] of FILLER_PATTERNS) {
    const before = result;
    result = result.replace(pattern, replacement);
    if (result !== before) {
      changes.push({ type: 'filler_removal', description: 'Removed filler transition phrase' });
    }
  }
  return result;
}

function applyAdverbRemoval(text: string, changes: Change[]): string {
  let result = text;
  for (const pattern of ADVERB_PATTERNS) {
    const before = result;
    result = result.replace(pattern, '');
    if (result !== before) {
      changes.push({ type: 'adverb_removal', description: 'Removed excessive adverb' });
    }
  }
  result = result.replace(/  +/g, ' ');
  return result;
}

function applyEmDashReplacement(text: string, changes: Change[]): string {
  const before = text;
  let result = text.replace(/\s*\u2014\s*/g, ', ');
  result = result.replace(/\s*--\s*/g, ', ');
  if (result !== before) {
    changes.push({ type: 'em_dash_replacement', description: 'Replaced em dashes with commas' });
  }
  return result;
}

function applySemicolonReplacement(text: string, changes: Change[]): string {
  const before = text;
  // Semicolons between clauses → period + capitalize next word
  let result = text.replace(/;\s+([a-z])/g, (_, char) => '. ' + char.toUpperCase());
  // Any remaining semicolons → comma
  result = result.replace(/;/g, ',');
  if (result !== before) {
    changes.push({ type: 'semicolon_replacement', description: 'Replaced semicolons with periods or commas' });
  }
  return result;
}

function applyTransitionStarterRemoval(text: string, changes: Change[]): string {
  let result = text;
  const before = result;
  for (const word of TRANSITION_STARTERS) {
    // Remove at start of a line/paragraph (multiline flag)
    result = result.replace(
      new RegExp(`^${word},?\\s+`, 'gm'),
      ''
    );
    // Remove after sentence-ending punctuation and capitalize what follows
    result = result.replace(
      new RegExp(`([.!?]\\s+)${word},?\\s+([a-z])`, 'g'),
      (_, punc, char) => punc + char.toUpperCase()
    );
  }
  if (result !== before) {
    changes.push({ type: 'transition_starter_removal', description: 'Removed AI transition word starters' });
  }
  return result;
}

function applyContractions(text: string, strength: string, changes: Change[]): string {
  if (strength === 'light') return text;
  const pairs = strength === 'heavy' ? CONTRACTIONS : CONTRACTIONS.slice(0, 8);
  let result = text;
  const before = result;
  for (const [pattern, contraction] of pairs) {
    result = result.replace(pattern, contraction);
  }
  if (result !== before) {
    changes.push({ type: 'contractions_added', description: 'Added contractions for natural flow' });
  }
  return result;
}

function applyContractionsAll(text: string, changes: Change[]): string {
  let result = text;
  const before = result;
  for (const [pattern, contraction] of CONTRACTIONS) {
    result = result.replace(pattern, contraction);
  }
  if (result !== before) {
    changes.push({ type: 'contractions_added', description: 'Added contractions for natural flow' });
  }
  return result;
}

function deduplicateChanges(changes: Change[]): Change[] {
  const seen = new Set<string>();
  const unique: Change[] = [];
  for (const c of changes) {
    if (!seen.has(c.type)) {
      seen.add(c.type);
      unique.push(c);
    }
  }
  return unique;
}

// ---------------------------------------------------------------------------
// Core rewrite engine
// ---------------------------------------------------------------------------

function rewriteText(text: string, tone: string, strength: string): { text: string; changes: Change[] } {
  const changes: Change[] = [];
  let result = text;

  result = applyWordReplacements(result, tone, changes);
  result = applyHedgingRemoval(result, changes);
  result = applyFillerRemoval(result, changes);
  result = applyEmDashReplacement(result, changes);
  result = applySemicolonReplacement(result, changes);
  result = applyTransitionStarterRemoval(result, changes);

  if (strength === 'medium' || strength === 'heavy') {
    result = applyAdverbRemoval(result, changes);
    result = applyContractions(result, strength, changes);
  }

  if (strength === 'heavy') {
    result = result.replace(/\s{2,}/g, ' ').trim();
    changes.push({ type: 'cleanup', description: 'Cleaned up whitespace' });
  }

  result = result.replace(/\s+([,.!?])/g, '$1').trim();

  return { text: result, changes: deduplicateChanges(changes) };
}

// Full rewrite pass — always applies every transform (used by root endpoint)
function rewriteTextFull(text: string, tone: string): { text: string; changes: Change[] } {
  const changes: Change[] = [];
  let result = text;

  result = applyWordReplacements(result, tone, changes);
  result = applyHedgingRemoval(result, changes);
  result = applyFillerRemoval(result, changes);
  result = applyEmDashReplacement(result, changes);
  result = applySemicolonReplacement(result, changes);
  result = applyTransitionStarterRemoval(result, changes);
  result = applyAdverbRemoval(result, changes);
  result = applyContractionsAll(result, changes);

  result = result.replace(/\s{2,}/g, ' ');
  result = result.replace(/\s+([,.!?])/g, '$1').trim();

  return { text: result, changes: deduplicateChanges(changes) };
}

// ---------------------------------------------------------------------------
// AI detection scoring
// ---------------------------------------------------------------------------

interface DetectCategory {
  name: string;
  score: number;
  detail: string;
}

interface DetectResult {
  score: number;
  patterns_found: string[];
  categories: DetectCategory[];
}

function detectAiText(text: string): DetectResult {
  const words = countWords(text);
  if (words < 5) {
    return { score: 0, patterns_found: [], categories: [] };
  }

  const patterns_found: string[] = [];
  const categories: DetectCategory[] = [];

  // 1. AI vocabulary density
  let aiWordCount = 0;
  for (const pattern of AI_PHRASES) {
    const matches = text.match(pattern);
    if (matches) aiWordCount += matches.length;
  }
  const vocabDensity = Math.min(100, Math.round((aiWordCount / words) * 100 * 20));
  if (vocabDensity > 0) patterns_found.push('ai_vocabulary');
  categories.push({
    name: 'ai_vocabulary',
    score: vocabDensity,
    detail: `Found ${aiWordCount} AI indicator word(s) in ${words} total words`,
  });

  // 2. Sentence length uniformity (low variance = more AI-like)
  const sentenceLengths = getSentenceLengths(text);
  let uniformityScore = 0;
  if (sentenceLengths.length >= 3) {
    const stdDev = sentenceLengthVariance(sentenceLengths);
    uniformityScore = Math.max(0, Math.min(100, Math.round(100 - (stdDev / 15) * 100)));
  }
  categories.push({
    name: 'sentence_uniformity',
    score: uniformityScore,
    detail: `Sentence length std dev: ${sentenceLengths.length >= 2 ? sentenceLengthVariance(sentenceLengths).toFixed(1) : 'n/a'} words`,
  });

  // 3. Long sentences (25+ words = strong AI tell)
  const longSentences = sentenceLengths.filter((l) => l >= 25).length;
  const longSentenceScore = Math.min(100, Math.round((longSentences / Math.max(1, sentenceLengths.length)) * 150));
  if (longSentences > 0) patterns_found.push('long_sentences');
  categories.push({
    name: 'long_sentences',
    score: longSentenceScore,
    detail: `${longSentences} sentence(s) with 25+ words`,
  });

  // 4. Hedging phrase density
  let hedgingCount = 0;
  for (const [pattern] of HEDGING_PATTERNS) {
    const matches = text.match(pattern);
    if (matches) hedgingCount += matches.length;
  }
  const hedgingScore = Math.min(100, hedgingCount * 25);
  if (hedgingCount > 0) patterns_found.push('hedging_phrases');
  categories.push({
    name: 'hedging_phrases',
    score: hedgingScore,
    detail: `Found ${hedgingCount} hedging phrase(s)`,
  });

  // 5. Contraction avoidance (humans use contractions; AI avoids them)
  const contractionCount = countContractionsInText(text);
  const contractionDensity = words > 0 ? contractionCount / words : 0;
  // < 1% contractions is suspicious; > 4% is clearly human
  const contractionScore = Math.max(0, Math.min(100, Math.round(100 - (contractionDensity / 0.04) * 100)));
  if (contractionScore > 60) patterns_found.push('low_contractions');
  categories.push({
    name: 'contraction_avoidance',
    score: contractionScore,
    detail: `${contractionCount} contraction(s) found (${(contractionDensity * 100).toFixed(1)}% of words)`,
  });

  // 6. Em dash usage (AI overuses em dashes)
  const emDashCount = (text.match(/\u2014|--/g) ?? []).length;
  const emDashScore = Math.min(100, emDashCount * 20);
  if (emDashCount > 0) patterns_found.push('em_dashes');
  categories.push({
    name: 'em_dashes',
    score: emDashScore,
    detail: `Found ${emDashCount} em dash(es)`,
  });

  // 7. Semicolon overuse (humans rarely use semicolons)
  const semicolonCount = (text.match(/;/g) ?? []).length;
  const semicolonScore = Math.min(100, Math.round((semicolonCount / Math.max(1, words)) * 5000));
  if (semicolonCount > 1) patterns_found.push('semicolons');
  categories.push({
    name: 'semicolons',
    score: semicolonScore,
    detail: `Found ${semicolonCount} semicolon(s)`,
  });

  // 8. Transition starters (AI starts sentences with Additionally, Furthermore, etc.)
  let transitionCount = 0;
  for (const word of TRANSITION_STARTERS) {
    const pattern = new RegExp(`(^|[.!?]\\s+)${word}\\b`, 'gm');
    const matches = text.match(pattern);
    if (matches) transitionCount += matches.length;
  }
  const transitionScore = Math.min(100, transitionCount * 20);
  if (transitionCount > 0) patterns_found.push('transition_starters');
  categories.push({
    name: 'transition_starters',
    score: transitionScore,
    detail: `Found ${transitionCount} AI transition starter(s)`,
  });

  // 9. Passive voice (heuristic)
  let passiveCount = 0;
  for (const pattern of PASSIVE_VOICE_PATTERNS) {
    const matches = text.match(pattern);
    if (matches) passiveCount += matches.length;
  }
  const passiveScore = Math.min(100, Math.round((passiveCount / Math.max(1, sentenceLengths.length)) * 100));
  if (passiveCount > 2) patterns_found.push('passive_voice');
  categories.push({
    name: 'passive_voice',
    score: passiveScore,
    detail: `Found ~${passiveCount} passive voice construction(s)`,
  });

  // 10. Paragraph length uniformity
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  let paragraphScore = 0;
  if (paragraphs.length >= 3) {
    const pLengths = paragraphs.map((p) => p.trim().split(/\s+/).length);
    const mean = pLengths.reduce((a, b) => a + b, 0) / pLengths.length;
    const pVariance = pLengths.reduce((sum, l) => sum + Math.pow(l - mean, 2), 0) / pLengths.length;
    const pStdDev = Math.sqrt(pVariance);
    paragraphScore = Math.max(0, Math.min(100, Math.round(100 - (pStdDev / mean) * 100)));
  }
  categories.push({
    name: 'paragraph_uniformity',
    score: paragraphScore,
    detail: paragraphs.length >= 3 ? `${paragraphs.length} paragraphs analyzed` : 'Not enough paragraphs to analyze',
  });

  // 11. Filler phrase density
  let fillerCount = 0;
  for (const [pattern] of FILLER_PATTERNS) {
    const matches = text.match(pattern);
    if (matches) fillerCount += matches.length;
  }
  const fillerScore = Math.min(100, fillerCount * 35);
  if (fillerCount > 0) patterns_found.push('filler_phrases');
  categories.push({
    name: 'filler_phrases',
    score: fillerScore,
    detail: `Found ${fillerCount} filler transition(s)`,
  });

  // Weighted overall score
  // Weights must sum to 1.0
  const weights = [0.20, 0.10, 0.10, 0.08, 0.15, 0.08, 0.05, 0.07, 0.07, 0.05, 0.05];
  const overall = Math.round(
    categories.reduce((sum, cat, i) => sum + cat.score * (weights[i] ?? 0.05), 0)
  );

  return { score: Math.min(100, overall), patterns_found, categories };
}

// ---------------------------------------------------------------------------
// Suggestion engine
// ---------------------------------------------------------------------------

interface Suggestion {
  line: number;
  type: string;
  original: string;
  suggestion: string;
}

function suggestImprovements(text: string): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const lines = text.split('\n');

  lines.forEach((line, lineIndex) => {
    const lineNum = lineIndex + 1;

    for (const [pattern, replacements] of WORD_MAP) {
      const match = line.match(pattern);
      if (match) {
        suggestions.push({
          line: lineNum,
          type: 'ai_vocabulary',
          original: match[0],
          suggestion: `Replace "${match[0]}" with "${replacements['conversational']}"`,
        });
      }
    }

    for (const [pattern] of HEDGING_PATTERNS) {
      const match = line.match(pattern);
      if (match) {
        suggestions.push({
          line: lineNum,
          type: 'hedging',
          original: match[0].trim(),
          suggestion: `Remove hedging phrase: "${match[0].trim()}"`,
        });
      }
    }

    for (const [pattern] of FILLER_PATTERNS) {
      const match = line.match(pattern);
      if (match) {
        suggestions.push({
          line: lineNum,
          type: 'filler_transition',
          original: match[0].trim(),
          suggestion: `Remove filler opening: "${match[0].trim()}"`,
        });
      }
    }

    if (/\u2014|--/.test(line)) {
      suggestions.push({
        line: lineNum,
        type: 'em_dash',
        original: line.includes('\u2014') ? '—' : '--',
        suggestion: 'Replace em dash with a comma or period',
      });
    }

    if (/;/.test(line)) {
      suggestions.push({
        line: lineNum,
        type: 'semicolon',
        original: ';',
        suggestion: 'Replace semicolon with a period to create two shorter sentences',
      });
    }

    for (const pattern of ADVERB_PATTERNS) {
      const match = line.match(pattern);
      if (match) {
        suggestions.push({
          line: lineNum,
          type: 'excessive_adverb',
          original: match[0],
          suggestion: `Remove or replace adverb "${match[0]}" — it weakens the sentence`,
        });
      }
    }

    for (const word of TRANSITION_STARTERS) {
      if (new RegExp(`^${word}\\b`).test(line.trim())) {
        suggestions.push({
          line: lineNum,
          type: 'transition_starter',
          original: word,
          suggestion: `Remove "${word}" — AI transition starters weaken writing`,
        });
      }
    }

    const contractionTargets: [RegExp, string][] = [
      [/\bdo not\b/g, "don't"],
      [/\bwill not\b/g, "won't"],
      [/\bcannot\b/g, "can't"],
      [/\bit is\b/g, "it's"],
    ];
    for (const [pattern, contraction] of contractionTargets) {
      const match = line.match(pattern);
      if (match) {
        suggestions.push({
          line: lineNum,
          type: 'contraction',
          original: match[0],
          suggestion: `Use "${contraction}" instead of "${match[0]}" for a more natural tone`,
        });
      }
    }
  });

  const seen = new Set<string>();
  return suggestions.filter((s) => {
    const key = `${s.line}:${s.type}:${s.original}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ---------------------------------------------------------------------------
// Router factory
// ---------------------------------------------------------------------------

export function createHumanizeRouter() {
  const router = new Hono<{ Variables: AppVariables }>();

  // POST /humanize — gold standard: combined detect + full rewrite in one call
  router.post('/', requireScope('humanize:use'), zv('json', HumanizeSchema), (c) => {
    const { text, tone } = c.req.valid('json');

    const { score, patterns_found } = detectAiText(text);
    const originalWordCount = countWords(text);
    const originalAvgSentenceLength = avgSentenceLength(text);

    const { text: humanized } = rewriteTextFull(text, tone);
    const humanizedAvgSentenceLength = avgSentenceLength(humanized);

    return ok(c, {
      original: text,
      humanized,
      analysis: {
        ai_score: score,
        patterns_found,
        original_word_count: originalWordCount,
        original_avg_sentence_length: originalAvgSentenceLength,
        humanized_avg_sentence_length: humanizedAvgSentenceLength,
      },
      tone,
    });
  });

  // POST /humanize/rewrite — rewrite with strength control
  router.post('/rewrite', requireScope('humanize:use'), zv('json', RewriteSchema), (c) => {
    const { text, tone, strength } = c.req.valid('json');
    const { text: rewritten, changes } = rewriteText(text, tone, strength);
    return ok(c, {
      text: rewritten,
      original_length: text.length,
      rewritten_length: rewritten.length,
      tone,
      strength,
      changes,
      changes_count: changes.length,
    });
  });

  // POST /humanize/detect — score text for AI-writing patterns
  router.post('/detect', requireScope('humanize:use'), zv('json', DetectSchema), (c) => {
    const { text } = c.req.valid('json');
    const { score, patterns_found, categories } = detectAiText(text);
    return ok(c, {
      score,
      verdict: score >= 70 ? 'likely_ai' : score >= 40 ? 'possibly_ai' : 'likely_human',
      patterns_found,
      categories,
      word_count: countWords(text),
    });
  });

  // POST /humanize/suggest — inline improvement suggestions
  router.post('/suggest', requireScope('humanize:use'), zv('json', SuggestSchema), (c) => {
    const { text } = c.req.valid('json');
    const suggestions = suggestImprovements(text);
    return ok(c, {
      suggestions,
      suggestions_count: suggestions.length,
      word_count: countWords(text),
    });
  });

  return router;
}
