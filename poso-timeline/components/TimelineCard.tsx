"use client";

import { useState } from "react";
import { TimelineEvent, CATEGORY_COLORS } from "@/data/timeline";

interface Props {
  event: TimelineEvent;
  side: "left" | "right";
}

export default function TimelineCard({ event, side }: Props) {
  const [expanded, setExpanded] = useState(false);
  const colors = CATEGORY_COLORS[event.category];

  const isSubtitle = event.category === "subtitle";

  if (isSubtitle) {
    return (
      <div className="relative flex items-center justify-center my-10 w-full">
        <div className="absolute inset-x-0 h-px bg-stone-300" />
        <div
          className="relative z-10 px-8 py-3 mx-auto max-w-2xl text-center"
          style={{ backgroundColor: "#F5F0E8", border: `1.5px solid ${colors.border}` }}
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase text-stone-600"
            style={{ fontFamily: "var(--font-hanken)" }}
          >
            {event.year}
          </p>
          <h3
            className="mt-1 text-base font-bold text-stone-800 leading-snug"
            style={{ fontFamily: "var(--font-hanken)" }}
          >
            {event.keyEvent}
          </h3>
          {event.description && (
            <p
              className="mt-2 text-xs text-stone-600 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {event.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${side === "right" ? "justify-end" : "justify-start"} w-full`}
    >
      <div
        className={`
          relative w-[42%] cursor-pointer
          transition-all duration-300 ease-in-out
          ${expanded ? "shadow-lg scale-[1.02]" : "shadow-sm hover:shadow-md hover:scale-[1.01]"}
        `}
        style={{
          backgroundColor: colors.bg,
          border: `1.5px solid ${colors.border}`,
          fontFamily: "var(--font-inter)",
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Tape strip at top */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 opacity-60"
          style={{ backgroundColor: colors.border }}
        />

        <div className="p-4 pt-5">
          {/* Year + date */}
          <div className="flex items-baseline gap-2 mb-1">
            <span
              className="text-sm font-700 tracking-wide"
              style={{ fontFamily: "var(--font-hanken)", color: colors.dot, fontWeight: 700 }}
            >
              {event.year}
            </span>
            {event.date && (
              <span
                className="text-xs text-stone-500"
                style={{ fontFamily: "var(--font-hanken)" }}
              >
                {event.date}
              </span>
            )}
          </div>

          {/* Category dot */}
          <div className="flex items-center gap-1.5 mb-2">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: colors.dot }}
            />
            <span className="text-[10px] uppercase tracking-widest text-stone-400">
              {CATEGORY_COLORS[event.category].label}
            </span>
          </div>

          {/* Key event */}
          <h3
            className="text-sm font-600 text-stone-800 leading-snug mb-2"
            style={{ fontFamily: "var(--font-hanken)", fontWeight: 600 }}
          >
            {event.keyEvent}
          </h3>

          {/* Description — always visible but truncated, expand on hover */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              expanded ? "max-h-[600px]" : "max-h-12"
            }`}
          >
            <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Archive link */}
          {expanded && event.archive && (
            <a
              href={event.archive}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-[10px] underline text-stone-500 hover:text-stone-700 break-all"
              onClick={(e) => e.stopPropagation()}
            >
              → Archive / Source
            </a>
          )}

          {!expanded && (
            <p className="mt-1 text-[10px] text-stone-400 italic">hover to expand</p>
          )}
        </div>
      </div>
    </div>
  );
}
