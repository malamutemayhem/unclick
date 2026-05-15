const PARSER_TAG_PREFIX = "BUILDBAIT/STEP=";
const MIN_STEP = 1;
const MAX_STEP = 12;
const OPEN_LANE_MAX = 8;

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

function assertStep(step, name = "step") {
  if (!Number.isInteger(step) || step < MIN_STEP || step > MAX_STEP) {
    throw new RangeError(`${name} must be ${MIN_STEP}..${MAX_STEP}`);
  }
}

function commentBody(record = {}) {
  return String(record.body ?? record.text ?? record.message ?? "");
}

function getCommentId(record = {}) {
  return record.id ?? record.commentId ?? record.comment_id ?? record.comment?.id ?? null;
}

function getAuthorId(record = {}) {
  return record.authorId ?? record.author_id ?? record.agentId ?? record.agent_id ?? record.author_agent_id ?? null;
}

function getCreatedAt(record = {}) {
  return record.createdAt ?? record.created_at ?? record.timestamp ?? null;
}

function getResultCommentId(result = {}) {
  return result.commentId ?? result.comment_id ?? result.id ?? result.comment?.id ?? null;
}

function resolveClientMethod(client, camelName, snakeName) {
  const method = client?.[camelName] ?? client?.[snakeName];
  return typeof method === "function" ? method.bind(client) : null;
}

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
  assertStep(step, "BuildBait step");
  return `${PARSER_TAG_PREFIX}${step}`;
}

export function parseStepFromBody(body) {
  const match = String(body ?? "").match(/BUILDBAIT\/STEP=(\d{1,2})/);
  if (!match) return null;
  const step = Number.parseInt(match[1], 10);
  return Number.isInteger(step) && step >= MIN_STEP && step <= MAX_STEP ? step : null;
}

export function normalizeBuildbaitCrumb(record = {}) {
  const body = commentBody(record);
  const step = parseStepFromBody(body);
  if (step === null) return null;
  return {
    commentId: getCommentId(record),
    todoId: record.todoId ?? record.todo_id ?? record.target_id ?? null,
    step,
    label: stepLabel(step),
    parserTag: parserTagFor(step),
    authorId: getAuthorId(record),
    createdAt: getCreatedAt(record),
    body,
  };
}

export function createBuildbaitRoom({ unclickClient, logger = console } = {}) {
  const commentOn = resolveClientMethod(unclickClient, "commentOn", "comment_on");
  const listComments = resolveClientMethod(unclickClient, "listComments", "list_comments");

  if (!commentOn || !listComments) {
    throw new TypeError("createBuildbaitRoom requires commentOn/comment_on and listComments/list_comments");
  }

  async function postCrumb({
    todoId,
    step,
    body,
    seatId = "buildbait-room",
    parserTag = parserTagFor(step),
  } = {}) {
    if (!todoId) throw new TypeError("postCrumb requires todoId");
    assertStep(step, "postCrumb step");
    const label = stepLabel(step);
    const text = `[${parserTag}] Step ${step} ${label}: ${String(body ?? "").trim()}`;
    const result = await commentOn({
      agent_id: seatId,
      agentId: seatId,
      target_kind: "todo",
      target_id: todoId,
      todoId,
      body: text,
      text,
    });
    const commentId = getResultCommentId(result);
    logger.info?.(`buildbait-room posted ${parserTag} on ${todoId}`);
    return { commentId, todoId, step, label, parserTag, body: text };
  }

  async function listCrumbs({ todoId, limit = 100 } = {}) {
    if (!todoId) throw new TypeError("listCrumbs requires todoId");
    const result = await listComments({
      target_kind: "todo",
      target_id: todoId,
      todoId,
      limit,
    });
    const comments = Array.isArray(result) ? result : result?.comments ?? result?.items ?? [];
    return comments
      .map((record) => normalizeBuildbaitCrumb({ ...record, todoId: record.todoId ?? record.todo_id ?? todoId }))
      .filter(Boolean);
  }

  async function latestStep({ todoId } = {}) {
    const crumbs = await listCrumbs({ todoId });
    if (crumbs.length === 0) return null;
    return Math.max(...crumbs.map((crumb) => crumb.step));
  }

  async function nextStep({ todoId } = {}) {
    const latest = await latestStep({ todoId });
    if (latest === null) return MIN_STEP;
    if (latest >= MAX_STEP) return null;
    return latest + 1;
  }

  async function stageState({ todoId } = {}) {
    const crumbs = await listCrumbs({ todoId });
    const latest = crumbs.length === 0 ? null : Math.max(...crumbs.map((crumb) => crumb.step));
    return {
      todoId,
      crumbs,
      latestStep: latest,
      nextStep: latest === null ? MIN_STEP : latest >= MAX_STEP ? null : latest + 1,
      complete: latest >= MAX_STEP,
    };
  }

  return { postCrumb, listCrumbs, latestStep, nextStep, stageState };
}

export const __testing__ = {
  MAX_STEP,
  MIN_STEP,
  OPEN_LANE_MAX,
  PARSER_TAG_PREFIX,
  STEP_LABELS,
};
