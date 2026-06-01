import { Link } from "react-router-dom";

/**
 * Footer (Apple-inspired polish pass, 2026-05-28).
 *
 * Restrained four-column footer. Same token system as the rest of the site.
 * Pricing kept in Resources for now while the pricing chapter is paused.
 */

const PRODUCT_LINKS = [
  { label: "Apps", href: "/apps" },
  { label: "Memory", href: "/memory" },
  { label: "Connections", href: "/admin/keychain" },
  { label: "XPass", href: "/dogfood" },
];

const RESOURCES_LINKS = [
  { label: "Docs", href: "/docs" },
  { label: "FAQ", href: "/faq" },
  { label: "Pricing", href: "/pricing" },
  { label: "New to AI", href: "/new-to-ai" },
];

const COMPANY_LINKS = [
  { label: "Contact", href: "mailto:hello@unclick.world" },
  { label: "GitHub", href: "https://github.com/malamutemayhem/unclick", external: true },
  { label: "npm", href: "https://www.npmjs.com/package/@unclick/mcp-server", external: true },
];

const LEGAL_LINKS = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

function FooterLinkGroup({ title, links }: { title: string; links: readonly FooterLink[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-custom">
        {title}
      </span>
      {links.map((link) =>
        link.external ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-6 items-center text-xs text-muted-custom transition-colors hover:text-body"
          >
            {link.label}
          </a>
        ) : link.href.startsWith("mailto:") ? (
          <a
            key={link.label}
            href={link.href}
            className="inline-flex min-h-6 items-center text-xs text-muted-custom transition-colors hover:text-body"
          >
            {link.label}
          </a>
        ) : (
          <Link
            key={link.label}
            to={link.href}
            className="inline-flex min-h-6 items-center text-xs text-muted-custom transition-colors hover:text-body"
          >
            {link.label}
          </Link>
        )
      )}
    </div>
  );
}

const Footer = () => (
  <footer className="border-t border-border/60 px-6 py-16">
    <div className="container mx-auto max-w-5xl">
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-5">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-1">
          <Link to="/" aria-label="UnClick home" className="inline-flex min-h-6 items-center">
            <img src="/logo-wordmark.svg" alt="UnClick" style={{ height: "2.4rem" }} className="w-auto" />
          </Link>
          <p className="mt-3 text-xs text-muted-custom leading-relaxed">
            The universal remote for AI.
            <br />
            Built in Melbourne, Australia.
          </p>
        </div>

        <FooterLinkGroup title="Product" links={PRODUCT_LINKS} />
        <FooterLinkGroup title="Resources" links={RESOURCES_LINKS} />
        <FooterLinkGroup title="Company" links={COMPANY_LINKS} />
        <FooterLinkGroup title="Legal" links={LEGAL_LINKS} />
      </div>

      <div className="mt-12 border-t border-border/40 pt-6 text-center">
        <span className="text-xs text-muted-custom">
          &copy; 2026 UnClick Pty Ltd. All rights reserved.
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
