// scripts/pinballwake-buildbait-room.mjs
//
// BuildBait room contract.
//
// A "room" is the persistence layer where BuildBait crumbs live and are picked up
// by other seats. Conceptually mirrors the existing "code room" pattern: a
// well-known location for a class of work item, accessed through a small contract.
//
// This module exposes:
//   - createBuildbaitRoom({ unclickClient, logger }) -> room instance
//   - room.postCrumb({ todoId, step, body, seatId, parserTag })  -> Promise<{ commentId }>
//   - room.listCrumbs({ todoId, limit }) -> Promise<Crumb[]>
//   - room.latestStep({ todoId })   -> Promise<number | null>
//   - room.nextStep({ todoId })     -> Promise<number | null>   // null if Step 12 already landed
//
// The crumb ladder runs from Step 1 (Observe) through Step 12 (Real change), per the
// BuildBait spec posted on todo 11957893. Steps 1-8 are open-lane (any seat); steps
// 9-12 require Autopilot Executor Lane authority + CommonSensePass.
//
// The `parserTag` is a stable canonical string the autonomous runner can grep for to
// detect crumb presence. We use `BUILDBAIT/STEP={n}` as the canonical tag.

const PARSER_TAG_PREFIX = "BUILDBAIT/STEP=";
const MIN_STEP = 1;
const MAX_STEP = 12;

const STEP_LABELS = {
  1: "Observe",
  2: "Acknowledge",
  3: "Classify",
  4: "Summarize",
  5: "Question",
  6: "Recommend",
  7: "ScopePack",
  8: "Pseudo-code",
  9: "Trivial patch",
  10: "Test scaffold",
  11: "Small helper",
  12: "Real change",
};

const OPEN_LANE_MAX = 8; // steps 1-8 do not require executor authority

export function stepLabel(step) {
  return STEP_LABELS[step] ?? null;
}

export function isOpenLaneStep(step) {
  return Number.isInteger(step) && step >= MIN_STEP && step <= OPEN_LANE_MAX;
}

export function isExecutorLaneStep(step) {
  return Number.isInteger(step) && step > OPEN_LANE_MAX && step <= MAX_STEP;
}

export function parserTagFor(step) {
  if (!Number.isInteger(step) || step < MIN_STEP || step > MAX_STEP) {
    throw new RangeError(`BuildBait step must be ${MIN_STEP}..${MAX_STEP}, got ${step}`);
  }
  return `${PARSER_TAG_PREFIX}${step}`;
}

export function parseStepFromBody(body) {
  if (typeof body !== "string") return null;
  const match = body.match(/BUILDBAIT\/STEP=(\d{1,2})/);
  if (!match) return null;
  const step = Number.parseInt(match[1], 10);
  if (!Number.isInteger(step) || step < MIN_STEP || step > MAX_STEP) return null;
  return step;
}

export function createBuildbaitRoom({ unclickClient, logger = console } = {}) {
  if (!unclickClient || typeof unclickClient.commentOn !== "function" || typeof unclickClient.listComments !== "function") {
    throw new TypeError("createBuildbaitRoom requires unclickClient with commentOn + listComments");
  }

  async function postCrumb({ todoId, step, body, seatId, parserTag }) {
    if (!todoId) throw new TypeError("postCrumb requires todoId");
    if (!Number.isInteger(step) || step < MIN_STEP || step > MAX_STEP) {
      throw new RangeError(`postCrumb step must be ${MIN_STEP}..${MAX_STEP}`);
    }
    const tag = parserTag ?? parserTagFor(step);
    const label = stepLabel(step);
    const composed = `[${tag}] Step ${step} ${label}: ${body}`;
    const result = await unclickClient.commentOn({
      todoId,
      body: composed,
      agentId: seatId ?? "buildbait-room",
    });
    logger.info?.(`buildbait-room: posted Step ${step} (${label}) on ${todoId} as ${result?.commentId ?? "(no id)"}`);
    return { commentId: result?.commentId ?? null, step, label, parserTag: tag };
  }

  async function listCrumbs({ todoId, limit = 100 } = {}) {
    if (!todoId) throw new TypeError("listCrumbs requires todoId");
    const comments = await unclickClient.listComments({ todoId, limit });
    const crumbs = [];
    for (const c of comments ?? []) {
      const step = parseStepFromBody(c.body ?? "");
      if (step !== null) {
        crumbs.push({
          commentId: c.id ?? c.commentId ?? null,
          step,
          label: stepLabel(step),
          parserTag: `${PARSER_TAG_PREFIX}${step}`,
          createdAt: c.createdAt ?? null,
          authorId: c.authorId ?? c.agentId ?? null,
          body: c.body ?? "",
        });
      }
    }
    return crumbs;
  }

  async function latestStep({ todoId } = {}) {
    const crumbs = await listCrumbs({ todoId });
    if (crumbs.length === 0) return null;
    return crumbs.reduce((max, c) => (c.step > max ? c.step : max), 0);
  }

  async function nextStep({ todoId } = {}) {
    const last = await latestStep({ todoId });
    if (last === null) return MIN_STEP;
    if (last >= MAX_STEP) return null;
    return last + 1;
  }

  return { postCrumb, listCrumbs, latestStep, nextStep };
}

export const __testing__ = {
  PARSER_TAG_PREFIX,
  MIN_STEP,
  MAX_STEP,
  OPEN_LANE_MAX,
  STEP_LABELS,
};
