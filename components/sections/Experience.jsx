"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience } from "@/data/experience";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/SectionHeading";

function TimelineItem({ item, index, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-10"
    >
      <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-bg-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-text-primary" />
      </span>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 border-b border-border pb-6 pt-0.5 text-left"
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-medium italic text-text-primary sm:text-xl">
              {item.role}
            </h3>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            {item.company} · {item.location}
          </p>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
            {item.summary}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <Badge>{item.duration}</Badge>
          <ChevronDown
            size={16}
            className={`text-text-secondary transition-transform duration-300 ease-out ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ul className="space-y-2.5 py-6">
              {item.details.map((d, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-text-primary">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-secondary" />
                  {d}
                </li>
              ))}
            </ul>
            {item.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pb-6">
                {item.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Career"
        title="Education & Credentials"
        description="My academic degree at VIT Amaravati alongside IIT Madras."
      />

      <div className="mt-14 relative space-y-6 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
  {experience.map((item, i) => (
    <TimelineItem key={item.id} item={item} index={i} defaultOpen={i === 0} />
  ))}
</div>
    </section>
  );
}
