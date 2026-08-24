"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { projects, categories } from "@/data/projects";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import ProjectModal from "@/components/ProjectModal";
import SectionHeading from "@/components/SectionHeading";

export default function Projects() {
  const [view, setView] = useState("grid");
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null);

  const filtered = useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((p) => p.category === category),
    [category]
  );

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects"
        description="A mix of production systems, open source tools, and applied AI experiments — six shown here out of what's shipped."
      />

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-sm border px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide transition-all duration-300 ease-out ${
                category === c
                  ? "border-text-primary bg-text-primary text-bg-primary"
                  : "border-border text-text-secondary hover:border-text-primary hover:text-text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 self-start rounded-sm border border-border p-1">
          <button
            onClick={() => setView("grid")}
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            className={`flex h-7 w-7 items-center justify-center rounded-sm transition-all duration-300 ${
              view === "grid" ? "bg-text-primary text-bg-primary" : "text-text-secondary"
            }`}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => setView("list")}
            aria-label="List view"
            aria-pressed={view === "list"}
            className={`flex h-7 w-7 items-center justify-center rounded-sm transition-all duration-300 ${
              view === "list" ? "bg-text-primary text-bg-primary" : "text-text-secondary"
            }`}
          >
            <List size={14} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="group h-full overflow-hidden hover:border-text-primary">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-medium italic text-text-primary">
                        {p.title}
                      </h3>
                      <span className="font-mono text-xs text-text-secondary">{p.year}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {p.tagline}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 3).map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-4 border-t border-border pt-4">
                      <button
                        onClick={() => setActive(p)}
                        className="text-sm font-medium text-text-primary underline-offset-4 hover:underline"
                      >
                        Case Study
                      </button>
                      <a
                        href={p.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-auto flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary"
                      >
                        Demo <ExternalLink size={11} />
                      </a>
                      <a
                        href={p.links.repo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub repository"
                        className="text-text-secondary hover:text-text-primary"
                      >
                        <Github size={14} />
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 divide-y divide-border border-y border-border"
          >
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p)}
                className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-all duration-300 ease-out hover:px-2"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-base font-medium italic text-text-primary sm:text-lg">
                      {p.title}
                    </h3>
                    <Badge>{p.category}</Badge>
                  </div>
                  <p className="mt-1 truncate text-sm text-text-secondary">{p.tagline}</p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="hidden font-mono text-xs text-text-secondary sm:inline">
                    {p.year}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-text-secondary transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-primary"
                  />
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
