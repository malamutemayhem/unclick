/**
 * Recycle-bin deletion model (flag: MEMORY_RECYCLE_BIN_ENABLED).
 *
 * Operator decision (2026-06-08): archived memories are hidden from AI recall,
 * users can restore them, and emptying the bin is the only permanent deletion
 * path. When the flag is ON, the `forget` operation routes non-archived facts
 * into the bin (status 'archived') instead of running the lane-05 hard forget,
 * and `empty_recycle_bin` becomes the single surface that permanently deletes
 * binned facts (via each backend's forgetMemory cascade).
 *
 * Archived rows are already excluded from every recall surface (search,
 * startup context, snapshots) by the existing status === 'active' filters, so
 * archiving needs no read-path changes. The bin reuses the same 'archived'
 * status lane-08 TTL decay writes; user archives are distinguished by the
 * decay_reason marker below so admin surfaces can tell them apart.
 */

export const MEMORY_RECYCLE_BIN_FLAG = "MEMORY_RECYCLE_BIN_ENABLED";

/** Reversible feature flag. Default OFF until the coordinator flips it. */
export function isRecycleBinEnabled(): boolean {
  const raw = (process.env[MEMORY_RECYCLE_BIN_FLAG] ?? "").trim().toLowerCase();
  return raw === "1" || raw === "true";
}

/** decay_reason marker distinguishing user archives from lane-08 TTL archives. */
export const RECYCLE_BIN_USER_ARCHIVE_REASON = "recycle-bin:user_archive";

/** Hard cap on facts permanently deleted per empty_recycle_bin call. */
export const EMPTY_BIN_MAX_BATCH = 200;
