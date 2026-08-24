import { socials } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-text-secondary sm:flex-row">
        <span>© {new Date().getFullYear()} Shaik Mohammad Abdullah. All Rights Reserved.</span>
        <div className="flex items-center gap-4">
          <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-text-primary">
            GitHub
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-text-primary">
            LinkedIn
          </a>
          <a href={`mailto:${socials.email}`} className="hover:text-text-primary">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
