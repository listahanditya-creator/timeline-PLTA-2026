"use client";

import { useRef, useState, useCallback, useEffect, Fragment } from "react";
import { timelineData, CATEGORY_COLORS } from "@/data/timeline";
import TimelineCard from "./TimelineCard";

const EVENT_WIDTH    = 360;
const SUBTITLE_WIDTH = 320;
const CARD_AREA_HEIGHT = 520;   // tall enough for pinned/expanded cards above & below
const LINE_Y = CARD_AREA_HEIGHT;

const NAV_ITEMS = ["About", "Methodology", "Reading Room"];

const LEGEND_ITEMS = [
  { label: "Kalla Oligarch & Business",                 color: "#FE973B" },
  { label: "National Politics of Hydropower",           color: "#F8BA43" },
  { label: "Socio-Environmental Violence",              color: "#FBA18C" },
  { label: "Community Resistance",                      color: "#D3D477" },
  { label: "Conflict, Militarisation & Securitisation", color: "#E94B3F" },
  { label: "Human Rights Interventions",                color: "#9EC9EF" },
  { label: "Public Donations / Church Relations",       color: "#A98067" },
];

const PAGE_TITLE =
  "Unfolding Socio-Environmental Violence of the Hydroelectric Infrastructure Violence in Poso Lake Watershed";

/** Title with continuous highlight per line, vertical white gaps between lines */
function HighlightedTitle({ text, bg }: { text: string; bg: string }) {
  return (
    <h1 style={{ fontFamily: "var(--font-ocr)", fontSize: "32px", fontWeight: 400, lineHeight: 1.7, letterSpacing: "0.02em", color: "#1a1208" }}>
      <span
        style={{
          backgroundColor: bg,
          padding: "2px 6px",
          display: "inline",
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
        }}
      >
        {text}
      </span>
    </h1>
  );
}

const PREVIEW_CHARS = 220;

function RegimeDescription({ text, top, width }: { text: string; top: number; width: number }) {
  const [open, setOpen] = useState(false);
  const short = text.length > PREVIEW_CHARS;

  return (
    <div
      className="absolute px-5"
      style={{ top: `${top}px`, width: `${width - 40}px` }}
    >
      {/* Scrollable text area */}
      <div
        style={{
          maxHeight: open ? "220px" : "auto",
          overflowY: open ? "auto" : "visible",
          scrollbarWidth: "thin",
          scrollbarColor: "#FBAE84 transparent",
          paddingRight: open ? "4px" : "0",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            lineHeight: 1.65,
            color: "rgba(26,18,8,0.65)",
          }}
        >
          {open || !short ? text : text.slice(0, PREVIEW_CHARS) + "…"}
        </p>
      </div>

      {short && (
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            marginTop: "8px",
            fontFamily: "var(--font-ocr)",
            fontSize: "9px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#E94B3F",
            background: "none",
            border: "none",
            borderBottom: "1px solid #E94B3F",
            padding: "0 0 1px 0",
            cursor: "pointer",
            display: "block",
          }}
        >
          {open ? "Read less ↑" : "Read more ↓"}
        </button>
      )}
    </div>
  );
}

export default function Timeline() {
  const scrollRef  = useRef<HTMLDivElement>(null);
  const rulerRef   = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX     = useRef(0);
  const startLeft  = useRef(0);
  const [dragging, setDragging] = useState(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    setDragging(true);
    startX.current    = e.pageX;
    startLeft.current = scrollRef.current?.scrollLeft ?? 0;
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;
      const next = startLeft.current - (e.pageX - startX.current) * 1.2;
      scrollRef.current.scrollLeft = next;
      // Sync ruler by shifting its inner content div
      const inner = rulerRef.current?.firstElementChild as HTMLElement | null;
      if (inner) inner.style.transform = `translateX(-${next}px)`;
    };
    const up = () => { isDragging.current = false; setDragging(false); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup",   up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup",   up);
    };
  }, []);

  // Sync ruler on native scroll (trackpad / scrollbar)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const inner = rulerRef.current?.firstElementChild as HTMLElement | null;
      if (inner) inner.style.transform = `translateX(-${el.scrollLeft}px)`;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  /* ── build layout ── */
  type LayoutItem = {
    event: (typeof timelineData)[number];
    x: number;
    position: "above" | "below";
    isSubtitle: boolean;
  };
  const items: LayoutItem[] = [];
  let cursor    = 80;
  let sideToggle = 0;
  for (const event of timelineData) {
    if (event.category === "subtitle") {
      items.push({ event, x: cursor, position: "above", isSubtitle: true });
      cursor += SUBTITLE_WIDTH;
    } else {
      items.push({ event, x: cursor, position: sideToggle % 2 === 0 ? "above" : "below", isSubtitle: false });
      cursor += EVENT_WIDTH;
      sideToggle++;
    }
  }
  const totalWidth   = cursor + 200;
  const canvasHeight = CARD_AREA_HEIGHT * 2 + 1;

  // Year positions derived from actual item x coordinates — one label per unique year
  const yearPositions: { year: string; x: number }[] = [];
  const seenYears = new Set<string>();
  for (const item of items) {
    const y = item.event.year.slice(0, 4);
    if (/^\d{4}$/.test(y) && !seenYears.has(y)) {
      seenYears.add(y);
      yearPositions.push({ year: y, x: item.x });
    }
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#FFFBE9", color: "#1a1208" }}>

      {/* ══════════════════════════════
          LEFT SIDEBAR  (#FEC2C2)
      ══════════════════════════════ */}
      <aside
        className="flex-shrink-0 flex flex-col justify-between py-8 px-5"
        style={{
          width: "180px",
          borderRight: "1px solid rgba(26,18,8,0.1)",
          backgroundColor: "#FEC2C2",
        }}
      >
        <nav className="flex flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontFamily: "var(--font-hanken)",
                fontSize: "13px",
                fontWeight: 500,
                color: "#1a1208",
                textDecoration: "none",
                padding: "8px 12px",
                border: "1px solid rgba(26,18,8,0.2)",
                display: "block",
                backgroundColor: "transparent",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(26,18,8,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {item}
            </a>
          ))}
        </nav>

        <div />
      </aside>

      {/* ══════════════════════════════
          MAIN CONTENT
      ══════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Header: title + legend ── */}
        <div
          className="flex-shrink-0 flex items-start justify-between gap-6 px-8 pt-7 pb-5 border-b"
          style={{ borderColor: "rgba(26,18,8,0.07)" }}
        >
          {/* Title with per-word highlight */}
          <div style={{ maxWidth: "860px", flex: 1 }}>
            <HighlightedTitle text={PAGE_TITLE} bg="#FEC2C2" />
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "12px",
                lineHeight: 1.7,
                color: "rgba(26,18,8,0.7)",
                marginTop: "12px",
                maxWidth: "820px",
              }}
            >
              The timeline situates the development of the Poso Energy Hydroelectric Dam within
              Indonesia&apos;s broader socio-political context, revealing how violence and neglect
              toward surrounding ecosystems and communities, particularly the To Pamona Indigenous
              people and local communities of Poso, Central Sulawesi, could not be separated from
              longer historical trajectories of dispossession, displacement, and
              socio-environmental violence.
            </p>
          </div>

          {/* Legend — top right */}
          <div className="flex-shrink-0 flex flex-col gap-2 pt-1" style={{ minWidth: "240px" }}>
            {LEGEND_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-0">
                <span style={{ display: "inline-block", width: "14px", height: "14px", backgroundColor: item.color, flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: "var(--font-hanken)",
                    fontSize: "11px",
                    color: "#1a1208",
                    backgroundColor: item.color + "66",
                    padding: "1px 8px 1px 6px",
                    display: "inline-block",
                    lineHeight: 1.7,
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Drag hint ── */}
        <div
          className="flex-shrink-0 flex items-center gap-2 px-8 py-2 border-b"
          style={{ borderColor: "rgba(26,18,8,0.05)" }}
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M1 5h12M9 1l4 4-4 4" stroke="rgba(26,18,8,0.22)" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: "var(--font-hanken)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,18,8,0.22)" }}>
            Click and drag to navigate · hover cards to read
          </span>
        </div>

        {/* ── Horizontal draggable timeline ── */}
        {/* overflow-x: scroll + overflow-y: clip — clip doesn't create a scroll
            container so the browser won't promote overflow-y to auto */}
        <div
          ref={scrollRef}
          className="flex-1"
          style={{
            overflowX: "scroll",
            overflowY: "auto",            // auto allows vertical scroll to read full cards
            cursor: dragging ? "grabbing" : "grab",
            userSelect: "none",
            scrollbarWidth: "none",
            backgroundColor: "#FFFBE9",
          }}
          onMouseDown={onMouseDown}
        >
          <style>{`::-webkit-scrollbar{display:none}`}</style>
          <div className="relative" style={{ width: `${totalWidth}px`, height: `${canvasHeight}px` }}>
            {/* Centre line — drawn as segments that skip subtitle columns */}
            {(() => {
              const segments: { x: number; w: number }[] = [];
              let lineX = 0;
              for (const it of items) {
                if (it.isSubtitle) {
                  if (it.x > lineX) segments.push({ x: lineX, w: it.x - lineX });
                  lineX = it.x + SUBTITLE_WIDTH;
                }
              }
              segments.push({ x: lineX, w: totalWidth - lineX });
              return segments.map((seg, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ top: `${LINE_Y}px`, left: `${seg.x}px`, width: `${seg.w}px`, height: "3px", backgroundColor: "#E94B3F" }}
                />
              ));
            })()}

            {items.map((item) => {
              /* ── REGIME DIVIDER ── */
              if (item.isSubtitle) {
                return (
                  <div
                    key={item.event.id}
                    className="absolute"
                    style={{
                      left: `${item.x}px`, top: 0,
                      width: `${SUBTITLE_WIDTH}px`, height: `${canvasHeight}px`,
                      border: "1.5px solid #FBAE84",
                      backgroundColor: "#FDEBD8",
                    }}
                  >
                    <div className="absolute px-5" style={{ top: `${LINE_Y - 150}px`, maxWidth: `${SUBTITLE_WIDTH}px` }}>
                      <p style={{ fontFamily: "var(--font-ocr)", fontSize: "28px", letterSpacing: "0.04em", color: "#E94B3F", marginBottom: "10px", lineHeight: 1.1 }}>
                        {item.event.year}
                      </p>
                      <p style={{ fontFamily: "var(--font-hanken)", fontSize: "18px", fontWeight: 700, lineHeight: 1.3, color: "#1a1208", maxWidth: "280px" }}>
                        {item.event.keyEvent}
                      </p>
                    </div>
                    <div className="absolute left-5 right-5" style={{ top: `${LINE_Y}px`, height: "1.5px", backgroundColor: "rgba(26,18,8,0.15)" }} />
                    {item.event.description && (
                      <RegimeDescription
                        text={item.event.description}
                        top={LINE_Y + 16}
                        width={SUBTITLE_WIDTH}
                      />
                    )}
                  </div>
                );
              }

              /* ── REGULAR EVENT ── */
              const colors = CATEGORY_COLORS[item.event.category];
              return (
                <div key={item.event.id} className="absolute" style={{ left: `${item.x}px`, top: 0, height: `${canvasHeight}px` }}>
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "10px", height: "10px",
                      backgroundColor: colors.dot,
                      top: `${LINE_Y - 5}px`, left: "6px",
                      zIndex: 10,
                      border: "2px solid #FFFBE9",
                      boxShadow: `0 0 0 1.5px ${colors.dot}`,
                    }}
                  />
                  <div className="absolute" style={{ top: `${LINE_Y}px`, left: 0, zIndex: 20 }}>
                    <TimelineCard event={item.event} position={item.position} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Year ruler — scrollLeft synced to main timeline ── */}
        <div
          className="flex-shrink-0 border-t"
          style={{ borderColor: "rgba(26,18,8,0.07)", height: "44px", backgroundColor: "#FFF7DC" }}
        >
          <div
            ref={rulerRef}
            style={{
              overflowX: "hidden",
              overflowY: "clip",
              height: "100%",
              width: "100%",
              pointerEvents: "none",
              position: "relative",
            }}
          >
          <div
            style={{
              position: "relative",
              height: "100%",
              width: `${totalWidth}px`,
            }}
          >
            {yearPositions.map(({ year, x }) => (
              <div
                key={year}
                style={{
                  position: "absolute",
                  left: `${x}px`,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <span style={{
                  backgroundColor: "#E94B3F",
                  color: "#fff",
                  padding: "2px 6px",
                  fontFamily: "var(--font-ocr)",
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  display: "inline-block",
                  lineHeight: 1.4,
                  whiteSpace: "nowrap",
                }}>
                  {year}
                </span>
              </div>
            ))}
          </div>
          </div>  {/* end ruler inner */}
        </div>
      </div>
    </div>
  );
}
