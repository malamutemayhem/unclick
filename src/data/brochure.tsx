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
import {
  Sparkles, Zap, Plug, RefreshCw,
  BookOpen, Clock, Compass, Link2,
  KeyRound, Puzzle, ShieldCheck, Lock,
  Users, HeartPulse, Brain, SlidersHorizontal,
  Search, Wrench, ClipboardCheck, GitMerge, ShieldHalf, Hand,
  Terminal, CreditCard, Ban,
  ListTodo, Bell, ReceiptText,
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
  featuresTitle?: string;
  features: Feature[];
  meta: { title: string; description: string };
};

const GET_STARTED: Cta = { label: "Get started free", href: "/#install" };

export const BROCHURE: Record<BrochureSlug, BrochureContent> = {
  skills: {
    path: "/skills",
    eyebrow: "Skills",
    title: <>Skills your agent can <GradientText>run</GradientText>.</>,
    lede: "Ready-made recipes that teach your AI to do real tasks, end to end. Just ask, and it runs the right one.",
    primaryCta: GET_STARTED,
    secondaryCta: { label: "Browse apps", href: "/apps" },
    featuresTitle: "Capability, on tap.",
    features: [
      { icon: Sparkles, title: "Curated and trending", desc: "A growing library of the skills people actually use." },
      { icon: Zap, title: "One-line trigger", desc: "No setup. Ask in plain English and your agent picks the skill." },
      { icon: Plug, title: "Works everywhere", desc: "Any MCP client: Claude, ChatGPT, Cursor, and more." },
      { icon: RefreshCw, title: "Kept fresh", desc: "New skills added often, refined from real use." },
    ],
    meta: { title: "Skills - UnClick", description: "Ready-made skills that teach your AI to do real tasks. Just ask." },
  },
  orchestrator: {
    path: "/orchestrator",
    eyebrow: "Orchestrator",
    title: <>The running <GradientText>story</GradientText> of your work.</>,
    lede: "Orchestrator keeps the through-line of every job, so you and your agents stay clear on what just happened and what is next.",
    primaryCta: GET_STARTED,
    featuresTitle: "Never lose the thread.",
    features: [
      { icon: BookOpen, title: "One clear story", desc: "Every job, in plain language, from start to finish." },
      { icon: Clock, title: "Live timeline", desc: "See what changed, when, and why." },
      { icon: Compass, title: "Knows the next step", desc: "Points to the next action, not just history." },
      { icon: Link2, title: "Source-linked", desc: "Every claim traces back to where it came from." },
    ],
    meta: { title: "Orchestrator - UnClick", description: "The running story of your work, so your agents always know what is next." },
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
    title: <>Give your AI a <GradientText>seat</GradientText> at the table.</>,
    lede: "Add AI seats that work for you, each with a role, a heartbeat, and shared memory.",
    primaryCta: GET_STARTED,
    featuresTitle: "Your AI team.",
    features: [
      { icon: Users, title: "Role-based", desc: "Each seat has a clear job, so the right one handles each task." },
      { icon: HeartPulse, title: "Heartbeat schedule", desc: "Seats wake on a schedule to keep work moving." },
      { icon: Brain, title: "Shared memory", desc: "Every seat draws on the same memory you own." },
      { icon: SlidersHorizontal, title: "Your rules", desc: "You set what each seat can and cannot do." },
    ],
    meta: { title: "Seats - UnClick", description: "Add AI seats that work for you, each with a role, a heartbeat, and shared memory." },
  },
  autopilot: {
    path: "/autopilot",
    eyebrow: "Autopilot",
    title: <>Work that <GradientText>runs itself</GradientText>, with proof.</>,
    lede: "Autopilot plans, builds, checks, and ships work for you, with visible approvals and a clear stop button at every step.",
    primaryCta: GET_STARTED,
    secondaryCta: { label: "See the proof", href: "/xpass" },
    featuresTitle: "From idea to shipped, on a line you can see.",
    features: [
      { icon: Search, title: "Research and plan", desc: "It works out what to do before touching anything." },
      { icon: Wrench, title: "Build", desc: "Focused changes, one scoped step at a time." },
      { icon: ClipboardCheck, title: "Check with XPass", desc: "Every result is proven before it moves on." },
      { icon: GitMerge, title: "Review and ship", desc: "You approve. It merges and publishes." },
      { icon: ShieldHalf, title: "Guarded by XGate", desc: "Risky actions are stopped before they run." },
      { icon: Hand, title: "Stop anytime", desc: "One clear stop path. You are always in command." },
    ],
    meta: { title: "Autopilot - UnClick", description: "Autopilot plans, builds, checks, and ships work for you, with approvals and proof at every step." },
  },
  xgate: {
    path: "/xgate",
    eyebrow: "Autopilot - XGate",
    title: <>Guardrails <GradientText>before</GradientText> your AI acts.</>,
    lede: "XGate checks every risky action against your rules before it runs, so nothing happens that you would not allow.",
    primaryCta: GET_STARTED,
    featuresTitle: "Stop problems before they start.",
    features: [
      { icon: Terminal, title: "Command and Git gates", desc: "Stops unsafe commands and risky code changes." },
      { icon: Lock, title: "Secret and Data gates", desc: "Protects credentials and sensitive data." },
      { icon: CreditCard, title: "Spend and Ship gates", desc: "No surprise costs or unreviewed releases." },
      { icon: Ban, title: "Kill switch", desc: "One switch halts everything, instantly." },
    ],
    meta: { title: "XGate - UnClick", description: "XGate checks risky AI actions against your rules before they run." },
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
      { icon: Compass, title: "Owns the next action", desc: "Each job knows its next step." },
      { icon: Bell, title: "Needs-you flags", desc: "It tells you when something needs a human." },
      { icon: ReceiptText, title: "Receipts when done", desc: "Finished work comes with proof." },
    ],
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
