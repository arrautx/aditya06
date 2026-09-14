"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TECH_ICONS } from "@/lib/techIcons";

const experiences = [
  {
    company: "KodNest Technology",
    role: "Full Stack Developer Intern",
    duration: "Aug 2025 – May 2026",
    location: "Bangalore, India · Remote",
    image: "/KodNest.jpg",
    badge: "Intern",
    current: true,

    bullets: [
      "Architected 'SalesSavvy,' a full-scale e-commerce platform, integrating a React frontend with a Spring Boot backend to handle seamless product management and user transactions.",
      "Engineered a Secure Authentication System using Spring Security and JWT, implementing robust authorization filters and JavaMailSender for secure email verification.",
      "Optimized Database Performance by designing efficient SQL schemas and implementing RESTful APIs that reduced data fetching latency for complex product catalogs.",
      "Integrated AI-driven insights into financial tracking modules, utilizing external APIs for sentiment analysis to provide users with smarter budgeting data",
    ],

    stack: [
      "React",
      "Tailwind",
      "TypeScript",
      "JavaScript",
      "Express",
      "Docker",
      "Java",
      "C/C++",
      "SQL",
      "HTML & CSS",
      "Spring",
      "Spring Boot",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <main>
      {/* ── Header ── */}
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-5 pt-16 sm:pt-20 pb-8">
        <Link
          href="/"
          className="
            inline-flex
            items-center
            gap-2
            min-h-11
            text-sm
            text-dim-foreground
            hover:text-foreground
            transition-colors
            mb-6
            "
        >
          ← Home
        </Link>

        <p className="text-dim-foreground text-xs uppercase tracking-[0.2em] font-medium mb-1.5">
          Career
        </p>

        <h1
          className="text-3xl sm:text-4xl tracking-tight text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Experience
        </h1>

        <p className="text-dim-foreground text-sm leading-relaxed mt-3 max-w-prose">
          Where I&apos;ve worked and what I&apos;ve built along the way.
        </p>
      </div>

      {/* ── Entries ── */}
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-5 pb-14">
        <div className="flex flex-col gap-4">
          {experiences.map((exp, idx) => (
            <motion.article
              key={exp.company}
              className="rounded-xl border border-border bg-card/90 p-4 sm:p-5 flex flex-col gap-4 transition-colors hover:border-border-strong"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-11 rounded-[10px] border border-border bg-card overflow-hidden shrink-0">
                    <img
                      src={exp.image}
                      alt={exp.company}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-base sm:text-lg font-semibold text-foreground leading-tight">
                        {exp.company}
                      </h2>

                      {exp.badge && (
                        <span className="text-xs px-2 py-px rounded-sm border border-border text-muted-foreground bg-card-inset">
                          {exp.badge}
                        </span>
                      )}

                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border border-border bg-card-inset">
                          <span className="size-1.5 rounded-full bg-status-live" />
                          <span className="text-[11px] font-medium text-muted-foreground">
                            Current
                          </span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-dim-foreground mt-0.5">{exp.role}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm text-muted-foreground tabular-nums">
                    {exp.duration}
                  </p>
                  <p className="text-xs text-dim-foreground mt-0.5">{exp.location}</p>
                </div>
              </div>

              {exp.bullets.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {exp.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                    >
                      <span className="text-dim-foreground mt-0.5 shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {exp.stack.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {exp.stack.map((item) => (
                    <span
                      key={item}
                      className="inline-flex shrink-0 items-center gap-1.5 text-xs text-foreground rounded-md border border-border px-2.5 py-1 bg-card/90"
                    >
                      {TECH_ICONS[item] && (
                        <img
                          src={TECH_ICONS[item]}
                          alt=""
                          className="size-3 shrink-0"
                        />
                      )}
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
