export interface Turn {
  role: string;
  content: string;
  timestamp?: number;
}

export interface SummaryOptions {
  maxTurns?: number;
  maxCharsPerTurn?: number;
  includeTimestamps?: boolean;
}

export function summarizeTurns(turns: Turn[], options: SummaryOptions = {}): string {
  const maxChars = options.maxCharsPerTurn ?? 100;
  const lines = turns.map((t) => {
    const content = t.content.length > maxChars
      ? t.content.slice(0, maxChars) + "..."
      : t.content;
    const ts = options.includeTimestamps && t.timestamp
      ? ` (${new Date(t.timestamp).toISOString()})`
      : "";
    return `[${t.role}]${ts} ${content}`;
  });
  return lines.join("\n");
}

export function progressiveSummarize(
  turns: Turn[],
  windowSize: number,
  summarizer: (text: string) => string = defaultSummarizer,
): { summary: string; recentTurns: Turn[] } {
  if (turns.length <= windowSize) {
    return { summary: "", recentTurns: turns };
  }
  const older = turns.slice(0, turns.length - windowSize);
  const recent = turns.slice(turns.length - windowSize);
  const olderText = summarizeTurns(older);
  return { summary: summarizer(olderText), recentTurns: recent };
}

export function countTurns(turns: Turn[], role?: string): number {
  if (!role) return turns.length;
  return turns.filter((t) => t.role === role).length;
}

export function extractTopics(turns: Turn[], minWordLength = 4): string[] {
  const wordCount = new Map<string, number>();
  for (const turn of turns) {
    const words = turn.content.toLowerCase().split(/\s+/).filter((w) => w.length >= minWordLength);
    for (const word of words) {
      wordCount.set(word, (wordCount.get(word) ?? 0) + 1);
    }
  }
  return [...wordCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
}

export function lastNTurns(turns: Turn[], n: number): Turn[] {
  return turns.slice(Math.max(0, turns.length - n));
}

function defaultSummarizer(text: string): string {
  const lines = text.split("\n");
  if (lines.length <= 3) return text;
  return lines.slice(0, 3).join("\n") + `\n... (${lines.length - 3} more turns)`;
}
