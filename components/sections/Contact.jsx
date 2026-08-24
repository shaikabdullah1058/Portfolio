"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Github, Linkedin, Twitter, Send, Instagram } from "lucide-react";
import toast from "react-hot-toast";
import { socials } from "@/lib/utils";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/ui/Button";

const socialCards = [
  { key: "github", label: "GitHub", handle: "@Abdullah", icon: Github, href: socials.github, preview: "Currently building in public on GitHub." },
  { key: "linkedin", label: "LinkedIn", handle: "Abdullah", icon: Linkedin, href: socials.linkedin, preview: "Student at VIT-AP" },
  { key: "instagram", label: "Instagram", handle: "@Abdullah", icon: Instagram, href: socials.instagram, preview: "Interested in frontend architecture & AI tooling" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const copyEmail = async () => {
    await navigator.clipboard.writeText(socials.email);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Name is required.";
    if (!values.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      next.message = "Message should be at least 10 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("Message sent — I'll reply within a day or two.");
      setValues({ name: "", email: "", message: "" });
      setStatus("idle");
    } catch {
      toast.error("Something went wrong. Try emailing directly instead.");
      setStatus("idle");
    }
  };

  const field = (name) =>
    `w-full rounded-sm border bg-transparent px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary transition-all duration-300 ease-out focus:outline-none ${
      errors[name] ? "border-red-500" : "border-border focus:border-text-primary"
    }`;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Get In Touch"
        title="Let's build something"
        description="Open to staff-level frontend roles and select freelance projects. Fastest way to reach me is email."
      />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-text-secondary">
              Name
            </label>
            <input
              id="name"
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              placeholder="Jordan Rivers"
              className={field("name")}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-text-secondary">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              placeholder="you@company.com"
              className={field("email")}
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-text-secondary">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={values.message}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
              placeholder="What are you building?"
              className={field("message")}
            />
            {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
          </div>

          <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
            {status === "loading" ? "Sending…" : "Send message"}
            <Send size={14} />
          </Button>
        </form>

        <div>
          <button
            onClick={copyEmail}
            className="flex w-full items-center justify-between rounded-sm border border-border px-4 py-3.5 text-left transition-all duration-300 ease-out hover:border-text-primary"
          >
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-text-secondary">
                Email
              </div>
              <div className="mt-0.5 text-sm text-text-primary">{socials.email}</div>
            </div>
            <motion.span
              animate={{ scale: copied ? 1.1 : 1 }}
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-border"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </motion.span>
          </button>

          <div className="mt-6 space-y-3">
            {socialCards.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-sm border border-border p-4 transition-all duration-300 ease-out hover:border-text-primary"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
                  <s.icon size={16} />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-text-primary">{s.label}</span>
                    <span className="font-mono text-xs text-text-secondary">{s.handle}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-text-secondary">{s.preview}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
