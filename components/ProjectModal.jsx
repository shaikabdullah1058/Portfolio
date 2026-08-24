"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="h-full w-full max-w-xl overflow-y-auto border-l border-border bg-bg-primary"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-bg-primary/95 px-6 py-4 backdrop-blur">
              <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
                Case Study
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-border text-text-secondary transition-all duration-300 hover:border-text-primary hover:text-text-primary"
              >
                <X size={15} />
              </button>
            </div>

            <div className="px-6 py-8">
              <div className="mb-5 flex items-center gap-2">
                <Badge>{project.category}</Badge>
                <Badge>{project.year}</Badge>
              </div>
              <h2 className="font-display text-3xl font-medium italic text-text-primary">
                {project.title}
              </h2>
              <p className="mt-2 text-base text-text-secondary">{project.tagline}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge key={t} className="font-mono">{t}</Badge>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Button as="a" href={project.links.demo} target="_blank" rel="noreferrer" variant="primary">
                  Live Demo <ExternalLink size={13} />
                </Button>
                <Button as="a" href={project.links.repo} target="_blank" rel="noreferrer" variant="secondary">
                  <Github size={14} /> Repository
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 border-y border-border py-6">
                {project.caseStudy.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-mono text-lg font-medium text-text-primary sm:text-xl">
                      {m.value}
                    </div>
                    <div className="mt-1 text-xs leading-snug text-text-secondary">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <Section title="Problem Statement" text={project.caseStudy.problem} />
              <Section title="Architecture" text={project.caseStudy.architecture} />
              <Section title="Key Learnings" text={project.caseStudy.learnings} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({ title, text }) {
  return (
    <div className="mt-8">
      <h3 className="font-mono text-xs uppercase tracking-wider text-text-secondary">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-text-primary">{text}</p>
    </div>
  );
}
