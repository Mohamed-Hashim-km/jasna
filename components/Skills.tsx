'use client';

import { motion } from "framer-motion";
import { Code2, Globe, Database, Wrench, Sparkles, Snowflake } from "lucide-react";
import { Section } from "./Section";
import { skills } from "@/data/skills";

const iconMap: Record<string, typeof Code2> = {
  Languages: Code2,
  Web: Globe,
  Python: Snowflake,
  Databases: Database,
  Tools: Wrench,
  Other: Sparkles,
};

export function Skills() {
  return (
    <Section id="skills" title="Skills & Tools" kicker="What I Work With">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const Icon = iconMap[group.category] ?? Code2;
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/60 hover:shadow-[0_0_40px_-10px_var(--color-primary)]"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-primary to-secondary p-2.5 text-primary-foreground">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{group.category}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
