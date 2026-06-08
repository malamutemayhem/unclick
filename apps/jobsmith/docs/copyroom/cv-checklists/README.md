# JobSmith CV Checklist CopyRoom Receipt

This folder is the exact source handoff for UnClick todo `848eb8db-dfbb-4411-a332-05096b5bf1fb`.

CopyRoom rule: workers must copy these files from source and cite this receipt before deriving JobSmith rule text. Do not retype these checklists.

## Copied Sources

| File | Original source | SHA256 | Bytes | Lines |
|---|---|---:|---:|---:|
| `cv-checklists_1.md` | `docs/copyroom/cv-checklists/cv-checklists_1.md` | `791fb7e4b63e2133b1c15a96e85ccdb79581b1ca583310ddb150b05920605859` | 27177 | 329 |
| `cv-checklists_1a.md` | `docs/copyroom/cv-checklists/cv-checklists_1a.md` | `5a8f0593e8052f075ae7280c566bab5eef3a7415d72504caa8c6bd1e2257bf9a` | 42467 | 951 |
| `cv-checklists_1b.md` | `docs/copyroom/cv-checklists/cv-checklists_1b.md` | `2616ec5a4858f63b35ce8b0b0cab1ad86b72e4e88e51430bb046a245ebb8b22f` | 43176 | 916 |
| `cv-checklists_2.md` | `docs/copyroom/cv-checklists/cv-checklists_2.md` | `941f71191bf2fb86028ed9291796ce24aedb36bd027d2ee845e6afc424baff50` | 24906 | 313 |
| `cv-checklists_3.md` | `docs/copyroom/cv-checklists/cv-checklists_3.md` | `efdeb0866eb95d8351ca241800dd7ce50fda0e310c38b1812e9ec77798171b4e` | 24498 | 266 |

## Receipts

- User source-file handoff saved to Orchestrator receipt `f1df980a-7c3a-437c-8a9c-5d4eef84720f`.
- Boardroom target job: `848eb8db-dfbb-4411-a332-05096b5bf1fb`.
- Codex source-manifest claim: `91906cb9-435b-4ae4-aa99-f4de3aa35fbe`.
- FYI rule-pack handoff: `0bad9e59-03cf-44e9-83e2-33f4473a9209`.
- Expanded Cowork rule-pack feed: `4438301e-bdd7-4573-98f6-289ffe40941b`.
- Operator-specified ScopePack fields: `b1b49c8f-c3af-44bb-a2d4-363148b4d763`.

## Build Use

The matching machine manifest lives at `apps/jobsmith/src/lib/cvChecklistSources.ts`.

Before a builder claims that all rules are encoded, they must reconcile the first handoff's count mismatch: it says 40 rules, but the listed severities are `12 ERROR + 19 WARN + 8 INFO = 39`.
