'use client';

import { useEffect, useState, useRef } from "react";
import { AGENTS, type Agent } from "@/data/agents";

const TERMINAL_LINES = [
  { text: '> agent match --task "make a music video"', type: 'cmd' as const },
  { text: '  ✓ analysing task: music video production', type: 'success' as const },
  { text: '  ──────────────────────────────────', type: 'divider' as const },
  { text: '  top matches for your task:', type: 'output' as const },
  { text: '  • Suno — full song generation', type: 'match' as const },
  { text: '  • Runway Gen-3 — video production', type: 'match' as const },
  { text: '  • Pika 2.0 — motion control & lip sync', type: 'match' as const },
  { text: '  ──────────────────────────────────', type: 'divider' as const },
  { text: '> agent match --category image-gen --budget free', type: 'cmd' as const },
  { text: '  ✓ filtering: image generation, free tier', type: 'success' as const },
  { text: '  • Stable Diffusion 3.5 — self-host, open', type: 'match' as const },
  { text: '  • Flux Pro — fast, high-quality', type: 'match' as const },
  { text: '  • Leonardo AI — freemium, game assets', type: 'match' as const },
];

function TerminalAnimation() {
  const [displayed, setDisplayed] = useState<{ text: string; className: string }[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let currentText = "";
    let currentClassName = "";

    const type = () => {
      if (lineIdx >= TERMINAL_LINES.length) return;

      const line = TERMINAL_LINES[lineIdx];
      const cls =
        line.type === 'cmd' ? 'opacity-50' :
        line.type === 'divider' ? 'text-accent' :
        line.type === 'success' || line.type === 'output' ? 'text-accent' :
        line.type === 'match' ? 'text-accent opacity-90' : '';

      if (charIdx === 0) {
        currentClassName = cls;
        currentText = "";
      }

      if (charIdx < line.text.length) {
        currentText += line.text[charIdx];
        charIdx++;
        setDisplayed(prev => {
          const updated = [...prev];
          if (updated.length > lineIdx) {
            updated[lineIdx] = { text: currentText, className: currentClassName };
          } else {
            updated.push({ text: currentText, className: currentClassName });
          }
          return updated;
        });
        const speed = line.type === 'divider' ? 8 : 20 + Math.random() * 30;
        setTimeout(type, speed);
      } else {
        lineIdx++;
        charIdx = 0;
        const delay = lineIdx < TERMINAL_LINES.length ? 300 + Math.random() * 200 : 0;
        setTimeout(type, delay);
      }

      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    };

    const timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="terminal-body" ref={terminalRef}>
      {displayed.map((line, i) => (
        <div key={i} className={line.className}>{line.text}</div>
      ))}
      <span className="opacity-50">&gt; <span className="inline-block w-[1ch] h-[1em] bg-current animate-pulse"></span></span>
    </div>
  );
}

function SpotlightCards() {
  const [picks, setPicks] = useState<Agent[]>([]);

  useEffect(() => {
    const shuffle = () => [...AGENTS].sort(() => Math.random() - 0.5).slice(0, 2);
    setPicks(shuffle());
    const interval = setInterval(() => setPicks(shuffle()), 5000);
    return () => clearInterval(interval);
  }, []);

  const tagClass = (v: string) =>
    v === 'Free (Open)' || v === 'Free' ? 'tag-free' :
    v === 'Freemium' ? 'tag-freemium' : 'tag-paid';

  return (
    <div className="spotlight-cards relative z-10">
      {picks.map((agent) => (
        <a
          key={agent.name}
          href={agent.url}
          target="_blank"
          rel="noopener noreferrer"
          className="spotlight-card"
        >
          <div className="spotlight-card-name">{agent.name}</div>
          <div className="spotlight-card-desc">{agent.description}</div>
          <div className="spotlight-card-footer">
            <span className="cat-tag">{agent.category}</span>
            <span className={`pricing-tag ${tagClass(agent.pricing)}`}>{agent.pricing}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

export function SplineDemoSection() {
  return (
    <div className="demo-section terminal-section">
      <div className="terminal-panel">
        <div className="terminal-header">
          <div className="flex gap-1.5">
            <span className="terminal-dot"></span>
            <span className="terminal-dot"></span>
            <span className="terminal-dot"></span>
          </div>
          <span className="terminal-title">Agent Match — Match Engine</span>
        </div>
        <TerminalAnimation />
      </div>
      <div className="terminal-panel border-l-0 relative min-h-[420px] flex flex-col">
        <SpotlightCards />
        <small className="spotlight-label absolute right-3 bottom-2">Featured Agents</small>
      </div>
    </div>
  );
}
