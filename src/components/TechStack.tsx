"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import type { IconType } from "react-icons";
import {
  SiBun,
  SiDjango,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiGreensock,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiShadcnui,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbDatabaseSearch, TbLetterZ } from "react-icons/tb";
import { FaCode, FaDatabase, FaJava } from "react-icons/fa";

interface Tech {
  name: string;
  Icon: IconType;
  color: string;
  darkColor?: string;
}
const STACK: Tech[] = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    color: "#000000",
    darkColor: "#ffffff",
  },
  { name: "Expo", Icon: SiExpo, color: "#000020", darkColor: "#ffffff" },
  { name: "Django", Icon: SiDjango, color: "#092E20", darkColor: "#44B78B" },
  { name: "Spring Boot", Icon: SiSpringboot, color: "#6DB33F" },
  { name: "Express", Icon: SiExpress, color: "#000000", darkColor: "#ffffff" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Bun", Icon: SiBun, color: "#000000", darkColor: "#ffffff" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Redis", Icon: SiRedis, color: "#FF4438" },
  { name: "Prisma", Icon: SiPrisma, color: "#2D3748", darkColor: "#8FA0C8" },
  { name: "Zustand", Icon: TbLetterZ, color: "#453D39", darkColor: "#A89F94" },
  {
    name: "TanStack Query",
    Icon: TbDatabaseSearch,
    color: "#6B6455",
    darkColor: "#ECE8D1",
  },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  {
    name: "shadcn/ui",
    Icon: SiShadcnui,
    color: "#000000",
    darkColor: "#ffffff",
  },
  { name: "Motion", Icon: SiFramer, color: "#0055FF" },
  { name: "GSAP", Icon: SiGreensock, color: "#88CE02" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Java", Icon: FaJava, color: "#E76F00" },
  { name: "C/C++", Icon: FaCode, color: "#00599C", darkColor: "#6E9BD2" },
  { name: "SQL", Icon: FaDatabase, color: "#3B82F6" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#181717", darkColor: "#ffffff" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Linux", Icon: SiLinux, color: "#FCC624" },
];

export default function TechStack() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section>
      <div className="flex items-center gap-4 sm:gap-5">
        <h2
          className="text-foreground text-xl sm:text-2xl leading-none tracking-wide whitespace-nowrap"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Tech Stack
        </h2>

        <span
          aria-hidden="true"
          className="h-px min-w-6 flex-1 border-t border-dashed border-border-strong"
        />

        <span className="text-xs font-medium uppercase tracking-[0.2em] text-dim-foreground whitespace-nowrap">
          {STACK.length} Tools
        </span>
      </div>
      <div className="relative mt-5">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[10px] opacity-30 dark:opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(var(--border-strong) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />

        <div className="relative">
          <div className="flex flex-wrap justify-between gap-1.5 sm:gap-2">
            {STACK.map((tech, i) => (
              <motion.span
                key={tech.name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-card text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:text-foreground"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
              >
                <tech.Icon
                  aria-hidden="true"
                  className="size-4 shrink-0"
                  style={{
                    color:
                      isDark && tech.darkColor ? tech.darkColor : tech.color,
                  }}
                />
                {tech.name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}