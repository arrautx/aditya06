"use client";

import { useEffect, useState } from "react";

type Quote = { quote: string; author: string };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

// Edit quotes here — add or remove entries and the carousel adapts automatically.
const quotes: Quote[] = [
  {
    quote: "Do so much work that it would be unreasonable for you to not be successful.",
    author: "Alex Hormozi",
  },
  {
    quote: "The best way to predict the future is to build it.",
    author: "Alan Kay",
  },
  {
    quote: "First solve the problem. Then write the code.",
    author: "John Johnson",
  },
  {
    quote: "Stay hungry. Stay foolish.",
    author: "Steve Jobs",
  },
  {
    quote: "A little progress each day adds up to big results.",
    author: "Satya Nani",
  },
  {
    quote: "Consistency compounds faster than intensity.",
    author: "Unknown",
  },
  {
    quote: "The obstacle is the way.",
    author: "Marcus Aurelius",
  },
  {
    quote: "Focus on the process, not the outcome.",
    author: "James Clear",
  },
];

const ROTATE_MS = 5500;

export default function Footer() {
  const [index, setIndex] = useState(() => {
    // still open on the day's quote
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    );
    return dayOfYear % quotes.length;
  });
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % quotes.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [paused, prefersReducedMotion]);

  return (
    <footer className="mt-10 sm:mt-12 md:mt-14 border-t border-border">
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div
          className="max-w-[580px] text-center rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-border-strong"
          aria-live="polite"
          tabIndex={0}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <span
            aria-hidden="true"
            className="block text-[40px] sm:text-[56px] leading-none text-foreground/[0.06] mb-[-0.2em]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            &ldquo;
          </span>

          {/* layers share one grid cell so the block is always as tall as the
              tallest quote — swapping quotes never reflows the layout.
              Only the active slide carries a transition: an inactive slide
              drops to opacity 0 immediately, so the outgoing and incoming
              quotes never render on top of each other mid-swap. */}
          <div className="grid">
            {quotes.map((q, i) => (
              <div
                key={i}
                aria-hidden={i !== index}
                className={`col-start-1 row-start-1 motion-reduce:transition-none ${
                  i === index
                    ? "transition-opacity duration-500 opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <p
                  className="text-[22px] sm:text-[26px] md:text-[30px] font-medium italic leading-[1.65] text-foreground"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  &ldquo;{q.quote}&rdquo;
                </p>

                <div className="flex items-center justify-center gap-2.5 mt-6">
                  <div className="w-6 h-px bg-accent" />
                  <span className="text-xs tracking-widest uppercase text-dim-foreground">
                    {q.author}
                  </span>
                  <div className="w-6 h-px bg-accent" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            {quotes.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show quote ${i + 1} of ${quotes.length}: ${q.author}`}
                aria-current={i === index ? "true" : undefined}
                className={`size-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                  i === index
                    ? "bg-foreground/50 scale-125"
                    : "bg-foreground/20 hover:bg-foreground/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
