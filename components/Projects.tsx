'use client';

import { motion } from "framer-motion";
import { Folder, UserCircle2 } from "lucide-react";
import { Section } from "./Section";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <Section id="projects" title="Featured Projects" kicker="Recent Work">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/60 hover:shadow-[0_0_60px_-15px_var(--color-primary)]"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-gradient-to-br from-primary to-secondary p-3 text-primary-foreground">
                  <Folder size={22} />
                </div>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-wider text-primary">
                  Featured
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-gradient-to-r from-primary/20 to-secondary/20 px-2.5 py-1 text-xs text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <UserCircle2 size={14} className="text-primary" />
                <span>{p.role}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
