"use client";

import { useState } from "react";
import { TimelineEvent, CATEGORY_COLORS } from "@/data/timeline";

interface Props {
  event: TimelineEvent;
  position: "above" | "below";
}

export default function TimelineCard({ event, position }: Props) {
  const [expanded, setExpanded] = useState(false);
  const colors = CATEGORY_COLORS[event.category];

  return (
    <div
      className={`absolute ${position === "above" ? "bottom-[calc(100%+24px)]" : "top-[calc(100%+24px)]"} left-0`}
      style={{ width: "260px" }}
    >
      {/* Connector line from dot to card */}
      <div
        className={`absolute left-[12px] ${position === "above" ? "bottom-[-24px]" : "top-[-24px]"} w-px`}
        style={{
          height: "24px",
          backgroundColor: colors.dot,
          opacity: 0.6,
        }}
      />

      <div
        className="relative cursor-pointer select-none"
        style={{
          border: `1px solid ${expanded ? colors.dot : "rgba(255,255,255,0.15)"}`,
          backgroundColor: expanded ? "rgba(255,255,255,0.04)" : "transparent",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Colour accent bar on left */}
        <div
          className="absolute top-0 left-0 bottom-0 w-[2px]"
          style={{ backgroundColor: colors.dot }}
        />

        <div className="pl-4 pr-3 py-3">
          {/* Date */}
          <p
            className="text-[10px] tracking-[0.15em] uppercase mb-1"
            style={{
              fontFamily: "var(--font-hanken)",
              color: colors.dot,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {event.date ? `${event.year} · ${event.date}` : event.year}
          </p>

          {/* Category label */}
          <p
            className="text-[9px] tracking-[0.12em] uppercase mb-2"
            style={{
              fontFamily: "var(--font-hanken)",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {CATEGORY_COLORS[event.category].label}
          </p>

          {/* Key event title */}
          <h3
            className="text-[12px] leading-snug font-medium text-white mb-2"
            style={{ fontFamily: "var(--font-hanken)", fontWeight: 500 }}
          >
            {event.keyEvent}
          </h3>

          {/* Description — expands on hover */}
          <div
            className="overflow-hidden"
            style={{
              maxHeight: expanded ? "400px" : "0px",
              transition: "max-height 0.3s ease",
            }}
          >
            <p
              className="text-[11px] leading-relaxed whitespace-pre-line pb-1"
              style={{
                fontFamily: "var(--font-inter)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {event.description}
            </p>

            {event.archive && (
              <a
                href={event.archive}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-[9px] tracking-widest uppercase"
                style={{
                  color: colors.dot,
                  textDecoration: "none",
                  borderBottom: `1px solid ${colors.dot}`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                Source →
              </a>
            )}
          </div>

          {!expanded && (
            <p
              className="text-[9px] tracking-widest uppercase mt-1"
              style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-hanken)" }}
            >
              hover to read
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
