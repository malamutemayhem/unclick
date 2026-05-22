export interface FishbowlCompletionTodo {
  id: string;
  title: string | null;
  description: string | null;
  created_by_agent_id: string | null;
}

export interface FishbowlCompletionComment {
  author_agent_id: string | null;
  text: string | null;
  created_at?: string | null;
}

export interface FishbowlCompletionPolicyInput {
  todo: FishbowlCompletionTodo;
  comments: FishbowlCompletionComment[];
  closerAgentId: string;
  isAdminCaller?: boolean;
}

export interface FishbowlCompletionPolicyResult {
  allowed: boolean;
  code:
    | "allowed"
    | "missing_proof"
    | "git_proof_required"
    | "release_or_live_proof_required"
    | "ui_screenshot_required"
    | "independent_verifier_required";
  reason: string;
  how_to_fix?: string;
}

const proofPositivePattern =
  /\b(pr\s*#?\d+|pull request\s*#?\d+|commit\s+[a-f0-9]{7,40}|sha\s+[a-f0-9]{7,40}|branch\s+[\w./-]+|git\s+diff|tests?\s+passed|build\s+passed|checks?\s+(?:passed|green)|ci\s+(?:passed|green)|playwright|screenshot|screen\s?shot|actions\/runs\/\d+|deployed|deployment|live on production|production live|no[_\s-]?code[_\s-]?needed|no code needed|proof:\s*\S+|receipt\s+[0-9a-f-]{8,})\b/i;

const proofNegativePattern =
  /\b(blocker|blocked|hold|no\s+(?:proof|screenshot|test|pr|commit)|missing\s+(?:proof|screenshot|test|pr|commit)|proof\s+(?:is\s+)?(?:missing|needed|incomplete|stale|not available|reset)|proof\s+reset|reopened|re-opened|false\s+completion|false[- ]done|false\s+green|stale\s+(?:proof|receipt|green chip|claim)|wrong\s+(?:scope|surface|job|proof)|scope\s+mismatch|without\s+(?:proof|screenshot|test|pr|commit)|needs?\s+(?:proof|screenshot|test|pr|commit)|publish\s+failed|release\/live\s+proof)\b/i;

const screenshotPattern =
  /\b(screenshot|screen\s?shot|before\/after|before and after|playwright|visual proof)\b|https?:\/\/\S+\.(?:png|jpe?g|webp)\b|[A-Za-z]:\\[^\n]+\.(?:png|jpe?g|webp)\b/i;

const uiTodoPattern =
  /\b(ui|ux|uxpass|visual|polish|screenshot|screen\s?shot|frontend|front-end|page|screen|layout|design)\b/i;

const uiDeliveryPattern =
  /\b(uxpass|visual\s+polish|ui\s+overhaul|frontend|front-end|front\s+end|page|screen|layout|design|component|tsx?|admin\s+ui|dashboard|browser)\b/i;

const nonVisualCompletionGatePattern =
  /\b(non-?ui|backend|automation|autopilot|completion[-\s]?gate|completion[-\s]?policy|proof[-\s]?gate|close\s+gate|screenshot[-\s]?required|seatrelay|stale\s+claims?|reassign(?:ment)?|handoff|worker|boardroom|todo\s+close|mcp|api|script|runner)\b/i;

const codingTodoPattern =
  /\b(api|backend|bug|build|code|coding|commit|component|deploy|endpoint|fix|front-end|frontend|function|implement|migration|mcp|package|patch|pr|route|runner|schema|script|storage|tsx?|tool|ui|ux|uxpass|wire|writer)\b/i;

const gitProofPattern =
  /\b(pr\s*#?\d+|pull request\s*#?\d+|commit\s+[a-f0-9]{7,40}|sha\s+[a-f0-9]{7,40}|branch\s+[\w./-]+|git\s+diff|github\.com\/\S+\/(?:pull|commit)\/\S+|actions\/runs\/\d+|deployed|deployment|live on production|production live|vercel\.app)\b/i;

const noCodeNeededPattern =
  /\b(no[_\s-]?code[_\s-]?needed|no code needed|non-code|no code change|policy only|comment only|routing only|docs only)\b/i;

const runtimeDeliveryTodoPattern =
  /\b(mcp\s+(?:server|tool)|publish(?:ed|ing)?|registry|npm|release|deploy(?:ed|ment)?|production|live\s+(?:tool|receipt|api|proof)|expos(?:e|ed|ing)|workers?\s+may\s+request|worker(?:s)?\s+tool)\b/i;

const runtimeDeliveryProofPattern =
  /\b(published|npm\s+(?:view|latest|dist-tag)|registry\s+(?:confirms|shows|latest)|deployed|deployment|live\s+on\s+production|production\s+live|vercel\.app|tool(?:s)?\s+(?:discoverable|available|exposed)|(?:mcp|tool)\s+discovery|live\s+(?:receipt|api|tool)|fidelitycopy_(?:copy|verify)|fidelitypass_verify_copy)\b/i;

function isUiCompletionTodo(corpus: string): boolean {
  if (!uiTodoPattern.test(corpus)) return false;
  if (nonVisualCompletionGatePattern.test(corpus) && !uiDeliveryPattern.test(corpus)) return false;
  return true;
}

function commentTime(comment: FishbowlCompletionComment): number {
  if (!comment.created_at) return 0;
  const parsed = Date.parse(comment.created_at);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function evaluateFishbowlCompletionPolicy(input: FishbowlCompletionPolicyInput): FishbowlCompletionPolicyResult {
  const closer = input.closerAgentId.trim();
  const corpus = [input.todo.title, input.todo.description].filter(Boolean).join("\n");
  const negativeProofComments = input.comments.filter((comment) => proofNegativePattern.test(comment.text ?? ""));
  const positiveProofComments = input.comments.filter((comment) => {
    const text = comment.text ?? "";
    return proofPositivePattern.test(text) && !proofNegativePattern.test(text);
  });

  if (positiveProofComments.length === 0) {
    return {
      allowed: false,
      code: "missing_proof",
      reason: "Done is blocked until the job has a real proof comment.",
      how_to_fix: "Add a proof comment with a PR, commit, test/build result, run link, receipt, or screenshot, then close the job.",
    };
  }

  const latestPositiveProofAt = Math.max(...positiveProofComments.map(commentTime));
  const latestNegativeProofAt = Math.max(0, ...negativeProofComments.map(commentTime));
  if (latestNegativeProofAt > latestPositiveProofAt) {
    return {
      allowed: false,
      code: "missing_proof",
      reason: "Done is blocked because a newer blocker or missing-proof comment exists after the latest proof.",
      how_to_fix: "Resolve the blocker with newer observable PASS proof, then close the job.",
    };
  }

  const hasIndependentProof = positiveProofComments.some((comment) => {
    const author = String(comment.author_agent_id ?? "").trim();
    return author.length > 0 && author !== closer;
  });
  const creator = String(input.todo.created_by_agent_id ?? "").trim();
  if (!input.isAdminCaller && creator === closer && !hasIndependentProof) {
    return {
      allowed: false,
      code: "independent_verifier_required",
      reason: "Done is blocked because the same agent created and closed the job without independent proof.",
      how_to_fix: "Have a different UnClick agent identity add PASS/BLOCKER proof, then close the job. That verifier can live inside the same AI subscription seat.",
    };
  }
  if (!input.isAdminCaller && !hasIndependentProof) {
    return {
      allowed: false,
      code: "independent_verifier_required",
      reason: "Done is blocked until proof comes from a different verifier agent.",
      how_to_fix: "Use a separate reviewer agent_id to add PASS/BLOCKER proof before closing. It can be the same AI subscription, but not the same UnClick agent identity.",
    };
  }

  if (isUiCompletionTodo(corpus)) {
    const hasScreenshotProof = positiveProofComments.some((comment) => screenshotPattern.test(comment.text ?? ""));
    if (!hasScreenshotProof) {
      return {
        allowed: false,
        code: "ui_screenshot_required",
        reason: "UI/UX jobs need screenshot proof before they can be marked done.",
        how_to_fix: "Attach before/after screenshot proof or a Playwright screenshot path/comment, then close the job.",
      };
    }
  }

  if (codingTodoPattern.test(corpus)) {
    const hasGitOrDeployProof = positiveProofComments.some((comment) =>
      gitProofPattern.test(comment.text ?? "") || noCodeNeededPattern.test(comment.text ?? ""),
    );
    if (!hasGitOrDeployProof) {
      return {
        allowed: false,
        code: "git_proof_required",
        reason: "Coding jobs need Git, deploy, or no-code proof before they can be marked done.",
        how_to_fix:
          "Add proof with a PR, commit SHA, branch diff, deployed URL, or explicit NO_CODE_NEEDED reason, then close the job.",
      };
    }
  }

  if (runtimeDeliveryTodoPattern.test(corpus)) {
    const hasRuntimeDeliveryProof = positiveProofComments.some((comment) =>
      runtimeDeliveryProofPattern.test(comment.text ?? ""),
    );
    if (!hasRuntimeDeliveryProof) {
      return {
        allowed: false,
        code: "release_or_live_proof_required",
        reason: "Runtime, package, or tool jobs need release/live availability proof before they can be marked done.",
        how_to_fix:
          "Add proof that the package, deployment, live API, or tool discovery is available, then close the job.",
      };
    }
  }

  return {
    allowed: true,
    code: "allowed",
    reason: "Completion proof gate passed.",
  };
}
