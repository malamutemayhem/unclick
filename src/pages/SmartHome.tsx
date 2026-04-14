import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { useCanonical } from "@/hooks/use-canonical";
import {
  Home,
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

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    title: "Device Control",
    desc: "Lights, locks, thermostats, speakers, blinds - control every device with natural language",
    icon: Lightbulb,
  },
  {
    title: "Automation Builder",
    desc: "Create, edit, and trigger Home Assistant automations without touching YAML",
    icon: Zap,
  },
  {
    title: "State Queries",
    desc: "\"Is the garage door open?\" \"What's the living room temperature?\" - instant answers",
    icon: Eye,
  },
  {
    title: "Scene Management",
    desc: "Activate scenes, create new ones, and adjust on the fly through conversation",
    icon: ToggleLeft,
  },
  {
    title: "Security & Cameras",
    desc: "Arm/disarm alarms, check camera snapshots, review motion alerts",
    icon: Shield,
  },
  {
    title: "Energy & History",
    desc: "Query usage statistics, check device history, and optimise energy consumption",
    icon: Clock,
  },
];

const DEVICE_CATEGORIES = [
  { name: "Lights & Switches", icon: Lightbulb, count: "All brands" },
  { name: "Climate & HVAC", icon: Thermometer, count: "Nest, Ecobee, Daikin" },
  { name: "Locks & Access", icon: Lock, count: "Yale, August, Nuki" },
  { name: "Cameras & Doorbells", icon: Camera, count: "Ring, Arlo, Reolink" },
  { name: "Speakers & Media", icon: Speaker, count: "Sonos, Chromecast" },
  { name: "Sensors & Energy", icon: Zap, count: "Aqara, Shelly, P1" },
  { name: "Blinds & Covers", icon: Layers, count: "IKEA, Somfy" },
  { name: "Network & WiFi", icon: Wifi, count: "UniFi, TP-Link" },
];

const MCP_TOOLS = [
  { tool: "control_device", desc: "Turn devices on/off, set brightness, temperature, etc." },
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
    desc: "Point the MCP server at your Home Assistant instance with a long-lived access token. Your data stays on your network.",
  },
  {
    step: "2",
    title: "Add to your config",
    desc: "One entry in your MCP config alongside your other UnClick servers. Works with Claude, Cursor, Cowork - anything MCP-compatible.",
  },
  {
    step: "3",
    title: "Talk to your home",
    desc: "\"Turn off all the lights downstairs\", \"Set the thermostat to 21Â°\", \"Show me the front door camera\" - all through natural language.",
  },
];

const COMPARISON = [
  {
    feature: "AI-native control",
    unclick: true,
    alexa: false,
    google: false,
    apple: false,
  },
  {
    feature: "Natural language automations",
    unclick: true,
    alexa: false,
    google: false,
    apple: false,
  },
  {
    feature: "Cross-platform memory",
    unclick: true,
    alexa: false,
    google: false,
    apple: false,
  },
  {
    feature: "2,000+ device integrations",
    unclick: true,
    alexa: true,
    google: true,
    apple: false,
  },
  {
    feature: "Calendar-aware routines",
    unclick: true,
    alexa: false,
    google: false,
    apple: false,
  },
  {
    feature: "Open protocol (MCP)",
    unclick: true,
    alexa: false,
    google: false,
    apple: false,
  },
  {
    feature: "Works offline / local",
    unclick: true,
    alexa: false,
    google: false,
    apple: true,
  },
  {
    feature: "Voice control",
    unclick: false,
    alexa: true,
    google: true,
    apple: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SmartHomePage() {
  useCanonical("/smarthome");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ---- Hero ---- */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-36 text-center">
        <FadeIn>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
            <Home className="h-3 w-3" />
            Smart Home
          </span>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-heading sm:text-6xl">
            Your AI agent runs<br className="hidden sm:block" /> your home
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-body leading-relaxed">
            2,000+ device integrations. 87 MCP tools. One conversation.
            Control lights, locks, thermostats, cameras, and automations
            through the same interface that manages your code and calendar.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#setup"
              className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Started
            </a>
            <a
              href="https://github.com/homeassistant-ai/ha-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border/60 bg-card/20 px-6 py-2.5 text-sm font-medium text-heading transition-colors hover:bg-card/40"
            >
              View on GitHub
            </a>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-6 text-xs text-muted-foreground">
            Powered by Home Assistant + ha-mcp (2.2k+ stars)
          </p>
        </FadeIn>
      </section>

      {/* ---- The Problem ---- */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <FadeIn>
          <div className="rounded-xl border border-border/40 bg-card/30 p-8 md:p-12">
            <h2 className="text-2xl font-semibold text-heading">
              Smart home assistants are dumb
            </h2>
            <p className="mt-4 max-w-3xl text-body leading-relaxed">
              Alexa and Google Home can turn on a light, but they can't
              reason. They don't know you have a meeting at 9am and should
              warm the office at 8:45. They can't check your calendar, dim
              the lights for a film, and pause notifications - all from one
              request. They're voice-activated switches, not intelligent
              agents.
            </p>
            <p className="mt-4 max-w-3xl text-body leading-relaxed">
              UnClick + Home Assistant changes this. Your AI agent has full
              context - your schedule from Organiser, your preferences from
              Memory, your devices from Home Assistant. It doesn't just
              follow commands. It understands what you need.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ---- Features ---- */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <FadeIn>
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
            Capabilities
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-heading">
            87 tools. Every room covered.
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={0.05 * i}>
              <div className="group rounded-xl border border-border/40 bg-card/30 p-6 transition-colors hover:border-primary/40">
                <f.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-semibold text-heading">{f.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ---- Supported Devices ---- */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <FadeIn>
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
            Compatibility
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-heading">
            2,000+ integrations, every protocol
          </h2>
          <p className="mt-4 max-w-2xl text-body leading-relaxed">
            Home Assistant supports Zigbee, Z-Wave, WiFi, Bluetooth, Matter, and Thread devices.
            If it connects to Home Assistant, your AI agent can control it.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEVICE_CATEGORIES.map((d, i) => (
            <FadeIn key={d.name} delay={0.04 * i}>
              <div className="rounded-xl border border-border/40 bg-card/30 p-5 text-center transition-colors hover:border-primary/40">
                <d.icon className="mx-auto h-6 w-6 text-primary" />
                <h3 className="mt-3 text-sm font-semibold text-heading">{d.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{d.count}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ---- How It Works ---- */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <FadeIn>
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
            Setup
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-heading">
            Three steps to a smarter home
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((s, i) => (
            <FadeIn key={s.step} delay={0.08 * i}>
              <div className="relative rounded-xl border border-border/40 bg-card/30 p-6">
                <span className="absolute -top-3 left-5 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                  {s.step}
                </span>
                <h3 className="mt-2 font-semibold text-heading">{s.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ---- MCP Config ---- */}
      <section id="setup" className="mx-auto max-w-5xl px-6 pb-24">
        <FadeIn>
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
            Configuration
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-heading">
            Add it to your stack
          </h2>
          <p className="mt-4 max-w-2xl text-body leading-relaxed">
            One server entry alongside your existing UnClick tools. Your
            Home Assistant URL and a long-lived access token are all you
            need.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-8 overflow-x-auto rounded-xl border border-border/40 bg-[#0d1117] p-6">
            <pre className="text-sm leading-relaxed text-green-400">
              <code>{`{
  "mcpServers": {
    "unclick": {
      "command": "npx",
      "args": ["-y", "@anthropic/unclick-mcp"]
    },
    "unclick-memory": {
      "command": "npx",
      "args": ["-y", "@anthropic/unclick-memory-mcp"],
      "env": { "SUPABASE_URL": "...", "SUPABASE_KEY": "..." }
    },
    "home-assistant": {
      "command": "npx",
      "args": ["-y", "@anthropic/ha-mcp"],
      "env": {
        "HA_URL": "http://homeassistant.local:8123",
        "HA_TOKEN": "your-long-lived-access-token"
      }
    }
  }
}`}</code>
            </pre>
          </div>
        </FadeIn>
      </section>

      {/* ---- MCP Tools Table ---- */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <FadeIn>
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
            Tools
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-heading">
            What your agent can do
          </h2>
          <p className="mt-4 max-w-2xl text-body leading-relaxed">
            A sample of the 87+ tools available. The full set covers 23
            categories including add-ons, blueprints, HACS, dashboards,
            and more.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-8 overflow-x-auto rounded-xl border border-border/40">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/40 bg-card/40">
                  <th className="px-4 py-3 font-mono text-xs text-primary">Tool</th>
                  <th className="px-4 py-3 font-mono text-xs text-primary">Description</th>
                </tr>
              </thead>
              <tbody>
                {MCP_TOOLS.map((t) => (
                  <tr key={t.tool} className="border-b border-border/20">
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
      </section>

      {/* ---- UnClick Synergy ---- */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <FadeIn>
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
            Better Together
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-heading">
            Smart home meets smart context
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FadeIn delay={0.05}>
            <div className="rounded-xl border border-border/40 bg-card/30 p-6">
              <Brain className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-semibold text-heading">+ Memory</h3>
              <p className="mt-2 text-sm text-body leading-relaxed">
                Your agent remembers you like the office at 22Â° and the
                bedroom at 18Â°. Preferences persist across sessions without
                you repeating them.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-border/40 bg-card/30 p-6">
              <CalendarDays className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-semibold text-heading">+ Organiser</h3>
              <p className="mt-2 text-sm text-body leading-relaxed">
                Calendar-aware automations. "Warm the office before my
                first meeting" works because your agent sees your schedule
                and your thermostat.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="rounded-xl border border-border/40 bg-card/30 p-6">
              <Layers className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-semibold text-heading">+ Dispatch</h3>
              <p className="mt-2 text-sm text-body leading-relaxed">
                Route smart home commands from Cowork through Dispatch to
                Claude Code for complex multi-step automations and
                debugging.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---- Comparison ---- */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <FadeIn>
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
            Comparison
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-heading">
            Beyond voice assistants
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-8 overflow-x-auto rounded-xl border border-border/40">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/40 bg-card/40">
                  <th className="px-4 py-3 text-heading">Feature</th>
                  <th className="px-4 py-3 text-center text-primary">UnClick + HA</th>
                  <th className="px-4 py-3 text-center text-muted-foreground">Alexa</th>
                  <th className="px-4 py-3 text-center text-muted-foreground">Google Home</th>
                  <th className="px-4 py-3 text-center text-muted-foreground">Apple Home</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-border/20">
                    <td className="px-4 py-3 text-body">{row.feature}</td>
                    <td className="px-4 py-3 text-center">
                      {row.unclick ? (
                        <span className="text-green-400">â</span>
                      ) : (
                        <span className="text-muted-foreground"> - </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.alexa ? (
                        <span className="text-green-400">â</span>
                      ) : (
                        <span className="text-muted-foreground"> - </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.google ? (
                        <span className="text-green-400">â</span>
                      ) : (
                        <span className="text-muted-foreground"> - </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.apple ? (
                        <span className="text-green-400">â</span>
                      ) : (
                        <span className="text-muted-foreground"> - </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </section>

      {/* ---- CTA ---- */}
      <section className="mx-auto max-w-3xl px-6 pb-32 text-center">
        <FadeIn>
          <h2 className="text-3xl font-semibold text-heading">
            Ready to make your home actually smart?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body leading-relaxed">
            Connect Home Assistant to UnClick and give your AI agent the
            keys to every room.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#setup"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/tools"
              className="rounded-md border border-border/60 bg-card/20 px-6 py-2.5 text-sm font-medium text-heading transition-colors hover:bg-card/40"
            >
              Browse all tools
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
