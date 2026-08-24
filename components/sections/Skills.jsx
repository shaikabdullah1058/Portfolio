"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { skillGroups } from "@/data/skills";
import SectionHeading from "@/components/SectionHeading";

const levelDot = {
  "Production Ready": "bg-text-primary",
  Comfortable: "bg-text-secondary",
  "Working Knowledge": "bg-border",
};

export default function Skills() {
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    if (!query.trim()) return skillGroups;
    const q = query.toLowerCase();
    return skillGroups
      .map((group) => ({
        ...group,
        skills: group.skills.filter((s) => s.name.toLowerCase().includes(q)),
      }))
      .filter((group) => group.skills.length > 0);
  }, [query]);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Toolbox"
          title="Tech Stack & Skills"
          description="Grouped by layer of the stack, with an honest read on depth rather than a checklist."
        />
        <div className="relative w-full sm:w-64">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a skill…"
            aria-label="Search skills"
            className="w-full rounded-sm border border-border bg-transparent py-2.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-secondary transition-all duration-300 ease-out focus:border-text-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
        {filteredGroups.map((group) => (
          <div key={group.id}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
              {group.label}
            </h3>
            <div className="mt-4 divide-y divide-border border-t border-border">
              {group.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group relative flex items-center justify-between gap-4 py-3.5"
                >
                  {/* Tooltip Popup */}
                  {skill.description && (
                    <div className="pointer-events-none absolute -top-8 left-0 z-20 whitespace-nowrap rounded-md border border-border bg-bg-secondary px-3 py-1 text-xs font-mono text-text-primary opacity-0 shadow-lg transition-all duration-200 ease-out group-hover:-top-10 group-hover:opacity-100">
                      {skill.description}
                      <div className="absolute top-full left-4 -ml-1 border-4 border-transparent border-t-border" />
                    </div>
                  )}

                  <div className="flex items-center gap-2.5">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${levelDot[skill.level]}`}
                    />
                    <span className="text-sm text-text-primary transition-colors duration-200 group-hover:text-accent">
                      {skill.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden font-mono text-xs text-text-secondary sm:inline">
                      {skill.years}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wide text-text-secondary">
                      {skill.level}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
        {filteredGroups.length === 0 && (
          <p className="text-sm text-text-secondary">No skills match "{query}".</p>
        )}
      </div>
    </section>
  );
}