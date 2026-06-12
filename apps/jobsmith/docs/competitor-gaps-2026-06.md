# Jobsmith Competitor Gaps, June 2026 Refresh

Updated: 2026-06-12. This refreshes the May 2026 research packet view of the market with current public sources. It exists so the rule pack and product wedge stay anchored to live competitor behaviour rather than a snapshot.

## Market state, June 2026

The category is still bifurcated the same way the original research found, but three things moved:

1. **Skills-based screening is now the default at the enterprise.** More than 60% of US enterprise hiring teams filter by specific required skills before titles, and on Greenhouse and Workday the Skills section is the first section the parser maps to scorecard criteria. Workday's scorer still weights title-to-title seniority match heavily, so a mismatched previous title drops rank even when skills match.
2. **AI-resume rejection hardened from sentiment into policy.** Roughly 49% of US hiring managers say they automatically dismiss resumes they identify as AI-generated, 62% reject applications that lack a personal touch, and about a third still claim they can spot AI writing inside 20 seconds. Detection remains human pattern-matching on generic, over-polished, low-evidence writing, not detector software.
3. **Auto-apply callback economics got worse, not better.** Published tests across hundreds of real applications put LazyApply-style volume tools at 0.5% to 6% callback, with most tested auto-apply extensions below 5%. Tailored low-volume applications and human-assisted services report 25%+ callbacks. Semantic-match filters at nearly all Fortune 500 ATS deployments now catch generic resumes in the first pass.

## Competitor snapshot

| Tool | Position, June 2026 | Persistent gap Jobsmith exploits |
|---|---|---|
| Rezi | Strongest ATS-compliance scoring (23-point rubric), $149 lifetime tier | Score-chasing, no claim provenance, no voice preservation |
| Teal | "Career command center", free tier + ~$79/yr, clean single-column templates | Tracker-first; AI bullet suggestions invent unverifiable phrasing |
| Jobscan | Keyword scanner at $49.95/mo, 1 free scan/mo | Not a builder; match score framed as target, not risk awareness |
| Kickresume | Cheapest full builder (~$4.50/mo yearly), 50+ templates | Defaults to two-column designs that hurt parse rates |
| Enhancv | Design-first templates | Same parse-risk problem; visual polish over parser truth |
| LazyApply / volume auto-apply | Up to 150 applications/day | 0.5% to 6% callback; LinkedIn warnings; goodwill burn |
| Jobright | AI agent matching + one-click apply | Tailoring without fact grounding; claims not interview-defensible |
| Simplify | Honest autofill assistant, functional free tier | Speeds up form entry only; no quality, truth, or risk layer |

## The wedge, restated against June 2026 data

No mainstream tool combines all four of Jobsmith's promises:

1. Every generated claim traces to an applicant source fact (`source_cv_facts`, claim ledger).
2. Every draft is interview-defensible, which is the exact failure mode the 49% auto-dismiss statistic punishes.
3. Privacy first: redaction before any external check, no training on user data without opt-in. Mainstream builders still publish no clear retention windows or training opt-outs.
4. Outcome learning: every sent application feeds the rule library, the inverse of volume tools that optimise application count.

The June 2026 numbers strengthen the wedge: when recruiters auto-dismiss generic AI writing and semantic filters discard untailored volume, truthful tailoring plus voice preservation is the only strategy whose value rises as adoption of competitor tools grows.

## Rule-pack implications from this refresh

- Skills-first parsing raises the weight of `JS-ATS-21` (keywords paired with proof) and `JS-ATS-10` (canonical skill names). Both stay correct; no spec change needed.
- Workday title-weighting confirms `JS-ATS-24` (do not change titles to match the ad) as both an ethics and a ranking rule.
- The auto-dismiss statistic supports keeping all AIDETECT vocabulary and shape rules at their current severities.
- No evidence emerged that any major ATS added candidate-side AI-text detection; the detector layer remains false-positive awareness only.

## Sources

- [Rezi: best AI resume builders 2026](https://www.rezi.ai/posts/best-ai-resume-builders)
- [ATS Verification: AI resume builders tested 2026](https://atsverification.com/blog/ai-resume-builders-tested-2026/)
- [ResuFit: pricing and ATS comparison 2026](https://resufit.com/blog/best-ai-resume-builders-2026-pricing-features-ats-comparison/)
- [Teal: best AI resume builders](https://www.tealhq.com/post/best-ai-resume-builders)
- [JobCannon: AI resume statistics 2026](https://jobcannon.io/blog/ai-resume-statistics-2026)
- [HRLens: can recruiters detect ChatGPT resumes](https://www.hrlens.io/articles/can-recruiters-detect-chatgpt-written-resumes)
- [Scale.jobs: auto-apply tool comparisons](https://scale.jobs/blog/scale-jobs-vs-lazyapply-vs-jobright-get-callbacks-faster)
- [FastApply: auto-apply tools compared 2026](https://blog.fastapply.co/auto-apply-jobs-tools-compared-2026)
- [Jobscan: are auto-apply tools worth it](https://www.jobscan.co/blog/auto-apply-job-tools/)
- [Resume Optimizer Pro: Greenhouse ATS guide 2026](https://resumeoptimizerpro.com/blog/greenhouse-ats-resume-guide)
- [Hireflow: Workday vs Greenhouse vs Lever parsing](https://www.hireflow.net/blog/workday-vs-greenhouse-vs-lever-which-parses-best)
- [Greenhouse: AI features documentation](https://support.greenhouse.io/hc/en-us/articles/33043749845403-Greenhouse-AI-features)
