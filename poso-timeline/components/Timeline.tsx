"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { timelineData, CATEGORY_COLORS } from "@/data/timeline";
import TimelineCard from "./TimelineCard";
import Legend from "./Legend";

const EVENT_WIDTH = 300;
const SUBTITLE_WIDTH = 270;
const CARD_AREA_HEIGHT = 320;  // more room above & below the line
const LINE_Y = CARD_AREA_HEIGHT;

export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragging, setDragging] = useState(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    setDragging(true);
    startX.current = e.pageX;
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  }, []);

  // Attach move + up to window so dragging never "sticks" when mouse leaves the div
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;
      const walk = (e.pageX - startX.current) * 1.2;
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };
    const onUp = () => {
      isDragging.current = false;
      setDragging(false);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

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
      const position = sideToggle % 2 === 0 ? "above" : "below";
      items.push({ event, x: cursor, position, isSubtitle: false });
      cursor += EVENT_WIDTH;
      sideToggle++;
    }
  }

  const totalWidth = cursor + 200;
  const canvasHeight = CARD_AREA_HEIGHT * 2 + 1;

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ backgroundColor: "#FFFBE9", color: "#1a1208" }}
    >
      {/* ── Top nav bar ── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-8 py-4 border-b"
        style={{ borderColor: "rgba(26,18,8,0.08)", backgroundColor: "#FFFBE9" }}
      >
        <div className="flex items-center gap-8">
          <div
            className="text-[11px] tracking-[0.25em] uppercase font-semibold"
            style={{ fontFamily: "var(--font-ocr)", color: "#1a1208", fontSize: "13px", letterSpacing: "0.1em" }}
          >
            PLTA Poso · 2026
          </div>
          <nav className="flex gap-6">
            {["About", "Methodology", "Reading Room"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] tracking-[0.15em] uppercase hover:opacity-100 transition-opacity"
                style={{
                  fontFamily: "var(--font-hanken)",
                  color: "rgba(26,18,8,0.4)",
                  textDecoration: "none",
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div
          className="text-[10px] tracking-[0.15em] uppercase"
          style={{ color: "rgba(26,18,8,0.3)", fontFamily: "var(--font-hanken)" }}
        >
          EN / IDN
        </div>
      </header>

      {/* ── Title + description ── */}
      <div
        className="flex-shrink-0 px-8 pt-7 pb-5 border-b"
        style={{ borderColor: "rgba(26,18,8,0.07)" }}
      >
        <h1
          className="leading-tight max-w-3xl mb-4"
          style={{
            fontFamily: "var(--font-ocr)",
            fontWeight: 400,
            color: "#1a1208",
            fontSize: "28px",
            letterSpacing: "0.02em",
            lineHeight: 1.25,
          }}
        >
          Unfolding Socio-Environmental Violence of the Hydroelectric
          Infrastructure Violence in Poso Lake Watershed
        </h1>
        <p
          className="leading-relaxed max-w-3xl mb-4"
          style={{ fontFamily: "var(--font-inter)", color: "rgba(26,18,8,0.5)", fontSize: "12px" }}
        >
          This timeline analysis aims to understand the Poso Energy Hydroelectric Dam in
          the larger Indonesia&apos;s socio-political contexts, unfolding the violence (and
          negligence) toward its surrounding ecosystem and community — especially the To
          Pamona Indigenous community in Pamona, Poso. What happened in Poso cannot be
          separated from larger violence contexts related to hydrodam development.
        </p>
        <Legend />
      </div>

      {/* ── Drag hint ── */}
      <div
        className="flex-shrink-0 flex items-center gap-2 px-8 py-2 border-b"
        style={{ borderColor: "rgba(26,18,8,0.05)" }}
      >
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path
            d="M1 5h12M9 1l4 4-4 4"
            stroke="rgba(26,18,8,0.22)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
        <span
          className="text-[9px] tracking-[0.2em] uppercase"
          style={{ color: "rgba(26,18,8,0.22)", fontFamily: "var(--font-hanken)" }}
        >
          Click and drag to navigate · hover cards to read
        </span>
      </div>

      {/* ── Horizontal draggable timeline canvas ── */}
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
        <style>{`::-webkit-scrollbar { display: none; }`}</style>

        <div
          className="relative"
          style={{ width: `${totalWidth}px`, height: `${canvasHeight}px`, minWidth: "100%" }}
        >
          {/* Horizontal centre line */}
          <div
            className="absolute left-0"
            style={{
              top: `${LINE_Y}px`,
              height: "1px",
              width: `${totalWidth}px`,
              backgroundColor: "rgba(26,18,8,0.15)",
            }}
          />

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
                    borderLeft: "2px solid #c0503e",
                    borderRight: "1px solid rgba(26,18,8,0.06)",
                    backgroundColor: "#F0816D",
                  }}
                >
                  {/* Era label — top half */}
                  <div className="absolute px-5 pt-6" style={{ maxWidth: `${SUBTITLE_WIDTH}px` }}>
                    <p
                      style={{
                        fontFamily: "var(--font-ocr)",
                        fontSize: "15px",
                        letterSpacing: "0.05em",
                        color: "rgba(255,255,255,0.8)",
                        marginBottom: "8px",
                      }}
                    >
                      {item.event.year}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-hanken)",
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: "#fff",
                        maxWidth: "185px",
                      }}
                    >
                      {item.event.keyEvent}
                    </p>
                  </div>

                  {/* Centre rule */}
                  <div
                    className="absolute left-5 right-5"
                    style={{
                      top: `${LINE_Y}px`,
                      height: "1.5px",
                      backgroundColor: "rgba(255,255,255,0.4)",
                    }}
                  />

                  {/* Description — below line */}
                  {item.event.description && (
                    <div
                      className="absolute px-5"
                      style={{ top: `${LINE_Y + 16}px`, maxWidth: `${SUBTITLE_WIDTH}px` }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "11px",
                          lineHeight: 1.65,
                          color: "rgba(255,255,255,0.75)",
                        }}
                      >
                        {item.event.description.slice(0, 260)}
                        {item.event.description.length > 260 ? "…" : ""}
                      </p>
                    </div>
                  )}
                </div>
              );
            }

            // Regular event
            const colors = CATEGORY_COLORS[item.event.category];
            return (
              <div
                key={item.event.id}
                className="absolute"
                style={{ left: `${item.x}px`, top: 0, height: `${canvasHeight}px` }}
              >
                {/* Dot on line */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: colors.dot,
                    top: `${LINE_Y - 5}px`,
                    left: "6px",
                    zIndex: 10,
                    border: "2px solid #FFFBE9",
                    boxShadow: `0 0 0 1.5px ${colors.dot}`,
                  }}
                />

                {/* Card */}
                <div
                  className="absolute"
                  style={{ top: `${LINE_Y}px`, left: 0, zIndex: 20 }}
                >
                  <TimelineCard event={item.event} position={item.position} />
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
          borderColor: "rgba(26,18,8,0.07)",
          height: "28px",
          backgroundColor: "#FFF7DC",
        }}
      >
        <div
          className="flex items-center h-full pl-20"
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
                color: "rgba(26,18,8,0.28)",
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
