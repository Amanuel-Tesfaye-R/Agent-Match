'use client';

import { useState, useMemo } from "react";
import { AGENTS, CATEGORIES, type Agent } from "@/data/agents";

function PricingTag({ pricing }: { pricing: string }) {
  const cls =
    pricing === "Free (Open)" || pricing === "Free" ? "tag-free" :
    pricing === "Freemium" ? "tag-freemium" : "tag-paid";
  return <span className={`pricing-tag ${cls}`}>{pricing}</span>;
}

const PRICING_OPTIONS = [
  { key: "all", label: "All" },
  { key: "free", label: "Free" },
  { key: "paid", label: "Paid" },
];

export function AgentTableSection() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [viewAll, setViewAll] = useState(false);

  const filtered = useMemo(() => {
    let result = [...AGENTS];

    // Category filter
    if (filter !== "all") {
      if (filter === "free") {
        result = result.filter(
          (a) =>
            a.pricing.toLowerCase().includes("free") ||
            a.pricing.toLowerCase() === "freemium"
        );
      } else if (filter === "paid") {
        result = result.filter(
          (a) =>
            !a.pricing.toLowerCase().includes("free") &&
            a.pricing.toLowerCase() !== "freemium"
        );
      } else {
        result = result.filter((a) => a.category === filter);
      }
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.best_for.toLowerCase().includes(q) ||
          a.pricing.toLowerCase().includes(q)
      );
    }

    return result;
  }, [filter, search]);

  const displayAgents = useMemo(() => {
    if (viewAll) return filtered;
    return filtered.slice(0, 10);
  }, [filtered, viewAll]);

  return (
    <div className="table-wrap my-8">
      <div className="grid-12">
        <div className="grid-cell border-b" style={{ gridColumn: "span 12" }}>
          <small className="tracking-xl font-bold text-xs p-4 block">
            Agent Directory
          </small>
        </div>
      </div>

      {/* Category filter */}
      <div className="category-filter border-b">
        <button
          className={`cat-pill ${filter === "all" ? "active" : ""}`}
          onClick={() => { setFilter("all"); setViewAll(false); }}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`cat-pill ${filter === cat ? "active" : ""}`}
            onClick={() => { setFilter(cat); setViewAll(false); }}
          >
            {cat === "LLMs & Chat"
              ? "LLMs & Chat"
              : cat === "Image Generation"
              ? "Image"
              : cat === "Video Generation"
              ? "Video"
              : cat === "Music & Audio"
              ? "Music & Audio"
              : cat === "Code & Development"
              ? "Code & Dev"
              : cat === "Video & Image Editing"
              ? "Editing"
              : cat === "Research & Search"
              ? "Research"
              : cat === "Productivity & Writing"
              ? "Productivity"
              : cat === "Speech & Voice"
              ? "Speech & Voice"
              : cat === "3D & Design"
              ? "3D & Design"
              : cat === "Data & Analytics"
              ? "Data"
              : cat}
          </button>
        ))}
        {PRICING_OPTIONS.slice(1).map((opt) => (
          <button
            key={opt.key}
            className={`cat-pill ${filter === opt.key ? "active" : ""}`}
            onClick={() => { setFilter(opt.key); setViewAll(false); }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="search-wrap">
        <i className="fas fa-search search-icon"></i>
        <input
          className="search-bar"
          type="text"
          placeholder="Search agents..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setViewAll(false); }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="agent-table">
          <thead>
            <tr>
              <th style={{ minWidth: "11rem" }}>Agent</th>
              <th>Category</th>
              <th style={{ minWidth: "18rem" }}>Capability</th>
              <th>Pricing</th>
              <th style={{ minWidth: "12rem" }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            {displayAgents.map((agent) => (
              <AgentRow key={agent.name} agent={agent} />
            ))}
          </tbody>
        </table>
      </div>

      {/* View All / View Less */}
      {filtered.length > 10 && (
        <button
          className="view-all-btn"
          onClick={() => setViewAll(!viewAll)}
        >
          {viewAll
            ? "View Less"
            : `View All (${filtered.length} items)`}
        </button>
      )}
    </div>
  );
}

function AgentRow({ agent }: { agent: Agent }) {
  return (
    <tr
      className="cursor-pointer"
      onClick={() => window.open(agent.url, "_blank", "noopener")}
    >
      <td>
        <a
          href={agent.url}
          target="_blank"
          rel="noopener noreferrer"
          className="agent-link"
          onClick={(e) => e.stopPropagation()}
        >
          {agent.name} ↗
        </a>
      </td>
      <td>
        <small className="opacity-50 tracking-wider text-xs">
          {agent.category}
        </small>
      </td>
      <td>
        <span className="agent-desc">{agent.description}</span>
      </td>
      <td>
        <PricingTag pricing={agent.pricing} />
      </td>
      <td>
        <span className="agent-desc opacity-80">{agent.best_for}</span>
      </td>
    </tr>
  );
}
