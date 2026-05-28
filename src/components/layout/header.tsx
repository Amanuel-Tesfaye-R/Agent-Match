'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/agents", label: "Agents" },
    { href: "/agents", label: "Match" },
  ];

  return (
    <>
      {/* Desktop header */}
      <header className="grid-12 border-y desktop-header">
        <div className="grid-cell" style={{ gridColumn: "span 3" }}>
          <Link href="/" className="no-underline text-inherit">
            <h2 className="logo-text">Agent<br />Match</h2>
          </Link>
        </div>
        {navLinks.map((link) => (
          <div
            key={link.href + link.label}
            className="grid-cell flex items-center"
            style={{ gridColumn: "span 2" }}
          >
            <Link
              href={link.href}
              className={`nav-link ${pathname === link.href ? "opacity-100" : ""}`}
            >
              {link.label}
              <span className="blink" style={{
                display: pathname === link.href ? "inline-block" : "none",
                width: "1.2ch",
                height: "1.1em",
                marginLeft: "0.25rem",
                marginBottom: "-0.15em",
                background: "currentColor",
                animation: "blink-anim 1s step-end infinite",
                verticalAlign: "middle",
              }}></span>
            </Link>
          </div>
        ))}
        <div
          className="grid-cell flex items-center justify-between"
          style={{ gridColumn: "span 3" }}
        >
          <small className="tracking-xl opacity-50 text-xs">Socials</small>
          <div className="flex gap-3">
            <a href="https://github.com/Amanuel-Tesfaye-R" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity text-inherit">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href="https://t.me/Fuzzyy_Shot" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity text-inherit">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile header */}
      <div className="mobile-header">
        <Link href="/" className="no-underline text-inherit">
          <h2 className="logo-text">Agent<br />Match</h2>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <i className={`fas ${mobileOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col border border-t-0 px-4 pb-4 mb-8 mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="nav-link py-3 border-b border-border last:border-b-0"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <small className="tracking-xl opacity-50 text-xs pt-3 pb-2 block">Socials</small>
          <div className="flex gap-3 pb-2">
            <a href="https://github.com/Amanuel-Tesfaye-R" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity text-inherit">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href="https://t.me/Fuzzyy_Shot" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity text-inherit">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </div>
        </nav>
      )}
    </>
  );
}
