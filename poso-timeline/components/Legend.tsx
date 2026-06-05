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
    <div className="flex flex-col gap-2">
      <p
        className="text-[10px] uppercase tracking-widest text-stone-400 mb-1"
        style={{ fontFamily: "var(--font-hanken)" }}
      >
        Category
      </p>
      {LEGEND_CATEGORIES.map((cat) => {
        const c = CATEGORY_COLORS[cat];
        return (
          <div key={cat} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: c.dot }}
            />
            <span
              className="text-xs text-stone-600"
              style={{ fontFamily: "var(--font-hanken)" }}
            >
              {c.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
