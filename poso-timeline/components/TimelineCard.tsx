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
      style={{ width: "320px" }}
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
          border: `1.5px solid ${colors.dot}`,
          backgroundColor: colors.bg,
          boxShadow: expanded
            ? `0 6px 28px 0 ${colors.dot}38`
            : `0 1px 6px 0 ${colors.dot}22`,
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

          {/* ── YEAR — OCR A Extended 28px, red highlight ── */}
          <p
            style={{
              fontFamily: "var(--font-ocr)",
              fontSize: "24px",
              letterSpacing: "0.04em",
              color: "#E94B3F",
              marginBottom: "2px",
              lineHeight: 1.1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {event.year}
          </p>

          {/* Date (if present) — smaller OCR, red tint */}
          {event.date && (
            <p
              style={{
                fontFamily: "var(--font-ocr)",
                fontSize: "11px",
                letterSpacing: "0.08em",
                color: "#E94B3F",
                opacity: 0.75,
                marginBottom: "6px",
              }}
            >
              {event.date}
            </p>
          )}

          {/* Category label — tiny uppercase Hanken */}
          <p
            style={{
              fontFamily: "var(--font-hanken)",
              fontSize: "9px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(26,18,8,0.55)",
              marginBottom: "8px",
            }}
          >
            {CATEGORY_COLORS[event.category].label}
          </p>

          {/* ── KEY EVENT — Hanken Grotesk, matches regime divider size ── */}
          <h3
            style={{
              fontFamily: "var(--font-hanken)",
              fontSize: "18px",
              fontWeight: 700,
              lineHeight: 1.3,
              color: "#1a1208",
              marginBottom: expanded ? "10px" : "6px",
            }}
          >
            {event.keyEvent}
          </h3>

          {/* ── DESCRIPTION — Inter, smallest, expands on hover ── */}
          <div
            className="overflow-hidden"
            style={{
              maxHeight: expanded ? "600px" : "0px",
              transition: "max-height 0.32s ease",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "14px",
                lineHeight: 1.75,
                color: "rgba(26,18,8,0.82)",
                whiteSpace: "pre-line",
              }}
            >
              {event.description}
            </p>

            {event.archive && (
              <a
                href={event.archive}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "12px",
                  fontFamily: "var(--font-ocr)",
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: colors.dot,
                  textDecoration: "none",
                  borderBottom: `1px solid ${colors.dot}`,
                  paddingBottom: "1px",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                SOURCE →
              </a>
            )}
          </div>

          {!expanded && (
            <p
              style={{
                fontFamily: "var(--font-ocr)",
                fontSize: "8px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(26,18,8,0.18)",
                marginTop: "2px",
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
