"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, ArrowDownToLine, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import CommandMenu from "@/components/CommandMenu";
import Button from "@/components/ui/Button";

const links = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "border-b border-border bg-bg-primary/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => go("hero")}
          aria-label="Go to top"
          className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-text-primary text-[13px]">
            AM
          </span>
          <span className="hidden text-text-secondary sm:inline">/ dev</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className="text-sm text-text-secondary transition-all duration-300 ease-out hover:text-text-primary"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CommandMenu />
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-text-secondary transition-all duration-300 ease-out hover:border-text-primary hover:text-text-primary"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <Button
            as="a"
            href="/resume.pdf"
            download
            variant="secondary"
            className="hidden sm:inline-flex"
          >
            <ArrowDownToLine size={14} />
            Resume
          </Button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-border md:hidden"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="flex flex-col gap-1 border-t border-border bg-bg-primary px-6 py-4 md:hidden"
        >
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className="py-2 text-left text-sm text-text-secondary transition-all duration-300 hover:text-text-primary"
            >
              {link.label}
            </button>
          ))}
          <a href="/resume.pdf" download className="py-2 text-left text-sm text-text-secondary hover:text-text-primary">
            Download resume
          </a>
        </motion.nav>
      )}
    </motion.header>
  );
}
