"use client";

import { useState, useRef } from "react";
import { TimelineEvent, CATEGORY_COLORS } from "@/data/timeline";

interface Props {
  event: TimelineEvent;
  position: "above" | "below";
}

export default function TimelineCard({ event, position }: Props) {
  const [hovered, setHovered] = useState(false);
  const [pinned,  setPinned]  = useState(false);
  const expanded = hovered || pinned;

  // Track mousedown position to distinguish click from drag
  const mouseDownPos = useRef<{ x: number; y: number } | null>(null);

  const colors = CATEGORY_COLORS[event.category];

  function handleMouseDown(e: React.MouseEvent) {
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
    // Do NOT stopPropagation — let drag pass through to the timeline container
  }

  function handleClick(e: React.MouseEvent) {
    if (!mouseDownPos.current) return;
    const dx = Math.abs(e.clientX - mouseDownPos.current.x);
    const dy = Math.abs(e.clientY - mouseDownPos.current.y);
    // Only toggle pin if mouse barely moved (real click, not drag)
    if (dx < 6 && dy < 6) {
      setPinned((p) => !p);
    }
    mouseDownPos.current = null;
  }

  return (
    <div
      className={`absolute ${position === "above" ? "bottom-[calc(100%+20px)]" : "top-[calc(100%+20px)]"} left-0`}
      style={{ width: "320px", zIndex: pinned ? 50 : expanded ? 30 : 10 }}
    >
      {/* Connector line */}
      <div
        className={`absolute left-[10px] ${position === "above" ? "bottom-[-20px]" : "top-[-20px]"} w-px`}
        style={{ height: "20px", backgroundColor: colors.dot, opacity: 0.5 }}
      />

      <div
        className="relative select-none"
        style={{
          border: `1.5px solid ${expanded ? colors.dot : colors.border}`,
          backgroundColor: "transparent",
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
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        {/* Left colour bar */}
        <div className="absolute top-0 left-0 bottom-0 w-[6px]" style={{ backgroundColor: colors.dot }} />

        <div style={{ padding: "12px 12px 8px 18px" }}>
          {/* Year */}
          <p style={{ fontFamily: "var(--font-ocr)", fontSize: "24px", letterSpacing: "0.04em", color: "#E94B3F", lineHeight: 1.1, marginBottom: event.date ? "2px" : "6px", fontVariantNumeric: "tabular-nums" }}>
            {event.year}
          </p>

          {/* Date */}
          {event.date && (
            <p style={{ fontFamily: "var(--font-ocr)", fontSize: "11px", letterSpacing: "0.08em", color: "#E94B3F", opacity: 0.75, marginBottom: "6px" }}>
              {event.date}
            </p>
          )}

          {/* Category label */}
          <p style={{ fontFamily: "var(--font-hanken)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(26,18,8,0.55)", marginBottom: "6px" }}>
            {CATEGORY_COLORS[event.category].label}
          </p>

          {/* Key event title */}
          <h3 style={{ fontFamily: "var(--font-hanken)", fontSize: "18px", fontWeight: 700, lineHeight: 1.3, color: "#1a1208", marginBottom: expanded ? "10px" : "0" }}>
            {event.keyEvent}
          </h3>
        </div>

        {/* Description — only when expanded, scrollable */}
        {expanded && (
          <div style={{ borderTop: `1px solid ${colors.dot}44` }}>
            <div
              style={{ maxHeight: "260px", overflowY: "auto", padding: "10px 12px 4px 18px", scrollbarWidth: "thin", scrollbarColor: `${colors.dot} transparent` }}
              onClick={(e) => e.stopPropagation()} /* allow text selection without toggling pin */
            >
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", lineHeight: 1.7, color: "rgba(26,18,8,0.82)", whiteSpace: "pre-line" }}>
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

            <p style={{ padding: "4px 12px 8px 18px", fontFamily: "var(--font-ocr)", fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,18,8,0.25)" }}>
              {pinned ? "click to close" : "click to pin open"}
            </p>
          </div>
        )}

        {!expanded && (
          <p style={{ padding: "0 12px 10px 18px", fontFamily: "var(--font-ocr)", fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,18,8,0.22)" }}>
            hover / click to read
          </p>
        )}
      </div>
    </div>
  );
}
