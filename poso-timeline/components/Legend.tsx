"use client";

import { CATEGORY_COLORS, Category } from "@/data/timeline";

const LEGEND_CATEGORIES: Category[] = [
  "kalla-oligarch",
  "national-politics",
  "socio-environmental",
  "community-resistance",
  "conflict-militarisation",
  "human-rights",
  "public-donations",
];

export default function Legend() {
  return (
    <div className="flex items-center gap-6 flex-wrap">
      {LEGEND_CATEGORIES.map((cat) => {
        const c = CATEGORY_COLORS[cat];
        return (
          <div key={cat} className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: c.dot }}
            />
            <span
              className="text-[9px] tracking-[0.12em] uppercase"
              style={{
                fontFamily: "var(--font-hanken)",
                color: "rgba(26,18,8,0.5)",
              }}
            >
              {c.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
