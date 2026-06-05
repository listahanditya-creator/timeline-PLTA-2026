"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { timelineData, CATEGORY_COLORS } from "@/data/timeline";
import TimelineCard from "./TimelineCard";
import Legend from "./Legend";

// Spacing constants
const EVENT_WIDTH = 300;       // px between each event
const SUBTITLE_WIDTH = 220;    // px for regime-divider columns
const CARD_AREA_HEIGHT = 280;  // px above & below the centre line
const LINE_Y = CARD_AREA_HEIGHT; // y position of the horizontal line

export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragging, setDragging] = useState(false);

  /* ---------- drag handlers ---------- */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    setDragging(true);
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    setDragging(false);
  }, []);

  // Also cancel drag if mouse leaves the window
  useEffect(() => {
    const stop = () => { isDragging.current = false; setDragging(false); };
    window.addEventListener("mouseup", stop);
    return () => window.removeEventListener("mouseup", stop);
  }, []);

  /* ---------- build layout ---------- */
  // Assign x positions to each event/subtitle
  type LayoutItem = {
    event: (typeof timelineData)[number];
    x: number;
    position: "above" | "below";
    isSubtitle: boolean;
  };

  const items: LayoutItem[] = [];
  let cursor = 80; // starting x offset
  let sideToggle = 0;

  for (const event of timelineData) {
    if (event.category === "subtitle") {
      items.push({ event, x: cursor, position: "above", isSubtitle: true });
      cursor += SUBTITLE_WIDTH;
    } else {
      const position = sideToggle % 2 === 0 ? "above" : "below";
      items.push({ event, x: cursor, position, isSubtitle: false });
      cursor += EVENT_WIDTH;
      sideToggle++;
    }
  }

  const totalWidth = cursor + 200;
  const canvasHeight = CARD_AREA_HEIGHT * 2 + 1; // above + line + below

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ backgroundColor: "#0d0d0d", color: "#fff" }}
    >
      {/* ── Top navigation bar ── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-8 py-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-8">
          {/* Logo / project mark */}
          <div
            className="text-[11px] tracking-[0.25em] uppercase font-semibold"
            style={{ fontFamily: "var(--font-hanken)", color: "rgba(255,255,255,0.9)" }}
          >
            PLTA Poso
          </div>
          <nav className="flex gap-6">
            {["About", "Methodology", "Reading Room"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] tracking-[0.15em] uppercase transition-opacity hover:opacity-100"
                style={{
                  fontFamily: "var(--font-hanken)",
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Language toggle */}
        <div
          className="text-[10px] tracking-[0.15em] uppercase"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-hanken)" }}
        >
          EN / IDN
        </div>
      </header>

      {/* ── Page title + body ── */}
      <div
        className="flex-shrink-0 px-8 pt-8 pb-6 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <h1
          className="text-[22px] font-bold leading-tight max-w-2xl mb-3"
          style={{ fontFamily: "var(--font-hanken)", fontWeight: 700 }}
        >
          Unfolding Socio-Environmental Violence of the Hydroelectric
          Infrastructure Violence in Poso Lake Watershed
        </h1>
        <p
          className="text-[11px] leading-relaxed max-w-3xl mb-4"
          style={{
            fontFamily: "var(--font-inter)",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          This timeline analysis aims to understand the Poso Energy Hydroelectric Dam in
          the larger Indonesia&apos;s socio-political contexts, unfolding the violence (and
          negligence) toward its surrounding ecosystem and community — especially the To
          Pamona Indigenous community in Pamona, Poso. What happened in Poso cannot be
          separated from larger violence contexts related to hydrodam development.
        </p>
        <Legend />
      </div>

      {/* ── Drag instruction hint ── */}
      <div
        className="flex-shrink-0 flex items-center gap-2 px-8 py-2 border-b"
        style={{ borderColor: "rgba(255,255,255,0.04)" }}
      >
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M1 5h12M9 1l4 4-4 4" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round"/>
        </svg>
        <span
          className="text-[9px] tracking-[0.2em] uppercase"
          style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-hanken)" }}
        >
          Click and drag to navigate
        </span>
      </div>

      {/* ── Horizontal draggable timeline canvas ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-scroll overflow-y-hidden relative"
        style={{
          cursor: dragging ? "grabbing" : "grab",
          userSelect: "none",
          scrollbarWidth: "none",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Hide webkit scrollbar */}
        <style>{`::-webkit-scrollbar { display: none; }`}</style>

        {/* Canvas */}
        <div
          className="relative"
          style={{
            width: `${totalWidth}px`,
            height: `${canvasHeight}px`,
            minWidth: "100%",
          }}
        >
          {/* Horizontal centre line */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: `${LINE_Y}px`,
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.15)",
              width: `${totalWidth}px`,
            }}
          />

          {/* Render each item */}
          {items.map((item) => {
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
                    borderLeft: "1px solid rgba(255,255,255,0.12)",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                    backgroundColor: "rgba(255,255,255,0.018)",
                  }}
                >
                  {/* Year range */}
                  <div
                    className="absolute px-4 pt-5"
                    style={{ top: 0 }}
                  >
                    <p
                      className="text-[10px] tracking-[0.2em] uppercase mb-2"
                      style={{
                        fontFamily: "var(--font-hanken)",
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      {item.event.year}
                    </p>
                    <p
                      className="text-[11px] font-semibold leading-snug"
                      style={{
                        fontFamily: "var(--font-hanken)",
                        color: "rgba(255,255,255,0.7)",
                        maxWidth: "160px",
                      }}
                    >
                      {item.event.keyEvent}
                    </p>
                  </div>

                  {/* Divider line at centre */}
                  <div
                    className="absolute left-4 right-4"
                    style={{
                      top: `${LINE_Y}px`,
                      height: "1px",
                      backgroundColor: "rgba(255,255,255,0.3)",
                    }}
                  />

                  {/* Description below */}
                  {item.event.description && (
                    <div
                      className="absolute px-4"
                      style={{ top: `${LINE_Y + 16}px`, maxWidth: "190px" }}
                    >
                      <p
                        className="text-[10px] leading-relaxed"
                        style={{
                          fontFamily: "var(--font-inter)",
                          color: "rgba(255,255,255,0.3)",
                        }}
                      >
                        {item.event.description.slice(0, 180)}
                        {item.event.description.length > 180 ? "..." : ""}
                      </p>
                    </div>
                  )}
                </div>
              );
            }

            // Regular event — dot + card
            const dotY = LINE_Y;
            const colors = CATEGORY_COLORS[item.event.category];

            return (
              <div
                key={item.event.id}
                className="absolute"
                style={{
                  left: `${item.x}px`,
                  top: 0,
                  height: `${canvasHeight}px`,
                }}
              >
                {/* Dot on the line */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: colors.dot,
                    top: `${dotY - 4}px`,
                    left: "8px",
                    zIndex: 10,
                    boxShadow: `0 0 6px ${colors.dot}55`,
                  }}
                />

                {/* Card */}
                <div
                  className="absolute"
                  style={{
                    top: `${dotY}px`,
                    left: 0,
                    zIndex: 20,
                  }}
                >
                  <TimelineCard
                    event={item.event}
                    position={item.position}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom year ruler ── */}
      <div
        className="flex-shrink-0 border-t overflow-hidden"
        style={{
          borderColor: "rgba(255,255,255,0.06)",
          height: "32px",
          backgroundColor: "#0a0a0a",
        }}
      >
        <div
          className="flex items-center h-full pl-20 gap-0"
          style={{ width: `${totalWidth}px` }}
        >
          {Array.from(
            new Set(
              timelineData
                .map((e) => e.year.slice(0, 4))
                .filter((y) => /^\d{4}$/.test(y))
            )
          ).map((y) => (
            <span
              key={y}
              className="text-[9px] tracking-[0.1em]"
              style={{
                fontFamily: "var(--font-hanken)",
                color: "rgba(255,255,255,0.2)",
                minWidth: `${EVENT_WIDTH}px`,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {y}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
