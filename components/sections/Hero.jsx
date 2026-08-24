"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowDown, Instagram } from "lucide-react";
import { socials } from "@/lib/utils";

function useLocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(now);
      setTime(formatted);
    };
    update();
    const interval = setInterval(update, 1000 * 30);
    return () => clearInterval(interval);
  }, []);
  return time;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const line = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const time = useLocalTime();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div className="grid-texture pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-3xl"
        >
          <motion.div variants={line} className="mb-6 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-text-primary opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-text-primary" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
              Available for new opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={line}
            className="text-balance font-display text-fluid-hero font-medium italic leading-[0.95] tracking-tight text-text-primary"
          >
            Shaik Mohammad Abdullah
          </motion.h1>

          <motion.p
            variants={line}
            className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-text-secondary sm:text-xl"
          >
            Full stack engineer building fast, well-considered products at
            the intersection of frontend craft and applied AI.
            <span className="ml-1 inline-block h-5 w-[2px] translate-y-0.5 animate-blink bg-text-primary align-middle" />
          </motion.p>

          <motion.div
            variants={line}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm text-text-secondary"
          >
            <span>Guntur, India</span>
            <span className="text-border">•</span>
            <span suppressHydrationWarning>{time || "07:09 AM"} IST</span>
          </motion.div>

          <motion.div variants={line} className="mt-10 flex items-center gap-4">
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-text-secondary transition-all duration-300 ease-out hover:border-text-primary hover:text-text-primary"
            >
              <Github size={17} />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-text-secondary transition-all duration-300 ease-out hover:border-text-primary hover:text-text-primary"
            >
              <Linkedin size={17} />
            </a>
            <a
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-text-secondary transition-all duration-300 ease-out hover:border-text-primary hover:text-text-primary"
            >
              <Instagram size={17} />
            </a>
            <a
              href={`mailto:${socials.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-text-secondary transition-all duration-300 ease-out hover:border-text-primary hover:text-text-primary"
            >
              <Mail size={17} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={() =>
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Scroll to projects"
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-text-secondary transition-colors duration-300 hover:text-text-primary"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
