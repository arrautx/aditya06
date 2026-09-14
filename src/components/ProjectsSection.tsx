"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { TECH_ICONS } from "@/lib/techIcons";

interface Project {
  title: string;
  description: string;
  imageSrc: string;
  backgroundImage?: string;
  tags: string[];
  github: string;
  live?: string;
  status?: "live" | "building" | "not-started";
  comingSoon?: boolean;
}

const projects: Project[] = [
  {
    title: "Calidraw",
    description:
      "A real-time collaborative whiteboard that allows multiple users to join the same room",
    imageSrc: "/project2.png",
    backgroundImage: "/b1.png",
    tags: ["Next.js","TypeScript", "Tailwind" , "Bun" ,"Prisma" ,"Radix UI" , "shadcn/ui"],
    github: "https://github.com/arrautx",
    live: "https://github.com/arrautx",
    status: "live",
  },
  {
    title: "Transcoder",
    description:
      "Turn raw video uploads into streaming-ready HLS — no encoding pipeline required",
    imageSrc: "/project1.png",
    backgroundImage: "/b2.png",
    tags: ["Next.js", "shadcn/ui", "Bun", "TypeScript" , "Prisma" , "Redis"],
    github: "https://github.com/arrautx",
    status: "live",
  },
  // {
  //   title: "Blueprint",
  //   description:
  //     "Blueprint is an AI UI builder that turns prompts into structured, production-ready interfaces.",
  //   imageSrc: "/coming.png",
  //   backgroundImage: "/b3.png",
  //   tags: ["Next.js", "TypeScript", "Tailwind", "Prisma", "Bun"],
  //   github: "https://github.com/arrautx",
  //   status: "building",
  //   comingSoon: true,
  // },
  // {
  //   title: "Inquiro",
  //   description:
  //     "Inquiro is an AI-powered search engine that helps you find information on the internet.",
  //   imageSrc: "/project3.png",
  //   backgroundImage: "/b4.png",
  //   tags: ["Next.js", "TypeScript", "Radix UI", "Gemini"],
  //   github: "https://github.com/arrautx",
  //   status: "not-started",
  // },
];

const statusConfig = {
  live: { dot: "bg-status-live", label: "Live" },
  building: { dot: "bg-status-building", label: "Building" },
  "not-started": { dot: "bg-status-idle", label: "Not Started" },
};

function ComingSoonThumb() {
  return (
    <div className="relative size-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black">
      {/* dot grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, #52525b 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      {/* soft glow behind text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute size-40 rounded-full bg-zinc-600/20 blur-3xl" />
        <div className="relative text-center select-none">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim-foreground">
            Stay Tuned
          </p>
          <p className="mt-2 text-xl sm:text-2xl font-bold uppercase tracking-widest text-foreground">
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const cfg = statusConfig[project.status ?? "live"];

  return (
    <div
      className="flex flex-col h-full group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image card */}
      <div className="relative w-full aspect-[1.4] rounded-xl border border-border bg-background shadow-sm p-4 pb-0 flex flex-col overflow-hidden transition-all duration-300 hover:border-border-strong">
        {/* Ambient background */}
        {project.backgroundImage && (
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${project.backgroundImage}')` }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}

        {/* "View Project" label */}
        <motion.p
          className="absolute z-30 text-[10px] font-bold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          animate={{
            left: hovered ? "50%" : "1rem",
            top: hovered ? "22%" : "1rem",
            x: hovered ? "-50%" : "0%",
            color: hovered ? "#ffffff" : "rgb(113,113,122)",
            opacity: hovered ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          View Project
        </motion.p>

        {/* Floating screenshot */}
        <motion.div
          className="absolute bottom-0 left-1/2 w-[85%] rounded-t-[10px] bg-card shadow-[0_-8px_30px_rgba(0,0,0,0.5)] z-20 border border-border border-b-0"
          animate={{
            height: hovered ? "70%" : "78%",
            y: hovered ? 4 : 0,
            x: "-50%",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="size-full overflow-hidden rounded-t-[9px]">
            {project.comingSoon ? (
              <ComingSoonThumb />
            ) : (
              <img
                src={project.imageSrc}
                alt={`${project.title} preview`}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* Content below card — overlaps up slightly */}
      <div className="-mt-1 pt-5 flex flex-1 flex-col px-0.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-foreground leading-tight">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-border bg-card/90 shrink-0">
            <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            <span className="text-xs font-medium text-muted-foreground">
              {cfg.label}
            </span>
          </div>
        </div>

        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Tags row — text labels with optional logo, wraps instead of clipping */}
        <div className="flex flex-wrap gap-1.5 mt-3 pb-0.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground rounded-md border border-border px-2.5 py-1 bg-card/90"
            >
              {TECH_ICONS[tag] && (
                <img src={TECH_ICONS[tag]} alt="" className="size-3 shrink-0" />
              )}
              {tag}
            </span>
          ))}
        </div>

        {/* Links row — pinned to card bottom, identical padding on every card */}
        <div className="mt-auto pt-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-card/90">
            {/* Fixed-width icon slot keeps View Project aligned across cards */}
            <div className="flex items-center gap-1.5 min-w-[70px] sm:min-w-[34px]">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dim-foreground hover:text-foreground transition-colors inline-flex items-center justify-center size-8 sm:size-auto"
                  aria-label="Live site"
                >
                  <Globe size={14} />
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dim-foreground hover:text-foreground transition-colors inline-flex items-center justify-center size-8 sm:size-auto"
                aria-label="GitHub"
              >
                <FaGithub size={14} />
              </a>
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto min-h-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors"
            >
              View Project
              <svg
                viewBox="0 0 24 24"
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({
  showAll = false,
}: {
  showAll?: boolean;
}) {
  const visible = showAll ? projects : projects.slice(0, 4);

  return (
    <section>
      {!showAll && (
        <>
          {/* Section header — same pattern as the other sections:
              serif heading + dashed rule + uppercase counter. */}
          <div className="flex items-center gap-4 sm:gap-5">
            <h2
              className="text-foreground text-xl sm:text-2xl leading-none tracking-wide whitespace-nowrap"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Projects
            </h2>

            <span
              aria-hidden="true"
              className="h-px min-w-6 flex-1 border-t border-dashed border-border-strong"
            />

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-dim-foreground whitespace-nowrap">
              {String(projects.length).padStart(2, "0")} Projects
            </span>
          </div>

          <p className="mt-4 inline-block border border-dashed border-border-strong bg-card-inset px-4 py-2 text-sm font-mono text-muted-foreground rounded-none">
            I love designing and building thoughtful, production-grade
            applications.
          </p>
        </>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 items-stretch gap-x-6 md:gap-x-10 gap-y-8 pt-5">
        {visible.map((project, idx) => (
          <motion.div
            key={project.title}
            className="h-full rounded-xl border border-border bg-card/90 hover:border-border-strong transition-colors p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      {!showAll && projects.length > visible.length && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-6"
        >
          <a
            href="/projects"
            className="inline-flex items-center justify-center min-h-11 gap-2 rounded-lg border border-border bg-card text-muted-foreground text-sm font-medium px-5 py-2 hover:bg-accent transition-all duration-200"
          >
            View all projects
          </a>
        </motion.div>
      )}
    </section>
  );
}
