export type XPassProductId =
  | "testpass"
  | "uipass"
  | "uxpass"
  | "securitypass"
  | "copypass"
  | "fidelitypass"
  | "legalpass"
  | "sloppass"
  | "commonsensepass"
  | "seopass"
  | "geopass"
  | "flowpass"
  | "rotatepass"
  | "wakepass"
  | "compliancepass";

export type XPassRowStatus = "PASS" | "FAIL" | "N/A" | "WARNING" | "ALERT" | "WAITING";

export type XPassChecklistRow = {
  title: string;
  comment: string;
  status?: XPassRowStatus;
};

export type XPassChecklistGroup = {
  title: string;
  rows: XPassChecklistRow[];
};

const waiting = (title: string, comment: string): XPassChecklistRow => ({
  title,
  comment,
  status: "WAITING",
});

const warning = (title: string, comment: string): XPassChecklistRow => ({
  title,
  comment,
  status: "WARNING",
});

const na = (title: string, comment: string): XPassChecklistRow => ({
  title,
  comment,
  status: "N/A",
});

function improvementLoop(productName: string): XPassChecklistGroup {
  return {
    title: "Continuous improvement loop",
    rows: [
      waiting("Weak comment check", `${productName} must rewrite vague comments into plain next actions.`),
      waiting("Repeated miss check", `Repeated ${productName} misses must create or update a checklist item.`),
      waiting("Regression capture check", `A fixed ${productName} miss must leave proof that it cannot quietly return.`),
      waiting("Owner handoff check", `${productName} failures must name the person, worker, or lane that can fix them.`),
      waiting("Final green rule", `${productName} is green only when every relevant row is PASS or N/A.`),
    ],
  };
}

const BASE_XPASS_PRODUCT_CHECKLISTS: Record<XPassProductId, XPassChecklistGroup[]> = {
  testpass: [
    {
      title: "Build and test proof",
      rows: [
        waiting("Install completes", "Dependencies install from the committed lockfile without manual fixes."),
        waiting("Type check passes", "The project type checker finishes cleanly for touched code."),
        waiting("Unit tests pass", "Focused tests cover the changed behavior and pass."),
        waiting("Integration tests pass", "Cross-module paths touched by the work are exercised."),
        waiting("Package build passes", "The package or app that owns the change builds successfully."),
        waiting("Generated files are current", "Generated indexes, maps, and registries are refreshed where needed."),
      ],
    },
    {
      title: "Runtime proof",
      rows: [
        waiting("Happy path runs", "The primary user path works from start to finish."),
        waiting("Failure path runs", "Known bad input returns a clear error instead of crashing."),
        waiting("No console-breaking errors", "Browser or server logs do not show new runtime failures."),
        waiting("API response shape is stable", "Changed endpoints return the expected status and body shape."),
        waiting("Background job exits cleanly", "Workers, scripts, and scheduled jobs finish with a useful receipt."),
      ],
    },
    {
      title: "Cloud proof",
      rows: [
        waiting("PR checks pass", "GitHub checks that matter for the change are green."),
        waiting("Preview deploy responds", "The preview URL serves the changed surface successfully."),
        waiting("Production deploy responds", "After merge, the live route serves the expected page or API."),
        waiting("Smoke check passes", "A real smoke check runs against the deployed surface."),
        warning("Discontinued checks ignored", "Known retired checks are ignored only when a standing rule says so."),
      ],
    },
    improvementLoop("TestPass"),
  ],
  uipass: [
    {
      title: "Screen layout",
      rows: [
        waiting("Desktop layout fits", "No text, cards, controls, or media overlap at desktop width."),
        waiting("Mobile layout fits", "The same surface fits mobile without horizontal scrolling."),
        waiting("Text stays inside controls", "Button, badge, and row labels do not clip or overflow."),
        waiting("Hierarchy is obvious", "The eye can find the title, current state, and next action quickly."),
        waiting("Density matches the job", "Work tools stay compact enough for repeated use."),
        waiting("No decorative noise", "Decoration does not compete with the task or hide real content."),
      ],
    },
    {
      title: "Interface controls",
      rows: [
        waiting("Buttons are legible", "Button labels, icons, and tap targets are easy to see and use."),
        waiting("Inputs are aligned", "Fields, labels, hints, and validation text line up cleanly."),
        waiting("Tables scan quickly", "Long lists, ledgers, and reports keep thin readable rows."),
        waiting("States are visible", "Hover, focus, selected, disabled, loading, and error states are visually clear."),
        waiting("Keyboard focus is visible", "The focused control is obvious without relying on a mouse."),
      ],
    },
    {
      title: "Visual polish and consistency",
      rows: [
        waiting("Typography is steady", "Headings, labels, body copy, and badges use consistent sizing."),
        waiting("Color has meaning", "Green, red, amber, and neutral states are used consistently."),
        waiting("Spacing is steady", "Rows and sections do not jump when status or comments change."),
        waiting("Visual proof captured", "Screenshots or visual smoke checks exist for important surfaces."),
        waiting("Design matches product", "The page feels like the same UnClick product, not a pasted-on screen."),
      ],
    },
    improvementLoop("UIPass"),
  ],
  uxpass: [
    {
      title: "Task journey",
      rows: [
        waiting("User goal is obvious", "A normal user can tell what this page helps them do."),
        waiting("First step is clear", "The user can tell where to begin without reading internal context."),
        waiting("Next step is clear", "After each action, the user knows what happens next."),
        waiting("Completion is clear", "The user can tell when the task is finished and where proof lives."),
        waiting("Back path is safe", "The user can recover or go back without losing important work."),
        waiting("Dead ends are avoided", "The page does not leave the user stuck with no useful action."),
      ],
    },
    {
      title: "Understanding and feedback",
      rows: [
        waiting("Plain language works", "The screen explains itself in everyday words."),
        waiting("Empty state helps", "Empty states explain what is missing and how to continue."),
        waiting("Loading state helps", "Loading states preserve layout and tell the user what is happening."),
        waiting("Error state helps", "Errors say what failed and what to try next."),
        waiting("Help is near the problem", "Hints, examples, or explanations appear where the user needs them."),
      ],
    },
    {
      title: "Friction and confidence",
      rows: [
        waiting("Too many steps are removed", "The task avoids unnecessary clicks, repeats, or detours."),
        waiting("Risk is explained", "Destructive, sensitive, or uncertain actions say what will happen."),
        waiting("User control is preserved", "The user can review, cancel, retry, or correct important actions."),
        waiting("Outcome matches expectation", "The result matches what the button, form, or page promised."),
        waiting("User research signal captured", "Confusion, repeated misses, or support questions become improvement rows."),
      ],
    },
    improvementLoop("UXPass"),
  ],
  securitypass: [
    {
      title: "Secrets and auth",
      rows: [
        waiting("No secret exposure", "Keys, tokens, passwords, and one-time codes are never shown in logs or UI."),
        waiting("Redaction holds", "Receipts and errors redact secret-shaped values before saving."),
        waiting("Auth boundary holds", "Protected pages and APIs require the correct user session."),
        waiting("Role boundary holds", "Admin-only and tenant-only actions are blocked for the wrong role."),
        waiting("Token lifecycle is safe", "Create, copy, rotate, and revoke flows do not leak old raw secrets."),
      ],
    },
    {
      title: "Input and data boundaries",
      rows: [
        waiting("Inputs are validated", "User-controlled values are checked before reaching sensitive logic."),
        waiting("File paths are bounded", "Local paths cannot escape the intended workspace or tenant scope."),
        waiting("External URLs are safe", "Remote fetches avoid unsafe schemes and unexpected hosts."),
        waiting("Database scope is tenant-safe", "Queries cannot read or write another tenant's data."),
        waiting("Error messages are safe", "Errors explain the problem without exposing internals or secrets."),
      ],
    },
    {
      title: "Operational safety",
      rows: [
        waiting("Destructive action gated", "Deletes, rotations, deploys, and writes have the right confirmation path."),
        waiting("Audit trail exists", "Sensitive actions leave a safe receipt with actor, target, and result."),
        waiting("Dependency risk checked", "New packages or network surfaces have a reason and a risk check."),
        waiting("Security fallback is clear", "If proof is missing, the result is blocked instead of guessed green."),
        na("Exploit testing in scope", "N/A unless the job explicitly authorizes active security testing."),
      ],
    },
    improvementLoop("SecurityPass"),
  ],
  copypass: [
    {
      title: "Message clarity",
      rows: [
        waiting("Headline promise is true", "The headline matches what the product actually does."),
        waiting("Subheading explains value", "The subheading adds meaning instead of repeating the headline."),
        waiting("Body copy is plain", "A normal user can understand the wording without internal jargon."),
        waiting("CTA says the action", "Buttons describe the action the user will take."),
        waiting("Empty state copy helps", "Empty states say what is missing and how to continue."),
        waiting("Error copy helps", "Error messages are specific, calm, and fixable."),
      ],
    },
    {
      title: "Trust and claims",
      rows: [
        waiting("No fake certainty", "The copy does not overclaim proof, safety, compliance, or automation."),
        waiting("No AI slop", "The wording avoids filler, vague hype, and generic assistant language."),
        waiting("Audience matches", "The copy speaks to the actual user of this screen."),
        waiting("Feature names are consistent", "Product, Pass, and tool names match the canonical naming."),
        waiting("Screens say the same thing", "Public, admin, and report wording do not contradict each other."),
      ],
    },
    {
      title: "CopyRoom fidelity",
      rows: [
        waiting("Source text identified", "Any exact wording request points to the source text or packet."),
        waiting("Edited copy is intentional", "Changed wording has a reason, not accidental drift."),
        waiting("Claims keep evidence", "Evidence-backed claims stay attached to the source proof."),
        na("Exact copy required", "N/A unless the request asks for 1:1 wording or source-copy work."),
        waiting("Final copy receipt exists", "The result says what was copied, changed, or left alone."),
      ],
    },
    improvementLoop("CopyPass"),
  ],
  fidelitypass: [
    {
      title: "Source copy scope",
      rows: [
        waiting("Source packet exists", "The exact source text, table, prompt, label, or code is available."),
        waiting("Destination is named", "The target file, field, page, or artifact is clear."),
        waiting("Copy mode is declared", "The run says whether it is exact copy, adapted copy, or N/A."),
        waiting("Whitespace rules are known", "Line breaks, punctuation, casing, and formatting rules are clear."),
        na("No exact source in scope", "N/A only when the job does not require source-copy fidelity."),
      ],
    },
    {
      title: "Exactness checks",
      rows: [
        waiting("Text matches source", "Exact-copy text matches the source after approved normalization."),
        waiting("Order is preserved", "Lists, rows, steps, and labels stay in the intended order."),
        waiting("Numbers are preserved", "Prices, dates, counts, limits, and scores are not altered by mistake."),
        waiting("Names are preserved", "Product, person, company, and file names stay exact where required."),
        waiting("Omissions are listed", "Anything skipped is called out with a reason."),
      ],
    },
    {
      title: "Drift prevention",
      rows: [
        waiting("Copy receipt links source", "The receipt points to the source packet or CopyRoom proof."),
        waiting("Diff is reviewable", "Differences between source and output are visible."),
        waiting("Adapted copy is labeled", "Non-exact edits are labeled as adaptation, not exact copy."),
        waiting("Reviewer can verify", "A human or worker can re-check the copy without guessing."),
        waiting("Fidelity failure blocks green", "Unexplained drift marks the report FAIL or ALERT."),
      ],
    },
    improvementLoop("FidelityPass"),
  ],
  legalpass: [
    {
      title: "Risk wording",
      rows: [
        waiting("No legal advice claim", "The page does not imply UnClick gives legal advice unless approved."),
        waiting("Disclaimers are plain", "Disclaimers are understandable and close to the relevant claim."),
        waiting("Promise is bounded", "Guarantees, certifications, and assurance language are not overstated."),
        waiting("Jurisdiction is not guessed", "Country or state-specific claims are not invented."),
        waiting("Human review flag exists", "High-risk legal language has a clear review path."),
      ],
    },
    {
      title: "Policy surfaces",
      rows: [
        waiting("Privacy claim matches policy", "Privacy wording matches the actual privacy policy."),
        waiting("Terms claim matches terms", "Terms wording matches the actual terms page."),
        waiting("Refund or billing claim matches", "Money-related wording matches the real billing behavior."),
        waiting("Data retention claim matches", "Storage and deletion promises match implementation or policy."),
        waiting("User consent is clear", "Opt-in, opt-out, and notice copy is visible where required."),
      ],
    },
    {
      title: "Evidence handling",
      rows: [
        waiting("Source policy linked", "The report links the policy or source that backs the row."),
        waiting("Unverified claim blocks", "Claims without source proof become WARNING or FAIL."),
        warning("Specialist review needed", "LegalPass flags legal-risk wording; it does not certify legality."),
        waiting("Change log exists", "Legal-sensitive wording changes leave a date and reason."),
        waiting("N/A reason is explicit", "N/A explains why the legal check is not relevant to the job."),
      ],
    },
    improvementLoop("LegalPass"),
  ],
  sloppass: [
    {
      title: "Code quality",
      rows: [
        waiting("Smallest useful change", "The patch solves the task without unrelated churn."),
        waiting("No dead code", "Unused code, stale branches, and abandoned helpers are removed or explained."),
        waiting("Naming is clear", "Names explain purpose without vague filler."),
        waiting("Duplication is justified", "Repeated logic is intentional or refactored where useful."),
        waiting("Complexity is contained", "Complicated logic has a local reason and a focused test."),
      ],
    },
    {
      title: "Diff hygiene",
      rows: [
        waiting("Line endings are clean", "Whitespace-only or line-ending noise is not committed."),
        waiting("Generated files match source", "Generated outputs change only because source changed."),
        waiting("No local paths leak", "Public files do not expose local machine paths."),
        waiting("No debug leftovers", "Console noise, temp wrappers, and scratch files are removed."),
        waiting("Commit scope is honest", "The commit contains only the intended product slice."),
      ],
    },
    {
      title: "Maintainability",
      rows: [
        waiting("Tests cover the risk", "Tests match the behavior most likely to regress."),
        waiting("Failure mode is readable", "The next worker can understand what failed and why."),
        waiting("Existing patterns are followed", "The implementation matches nearby code style."),
        waiting("Docs updated when needed", "User-facing or worker-facing behavior changes update docs."),
        waiting("Slop finding blocks merge", "A real sloppy-risk finding cannot be rubber-stamped green."),
      ],
    },
    improvementLoop("SlopPass"),
  ],
  commonsensepass: [
    {
      title: "Claim sanity",
      rows: [
        waiting("Done means done", "The job is not called done until the requested outcome exists."),
        waiting("Green means checked", "Green status comes from proof, not optimism or stale comments."),
        waiting("No false quiet", "A quiet queue is not called healthy when work is still open."),
        waiting("Scope matches request", "The response answers the user's newest request, not an old one."),
        waiting("Caveats are plain", "Any limitation is stated simply instead of hidden."),
      ],
    },
    {
      title: "Proof sanity",
      rows: [
        waiting("Proof is current", "Receipts are tied to the current branch, PR, route, or deploy."),
        waiting("Proof is relevant", "The proof checks the thing being claimed."),
        waiting("Proof is observable", "A reviewer can click or rerun enough evidence to trust it."),
        waiting("Fixture is not production proof", "Test fixtures are labeled as tests, not live proof."),
        waiting("Screenshot proof fits UI work", "UI claims include visual evidence when practical."),
      ],
    },
    {
      title: "Human comprehension",
      rows: [
        waiting("Plain English result", "Anyone can read the report and know what happened."),
        waiting("No internal-only labels", "Worker jargon is hidden unless technical proof is opened."),
        waiting("Next action is obvious", "Failed or warning rows say what happens next."),
        waiting("No contradiction", "Boardroom, PR, docs, and UI tell the same story."),
        waiting("Common sense failure blocks", "If the claim sounds wrong, the row cannot be green."),
      ],
    },
    improvementLoop("CommonSensePass"),
  ],
  seopass: [
    {
      title: "Page basics",
      rows: [
        waiting("Title tag is useful", "The page title names the product or offer clearly."),
        waiting("Meta description helps", "The description explains the page in simple search-friendly language."),
        waiting("Canonical URL is set", "The canonical path is correct and stable."),
        waiting("Heading order is sensible", "The page uses a clear H1 and logical headings."),
        waiting("Important words appear", "Product and category terms appear naturally in the visible copy."),
      ],
    },
    {
      title: "Crawl and index clues",
      rows: [
        waiting("Route returns 200", "The public URL returns a successful response."),
        waiting("No accidental noindex", "The page is not blocked from indexing unless intended."),
        waiting("Internal links exist", "Relevant pages link to and from this page."),
        waiting("Images have text alternatives", "Important images have useful alt text or nearby labels."),
        waiting("Structured clues are stable", "Any structured data or metadata matches the page content."),
      ],
    },
    {
      title: "Search trust",
      rows: [
        waiting("Claims are not spammy", "The copy is useful, not keyword stuffing."),
        waiting("Brand path is obvious", "The page relationship to UnClick and AutoPilot is clear."),
        waiting("Duplicate pages are avoided", "Similar pages have distinct jobs or are consolidated."),
        waiting("Snippet reads well", "The likely search snippet sounds human and accurate."),
        waiting("SEO issue blocks publish", "A serious search-readability issue becomes FAIL or WARNING."),
      ],
    },
    improvementLoop("SEOPass"),
  ],
  geopass: [
    {
      title: "AI answer clarity",
      rows: [
        waiting("Product can be summarized", "An AI answer can explain what the product is in one sentence."),
        waiting("Audience is clear", "The answer knows who the page is for."),
        waiting("Use case is clear", "The answer can name when to use the product."),
        waiting("Relationship is clear", "The answer understands UnClick, AutoPilot, XPass, and the Pass family."),
        waiting("No conflicting definitions", "The page does not define the product two different ways."),
      ],
    },
    {
      title: "Evidence for answer engines",
      rows: [
        waiting("Facts are visible", "Important product facts appear in crawlable text."),
        waiting("Examples are concrete", "The page includes real examples or plain scenarios."),
        waiting("Internal links support context", "Related UnClick pages connect the concept graph."),
        waiting("Jargon is explained", "Special names are explained without assuming prior knowledge."),
        waiting("AI can cite safe proof", "The page points to public proof where appropriate."),
      ],
    },
    {
      title: "Answer quality",
      rows: [
        waiting("No hallucination bait", "The page does not encourage unsupported claims."),
        waiting("Comparison is honest", "Comparisons avoid vague best-in-class language."),
        waiting("Freshness is obvious", "Dates, current state, or report status are clear where needed."),
        waiting("Question coverage exists", "Likely user questions are answered directly."),
        waiting("GEO gap creates improvement", "Bad AI answers feed back into checklist updates."),
      ],
    },
    improvementLoop("GEOPass"),
  ],
  flowpass: [
    {
      title: "Journey start",
      rows: [
        waiting("Entry point is clear", "The user can see where to start the task."),
        waiting("Required context is visible", "The screen asks for or shows the information needed to continue."),
        waiting("Primary path is short", "The main journey avoids unnecessary detours."),
        waiting("Choice overload is controlled", "Options are grouped or reduced when the user needs a decision."),
        waiting("Unauthenticated path is handled", "Login or permission gates explain what to do next."),
      ],
    },
    {
      title: "Journey middle",
      rows: [
        waiting("Progress is understandable", "The user knows whether the task is waiting, running, or done."),
        waiting("Backtracking is safe", "Going back or changing input does not lose important work silently."),
        waiting("Validation is timely", "Errors appear near the field or step that caused them."),
        waiting("Handoffs are clear", "Moving between tools, reports, or agents keeps context."),
        waiting("Interruptions recover", "Refreshes, partial failures, and retries have a recovery path."),
      ],
    },
    {
      title: "Journey finish",
      rows: [
        waiting("Completion is obvious", "The final state says what was completed."),
        waiting("Receipt is available", "The user can open proof or a report after completion."),
        waiting("Next action is useful", "The screen suggests a real next step, not generic filler."),
        waiting("Loop continues when red", "Failed checks route back into work instead of stopping at red."),
        waiting("Flow failure blocks green", "A journey that cannot be finished is not a PASS."),
      ],
    },
    improvementLoop("FlowPass"),
  ],
  rotatepass: [
    {
      title: "Credential inventory",
      rows: [
        waiting("Credential is identified", "The key, token, or secret type is known without exposing the raw value."),
        waiting("Owner is known", "The account, service, or team responsible for the credential is clear."),
        waiting("Environment is known", "Production, preview, local, or CI scope is labeled."),
        waiting("Consumers are known", "Services that depend on the credential are listed or discoverable."),
        waiting("Old value is not printed", "Rotation work never logs the raw old secret."),
      ],
    },
    {
      title: "Rotation path",
      rows: [
        waiting("New secret created safely", "New values are generated or copied through approved secret handling."),
        waiting("Storage is updated", "The correct secret store receives the new value."),
        waiting("Dependent services redeploy", "Apps or jobs that need the new secret are restarted or redeployed."),
        waiting("Old secret revoked", "Old values are removed once the new path is proven."),
        waiting("Rollback plan exists", "If rotation fails, the operator knows the safe recovery step."),
      ],
    },
    {
      title: "Rotation proof",
      rows: [
        waiting("Smoke check proves new value", "A safe check proves the new secret works."),
        waiting("No secret in receipt", "The proof says what worked without revealing the secret."),
        waiting("Expiry is tracked", "Expiry, next rotation, or review timing is recorded when known."),
        waiting("Access is least needed", "The credential has no unnecessary scope where that can be checked."),
        na("Rotation required", "N/A only when the job does not touch credentials or secret lifecycle."),
      ],
    },
    improvementLoop("RotatePass"),
  ],
  wakepass: [
    {
      title: "Ownership",
      rows: [
        waiting("Owner is assigned", "A job has a real seat, agent, or human owner."),
        waiting("Owner is fresh", "The owner has checked in recently enough to be trusted."),
        waiting("Next action is named", "The owner has a concrete next step, not a vague status."),
        waiting("ETA is present", "The job has a next check-in or completion expectation."),
        waiting("Fallback is clear", "If the owner goes stale, the handoff path is known."),
      ],
    },
    {
      title: "Queue health",
      rows: [
        waiting("No stale in-progress work", "In-progress jobs are either active, reassigned, or blocked."),
        waiting("Open backlog is acknowledged", "The system does not claim healthy while work waits unowned."),
        waiting("QueuePush packets are ACKed", "Direct build packets receive done or blocker replies."),
        waiting("Blocked jobs say why", "A blocker names the missing input or external state."),
        waiting("Done jobs have proof", "Jobs are closed only after observable proof exists."),
      ],
    },
    {
      title: "Wake behavior",
      rows: [
        waiting("Wakes are useful", "Wakes ask for action or give proof, not noise."),
        waiting("No spam loops", "Stale wake loops do not flood the Boardroom."),
        waiting("Human touch is minimized", "Workers continue when they can without asking the user to babysit."),
        waiting("Signal reaches right lane", "Alerts go to the owner or routing lane that can act."),
        waiting("Wake failure blocks quiet", "If wake proof is missing, the system cannot call itself quiet."),
      ],
    },
    improvementLoop("WakePass"),
  ],
  compliancepass: [
    {
      title: "Readiness scope",
      rows: [
        waiting("Framework is named", "The relevant policy, readiness, or compliance framework is identified."),
        waiting("Scope is bounded", "The report says what product, system, or claim is being checked."),
        waiting("Evidence standard is clear", "The kind of proof needed for each row is named."),
        waiting("Certification is not implied", "Readiness checks do not pretend to be formal certification."),
        waiting("Out-of-scope items are explicit", "N/A rows explain why the check does not apply."),
      ],
    },
    {
      title: "Evidence readiness",
      rows: [
        waiting("Policy evidence exists", "Relevant policies, docs, or controls are linked."),
        waiting("Operational evidence exists", "Logs, receipts, screenshots, or runs prove behavior where needed."),
        waiting("Owner evidence exists", "A responsible person or lane is named for ongoing controls."),
        waiting("Date evidence exists", "Evidence has a useful date or freshness marker."),
        waiting("Gap evidence is honest", "Missing evidence is marked WARNING or FAIL, not hidden."),
      ],
    },
    {
      title: "Follow-through",
      rows: [
        waiting("Risk is ranked", "Gaps are ranked by severity or release impact."),
        waiting("Remediation is named", "Each gap has a clear fix or next action."),
        waiting("Exception is documented", "Accepted risk is recorded with reason and owner."),
        waiting("Recheck is scheduled", "Readiness work has a future review or trigger."),
        waiting("Readiness failure blocks claim", "Unproven readiness claims cannot ship as green."),
      ],
    },
    improvementLoop("CompliancePass"),
  ],
};

const deepRunLoop = (productName: string, focus: string): XPassChecklistGroup[] => [
  {
    title: "Build request mapping",
    rows: [
      waiting("User request is parsed", `${productName} knows what the user asked to build or change before scoring ${focus}.`),
      waiting("Affected surfaces are listed", `${productName} names the pages, APIs, jobs, copy, or files that are in scope.`),
      waiting("Acceptance criteria are written", `${productName} has plain pass/fail criteria instead of a vague green result.`),
      waiting("Non-goals are marked", `${productName} marks unrelated work as N/A with a short reason.`),
      waiting("Risky assumptions are called out", `${productName} turns uncertain assumptions into WARNING or ALERT rows.`),
      waiting("Input evidence is attached", `${productName} points to the request, source packet, diff, screenshot, or route being checked.`),
      waiting("Relevant Passes are selected", `${productName} says which other XPass products must also run for this build.`),
      waiting("Skipped Passes have N/A reasons", `${productName} cannot hide skipped XPass work behind a generic pass.`),
    ],
  },
  {
    title: "Evidence and replay",
    rows: [
      waiting("Automated proof exists", `${productName} records the command, tool, route, or receipt that proves the row.`),
      waiting("Manual proof is labeled", `${productName} labels any human or visual check so it is not mistaken for automation.`),
      waiting("Before state is known", `${productName} can explain what was wrong or unknown before the run.`),
      waiting("After state is known", `${productName} can explain what changed after the run.`),
      waiting("Edge case is checked", `${productName} checks at least one boundary case for ${focus}.`),
      waiting("Failure case is checked", `${productName} proves bad input or missing proof does not quietly become PASS.`),
      waiting("Receipt can be reopened", `${productName} leaves enough detail for another worker to verify the result later.`),
      waiting("Timestamp is present", `${productName} records when the evidence was produced or last refreshed.`),
    ],
  },
  {
    title: "Loop until green",
    rows: [
      waiting("FAIL creates a fix task", `${productName} turns each FAIL into a clear repair step.`),
      warning("WARNING has a decision", `${productName} keeps WARNING visible until it is accepted, fixed, or promoted to FAIL.`),
      warning("ALERT pauses release", `${productName} treats ALERT rows as stop signs until the owner clears them.`),
      waiting("N/A is justified", `${productName} only uses N/A when the row truly does not apply to this build.`),
      waiting("Fix is rechecked", `${productName} reruns the row after a fix instead of trusting the first attempt.`),
      waiting("Regression proof is kept", `${productName} saves proof that the same miss is less likely next time.`),
      waiting("Summary matches rows", `${productName} cannot say green while any relevant row is FAIL, ALERT, WARNING, or WAITING.`),
      waiting("Next run learns", `${productName} updates the checklist when this run exposes a missing check.`),
    ],
  },
];

const PRODUCT_DEEP_CHECKS: Record<XPassProductId, XPassChecklistGroup[]> = {
  testpass: [
    {
      title: "Deep TestPass checklist",
      rows: [
        waiting("Fresh checkout can run", "A clean checkout can reproduce the test path without hidden local state."),
        waiting("Changed package tests run", "Every package touched by the build has its own focused proof."),
        waiting("Root tests still run", "Shared app behavior is checked after package-level proof passes."),
        waiting("Mocked paths are named", "Mocked services are called out so nobody mistakes mocks for live proof."),
        waiting("Live smoke is separate", "Preview or production smoke proof is recorded separately from local tests."),
        waiting("Flaky test is not ignored", "Flakes create a warning or fix task instead of being waved through."),
        waiting("Failure output is useful", "A failed test points to the broken behavior, not only a generic crash."),
        waiting("Release gate is current", "The final green state is tied to the current commit or deployed build."),
      ],
    },
  ],
  uipass: [
    {
      title: "Deep UIPass checklist",
      rows: [
        waiting("Desktop screenshot reviewed", "Desktop layout is visually checked for fit, hierarchy, and scan speed."),
        waiting("Mobile screenshot reviewed", "Mobile layout is visually checked for fit, touch targets, and reading order."),
        waiting("Long text is tested", "Long labels, comments, and product names do not break the layout."),
        waiting("Empty data is tested", "The screen still makes sense when no report or result exists yet."),
        waiting("Dense data is tested", "Large lists stay readable with thin rows and steady spacing."),
        waiting("Component states are checked", "Selected, hover, focus, disabled, loading, and error states are visible."),
        waiting("Internal terms are hidden", "Worker-only terms stay out of the main human-facing view."),
        waiting("Visual change has proof", "Screenshots or browser checks are attached when the UI changes."),
      ],
    },
  ],
  uxpass: [
    {
      title: "Deep UXPass checklist",
      rows: [
        waiting("Primary path is obvious", "A new user can tell what to do first and why."),
        waiting("Journey can be completed", "The main task can be completed from start to finish."),
        waiting("Wrong turn can recover", "The user can recover from a mistake without support."),
        waiting("Form friction is low", "Forms ask only for what is needed and explain unclear fields."),
        waiting("Confirmation is useful", "Done states say what happened and what the user can do next."),
        waiting("Navigation matches intent", "Menus and links match the user's mental model for the task."),
        waiting("Confusing copy is fixed", "Labels and instructions remove uncertainty instead of adding it."),
        waiting("Journey proof exists", "A flow check, screen recording, or task walkthrough proves the user path."),
      ],
    },
  ],
  securitypass: [
    {
      title: "Deep SecurityPass checklist",
      rows: [
        waiting("Session boundary is tested", "Protected routes reject unauthenticated or wrong-tenant access."),
        waiting("Admin boundary is tested", "Admin-only behavior cannot be reached by normal users."),
        waiting("Secret display is controlled", "Raw keys appear only at creation time or from a safe local cache."),
        waiting("Secret copy is safe", "Copy buttons do not log, persist, or echo secret values."),
        waiting("Webhook input is verified", "External callbacks are authenticated before side effects run."),
        waiting("Database writes are scoped", "Write paths include tenant, owner, or permission checks."),
        waiting("Dangerous commands are blocked", "Tools cannot run deletes, resets, or rotations without the right gate."),
        waiting("Security receipt is redacted", "The report proves the check without exposing sensitive evidence."),
      ],
    },
  ],
  copypass: [
    {
      title: "Deep CopyPass checklist",
      rows: [
        waiting("Main promise is specific", "The main promise names the useful outcome without hype."),
        waiting("Subcopy removes doubt", "Supporting copy answers the user's next obvious question."),
        waiting("CTA matches destination", "Button copy matches the screen, action, or tool it opens."),
        waiting("Error wording is fixable", "The user can tell what to do after an error."),
        waiting("Empty wording is useful", "Empty states explain what is missing and how to continue."),
        waiting("No filler adjectives", "Words like powerful, seamless, and intelligent are justified or removed."),
        waiting("No fake urgency", "The copy does not pressure the user with unsupported urgency."),
        waiting("Tone matches UnClick", "The copy sounds plain, capable, and human across related screens."),
      ],
    },
  ],
  fidelitypass: [
    {
      title: "Deep FidelityPass checklist",
      rows: [
        waiting("Source packet hash is known", "The exact source can be identified again later."),
        waiting("Destination packet is known", "The target location is clear enough to verify."),
        waiting("Exact-copy rows are exact", "Exact text preserves punctuation, casing, order, and numbers."),
        waiting("Allowed edits are listed", "Approved changes are named instead of hidden in the output."),
        waiting("Normalization is declared", "Whitespace or markdown normalization rules are explicit."),
        waiting("Missing source blocks pass", "No source packet means FAIL or N/A, never guessed PASS."),
        waiting("Diff is human-readable", "A reviewer can see every meaningful change."),
        waiting("CopyRoom receipt exists", "The final proof links source, destination, and verdict."),
      ],
    },
  ],
  legalpass: [
    {
      title: "Deep LegalPass checklist",
      rows: [
        waiting("Legal-risk words are found", "Terms like guarantee, certified, compliant, secure, or unlimited are checked."),
        waiting("Policy claim has source", "Privacy, terms, billing, and retention claims point to a real source."),
        waiting("Jurisdiction is explicit", "Location-specific claims name the jurisdiction or are marked unsupported."),
        waiting("Disclaimer is near claim", "Risk wording appears close to the claim it qualifies."),
        waiting("User consent is visible", "Consent, opt-in, opt-out, and notification points are checked."),
        waiting("High-risk claim is escalated", "Legal-sensitive rows name the human or lane for review."),
        warning("No certification implied", "LegalPass can flag readiness, but it does not certify legal compliance."),
        waiting("Change history is kept", "Sensitive wording changes keep date, reason, and evidence."),
      ],
    },
  ],
  sloppass: [
    {
      title: "Deep SlopPass checklist",
      rows: [
        waiting("AI filler is removed", "Generic assistant wording is replaced with specific useful text."),
        waiting("Dead code is spotted", "Unused exports, branches, comments, and assets are flagged."),
        waiting("Duplicate logic is spotted", "Repeated logic is consolidated or justified."),
        waiting("Naming is plain", "Names explain what the code or product does."),
        waiting("Magic behavior is explained", "Non-obvious decisions have proof or a short comment."),
        waiting("Diff is focused", "The change does not include unrelated churn."),
        waiting("Generated noise is separated", "Generated files are updated only when needed and named as such."),
        waiting("Slop creates cleanup task", "Mess that cannot be fixed now becomes a tracked task."),
      ],
    },
  ],
  commonsensepass: [
    {
      title: "Deep CommonSensePass checklist",
      rows: [
        waiting("Claim matches reality", "The report does not say complete, live, or green without observable proof."),
        waiting("User expectation is honored", "The solution matches what the user meant, not just the literal words."),
        waiting("Over-complexity is reduced", "A simpler answer is preferred when it solves the same problem."),
        waiting("Obvious missing step is caught", "The checklist asks what a normal person would expect next."),
        waiting("Bad analogy is not overused", "Analogies help the concept but do not become the product."),
        waiting("Plain-language proof exists", "A non-technical reader can understand the result."),
        waiting("Contradiction is blocked", "The UI, docs, PR, and Boardroom cannot disagree silently."),
        waiting("Common-sense fail blocks green", "If the result feels obviously wrong, it cannot be marked PASS."),
      ],
    },
  ],
  seopass: [
    {
      title: "Deep SEOPass checklist",
      rows: [
        waiting("One clear H1 exists", "The page has one meaningful main heading."),
        waiting("Title is not generic", "The browser title names the product, offer, or page purpose."),
        waiting("Description is useful", "The meta description reads like a helpful search snippet."),
        waiting("Internal anchor exists", "Relevant pages link to the page with meaningful text."),
        waiting("Image text is useful", "Important visual content has alt text or nearby plain text."),
        waiting("Duplicate intent is avoided", "Nearby pages do not compete for the same search intent."),
        waiting("Indexing state is intentional", "Noindex, robots, canonical, and status code are checked."),
        waiting("Search claim is backed", "Search-facing claims match actual product capability."),
      ],
    },
  ],
  geopass: [
    {
      title: "Deep GEOPass checklist",
      rows: [
        waiting("AI summary is obvious", "A model can summarize the page accurately in one sentence."),
        waiting("Entity relationship is clear", "UnClick, AutoPilot, XPass, and product names connect cleanly."),
        waiting("Use cases are explicit", "The page states when the product should be used."),
        waiting("Audience is explicit", "The page names who the product is for."),
        waiting("Examples reduce guessing", "Concrete examples stop answer engines inventing details."),
        waiting("Definitions are stable", "The same product is not defined two different ways."),
        waiting("Public proof is available", "Answer engines can cite safe public evidence where appropriate."),
        waiting("AI answer drift feeds back", "Bad generated answers become new checklist rows."),
      ],
    },
  ],
  flowpass: [
    {
      title: "Deep FlowPass checklist",
      rows: [
        waiting("First step is visible", "The user can tell where to begin the journey."),
        waiting("Current step is visible", "The user can tell what is happening now."),
        waiting("Next step is visible", "The user can tell what happens after this screen."),
        waiting("Back path is safe", "Going back does not silently lose important work."),
        waiting("Retry path is safe", "Recoverable failures offer a clear retry or fix path."),
        waiting("Blocked state is honest", "Blocked journeys say what is missing."),
        waiting("Completion state is useful", "Done states say what was completed and where proof lives."),
        waiting("Loop path is real", "Failed checks route back into work until they are green or N/A."),
      ],
    },
  ],
  rotatepass: [
    {
      title: "Deep RotatePass checklist",
      rows: [
        waiting("Secret owner is known", "The service or team responsible for the credential is named."),
        waiting("Secret consumers are listed", "Apps, jobs, and integrations that use the secret are identified."),
        waiting("New value is stored safely", "The new secret goes only into the approved secret store."),
        waiting("No raw value in output", "Logs, receipts, and comments never print the secret."),
        waiting("Dependent deploy is checked", "Services that need the new secret are redeployed or refreshed."),
        waiting("Old value is revoked", "The old credential is removed after safe proof."),
        waiting("Rollback is known", "The operator knows how to recover if rotation fails."),
        waiting("Next rotation is tracked", "Expiry or review timing is recorded when known."),
      ],
    },
  ],
  wakepass: [
    {
      title: "Deep WakePass checklist",
      rows: [
        waiting("Owner check-in is fresh", "The active owner has checked in within the expected window."),
        waiting("Work is not orphaned", "Open jobs have an owner, blocker, or routing decision."),
        waiting("Stale work escalates", "Stale in-progress work creates a useful signal."),
        waiting("Handoff is acknowledged", "Direct handoffs receive an ACK, next action, and ETA."),
        waiting("Proof closes the loop", "Done jobs include proof, not just a done word."),
        waiting("Noise wake is avoided", "Repeated wake messages do not spam the room without progress."),
        waiting("Human touch is minimized", "Workers proceed without asking the user when proof is discoverable."),
        waiting("Queue health is honest", "The system cannot call itself quiet while actionable work is queued."),
      ],
    },
  ],
  compliancepass: [
    {
      title: "Deep CompliancePass checklist",
      rows: [
        waiting("Control owner is named", "Each readiness row has an owner or responsible lane."),
        waiting("Evidence type is named", "The row says whether it needs policy, log, screenshot, receipt, or review evidence."),
        waiting("Evidence date is visible", "Proof has a date or freshness marker."),
        waiting("Gap severity is ranked", "Missing readiness is ranked by release or business risk."),
        waiting("Exception is documented", "Accepted risk has an owner, reason, and review timing."),
        waiting("Framework language is accurate", "Framework names and claims are not invented or overstated."),
        warning("Formal certification is not implied", "CompliancePass checks readiness; it does not replace an auditor."),
        waiting("Recheck trigger exists", "A future trigger or schedule keeps readiness from going stale."),
      ],
    },
  ],
};

const PRODUCT_NAMES: Record<XPassProductId, string> = {
  testpass: "TestPass",
  uipass: "UIPass",
  uxpass: "UXPass",
  securitypass: "SecurityPass",
  copypass: "CopyPass",
  fidelitypass: "FidelityPass",
  legalpass: "LegalPass",
  sloppass: "SlopPass",
  commonsensepass: "CommonSensePass",
  seopass: "SEOPass",
  geopass: "GEOPass",
  flowpass: "FlowPass",
  rotatepass: "RotatePass",
  wakepass: "WakePass",
  compliancepass: "CompliancePass",
};

export const XPASS_PRODUCT_CHECKLISTS: Record<XPassProductId, XPassChecklistGroup[]> = (
  Object.keys(BASE_XPASS_PRODUCT_CHECKLISTS) as XPassProductId[]
).reduce(
  (catalog, productId) => {
    catalog[productId] = [
      ...BASE_XPASS_PRODUCT_CHECKLISTS[productId],
      ...PRODUCT_DEEP_CHECKS[productId],
      ...deepRunLoop(PRODUCT_NAMES[productId], productId),
    ];
    return catalog;
  },
  {} as Record<XPassProductId, XPassChecklistGroup[]>,
);

export function countChecklistRows(productId: XPassProductId): number {
  return XPASS_PRODUCT_CHECKLISTS[productId].reduce((total, group) => total + group.rows.length, 0);
}

export function countChecklistGroups(productId: XPassProductId): number {
  return XPASS_PRODUCT_CHECKLISTS[productId].length;
}

export function countFamilyChecklistRows(): number {
  return (Object.keys(XPASS_PRODUCT_CHECKLISTS) as XPassProductId[]).reduce(
    (total, productId) => total + countChecklistRows(productId),
    0,
  );
}
