/**
 * Brochure content for the product pages linked from the public header.
 *
 * These are marketing pages (the "brochure"), shown the same signed in or out.
 * They explain each product in plain English; the interactive surfaces live in
 * the signed-in dashboard at /admin/*. Keep copy short and current, lean on
 * icon-driven visuals, and avoid internal-only names. No em dashes.
 */
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { GradientText } from "@/components/brand";
import OrchestratorStory from "@/components/OrchestratorStory";
import ExpandableImage from "@/components/ExpandableImage";
import JobsBoardSample from "@/components/JobsBoardSample";
import XGateGates from "@/components/XGateGates";
import {
  Sparkles, Zap, Plug, RefreshCw,
  Clock, Compass, Link2, MonitorSmartphone,
  KeyRound, Puzzle, ShieldCheck, Lock,
  Users, HeartPulse, Brain, UserCog,
  Search, ShieldHalf,
  MessageSquare, Bot, Network, LayoutGrid, Code2, BadgeCheck, ClipboardList, GitMerge, Rocket, RotateCcw,
  Terminal, CreditCard, Ban,
  ListTodo, Bell, ReceiptText, Gauge,
  TowerControl, TriangleAlert, Wind,
  ScrollText, Download,
  Hammer, FlaskConical, Eye,
} from "lucide-react";

export type BrochureSlug =
  | "skills" | "orchestrator" | "passport" | "seats" | "autopilot"
  | "xgate" | "jobs" | "control-tower" | "ledger" | "workers";

type Cta = { label: string; href: string };
type Feature = { icon: LucideIcon; title: string; desc: string };

export type BrochureContent = {
  path: string;
  eyebrow: string;
  title: ReactNode;
  lede: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  showcase?: ReactNode;
  featuresTitle?: string;
  featuresSubtitle?: string;
  features?: Feature[];
  /** Feature grid columns. 2 = fewer, larger tiles; default 3. */
  featuresCols?: 2 | 3;
  steps?: { icon: LucideIcon; title: string; desc: string }[];
  tail?: ReactNode;
  /** Heading above the tail section. Defaults to the Jobs-board wording. */
  tailTitle?: string;
  meta: { title: string; description: string };
};

const GET_STARTED: Cta = { label: "Get started free", href: "/#install" };

export const BROCHURE: Record<BrochureSlug, BrochureContent> = {
  skills: {
    path: "/skills",
    eyebrow: "Skills",
    title: <>Skills your agent <span className="whitespace-nowrap">can <GradientText>run</GradientText>.</span></>,
    lede: "Ready-made recipes that hand your AI a new skill in seconds. Just ask, and it runs the right one, start to finish.",
    primaryCta: GET_STARTED,
    secondaryCta: { label: "Browse apps", href: "/apps" },
    showcase: (
      <ExpandableImage
        src="/skills_web.jpg"
        alt="A robot instantly learning skills like combat, programming, stealth, and analysis, saying 'I know kung fu'."
      />
    ),
    featuresTitle: "Capability, on tap.",
    features: [
      { icon: Sparkles, title: "Curated and trending", desc: "A growing library of the skills people actually use, shaped by real work." },
      { icon: Zap, title: "One-line trigger", desc: "No setup. Ask in plain English and your agent picks the right skill for the job." },
      { icon: Hammer, title: "Runs the whole task", desc: "A skill does the job from start to finish, not just one small step along the way." },
      { icon: ShieldCheck, title: "Reviewed, not wild west", desc: "Every skill is checked before it lands, so there are no hidden instructions or prompt-injection tricks." },
      { icon: Plug, title: "Works everywhere", desc: "Any MCP client: Claude, ChatGPT, Cursor, and more, all share the same skills." },
      { icon: RefreshCw, title: "Kept fresh", desc: "New skills are added often and updated as the tools behind them change." },
    ],
    meta: { title: "Skills - UnClick", description: "Ready-made, reviewed skills that teach your AI to do real tasks end to end. Just ask." },
  },
  orchestrator: {
    path: "/orchestrator",
    eyebrow: "Orchestrator",
    title: <>The running <GradientText>story</GradientText> of your work.</>,
    lede: "Every job, receipt, and decision, written as one plain-English story you can follow. The same running story shows on each device and seat you connect.",
    primaryCta: GET_STARTED,
    showcase: <OrchestratorStory />,
    featuresTitle: "One story, everywhere you work.",
    features: [
      { icon: Clock, title: "Story and timeline", desc: "A continuous, plain-English read, with the raw timeline underneath." },
      { icon: MonitorSmartphone, title: "Every connected device", desc: "The same running story on each PC and seat you connect." },
      { icon: Users, title: "Built for teams", desc: "Share an account and everyone follows the same story." },
      { icon: Link2, title: "Any seat or account", desc: "Connect a seat or AI account and its work joins the story." },
    ],
    meta: { title: "Orchestrator - UnClick", description: "The running, plain-English story of your work across your connected devices, seats, and team." },
  },
  passport: {
    path: "/passport",
    eyebrow: "Passport",
    title: <>Sign in <GradientText>once</GradientText>. Your AI does the rest.</>,
    lede: "Passport holds your logins and keys safely, so your agent can use your apps without you pasting credentials every time.",
    primaryCta: GET_STARTED,
    featuresTitle: "Access, handled safely.",
    features: [
      { icon: KeyRound, title: "OAuth and API keys", desc: "Connect an app once and your agent can use it." },
      { icon: Puzzle, title: "Browser bridge", desc: "A secure extension signs in where keys are not enough." },
      { icon: ShieldCheck, title: "You stay in control", desc: "See every connection. Revoke any of them anytime." },
      { icon: Lock, title: "Encrypted by default", desc: "Credentials are stored safely and kept out of chat." },
    ],
    meta: { title: "Passport - UnClick", description: "Sign in once. Passport lets your AI use your apps without sharing credentials in chat." },
  },
  seats: {
    path: "/seats",
    eyebrow: "Seats",
    title: (
      <>
        <span className="block">Give your AI a</span>
        <span className="block"><GradientText>seat</GradientText> at the table.</span>
      </>
    ),
    lede: "A seat is an AI worker on your account. Use one on your own, or sit a whole team around the table. Every seat has a clear job, wakes up on its own schedule, and shares the same memory, so nothing gets lost between them.",
    primaryCta: GET_STARTED,
    showcase: (
      <ExpandableImage
        src="/seats_web.jpg"
        alt="AI seats around a round table - ChatGPT, Claude, Ollama, CoPilot, Cursor, and Windsurf - all wired to one shared UnClick account in the middle."
      />
    ),
    featuresTitle: "Built for one, or a whole team.",
    featuresSubtitle: "Run UnClick on your own, or share one account so people and AI seats all pull in the same direction.",
    featuresCols: 2,
    features: [
      { icon: Users, title: "Solo or a whole team", desc: "Run a single seat by yourself, or share one account so a team can build together. The setup is the same whether it is just you or a whole room of people." },
      { icon: UserCog, title: "Every seat has a role", desc: "Give each seat a clear job, like research, building, or review, so the right seat picks up the right work. You decide what each one can and cannot do." },
      { icon: HeartPulse, title: "Tethered to a heartbeat", desc: "Seats wake up on a schedule you set and check in on their own, so work keeps moving forward even while you are asleep or away from the desk." },
      { icon: Brain, title: "One shared memory", desc: "ChatGPT, Claude, Cursor, and the rest all read and write the same memory you own, so the context follows you across every tool, seat, and device." },
    ],
    meta: { title: "Seats - UnClick", description: "Run UnClick solo or as a team. AI seats each have a role, a heartbeat schedule, and one shared memory across every tool." },
  },
  autopilot: {
    path: "/autopilot",
    eyebrow: "Autopilot",
    title: <>Work that <GradientText>runs itself</GradientText>, with proof.</>,
    lede: "Autopilot plans, builds, checks, and ships work for you, with visible approvals and a clear stop button at every step.",
    primaryCta: GET_STARTED,
    secondaryCta: { label: "See the proof", href: "/xpass" },
    showcase: (
      <ExpandableImage
        src="/Unclick_Autopilot_Web.jpg"
        alt="The Autopilot line, step by step: intake, orchestrator, research, plan, jobs, build, test, review, safety, audit, workers, merge, publish, repair."
      />
    ),
    featuresTitle: "From idea to shipped, step by step.",
    featuresSubtitle: "Two checkpoints wrap the work: XGate stops risky things from starting (before), and XPass proves the finished work is good (after).",
    steps: [
      { icon: MessageSquare, title: "Intake", desc: "You ask for something in plain language. Autopilot takes it in, asks anything it needs, and pins down the details before any work starts." },
      { icon: Bot, title: "Orchestrator", desc: "It logs the job into the running story, so you and every connected seat can follow what is happening and what is next." },
      { icon: Search, title: "Research", desc: "It looks up whatever it needs to know first, so the plan is built on facts instead of guesses." },
      { icon: Network, title: "Plan", desc: "It maps the steps and breaks the work down before touching anything, so there are no surprises later." },
      { icon: LayoutGrid, title: "Jobs", desc: "The plan becomes small, clear tasks on the board, each with an owner and a finish line." },
      { icon: Code2, title: "Build", desc: "It does the actual work, one task at a time, and shows progress as it goes." },
      { icon: FlaskConical, title: "Test", desc: "Where XPass begins: it runs the work and proves it truly works. TestPass lives here." },
      { icon: BadgeCheck, title: "Review", desc: "The rest of XPass: a second pass checks quality, UX, security, copy, legal, and search, catching mistakes before they ship." },
      { icon: ShieldCheck, title: "Safety", desc: "This is XGate, the safety gate before anything risky runs. It checks dangerous moves like leaking a secret, wiping data, or a surprise deploy against your rules and blocks them, with a master kill switch you can hit anytime." },
      { icon: ClipboardList, title: "Audit", desc: "Every step is recorded as proof, so you can go back and see what happened and why." },
      { icon: Users, title: "Workers", desc: "Role-based helpers each take the part they do best, from building to checking to shipping." },
      { icon: GitMerge, title: "Merge", desc: "Once XPass proves the work and XGate clears it, approved changes are combined into the real thing." },
      { icon: Rocket, title: "Publish", desc: "It ships the finished work and goes live, again only after the gate gives the all-clear." },
      { icon: RotateCcw, title: "Repair", desc: "If something breaks later, it loops back, fixes it, and runs the checks again." },
    ],
    tail: <JobsBoardSample />,
    meta: { title: "Autopilot - UnClick", description: "Autopilot plans, builds, checks, and ships work for you, with approvals and proof at every step." },
  },
  xgate: {
    path: "/xgate",
    eyebrow: "Autopilot - XGate",
    title: <>Guardrails <GradientText>before</GradientText> <span className="whitespace-nowrap">your AI acts.</span></>,
    lede: "XGate checks every risky action against your rules before it runs, so nothing happens that you would not allow.",
    primaryCta: GET_STARTED,
    showcase: (
      <ExpandableImage
        src="/xgate_web.jpg"
        alt="XGate: an AI action passes through gates - Commands, Data, Publish, Secrets - that open green when allowed and block in red when risky, all checked before it runs, with a master kill switch."
      />
    ),
    featuresTitle: "Stop problems before they start.",
    featuresCols: 2,
    features: [
      { icon: Terminal, title: "Command and Git gates", desc: "Risky terminal commands and code changes are checked first, so a bad line never just runs." },
      { icon: Lock, title: "Secret and Data gates", desc: "Your keys, passwords, and important data are protected from leaks and accidental wipes." },
      { icon: CreditCard, title: "Spend and Ship gates", desc: "No surprise bills, and nothing goes live until it has a clear, human OK." },
      { icon: Ban, title: "Kill switch", desc: "One switch stops everything the moment you want it to, no questions asked." },
    ],
    tail: <XGateGates />,
    tailTitle: "Every gate, in plain English.",
    meta: { title: "XGate - UnClick", description: "XGate checks risky AI actions against your rules before they run, with a full family of gates." },
  },
  jobs: {
    path: "/jobs",
    eyebrow: "Autopilot - Jobs",
    title: <>Every task, <GradientText>tracked</GradientText>.</>,
    lede: "Jobs is the simple queue of what your AI is doing, what is done, and what needs you.",
    primaryCta: GET_STARTED,
    featuresTitle: "Always know where things stand.",
    features: [
      { icon: ListTodo, title: "Clear status", desc: "See every job at a glance: doing, done, or blocked." },
      { icon: Gauge, title: "Live progress", desc: "A percent and pipeline stages, from Brief to Ship, update as the work moves." },
      { icon: Bot, title: "Run by your AI", desc: "Jobs are created, worked, commented, and pushed for you, automatically." },
      { icon: Compass, title: "Owns the next action", desc: "Each job knows its next step and keeps itself moving." },
      { icon: Bell, title: "Needs-you flags", desc: "It taps you on the shoulder only when something needs a human." },
      { icon: ReceiptText, title: "Receipts when done", desc: "Finished work arrives with proof: PRs, tests, and screenshots." },
    ],
    tail: <JobsBoardSample />,
    meta: { title: "Jobs - UnClick", description: "The simple queue of what your AI is doing, what is done, and what needs you." },
  },
  "control-tower": {
    path: "/control-tower",
    eyebrow: "Autopilot - Control Tower",
    title: <>See everything at a <GradientText>glance</GradientText>.</>,
    lede: "Control Tower is the live overview of your agents, jobs, and proof, one calm screen instead of ten tabs.",
    primaryCta: GET_STARTED,
    featuresTitle: "Calm command and control.",
    features: [
      { icon: TowerControl, title: "Live overview", desc: "Agents, jobs, and health in one place." },
      { icon: Search, title: "Drill into anything", desc: "Jump from the big picture to any detail." },
      { icon: TriangleAlert, title: "Blockers surfaced", desc: "Problems rise to the top, not the bottom." },
      { icon: Wind, title: "Calm by default", desc: "Quiet when all is well. Loud only when it matters." },
    ],
    meta: { title: "Control Tower - UnClick", description: "The live, calm overview of your agents, jobs, and proof." },
  },
  ledger: {
    path: "/ledger",
    eyebrow: "Autopilot - Ledger",
    title: <>A receipt for <GradientText>everything</GradientText>.</>,
    lede: "The Ledger keeps a receipt for every action, so you can see what happened and why.",
    primaryCta: GET_STARTED,
    featuresTitle: "Trust, on the record.",
    features: [
      { icon: ReceiptText, title: "Receipts kept", desc: "Every meaningful action leaves a record." },
      { icon: ScrollText, title: "Full audit trail", desc: "A complete history you can scroll back through." },
      { icon: ShieldCheck, title: "Signed records", desc: "Records are signed, so you can trust them." },
      { icon: Download, title: "Export anytime", desc: "Take your records with you whenever you need them." },
    ],
    meta: { title: "Ledger - UnClick", description: "A receipt for every action, so you see what happened and why." },
  },
  workers: {
    path: "/workers",
    eyebrow: "Autopilot - Workers",
    title: <>A team of <GradientText>specialists</GradientText> for your AI.</>,
    lede: "Workers are role-based helpers, so the right specialist handles each step of the job.",
    primaryCta: GET_STARTED,
    featuresTitle: "The right hat for each job.",
    features: [
      { icon: Compass, title: "Coordinator", desc: "Routes work and keeps everything aligned." },
      { icon: Hammer, title: "Builder", desc: "Makes the focused changes." },
      { icon: FlaskConical, title: "Tester", desc: "Proves what works and what does not." },
      { icon: Eye, title: "Reviewer", desc: "Checks quality and catches regressions." },
      { icon: ShieldHalf, title: "Safety", desc: "Protects secrets and risky actions." },
      { icon: Sparkles, title: "Improver", desc: "Turns repeat friction into fixes." },
    ],
    meta: { title: "Workers - UnClick", description: "Role-based AI workers, so the right specialist handles each step." },
  },
};
