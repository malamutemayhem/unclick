// WriterLane fixture backend (minimum release #2).
//
// Dead code / plumbing only. This backend exists to exercise the WriterLane
// contract end-to-end without an LLM, a worktree, or OpenHands: produce()
// returns a known, hard-coded diff. It is loudly marked isFixture = true and
// every result it emits sets proof.autonomyProof = false, so
// acceptsAsAutonomyProof can NEVER accept fixture output as evidence of
// autonomous work. Nothing wires this into the runner / watcher / CodeRoom; it
// is a starting shape for review.

import {
  FIXTURE_BACKEND_KIND,
  type WriterLaneBackend,
  type WriterLaneInput,
  type WriterLaneResult,
} from "./writerlane-types.js";

// A deliberately trivial, recognizable diff. It is not valid against any real
// file; it only proves the plumbing carries a patch string through the
// contract.
export const FIXTURE_PATCH = [
  "--- a/FIXTURE_WRITERLANE.txt",
  "+++ b/FIXTURE_WRITERLANE.txt",
  "@@ -0,0 +1 @@",
  "+writerlane fixture backend: plumbing only, not autonomy proof",
  "",
].join("\n");

export const FIXTURE_CHANGED_FILES = ["FIXTURE_WRITERLANE.txt"];

export class FixtureWriterLaneBackend implements WriterLaneBackend {
  readonly kind = FIXTURE_BACKEND_KIND;
  readonly isFixture = true;

  async produce(_input: WriterLaneInput): Promise<WriterLaneResult> {
    return {
      ok: true,
      patch: FIXTURE_PATCH,
      changedFiles: [...FIXTURE_CHANGED_FILES],
      proof: {
        // Hard false: fixture output must never count as autonomy proof.
        autonomyProof: false,
        notes:
          "fixture backend (plumbing only); not evidence of autonomous work",
      },
    };
  }
}

// Stateless convenience singleton.
export const fixtureWriterLaneBackend: WriterLaneBackend =
  new FixtureWriterLaneBackend();
