import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
// The homepage stays statically imported: "/" must paint instantly with the
// entry bundle. Every other route is lazy so visiting the homepage no longer
// downloads the admin suite, the design-lane previews, and every brochure
// page in one 5 MB chunk (the "slow on some devices" fix).
import Index from "./pages/Index.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import RequireAdmin from "./components/RequireAdmin.tsx";
import BetaBanner from "./components/BetaBanner.tsx";
import { SiteAurora } from "@/components/brand";
import { trackPageView } from "./lib/analytics.ts";

const HomepageSample = lazy(() => import("./pages/HomepageSample.tsx"));
const HomePreview = lazy(() => import("./pages/HomePreview.tsx"));
const HomePreviewB = lazy(() => import("./pages/HomePreviewB.tsx"));
const HomePreviewC = lazy(() => import("./pages/HomePreviewC.tsx"));
const HomePreviewD = lazy(() => import("./pages/HomePreviewD.tsx"));
const HomePreviewE = lazy(() => import("./pages/HomePreviewE.tsx"));
const HomePreviewF = lazy(() => import("./pages/HomePreviewF.tsx"));
const HomePreviewG = lazy(() => import("./pages/HomePreviewG.tsx"));
const HomePreviewH = lazy(() => import("./pages/HomePreviewH.tsx"));
const HomePreviewI = lazy(() => import("./pages/HomePreviewI.tsx"));
const HomePreviewJ = lazy(() => import("./pages/HomePreviewJ.tsx"));
const HomePreviewK = lazy(() => import("./pages/HomePreviewK.tsx"));
const HomePreviewL = lazy(() => import("./pages/HomePreviewL.tsx"));
const HomePreviewM = lazy(() => import("./pages/HomePreviewM.tsx"));
const HomePreviewN = lazy(() => import("./pages/HomePreviewN.tsx"));
const HomePreviewO = lazy(() => import("./pages/HomePreviewO.tsx"));
const HomePreviewP = lazy(() => import("./pages/HomePreviewP.tsx"));
const HomePreviewQ = lazy(() => import("./pages/HomePreviewQ.tsx"));
const HomePreviewR = lazy(() => import("./pages/HomePreviewR.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const DocsPage = lazy(() => import("./pages/Docs.tsx"));
const LinkInBioPage = lazy(() => import("./pages/tools/LinkInBio.tsx"));
const SchedulingPage = lazy(() => import("./pages/tools/Scheduling.tsx"));
const SolvePage = lazy(() => import("./pages/tools/Solve.tsx"));
// Arena is hidden for now (not deleted). Its pages, components, and API
// remain in the codebase; only the public routes are turned off below.
// const ArenaHome = lazy(() => import("./pages/arena/ArenaHome.tsx"));
// const ArenaProblem = lazy(() => import("./pages/arena/ArenaProblem.tsx"));
// const ArenaLeaderboard = lazy(() => import("./pages/arena/ArenaLeaderboard.tsx"));
// const ArenaSubmitProblem = lazy(() => import("./pages/arena/ArenaSubmitProblem.tsx"));
const FAQPage = lazy(() => import("./pages/FAQPage.tsx"));
const ConnectPage = lazy(() => import("./pages/Connect.tsx"));
const DevelopersPage = lazy(() => import("./pages/Developers.tsx"));
const DeveloperDocsPage = lazy(() => import("./pages/DeveloperDocs.tsx"));
const DeveloperSubmitPage = lazy(() => import("./pages/DeveloperSubmit.tsx"));
const VibeCodingPage = lazy(() => import("./pages/VibeCoding.tsx"));
const TermsPage = lazy(() => import("./pages/Terms.tsx"));
const PrivacyPage = lazy(() => import("./pages/Privacy.tsx"));
const MemoryPage = lazy(() => import("./pages/Memory.tsx"));
const MemorySetupPage = lazy(() => import("./pages/MemorySetup.tsx"));
const MemoryConnectPage = lazy(() => import("./pages/MemoryConnect.tsx"));
const MemorySetupGuidePage = lazy(() => import("./pages/MemorySetupGuide.tsx"));
const PricingPage = lazy(() => import("./pages/Pricing.tsx"));
const OrganiserPage = lazy(() => import("./pages/Organiser.tsx"));
const DispatchPage = lazy(() => import("./pages/Dispatch.tsx"));
const CrewsPage = lazy(() => import("./pages/Crews.tsx"));
const ToolsPage = lazy(() => import("./pages/Tools.tsx"));
const AppsPage = lazy(() => import("./pages/Apps.tsx"));
const AppDetailPage = lazy(() => import("./pages/AppDetail.tsx"));
const JobsmithPage = lazy(() => import("./pages/Jobsmith.tsx"));
const NewToAIPage = lazy(() => import("./pages/NewToAI.tsx"));
const WhyPage = lazy(() => import("./pages/Why.tsx"));
const SmartHomePage = lazy(() => import("./pages/SmartHome.tsx"));
const InstallRecoverPage = lazy(() => import("./pages/InstallRecover.tsx"));
const XPassPage = lazy(() => import("./pages/XPass.tsx"));
const DogfoodReportPage = lazy(() => import("./pages/DogfoodReport.tsx"));
const LoginPage = lazy(() => import("./pages/Login.tsx"));
const SignupPage = lazy(() => import("./pages/Signup.tsx"));
const AuthCallbackPage = lazy(() => import("./pages/AuthCallback.tsx"));
const PairingCompletePage = lazy(() => import("./pages/PairingComplete.tsx"));
const VerifyMfaPage = lazy(() => import("./pages/VerifyMfa.tsx"));
const BrochurePage = lazy(() => import("./components/BrochurePage.tsx"));
const AdminShell = lazy(() => import("./pages/admin/AdminShell.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));
const AdminYou = lazy(() => import("./pages/admin/AdminYou.tsx"));
const AdminMemory = lazy(() => import("./pages/admin/AdminMemory.tsx"));
const AdminKeychain = lazy(() => import("./pages/admin/AdminKeychain.tsx"));
const AdminTools = lazy(() => import("./pages/admin/AdminTools.tsx"));
const AdminSkills = lazy(() => import("./pages/admin/AdminSkills.tsx"));
const AdminActivity = lazy(() => import("./pages/admin/AdminActivity.tsx"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings.tsx"));
const AdminAgentsPage = lazy(() => import("./pages/admin/AdminAgents.tsx"));
const AdminSeatHeartbeatPage = lazy(() => import("./pages/admin/AdminSeatHeartbeat.tsx"));
const AdminSeatsApi = lazy(() => import("./pages/admin/AdminSeatsApi.tsx"));
const AdminSeatsApiRouting = lazy(() => import("./pages/admin/AdminSeatsApiRouting.tsx"));
const AdminSeatsApiUsage = lazy(() => import("./pages/admin/AdminSeatsApiUsage.tsx"));
const AdminSeatsLocal = lazy(() => import("./pages/admin/AdminSeatsLocal.tsx"));
const AdminSeatsSubscription = lazy(() => import("./pages/admin/AdminSeatsSubscription.tsx"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics.tsx"));
const AdminCodebase = lazy(() => import("./pages/admin/AdminCodebase.tsx"));
const AdminOrchestratorPage = lazy(() => import("./pages/admin/AdminOrchestrator.tsx"));
const AdminOrchestratorLog = lazy(() => import("./pages/admin/AdminOrchestratorLog.tsx"));
const AdminTestPass = lazy(() => import("./pages/admin/AdminTestPass.tsx"));
const TestPassCatalog = lazy(() => import("./pages/admin/testpass/TestPassCatalog.tsx"));
const NewRunWizard = lazy(() => import("./pages/admin/testpass/NewRunWizard.tsx"));
const RunDetail = lazy(() => import("./pages/admin/testpass/RunDetail.tsx"));
const ReportDetail = lazy(() => import("./pages/admin/testpass/ReportDetail.tsx"));
const CopyPassCatalog = lazy(() => import("./pages/admin/copypass/CopyPassCatalog.tsx"));
const CrewsCatalog = lazy(() => import("./pages/admin/crews/CrewsCatalog.tsx"));
const CrewComposer = lazy(() => import("./pages/admin/crews/CrewComposer.tsx"));
const CrewsRuns = lazy(() => import("./pages/admin/crews/CrewsRuns.tsx"));
const CrewsSettings = lazy(() => import("./pages/admin/crews/CrewsSettings.tsx"));
const CrewRun = lazy(() => import("./pages/admin/crews/CrewRun.tsx"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers.tsx"));
const AdminSystemHealth = lazy(() => import("./pages/admin/AdminSystemHealth.tsx"));
const AdminPinballWake = lazy(() => import("./pages/admin/AdminPinballWake.tsx"));
const AdminModeration = lazy(() => import("./pages/admin/AdminModeration.tsx"));
const AdminAuditLog = lazy(() => import("./pages/admin/AdminAuditLog.tsx"));
const AdminBrainmap = lazy(() => import("./pages/admin/AdminBrainmap.tsx"));
const AdminJobs = lazy(() => import("./pages/admin/AdminJobs.tsx"));
const AdminControlTower = lazy(() => import("./pages/admin/AdminControlTower.tsx"));
const AdminJobsmith = lazy(() => import("./pages/admin/AdminJobsmith.tsx"));
const AdminAppTesting = lazy(() => import("./pages/admin/AdminAppTesting.tsx"));
const AdminBenchmarks = lazy(() => import("./pages/admin/AdminBenchmarks.tsx"));
const AdminTruthRate = lazy(() => import("./pages/admin/AdminTruthRate.tsx"));
const AdminXGate = lazy(() => import("./pages/admin/AdminXGate.tsx"));
const AdminExpressBuild = lazy(() => import("./pages/admin/AdminExpressBuild.tsx"));
const AdminAutopilot = lazy(() =>
  import("./pages/admin/AdminEcosystemPages.tsx").then((m) => ({ default: m.AdminAutopilot })),
);
const AdminBilling = lazy(() =>
  import("./pages/admin/AdminEcosystemPages.tsx").then((m) => ({ default: m.AdminBilling })),
);
const AdminChecks = lazy(() =>
  import("./pages/admin/AdminEcosystemPages.tsx").then((m) => ({ default: m.AdminChecks })),
);
const AdminLedger = lazy(() =>
  import("./pages/admin/AdminEcosystemPages.tsx").then((m) => ({ default: m.AdminLedger })),
);
const AdminProjects = lazy(() =>
  import("./pages/admin/AdminEcosystemPages.tsx").then((m) => ({ default: m.AdminProjects })),
);
const AdminWorkers = lazy(() =>
  import("./pages/admin/AdminEcosystemPages.tsx").then((m) => ({ default: m.AdminWorkers })),
);
const SignalsCatalog = lazy(() => import("./pages/admin/signals/SignalsCatalog.tsx"));
const SignalsSettings = lazy(() => import("./pages/admin/signals/SignalsSettings.tsx"));
const Boardroom = lazy(() => import("./pages/admin/Boardroom.tsx"));
// BuildDeskPage import removed 2026-05-28 - page hidden (developer marketplace paused). File retained at src/pages/BuildDesk.tsx; /build route redirects to /.

const queryClient = new QueryClient();

function AnalyticsPageviewTracker() {
  const location = useLocation();

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;
    trackPageView(path);
  }, [location.hash, location.pathname, location.search]);

  return null;
}

function HashScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const targetId = decodeURIComponent(location.hash.slice(1));
    if (!targetId || targetId.includes("=")) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, location.search]);

  return null;
}

/** Quiet, theme-consistent placeholder while a lazy route chunk loads. */
function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" aria-busy="true">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Analytics />
      <BrowserRouter>
        <SiteAurora />
        <AnalyticsPageviewTracker />
        <HashScrollHandler />
        <BetaBanner />
        <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home-preview" element={<HomePreview />} />
          <Route path="/home-preview-b" element={<HomePreviewB />} />
          <Route path="/home-preview-c" element={<HomePreviewC />} />
          <Route path="/home-preview-d" element={<HomePreviewD />} />
          <Route path="/home-preview-e" element={<HomePreviewE />} />
          <Route path="/home-preview-f" element={<HomePreviewF />} />
          <Route path="/home-preview-g" element={<HomePreviewG />} />
          <Route path="/home-preview-h" element={<HomePreviewH />} />
          <Route path="/home-preview-i" element={<HomePreviewI />} />
          <Route path="/home-preview-j" element={<HomePreviewJ />} />
          <Route path="/home-preview-k" element={<HomePreviewK />} />
          <Route path="/home-preview-l" element={<HomePreviewL />} />
          <Route path="/home-preview-m" element={<HomePreviewM />} />
          <Route path="/home-preview-n" element={<HomePreviewN />} />
          <Route path="/home-preview-o" element={<HomePreviewO />} />
          <Route path="/home-preview-p" element={<HomePreviewP />} />
          <Route path="/home-preview-q" element={<HomePreviewQ />} />
          <Route path="/home-preview-r" element={<HomePreviewR />} />
          <Route path="/uipass-home-sample" element={<HomepageSample />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/tools/link-in-bio" element={<LinkInBioPage />} />
          <Route path="/tools/scheduling" element={<SchedulingPage />} />
          <Route path="/tools/solve" element={<SolvePage />} />
          {/* Arena - hidden for now (not deleted). Routes redirect home so the
              pages are not reachable; components and API are retained. */}
          <Route path="/arena" element={<Navigate to="/" replace />} />
          <Route path="/arena/leaderboard" element={<Navigate to="/" replace />} />
          <Route path="/arena/submit" element={<Navigate to="/" replace />} />
          <Route path="/arena/:id" element={<Navigate to="/" replace />} />
          <Route path="/developers" element={<DevelopersPage />} />
          <Route path="/developers/docs" element={<DeveloperDocsPage />} />
          <Route path="/developers/submit" element={<DeveloperSubmitPage />} />
          <Route path="/faq" element={<FAQPage />} />
          {/* Legacy /settings redirects into the admin shell */}
          <Route path="/settings" element={<Navigate to="/admin/settings" replace />} />
          {/* Platform connector flow: /connect/:platform handles both connect + OAuth callback */}
          <Route path="/connect/:platform" element={<ConnectPage />} />
          <Route path="/developers/vibe-coding" element={<VibeCodingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/backstagepass" element={<Navigate to="/admin/keychain" replace />} />
          {/* Core product pages */}
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/apps/:slug" element={<AppDetailPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          {/* Product brochure pages (public marketing; interactive surfaces live under /admin) */}
          <Route path="/skills" element={<BrochurePage slug="skills" />} />
          <Route path="/orchestrator" element={<BrochurePage slug="orchestrator" />} />
          <Route path="/passport" element={<BrochurePage slug="passport" />} />
          <Route path="/seats" element={<BrochurePage slug="seats" />} />
          <Route path="/autopilot" element={<BrochurePage slug="autopilot" />} />
          <Route path="/xgate" element={<BrochurePage slug="xgate" />} />
          <Route path="/jobs" element={<BrochurePage slug="jobs" />} />
          <Route path="/control-tower" element={<BrochurePage slug="control-tower" />} />
          <Route path="/ledger" element={<BrochurePage slug="ledger" />} />
          <Route path="/workers" element={<BrochurePage slug="workers" />} />
          <Route path="/jobsmith" element={<JobsmithPage />} />
          <Route path="/memory" element={<MemoryPage />} />
          {/* /memory/admin redirects to the new admin shell */}
          <Route path="/memory/admin" element={<Navigate to="/admin/memory" replace />} />
          <Route path="/memory/setup" element={<MemorySetupPage />} />
          <Route path="/memory/connect" element={<MemoryConnectPage />} />
          <Route path="/memory/setup-guide" element={<MemorySetupGuidePage />} />
          {/* Alias under /admin/ for forward compat with the admin shell */}
          <Route path="/admin/setup-guide" element={<MemorySetupGuidePage />} />
          {/* Phase 3: Admin shell with five surfaces */}
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminShell />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="you" element={<AdminYou />} />
            <Route path="memory" element={<AdminMemory />} />
            <Route path="keychain" element={<AdminKeychain />} />
            <Route path="apps" element={<AdminTools />} />
            <Route path="tools" element={<Navigate to="/admin/apps" replace />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="activity" element={<AdminActivity />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="autopilot" element={<AdminAutopilot />} />
            <Route path="autopilot/expressbuild" element={<AdminExpressBuild />} />
            <Route path="agents"     element={<AdminAgentsPage />} />
            <Route path="agents/api" element={<AdminSeatsApi />} />
            <Route path="agents/api/routing" element={<AdminSeatsApiRouting />} />
            <Route path="agents/api/usage" element={<AdminSeatsApiUsage />} />
            <Route path="agents/local" element={<AdminSeatsLocal />} />
            <Route path="agents/subscription" element={<AdminSeatsSubscription />} />
            <Route path="agents/heartbeat" element={<AdminSeatHeartbeatPage />} />
            <Route path="workers" element={<AdminWorkers />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="controltower" element={<AdminControlTower />} />
            <Route path="jobsmith" element={<AdminJobsmith />} />
            <Route path="todos" element={<Navigate to="/admin/jobs" replace />} />
            <Route path="checks" element={<AdminChecks />} />
            <Route path="checks/:productId" element={<AdminChecks />} />
            <Route path="ledger" element={<AdminLedger />} />
            <Route path="billing" element={<AdminBilling />} />
            <Route path="testpass"              element={<TestPassCatalog />} />
            <Route path="testpass/new"          element={<NewRunWizard />} />
            <Route path="testpass/runs/:id"     element={<RunDetail />} />
            <Route path="testpass/packs/:id/edit" element={<AdminTestPass />} />
            <Route path="testpass/reports"      element={<Navigate to="/admin/testpass" replace />} />
            <Route path="testpass/reports/:id"  element={<ReportDetail />} />
            <Route path="copypass"              element={<CopyPassCatalog />} />
            <Route path="crews"          element={<CrewsCatalog />} />
            <Route path="crews/new"      element={<CrewComposer />} />
            <Route path="crews/:id/edit" element={<CrewComposer />} />
            <Route path="crews/runs"          element={<CrewsRuns />} />
            <Route path="crews/runs/:runId"  element={<CrewRun />} />
            <Route path="crews/settings"      element={<CrewsSettings />} />
            {/* End-user visible read-only continuity surface */}
            <Route path="orchestrator"   element={<AdminOrchestratorPage />} />
            <Route path="orchestrator/story" element={<Navigate to="/admin/orchestrator" replace />} />
            <Route path="orchestrator/timeline" element={<AdminOrchestratorPage />} />
            <Route path="orchestrator/log" element={<AdminOrchestratorLog />} />
            {/* Admin-only surfaces (wrapped in RequireAdmin; also hidden from non-admin sidebar) */}
            <Route path="analytics"      element={<RequireAdmin><AdminAnalytics /></RequireAdmin>} />
            <Route path="codebase"       element={<RequireAdmin><AdminCodebase /></RequireAdmin>} />
            <Route path="users"          element={<RequireAdmin><AdminUsers /></RequireAdmin>} />
            <Route path="system-health"  element={<RequireAdmin><AdminSystemHealth /></RequireAdmin>} />
            <Route path="pinballwake"    element={<RequireAdmin><AdminPinballWake /></RequireAdmin>} />
            <Route path="moderation"     element={<RequireAdmin><AdminModeration /></RequireAdmin>} />
            <Route path="audit-log"      element={<RequireAdmin><AdminAuditLog /></RequireAdmin>} />
            <Route path="brainmap"       element={<RequireAdmin><AdminBrainmap /></RequireAdmin>} />
            <Route path="app-testing"    element={<RequireAdmin><AdminAppTesting /></RequireAdmin>} />
            <Route path="benchmarks"     element={<RequireAdmin><AdminBenchmarks /></RequireAdmin>} />
            <Route path="truth-rate"     element={<RequireAdmin><AdminTruthRate /></RequireAdmin>} />
            <Route path="xgate"          element={<RequireAdmin><AdminXGate /></RequireAdmin>} />
            <Route path="signals"          element={<SignalsCatalog />} />
            <Route path="signals/settings" element={<SignalsSettings />} />
            <Route path="boardroom"        element={<Boardroom />} />
            <Route path="fishbowl"         element={<Navigate to="/admin/boardroom" replace />} />
          </Route>
          {/* Phase 2 auth surface */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/pair/connected" element={<PairingCompletePage />} />
          <Route path="/auth/verify-mfa" element={<VerifyMfaPage />} />
          <Route path="/organiser" element={<OrganiserPage />} />
          <Route path="/dispatch" element={<DispatchPage />} />
          <Route path="/crews" element={<CrewsPage />} />
          <Route path="/xpass" element={<XPassPage />} />
          <Route path="/dogfood" element={<DogfoodReportPage />} />
          {/* BuildDesk: hidden 2026-05-28. Developer dispatch surface
              for AI coding workers, paused until the developer marketplace
              chapter is ready. Page component retained; route redirected. */}
          <Route path="/build" element={<Navigate to="/" replace />} />
          <Route path="/new-to-ai" element={<NewToAIPage />} />
          <Route path="/why" element={<WhyPage />} />
          <Route path="/smarthome" element={<SmartHomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          {/* Install ticket recovery: fresh 24h code for returning users */}
          <Route path="/i" element={<InstallRecoverPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
