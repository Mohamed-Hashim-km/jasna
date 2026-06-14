'use client';

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ProximityText } from "./ProximityText";

export function Section({
  id,
  title,
  kicker,
  children,
}: {
  id: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          {kicker && (
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-primary font-mono font-semibold">
              <ProximityText
                text={kicker}
                fromFontVariationSettings="'wght' 500"
                toFontVariationSettings="'wght' 800"
                radius={100}
              />
            </p>
          )}
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl font-display">
            <ProximityText
              text={title}
              className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
              fromFontVariationSettings="'wght' 700"
              toFontVariationSettings="'wght' 900"
              radius={150}
            />
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
        </motion.div>
        {children}
      </div>
    </section>
  );
}
