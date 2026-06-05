"use client";

import { timelineData, CATEGORY_COLORS } from "@/data/timeline";
import TimelineCard from "./TimelineCard";
import Legend from "./Legend";

export default function Timeline() {
  // Alternate left/right for non-subtitle items
  let sideCounter = 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F4EF" }}>
      {/* Sidebar + header layout */}
      <div className="flex min-h-screen">
        {/* Left sidebar */}
        <aside
          className="w-64 flex-shrink-0 sticky top-0 h-screen flex flex-col justify-between p-8"
          style={{ backgroundColor: "#F2A9A0" }}
        >
          <div>
            <nav className="flex flex-col gap-2 mb-12">
              {["About", "Methodology", "Reading Room"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-white hover:underline"
                  style={{ fontFamily: "var(--font-hanken)", fontWeight: 400 }}
                >
                  {item}
                </a>
              ))}
            </nav>
            <Legend />
          </div>

          {/* Map icon placeholder */}
          <div className="flex flex-col items-start gap-2">
            <div
              className="w-12 h-16 opacity-80"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 80'%3E%3Cellipse cx='30' cy='40' rx='22' ry='32' fill='%231a3a2a' opacity='0.85'/%3E%3C/svg%3E")`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            />
            <span
              className="text-xs text-white opacity-70"
              style={{ fontFamily: "var(--font-hanken)" }}
            >
              EN / IDN
            </span>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Page header */}
          <div className="px-16 pt-16 pb-10 max-w-4xl">
            <h1
              className="text-3xl font-800 text-stone-900 leading-tight mb-6"
              style={{ fontFamily: "var(--font-hanken)", fontWeight: 800 }}
            >
              Unfolding Socio-Environmental Violence of the Hydroelectric
              Infrastructure Violence in Poso Lake Watershed
            </h1>
            <p
              className="text-sm text-stone-600 leading-relaxed max-w-2xl"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              This timeline analysis aims to understand the Poso Energy Hydroelectric
              Dam in the larger Indonesia&apos;s socio-political contexts, unfolding the
              violence (and negligence) toward its surrounding ecosystem and community
              (especially the To Pamona Indigenous community in Pamona, Poso). This
              analysis is to understand that what happened in Poso could not be
              separated to larger violence contexts related to hydrodam development.
            </p>
          </div>

          {/* Timeline area */}
          <div className="relative px-8 pb-24">
            {/* Vertical centre line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ backgroundColor: "#D4C5B0" }}
            />

            <div className="flex flex-col gap-8 relative">
              {timelineData.map((event) => {
                if (event.category === "subtitle") {
                  return (
                    <div key={event.id} className="relative">
                      <TimelineCard event={event} side="left" />
                    </div>
                  );
                }

                const side = sideCounter % 2 === 0 ? "left" : "right";
                sideCounter++;

                const dotColor = CATEGORY_COLORS[event.category].dot;

                return (
                  <div key={event.id} className="relative flex items-start">
                    {/* Dot on the centre line */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full mt-5 z-10"
                      style={{ backgroundColor: dotColor, border: "2px solid #F7F4EF" }}
                    />
                    <TimelineCard event={event} side={side} />
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
