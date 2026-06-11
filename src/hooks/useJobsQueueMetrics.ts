import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth";

export type JobsQueueMetrics = {
  active: number;
  open_backlog: number;
  done: number;
};

/**
 * Live global counts from the Jobs queue (the Boardroom todo board).
 * Returns null until real metrics arrive; an unauthenticated session or a
 * failed fetch stays null so callers show nothing instead of invented zeroes.
 *
 * Only the global counts are exposed. The *_returned fields in the same
 * response describe the returned slice, not the whole queue, so surfacing
 * them from a limit-1 probe would be misleading.
 */
export function useJobsQueueMetrics(): JobsQueueMetrics | null {
  const { session } = useSession();
  const token = session?.access_token;
  const [metrics, setMetrics] = useState<JobsQueueMetrics | null>(null);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/memory-admin?action=fishbowl_list_todos", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ agent_id: "admin-jobs-ui", include_description: false, limit: 1 }),
        });
        const body = (await res.json().catch(() => ({}))) as {
          queue_metrics?: { active?: unknown; open_backlog?: unknown; done?: unknown };
        };
        if (!res.ok || cancelled) return;
        const qm = body.queue_metrics;
        if (
          qm &&
          typeof qm.active === "number" &&
          typeof qm.open_backlog === "number" &&
          typeof qm.done === "number"
        ) {
          setMetrics({ active: qm.active, open_backlog: qm.open_backlog, done: qm.done });
        }
      } catch {
        // Stay null: no numbers beats fake numbers.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return token ? metrics : null;
}
