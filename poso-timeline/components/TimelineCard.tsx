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
      className={`absolute ${
        position === "above" ? "bottom-[calc(100%+20px)]" : "top-[calc(100%+20px)]"
      } left-0`}
      style={{ width: "250px" }}
    >
      {/* Connector line from dot to card */}
      <div
        className={`absolute left-[10px] ${
          position === "above" ? "bottom-[-20px]" : "top-[-20px]"
        } w-px`}
        style={{ height: "20px", backgroundColor: colors.dot, opacity: 0.5 }}
      />

      <div
        className="relative cursor-pointer select-none"
        style={{
          border: `1.5px solid ${expanded ? colors.dot : colors.border}`,
          backgroundColor: expanded ? colors.bg : "#FFFBE9",
          boxShadow: expanded
            ? `0 4px 24px 0 ${colors.dot}22`
            : "0 1px 4px 0 rgba(0,0,0,0.06)",
          transition: "all 0.22s ease",
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Left colour accent bar */}
        <div
          className="absolute top-0 left-0 bottom-0 w-[3px]"
          style={{ backgroundColor: colors.dot }}
        />

        <div className="pl-4 pr-3 py-3">
          {/* Year · date */}
          <p
            className="text-[10px] tracking-[0.14em] uppercase mb-1"
            style={{
              fontFamily: "var(--font-hanken)",
              color: colors.dot,
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {event.date ? `${event.year} · ${event.date}` : event.year}
          </p>

          {/* Category label */}
          <p
            className="text-[9px] tracking-[0.1em] uppercase mb-2"
            style={{
              fontFamily: "var(--font-hanken)",
              color: "rgba(26,18,8,0.35)",
            }}
          >
            {CATEGORY_COLORS[event.category].label}
          </p>

          {/* Key event title */}
          <h3
            className="text-[12px] leading-snug"
            style={{
              fontFamily: "var(--font-hanken)",
              fontWeight: 600,
              color: "#1a1208",
              marginBottom: expanded ? "8px" : "4px",
            }}
          >
            {event.keyEvent}
          </h3>

          {/* Description — expands on hover */}
          <div
            className="overflow-hidden"
            style={{
              maxHeight: expanded ? "500px" : "0px",
              transition: "max-height 0.3s ease",
            }}
          >
            <p
              className="text-[11px] leading-relaxed whitespace-pre-line"
              style={{
                fontFamily: "var(--font-inter)",
                color: "rgba(26,18,8,0.65)",
              }}
            >
              {event.description}
            </p>

            {event.archive && (
              <a
                href={event.archive}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-[9px] tracking-widest uppercase"
                style={{
                  color: colors.dot,
                  textDecoration: "none",
                  borderBottom: `1px solid ${colors.dot}`,
                  paddingBottom: "1px",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                Source →
              </a>
            )}
          </div>

          {!expanded && (
            <p
              className="text-[9px] tracking-widest uppercase"
              style={{
                color: "rgba(26,18,8,0.2)",
                fontFamily: "var(--font-hanken)",
              }}
            >
              hover to read
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
