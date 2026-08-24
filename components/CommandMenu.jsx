"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FolderGit2,
  Briefcase,
  Wrench,
  Mail,
  Copy,
  Github,
  Sun,
  Moon,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "@/components/ThemeProvider";
import { socials } from "@/lib/utils";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = useCallback((id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(socials.email);
    toast.success("Email copied to clipboard");
    setOpen(false);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className="hidden items-center gap-2 rounded-sm border border-border px-3 py-1.5 text-xs text-text-secondary transition-all duration-300 ease-out hover:border-text-primary hover:text-text-primary sm:flex"
      >
        <span className="font-mono">Search</span>
        <kbd className="rounded-sm border border-border px-1.5 py-0.5 font-mono text-[10px]">
          &#8984;K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-sm border border-border bg-bg-primary shadow-2xl"
            >
              <Command label="Command Menu">
                <div className="flex items-center border-b border-border px-4">
                  <Command.Input
                    autoFocus
                    placeholder="Jump to a section, or run a command…"
                    className="w-full bg-transparent py-3.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none"
                  />
                </div>
                <Command.List className="max-h-80 overflow-y-auto p-2">
                  <Command.Empty className="px-3 py-6 text-center text-sm text-text-secondary">
                    No results found.
                  </Command.Empty>

                  <Command.Group heading="Navigate" className="px-2 py-1.5 text-[11px] font-mono uppercase tracking-wider text-text-secondary [&_[cmdk-group-heading]]:mb-1 [&_[cmdk-group-heading]]:mt-2">
                    <Item icon={Home} onSelect={() => go("hero")}>Home</Item>
                    <Item icon={FolderGit2} onSelect={() => go("projects")}>Projects</Item>
                    <Item icon={Briefcase} onSelect={() => go("experience")}>Experience</Item>
                    <Item icon={Wrench} onSelect={() => go("skills")}>Skills</Item>
                    <Item icon={Mail} onSelect={() => go("contact")}>Contact</Item>
                  </Command.Group>

                  <Command.Group heading="Actions" className="px-2 py-1.5 text-[11px] font-mono uppercase tracking-wider text-text-secondary [&_[cmdk-group-heading]]:mb-1 [&_[cmdk-group-heading]]:mt-3">
                    <Item icon={Copy} onSelect={copyEmail}>Copy email address</Item>
                    <Item icon={Github} onSelect={() => window.open(socials.github, "_blank")}>Open GitHub profile</Item>
                    <Item icon={FileText} onSelect={() => window.open("/resume.pdf", "_blank")}>Download resume</Item>
                    <Item icon={Sun} onSelect={toggleTheme}>Toggle theme</Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Item({ icon: Icon, children, onSelect }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm text-text-primary aria-selected:bg-bg-secondary"
    >
      <Icon size={15} strokeWidth={1.75} className="text-text-secondary" />
      {children}
    </Command.Item>
  );
}
