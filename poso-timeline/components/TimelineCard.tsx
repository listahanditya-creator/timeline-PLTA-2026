"use client";

import { useState } from "react";
import { TimelineEvent, CATEGORY_COLORS } from "@/data/timeline";

interface Props {
  event: TimelineEvent;
  position: "above" | "below";
}

export default function TimelineCard({ event, position }: Props) {
  const [hovered, setHovered]   = useState(false);
  const [pinned,  setPinned]    = useState(false);   // click to lock open
  const expanded = hovered || pinned;

  const colors = CATEGORY_COLORS[event.category];

  return (
    <div
      className={`absolute ${
        position === "above" ? "bottom-[calc(100%+20px)]" : "top-[calc(100%+20px)]"
      } left-0`}
      style={{ width: "320px", zIndex: pinned ? 50 : expanded ? 30 : 10 }}
    >
      {/* Connector line */}
      <div
        className={`absolute left-[10px] ${
          position === "above" ? "bottom-[-20px]" : "top-[-20px]"
        } w-px`}
        style={{ height: "20px", backgroundColor: colors.dot, opacity: 0.5 }}
      />

      <div
        className="relative select-none"
        style={{
          border: `1.5px solid ${expanded ? colors.dot : colors.border}`,
          backgroundColor: colors.bg,
          boxShadow: pinned
            ? `0 8px 32px 0 ${colors.dot}44`
            : expanded
            ? `0 4px 20px 0 ${colors.dot}28`
            : `0 1px 6px 0 ${colors.dot}18`,
          transition: "box-shadow 0.2s ease, border-color 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setPinned((p) => !p)}
      >
        {/* Left colour bar */}
        <div className="absolute top-0 left-0 bottom-0 w-[3px]" style={{ backgroundColor: colors.dot }} />

        <div className="pl-4 pr-3 py-3">
          {/* Year */}
          <p style={{ fontFamily: "var(--font-ocr)", fontSize: "24px", letterSpacing: "0.04em", color: "#E94B3F", marginBottom: "2px", lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
            {event.year}
          </p>

          {/* Date */}
          {event.date && (
            <p style={{ fontFamily: "var(--font-ocr)", fontSize: "11px", letterSpacing: "0.08em", color: "#E94B3F", opacity: 0.75, marginBottom: "6px" }}>
              {event.date}
            </p>
          )}

          {/* Category label */}
          <p style={{ fontFamily: "var(--font-hanken)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(26,18,8,0.55)", marginBottom: "8px" }}>
            {CATEGORY_COLORS[event.category].label}
          </p>

          {/* Key event title */}
          <h3 style={{ fontFamily: "var(--font-hanken)", fontSize: "18px", fontWeight: 700, lineHeight: 1.3, color: "#1a1208", marginBottom: expanded ? "10px" : "6px" }}>
            {event.keyEvent}
          </h3>

          {/* Description — scrollable inner area when expanded */}
          {expanded && (
            <div>
              {/* Scrollable description box */}
              <div
                style={{
                  maxHeight: "260px",
                  overflowY: "auto",
                  paddingRight: "6px",
                  marginBottom: "8px",
                  scrollbarWidth: "thin",
                  scrollbarColor: `${colors.dot} transparent`,
                }}
                onClick={(e) => e.stopPropagation()} // let scroll work without toggling pin
              >
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", lineHeight: 1.75, color: "rgba(26,18,8,0.82)", whiteSpace: "pre-line" }}>
                  {event.description}
                </p>

                {event.archive && (
                  <a
                    href={event.archive}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-block", marginTop: "12px", fontFamily: "var(--font-ocr)", fontSize: "9px", letterSpacing: "0.1em", color: colors.dot, textDecoration: "none", borderBottom: `1px solid ${colors.dot}`, paddingBottom: "1px" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    SOURCE →
                  </a>
                )}
              </div>

              {/* Pin indicator */}
              <p style={{ fontFamily: "var(--font-ocr)", fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,18,8,0.25)" }}>
                {pinned ? "click to close" : "click to pin open"}
              </p>
            </div>
          )}

          {!expanded && (
            <p style={{ fontFamily: "var(--font-ocr)", fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,18,8,0.22)", marginTop: "2px" }}>
              hover / click to read
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
