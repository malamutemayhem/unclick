// Bounded concurrency pool for running tasks in parallel with a limit.
// Inspired by OpenClaw's run-with-concurrency.ts. Useful when a connector
// needs to make several API calls at once (e.g. fetching details for a
// list of items) without hammering the API with 100 simultaneous requests.

export interface ConcurrencyOptions {
  /** Max tasks running at the same time. Default: 5. */
  limit?: number;
  /** What to do when a task fails. "continue" keeps going, "stop" halts new work. Default: "continue". */
  onError?: "continue" | "stop";
}

export interface ConcurrencyResult<T> {
  results: Array<{ ok: true; value: T } | { ok: false; error: unknown }>;
  failed: number;
  succeeded: number;
}

export async function runWithConcurrency<T>(
  tasks: Array<() => Promise<T>>,
  opts: ConcurrencyOptions = {},
): Promise<ConcurrencyResult<T>> {
  const limit = Math.max(1, opts.limit ?? 5);
  const onError = opts.onError ?? "continue";

  const results: Array<{ ok: true; value: T } | { ok: false; error: unknown }> = new Array(tasks.length);
  let next = 0;
  let stopped = false;
  let failed = 0;
  let succeeded = 0;

  async function worker(): Promise<void> {
    while (!stopped) {
      const idx = next++;
      if (idx >= tasks.length) break;
      try {
        const value = await tasks[idx]();
        results[idx] = { ok: true, value };
        succeeded++;
      } catch (error) {
        results[idx] = { ok: false, error };
        failed++;
        if (onError === "stop") stopped = true;
      }
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () => worker());
  await Promise.all(workers);

  return { results, failed, succeeded };
}
