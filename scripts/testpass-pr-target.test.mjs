import test from "node:test";
import assert from "node:assert/strict";
import {
  extractVercelPreviewUrls,
  resolveTestPassPrTarget,
  selectLatestStatusContext,
  selectLatestVercelPreviewUrl,
  toMcpServerUrl,
} from "./testpass-pr-target.mjs";

test("extracts Vercel preview links without taking the feedback comment link", () => {
  const body = [
    "| Project | Deployment | Actions |",
    "| :--- | :--- | :--- |",
    "| unclick | Building | [Preview](https://unclick-git-abc-team.vercel.app), [Comment](https://vercel.live/open-feedback/unclick-git-abc-team.vercel.app?via=pr-comment-feedback-link) |",
  ].join("\n");

  assert.deepEqual(extractVercelPreviewUrls(body), [
    "https://unclick-git-abc-team.vercel.app",
  ]);
});

test("selects the newest Vercel bot preview comment", () => {
  const comments = [
    {
      id: 1,
      user: { login: "vercel[bot]" },
      created_at: "2026-05-27T10:00:00Z",
      body: "[Preview](https://old-preview.vercel.app)",
    },
    {
      id: 2,
      user: { login: "github-actions[bot]" },
      created_at: "2026-05-28T10:05:00Z",
      body: "[Preview](https://not-vercel-bot.vercel.app)",
    },
    {
      id: 3,
      user: { login: "vercel" },
      created_at: "2026-05-28T10:10:00Z",
      body: "[Preview](https://new-preview.vercel.app)",
    },
  ];

  assert.equal(selectLatestVercelPreviewUrl(comments), "https://new-preview.vercel.app");
});

test("normalizes a Vercel preview URL to the MCP endpoint", () => {
  assert.equal(
    toMcpServerUrl("https://unclick-git-abc-team.vercel.app/dashboard?x=1"),
    "https://unclick-git-abc-team.vercel.app/api/mcp",
  );
});

test("prefers explicit workflow input, then preview, then production default", () => {
  assert.deepEqual(
    resolveTestPassPrTarget({
      requestedServerUrl: "https://custom.example/api/mcp",
      comments: [{ user: { login: "vercel[bot]" }, body: "[Preview](https://preview.vercel.app)" }],
    }),
    { serverUrl: "https://custom.example/api/mcp", source: "workflow_input" },
  );

  assert.deepEqual(
    resolveTestPassPrTarget({
      comments: [{ user: { login: "vercel[bot]" }, body: "[Preview](https://preview.vercel.app)" }],
    }),
    { serverUrl: "https://preview.vercel.app/api/mcp", source: "vercel_preview_comment" },
  );

  assert.deepEqual(resolveTestPassPrTarget(), {
    serverUrl: "https://unclick.world/api/mcp",
    source: "default",
  });
});
test("selects the newest named commit status", () => {
  const statuses = [
    { context: "Vercel", state: "pending", updated_at: "2026-05-28T10:00:00Z" },
    { context: "Other", state: "success", updated_at: "2026-05-28T10:30:00Z" },
    { context: "Vercel", state: "success", updated_at: "2026-05-28T10:20:00Z" },
  ];

  assert.deepEqual(selectLatestStatusContext(statuses, "Vercel"), statuses[2]);
  assert.equal(selectLatestStatusContext(statuses, "Missing"), null);
});
