// Boardroom compat: alarmed deprecation redirects for legacy "Fishbowl" names.
//
// Canonical name is Boardroom (see docs/fishbowl-compat-map.md). Several
// api/lib helpers, DB tables, env vars, and wire formats still use the legacy
// "Fishbowl" name and are load-bearing, so they cannot be renamed in one pass.
//
// This module is the safety mechanism for the staged migration: wrap a legacy
// name with createBoardroomAlias(...) so callers that still use the old name
// keep working AND every such call emits a structured deprecation event (an
// "alarm"). Watch the counts fall to zero via getLegacyUsageCounts(), then
// delete the alias. The static counterpart is scripts/audit-fishbowl-naming.mjs
// (compile-time grep); this is the runtime counterpart (who actually calls it).
//
// Pure, dependency-free, sink-injectable so it is trivially testable. No DB, no
// network, no side effects beyond the injected sink and an in-memory counter.

export interface LegacyNameUsage {
  legacyName: string;
  canonicalName: string;
  context: string;
  at: string;
}

export type LegacyUsageSink = (usage: LegacyNameUsage) => void;

const counts = new Map<string, number>();

function defaultSink(usage: LegacyNameUsage): void {
  // Structured, greppable line. A real deployment can point this at
  // throughput-observability / posthog instead of the console.
  console.warn(
    `[boardroom-compat] legacy name "${usage.legacyName}" used ` +
      `(canonical: "${usage.canonicalName}", context: "${usage.context}"). ` +
      `Migrate the caller, then drop the alias.`,
  );
}

let activeSink: LegacyUsageSink = defaultSink;

/** Redirect telemetry to a custom sink (observability pipeline, or a test). */
export function setLegacyUsageSink(sink: LegacyUsageSink | null): void {
  activeSink = sink ?? defaultSink;
}

/** Record one use of a legacy name. Increments the counter and alarms. */
export function recordLegacyNameUse(
  legacyName: string,
  canonicalName: string,
  context: string,
  now: () => Date = () => new Date(),
): void {
  counts.set(legacyName, (counts.get(legacyName) ?? 0) + 1);
  activeSink({
    legacyName,
    canonicalName,
    context,
    at: now().toISOString(),
  });
}

/** Snapshot of how many times each legacy name has been hit this process. */
export function getLegacyUsageCounts(): Record<string, number> {
  return Object.fromEntries(counts);
}

/** A legacy name is "cleared" when nothing has called it. */
export function isLegacyNameCleared(legacyName: string): boolean {
  return (counts.get(legacyName) ?? 0) === 0;
}

/** Reset counters (test helper / start of a measurement window). */
export function resetLegacyUsageCounts(): void {
  counts.clear();
}

/**
 * Wrap an implementation so calling it under a legacy name records usage and
 * then delegates to the real (Boardroom-named) implementation. This is the
 * "backup redirect that alarms when used" pattern.
 *
 * Example:
 *   export const evaluateFishbowlCompletionPolicy = createBoardroomAlias(
 *     "evaluateFishbowlCompletionPolicy",
 *     "evaluateBoardroomCompletionPolicy",
 *     evaluateBoardroomCompletionPolicy,
 *   );
 */
export function createBoardroomAlias<Args extends unknown[], Result>(
  legacyName: string,
  canonicalName: string,
  impl: (...args: Args) => Result,
): (...args: Args) => Result {
  return (...args: Args): Result => {
    recordLegacyNameUse(legacyName, canonicalName, "function-alias");
    return impl(...args);
  };
}
