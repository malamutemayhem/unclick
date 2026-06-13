import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GlassCard } from "@/components/brand";
import { presets } from "@/lib/design-system";
import { useCanonical } from "@/hooks/use-canonical";
import {
  Lightbulb,
  Thermometer,
  Lock,
  Camera,
  Speaker,
  Zap,
  ArrowRight,
  Shield,
  Clock,
  Brain,
  Layers,
  Wifi,
  ToggleLeft,
  Eye,
  CalendarDays,
} from "lucide-react";

/**
 * Smart home page (canon + truth rewrite, 2026-06-11).
 *
 * Composes from the design canon. Claims are kept to what is verifiable:
 * the UnClick config shown is the real one from the install page, the
 * Home Assistant integration is attributed to the open ha-mcp project
 * without hand-typed tool or star counts, and the comparison marks are
 * honest (including what UnClick does not do).
 */

const FEATURES = [
  {
    title: "Device control",
    desc: "Lights, locks, thermostats, speakers, blinds. Control every device with natural language.",
    icon: Lightbulb,
  },
  {
    title: "Automation builder",
    desc: "Create, edit, and trigger Home Assistant automations without touching YAML.",
    icon: Zap,
  },
  {
    title: "State queries",
    desc: "\"Is the garage door open?\" \"What's the living room temperature?\" Instant answers.",
    icon: Eye,
  },
  {
    title: "Scene management",
    desc: "Activate scenes, create new ones, and adjust on the fly through conversation.",
    icon: ToggleLeft,
  },
  {
    title: "Security and cameras",
    desc: "Arm and disarm alarms, check camera snapshots, review motion alerts.",
    icon: Shield,
  },
  {
    title: "Energy and history",
    desc: "Query usage statistics, check device history, and optimise energy consumption.",
    icon: Clock,
  },
];

const DEVICE_CATEGORIES = [
  { name: "Lights & switches", icon: Lightbulb, count: "All brands" },
  { name: "Climate & HVAC", icon: Thermometer, count: "Nest, Ecobee, Daikin" },
  { name: "Locks & access", icon: Lock, count: "Yale, August, Nuki" },
  { name: "Cameras & doorbells", icon: Camera, count: "Ring, Arlo, Reolink" },
  { name: "Speakers & media", icon: Speaker, count: "Sonos, Chromecast" },
  { name: "Sensors & energy", icon: Zap, count: "Aqara, Shelly, P1" },
  { name: "Blinds & covers", icon: Layers, count: "IKEA, Somfy" },
  { name: "Network & WiFi", icon: Wifi, count: "UniFi, TP-Link" },
];

const SAMPLE_TOOLS = [
  { tool: "control_device", desc: "Turn devices on or off, set brightness, temperature, and more" },
  { tool: "get_entity_state", desc: "Query the current state of any entity" },
  { tool: "search_entities", desc: "Find entities by name, area, or device type" },
  { tool: "trigger_automation", desc: "Run any Home Assistant automation on demand" },
  { tool: "create_automation", desc: "Build new automations from natural language" },
  { tool: "activate_scene", desc: "Switch to any pre-configured scene" },
  { tool: "get_history", desc: "Pull state history and statistics for any entity" },
  { tool: "camera_snapshot", desc: "Capture and view camera images" },
  { tool: "manage_areas", desc: "Organise devices by room, floor, and zone" },
  { tool: "get_energy_stats", desc: "Query energy usage and solar production data" },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Connect Home Assistant",
    desc: "Point the ha-mcp server at your Home Assistant instance with a long-lived access token. Your data stays on your network.",
  },
  {
    step: "2",
    title: "Add to your config",
    desc: "One entry in your MCP config alongside UnClick. Works with Claude, Cursor, Cowork, or anything MCP-compatible.",
  },
  {
    step: "3",
    title: "Talk to your home",
    desc: "\"Turn off all the lights downstairs\", \"Set the thermostat to 21°\", \"Show me the front door camera\". All through natural language.",
  },
];

const COMPARISON = [
  { feature: "AI-native control", unclick: true, alexa: false, google: false, apple: false },
  { feature: "Natural language automations", unclick: true, alexa: false, google: false, apple: false },
  { feature: "Cross-platform memory", unclick: true, alexa: false, google: false, apple: false },
  { feature: "Thousands of device integrations", unclick: true, alexa: true, google: true, apple: false },
  { feature: "Calendar-aware routines", unclick: true, alexa: false, google: false, apple: false },
  { feature: "Open protocol (MCP)", unclick: true, alexa: false, google: false, apple: false },
  { feature: "Runs on your own network", unclick: true, alexa: false, google: false, apple: true },
  { feature: "Voice control", unclick: false, alexa: true, google: true, apple: true },
];

const UNCLICK_CONFIG = `{
  "mcpServers": {
    "unclick": {
      "command": "npx",
      "args": ["-y", "https://github.com/malamutemayhem/unclick/releases/latest/download/unclick-mcp-server.tgz"],
      "env": { "UNCLICK_API_KEY": "your-key" }
    }
  }
}`;

function CheckMark({ on }: { on: boolean }) {
  return on ? (
    <span aria-label="yes" className="font-semibold text-primary">
      {"✓"}
    </span>
  ) : (
    <span aria-label="no" className="text-muted-foreground">
      {" - "}
    </span>
  );
}

export default function SmartHomePage() {
  useCanonical("/smarthome");

  return (
    <PageShell
      eyebrow="Smart home"
      title="Your AI agent runs your home"
      lede="Control lights, locks, thermostats, cameras, and automations through the same agent that manages your code and calendar. Built on Home Assistant and the open ha-mcp project."
      cta={{ label: "Get started", href: "#setup" }}
    >
      {/* The problem */}
      <section className={presets.section}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <GlassCard className="p-8 md:p-12">
              <h2 className="text-2xl font-bold tracking-tight text-heading">
                Smart home assistants are dumb
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-body">
                Voice assistants can turn on a light, but they can't reason. They don't know you
                have a meeting at 9am and should warm the office at 8:45. They can't check your
                calendar, dim the lights for a film, and pause notifications, all from one request.
                They're voice-activated switches, not intelligent agents.
              </p>
              <p className="mt-4 max-w-3xl leading-relaxed text-body">
                UnClick + Home Assistant changes this. Your AI agent has full context: your schedule
                from Organiser, your preferences from Memory, your devices from Home Assistant. It
                doesn't just follow commands. It understands what you need.
              </p>
            </GlassCard>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className={presets.section}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <Eyebrow>Capabilities</Eyebrow>
            <h2 className={`mt-3 ${presets.h2}`}>Every room covered</h2>
          </FadeIn>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={0.05 * i}>
                <GlassCard className="h-full">
                  <f.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 font-semibold text-heading">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{f.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Supported devices */}
      <section className={presets.section}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <Eyebrow>Compatibility</Eyebrow>
            <h2 className={`mt-3 ${presets.h2}`}>If Home Assistant sees it, your agent controls it</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-body">
              Home Assistant's community library spans thousands of integrations across Zigbee,
              Z-Wave, WiFi, Bluetooth, Matter, and Thread.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEVICE_CATEGORIES.map((d, i) => (
              <FadeIn key={d.name} delay={0.04 * i}>
                <GlassCard className="p-5 text-center">
                  <d.icon className="mx-auto h-6 w-6 text-primary" />
                  <h3 className="mt-3 text-sm font-semibold text-heading">{d.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{d.count}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={presets.section}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <Eyebrow>Setup</Eyebrow>
            <h2 className={`mt-3 ${presets.h2}`}>Three steps to a smarter home</h2>
          </FadeIn>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map((s, i) => (
              <FadeIn key={s.step} delay={0.08 * i}>
                <GlassCard className="relative h-full">
                  <span className="absolute -top-3 left-5 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                    {s.step}
                  </span>
                  <h3 className="mt-2 font-semibold text-heading">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{s.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* MCP config */}
      <section id="setup" className={presets.section}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <Eyebrow>Configuration</Eyebrow>
            <h2 className={`mt-3 ${presets.h2}`}>Add it to your stack</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-body">
              The UnClick entry below is the same one from the install page. Add the
              home-assistant server alongside it, following the ha-mcp README: your Home Assistant
              URL and a long-lived access token are all it needs.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-[18px] border border-[#86dadd]/15 bg-white/[0.03]">
              <div className="flex items-center justify-between border-b border-[#86dadd]/10 px-4 py-2">
                <span className="font-mono text-xs text-muted-foreground">mcp-config.json</span>
                <a
                  href="https://github.com/homeassistant-ai/ha-mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-primary transition-colors hover:text-heading"
                >
                  ha-mcp README
                </a>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-body">
                <code>{UNCLICK_CONFIG}</code>
              </pre>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tools sample */}
      <section className={presets.section}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <Eyebrow>Tools</Eyebrow>
            <h2 className={`mt-3 ${presets.h2}`}>What your agent can do</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-body">
              A sample of what the Home Assistant integration exposes, from device control to
              automations, dashboards, and energy data.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8 overflow-x-auto rounded-[18px] border border-[#86dadd]/15">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#86dadd]/15 bg-white/[0.045]">
                    <th className="px-4 py-3 font-mono text-xs text-primary">Tool</th>
                    <th className="px-4 py-3 font-mono text-xs text-primary">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_TOOLS.map((t) => (
                    <tr key={t.tool} className="border-b border-[#86dadd]/10">
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-heading">
                        {t.tool}
                      </td>
                      <td className="px-4 py-3 text-body">{t.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* UnClick synergy */}
      <section className={presets.section}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <Eyebrow>Better together</Eyebrow>
            <h2 className={`mt-3 ${presets.h2}`}>Smart home meets smart context</h2>
          </FadeIn>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <FadeIn delay={0.05}>
              <GlassCard className="h-full">
                <Brain className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-semibold text-heading">+ Memory</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Your agent remembers you like the office at 22{"°"} and the bedroom at 18
                  {"°"}. Preferences persist across sessions without you repeating them.
                </p>
              </GlassCard>
            </FadeIn>
            <FadeIn delay={0.1}>
              <GlassCard className="h-full">
                <CalendarDays className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-semibold text-heading">+ Organiser</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Calendar-aware automations. "Warm the office before my first meeting" works
                  because your agent sees your schedule and your thermostat.
                </p>
              </GlassCard>
            </FadeIn>
            <FadeIn delay={0.15}>
              <GlassCard className="h-full">
                <Layers className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-semibold text-heading">+ Dispatch</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Route smart home commands from Cowork through Dispatch to Claude Code for complex
                  multi-step automations and debugging.
                </p>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className={presets.section}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <Eyebrow>Comparison</Eyebrow>
            <h2 className={`mt-3 ${presets.h2}`}>Beyond voice assistants</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8 overflow-x-auto rounded-[18px] border border-[#86dadd]/15">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#86dadd]/15 bg-white/[0.045]">
                    <th className="px-4 py-3 text-heading">Feature</th>
                    <th className="px-4 py-3 text-center text-primary">UnClick + HA</th>
                    <th className="px-4 py-3 text-center text-muted-foreground">Alexa</th>
                    <th className="px-4 py-3 text-center text-muted-foreground">Google Home</th>
                    <th className="px-4 py-3 text-center text-muted-foreground">Apple Home</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.feature} className="border-b border-[#86dadd]/10">
                      <td className="px-4 py-3 text-body">{row.feature}</td>
                      <td className="px-4 py-3 text-center">
                        <CheckMark on={row.unclick} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <CheckMark on={row.alexa} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <CheckMark on={row.google} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <CheckMark on={row.apple} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-32 pt-4 text-center">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className={presets.h2}>Ready to make your home actually smart?</h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-body">
              Connect Home Assistant to UnClick and give your AI agent the keys to every room.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#setup" className={presets.ctaPrimary}>
                Get started <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/tools" className={presets.ctaGhost}>
                Browse all tools
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
}
