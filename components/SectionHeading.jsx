"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl"
    >
      <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-fluid-h2 font-medium italic tracking-tight text-text-primary">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-balance text-base leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </motion.div>
  );
}
