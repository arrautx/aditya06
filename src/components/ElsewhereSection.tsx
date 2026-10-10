import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/arrautx",
    favicon:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/arraut/",
    favicon: "https://leetcode.com/favicon.ico",
  },
  {
    label: "X",
    href: "https://x.com/A9449Raut",
    favicon: "https://abs.twimg.com/favicons/twitter.3.ico",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/aditya-raut-6b7988215/",
    favicon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  },
];

export default function Links() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground py-1.5"
        >
          {link.label === "GitHub" ? (
            <FaGithub className="h-4 w-4 text-muted-foreground" />
          ) : (
            <img
              src={link.favicon}
              alt=""
              loading="lazy"
              decoding="async"
              width={16}
              height={16}
              className="rounded-sm"
            />
          )}

          <span className="underline decoration-border underline-offset-4 transition-colors group-hover:decoration-muted-foreground">
            {link.label}
          </span>

          <ExternalLink
            size={12}
            className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
        </a>
      ))}
    </div>
  );
}
