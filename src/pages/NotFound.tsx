import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { presets } from "@/lib/design-system";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // One effect owns title + robots: capture whatever was there, set the 404
  // state, restore the captured values on unmount. No hardcoded tagline, so
  // this page can never reintroduce a second product line.
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "404: Page not found | UnClick";

    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    let created = false;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
      created = true;
    }
    const prevRobots = meta.getAttribute("content");
    meta.setAttribute("content", "noindex, nofollow");

    return () => {
      document.title = prevTitle;
      if (created) {
        meta!.remove();
      } else if (prevRobots !== null) {
        meta!.setAttribute("content", prevRobots);
      }
    };
  }, []);

  return (
    <div className={presets.page}>
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 pb-32 pt-40 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">404</p>
        <h1 className={`mt-4 ${presets.h1Product}`}>Page not found</h1>
        <p className="mt-4 text-lg leading-relaxed text-body">
          This page doesn't exist, or maybe it moved.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/" className={presets.ctaPrimary}>
            Go home
          </Link>
          <Link to="/apps" className={presets.ctaGhost}>
            Browse apps
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
