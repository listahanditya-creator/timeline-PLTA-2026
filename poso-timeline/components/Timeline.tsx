"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { timelineData, CATEGORY_COLORS } from "@/data/timeline";
import TimelineCard from "./TimelineCard";

const EVENT_WIDTH   = 300;
const SUBTITLE_WIDTH = 320;
const CARD_AREA_HEIGHT = 320;
const LINE_Y = CARD_AREA_HEIGHT;

const NAV_ITEMS = ["About", "Methodology", "Reading Room"];

const LEGEND_ITEMS = [
  { label: "Kalla Oligarch & Business",              color: "#FE973B" },
  { label: "National Politics of Hydropower",        color: "#F8BA43" },
  { label: "Socio-Environmental Violence",           color: "#FBA18C" },
  { label: "Community Resistance",                   color: "#D3D477" },
  { label: "Conflict, Militarisation & Securitisation", color: "#E94B3F" },
  { label: "Human Rights Interventions",             color: "#9EC9EF" },
  { label: "Public Donations / Church Relations",    color: "#A98067" },
];

export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX    = useRef(0);
  const scrollLeft = useRef(0);
  const [dragging, setDragging] = useState(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    setDragging(true);
    startX.current    = e.pageX;
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;
      scrollRef.current.scrollLeft = scrollLeft.current - (e.pageX - startX.current) * 1.2;
    };
    const onUp = () => { isDragging.current = false; setDragging(false); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  /* ── build layout ── */
  type LayoutItem = {
    event: (typeof timelineData)[number];
    x: number;
    position: "above" | "below";
    isSubtitle: boolean;
  };
  const items: LayoutItem[] = [];
  let cursor = 80;
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
  const totalWidth  = cursor + 200;
  const canvasHeight = CARD_AREA_HEIGHT * 2 + 1;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#FFFBE9", color: "#1a1208" }}>

      {/* ════════════════════════════════════════
          LEFT SIDEBAR
      ════════════════════════════════════════ */}
      <aside
        className="flex-shrink-0 flex flex-col justify-between py-8 px-5"
        style={{
          width: "180px",
          borderRight: "1px solid rgba(26,18,8,0.08)",
          backgroundColor: "#FFFBE9",
        }}
      >
        {/* Nav links in boxes */}
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
                border: "1px solid rgba(26,18,8,0.18)",
                display: "block",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#FEC2C2")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Map / Sulawesi silhouette + lang */}
        <div className="flex flex-col items-start gap-2">
          <svg width="38" height="52" viewBox="0 0 38 52" fill="none">
            <path
              d="M19 2 C10 8 4 18 6 28 C8 36 14 42 16 50 C17 46 20 40 24 36 C30 30 36 22 34 14 C32 6 26 0 19 2Z"
              fill="#2d4a38"
              opacity="0.8"
            />
          </svg>
          <span style={{ fontFamily: "var(--font-hanken)", fontSize: "10px", color: "rgba(26,18,8,0.35)", letterSpacing: "0.1em" }}>
            EN / IDN
          </span>
        </div>
      </aside>

      {/* ════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Top bar: title left, legend right ── */}
        <div
          className="flex-shrink-0 flex items-start justify-between gap-6 px-8 pt-7 pb-5 border-b"
          style={{ borderColor: "rgba(26,18,8,0.07)" }}
        >
          {/* Title block */}
          <div style={{ maxWidth: "660px" }}>
            <h1
              style={{
                fontFamily: "var(--font-ocr)",
                fontSize: "28px",
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: "0.02em",
                color: "#1a1208",
                backgroundColor: "#FEC2C2",
                display: "inline",
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
                padding: "2px 6px",
                marginBottom: "12px",
              }}
            >
              Unfolding Socio-Environmental Violence of the Hydroelectric
              Infrastructure Violence in Poso Lake Watershed
            </h1>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "12px",
                lineHeight: 1.7,
                color: "rgba(26,18,8,0.5)",
                marginTop: "14px",
                maxWidth: "600px",
              }}
            >
              This timeline analysis aims to understand the Poso Energy Hydroelectric Dam in
              the larger Indonesia&apos;s socio-political contexts, unfolding the violence (and
              negligence) toward its surrounding ecosystem and community — especially the To
              Pamona Indigenous community in Pamona, Poso.
            </p>
          </div>

          {/* Legend — top right */}
          <div
            className="flex-shrink-0 flex flex-col gap-2 pt-1"
            style={{ minWidth: "230px" }}
          >
            {LEGEND_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-0">
                <span
                  style={{
                    display: "inline-block",
                    width: "14px",
                    height: "14px",
                    backgroundColor: item.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-hanken)",
                    fontSize: "11px",
                    color: "#1a1208",
                    backgroundColor: item.color + "55",
                    padding: "1px 7px 1px 6px",
                    display: "inline-block",
                    lineHeight: 1.6,
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
        <div
          ref={scrollRef}
          className="flex-1 overflow-x-scroll relative"
          style={{
            cursor: dragging ? "grabbing" : "grab",
            userSelect: "none",
            scrollbarWidth: "none",
            backgroundColor: "#FFFBE9",
            overflowY: "visible",
          }}
          onMouseDown={onMouseDown}
        >
          <style>{`::-webkit-scrollbar{display:none}`}</style>

          <div
            className="relative"
            style={{ width: `${totalWidth}px`, height: `${canvasHeight}px`, minWidth: "100%" }}
          >
            {/* Centre hairline */}
            <div
              className="absolute left-0"
              style={{
                top: `${LINE_Y}px`,
                height: "1px",
                width: `${totalWidth}px`,
                backgroundColor: "rgba(26,18,8,0.12)",
              }}
            />

            {items.map((item) => {
              /* ── SUBTITLE / REGIME DIVIDER ── */
              if (item.isSubtitle) {
                return (
                  <div
                    key={item.event.id}
                    className="absolute"
                    style={{
                      left: `${item.x}px`,
                      top: 0,
                      width: `${SUBTITLE_WIDTH}px`,
                      height: `${canvasHeight}px`,
                      borderLeft: "2px solid #FBAE84",
                      borderRight: "1px solid rgba(26,18,8,0.05)",
                      backgroundColor: "#FDEBD8",
                    }}
                  >
                    <div className="absolute px-5 pt-6" style={{ maxWidth: `${SUBTITLE_WIDTH}px` }}>
                      <p style={{ fontFamily: "var(--font-ocr)", fontSize: "28px", letterSpacing: "0.04em", color: "#E94B3F", marginBottom: "10px", lineHeight: 1.1 }}>
                        {item.event.year}
                      </p>
                      <p style={{ fontFamily: "var(--font-hanken)", fontSize: "18px", fontWeight: 700, lineHeight: 1.3, color: "#1a1208", maxWidth: "280px" }}>
                        {item.event.keyEvent}
                      </p>
                    </div>

                    {/* Centre rule */}
                    <div className="absolute left-5 right-5" style={{ top: `${LINE_Y}px`, height: "1.5px", backgroundColor: "rgba(26,18,8,0.15)" }} />

                    {item.event.description && (
                      <div className="absolute px-5" style={{ top: `${LINE_Y + 16}px`, maxWidth: `${SUBTITLE_WIDTH}px` }}>
                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", lineHeight: 1.7, color: "rgba(26,18,8,0.65)" }}>
                          {item.event.description.slice(0, 260)}{item.event.description.length > 260 ? "…" : ""}
                        </p>
                      </div>
                    )}
                  </div>
                );
              }

              /* ── REGULAR EVENT ── */
              const colors = CATEGORY_COLORS[item.event.category];
              return (
                <div
                  key={item.event.id}
                  className="absolute"
                  style={{ left: `${item.x}px`, top: 0, height: `${canvasHeight}px` }}
                >
                  {/* Dot */}
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

        {/* ── Year ruler ── */}
        <div
          className="flex-shrink-0 border-t overflow-hidden"
          style={{ borderColor: "rgba(26,18,8,0.07)", height: "44px", backgroundColor: "#FFF7DC" }}
        >
          <div className="flex items-center h-full pl-20" style={{ width: `${totalWidth}px` }}>
            {Array.from(
              new Set(timelineData.map((e) => e.year.slice(0, 4)).filter((y) => /^\d{4}$/.test(y)))
            ).map((y) => (
              <span key={y} style={{ display: "inline-block", minWidth: `${EVENT_WIDTH}px`, fontFamily: "var(--font-ocr)", fontSize: "14px", letterSpacing: "0.06em" }}>
                <span style={{ backgroundColor: "#E94B3F", color: "#fff", padding: "2px 6px", display: "inline-block", lineHeight: 1.4 }}>
                  {y}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
