'use client';

import { useState } from "react";

export function HeroSection({ layout = "centered" }: { layout?: "centered" | "split" }) {
  const isSplit = layout === "split";
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);

  const copy = async (text: string, setter: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 1500);
    } catch {}
  };

  return (
    <div className={`hero flex flex-col ${isSplit ? "items-start justify-center text-left h-full py-8 pr-8" : "items-center justify-center text-center py-16"} gap-6`}>
      <div className="fade-in">
        <small className="hero-tag">Curated Directory • 70+ Agents</small>
        <span className="hero-title mix-lighter block">
          Find Your AI.<br />The Agent That Fits Your Flow.
        </span>
      </div>
      <div className="fade-in">
        <p className={`hero-desc ${isSplit ? "max-w-[480px]" : ""}`}>
          Not a list of wrappers around the same API. A living directory of specialised AI agents — video creators, music composers, coding partners, research assistants, and everything in between. Tell us what you need. We will point you to the right tool.
        </p>
      </div>
      <div className={`fade-in flex flex-col ${isSplit ? "items-start" : "items-center"} gap-2 w-full max-w-[520px]`}>
        <div className="code-block-wrap">
          <div className="flex justify-between items-center mb-1">
            <small className="tracking-xl opacity-50 text-xs">1. Describe</small>
            <button className="copy-btn" onClick={() => copy('agent match --task "generate a music video for my song"', setCopied1)}>
              {copied1 ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="code-block">
            <code>agent match --task &quot;generate a music video for my song&quot;</code>
          </div>
        </div>
        <div className="code-block-wrap" style={{ marginTop: "0.5rem" }}>
          <div className="flex justify-between items-center mb-1">
            <small className="tracking-xl opacity-50 text-xs">2. Discover</small>
            <button className="copy-btn" onClick={() => copy('agent match --category image-generation --budget free', setCopied2)}>
              {copied2 ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="code-block">
            <code>agent match --category image-generation --budget free</code>
          </div>
        </div>
      </div>
    </div>
  );
}
