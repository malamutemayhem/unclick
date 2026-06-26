# UnClick File Workspace + Push-by-Reference - PRD

Status: **Proposed.** Increment 0 (retention policy) adopted as a standing rule; design below. Not built yet.

## Problem

UnClick's promise is "one MCP connection, no manual git, any size." Today it breaks on large changes. The Supabase write connector (a normal-size feature) could not be shipped through UnClick's own `push_files`, because the changeset edits `tool-wiring.ts` (~600 KB). `push_files` carries each file's full content **inline as a tool argument**, so the model has to emit the entire file in one response, which exceeds the per-response output ceiling. The result: big changes fall back to manual git in a git-write-enabled session, which is exactly the friction the product is meant to remove.

## Root cause

The bottleneck is the **model-to-tool boundary**, not UnClick's storage or GitHub. As long as file bytes pass through the model's context, there is a hard size cap. UnClick's backend also cannot see the caller's local checkout (it runs remotely), so today the only way it learns a file's contents is the model pasting them inline.

## Goal

UnClick can push a change of **any size** to a customer's connected GitHub, with the file bytes **never passing through the model's context**, scoped per user via the keychain, and with loss-prevention retention built in.

## Architecture

`Claude (or any MCP client) -> UnClick (server-side file workspace) -> push-by-reference git action -> customer's GitHub`

### 1. Server-side file workspace (per user)

- A staging area in UnClick's backend, keyed by the caller's lane hash (the same tenancy model memory uses). Room for GBs.
- Files land in it WITHOUT routing full bytes through the model:
  - a chunked/streamed write API (append chunks across calls), or
  - pull from a file source the user already connected (Drive, Dropbox, OneDrive), or
  - generated server-side.
- Files are addressed by path/id, not by content.

### 2. Push-by-reference git action

- A new github action (e.g. `github_action push_workspace`) that commits files **already in the workspace** to a branch and opens a PR.
- The tool call carries only references (file paths + target branch + commit message), never content. No size limit.
- Reuses the existing keychain GitHub credential.

### 3. Retention / loss-prevention (do not lose work)

A hard rule, because work has been lost to over-eager deletion before:

- Branches and PRs are **never** deleted immediately. Merged branches are kept at least **30 days** (acceptable window 10-30) before any cleanup.
- Before any destructive git op (force-push, rebase, branch delete), a **timestamped backup branch/tag is created seconds beforehand**, so the prior state is always recoverable.
- Workspace files get a 10-30 day lifecycle; overwriting a file snapshots the old version first; nothing is hard-deleted inside the window.
- GitHub's "Automatically delete head branches" repo setting stays **OFF**.

## End-customer experience (the promise, unchanged)

One MCP (UnClick). The customer's AI says "push my changes"; UnClick stages and pushes them at any size; the backup/retention is automatic. No git, no desktop app, no size ceiling, on any AI client.

## Increments

0. **(now)** Adopt the retention policy as a standing rule, disable auto-delete-branch, and persist this PRD.
1. **Push-by-reference over the existing blob store.** Smallest viable version: stage a handful of files server-side and push them by reference. Proves the bytes-never-touch-the-model path end to end.
2. **Real workspace.** Chunked upload + connector-source ingest + GB storage + file listing.
3. **Retention automation.** Backup-before-destructive, a 30-day prune workflow, and the workspace lifecycle.

## Loss-prevention note

This PRD is pushed to GitHub immediately (it is small enough for the inline path), so the design persists even if this session ends.
