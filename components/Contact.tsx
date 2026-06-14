'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, ExternalLink, Send } from "lucide-react";
import { Section } from "./Section";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Section id="contact" title="Get In Touch" kicker="Let's Connect">
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-muted-foreground">
            Open to internships, collaborations, and exciting opportunities. Drop a
            message — I usually respond within a day.
          </p>
          <div className="space-y-3">
            <a
              href="mailto:jesnabeegum07@gmail.com"
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/60"
            >
              <div className="rounded-lg bg-gradient-to-br from-primary to-secondary p-2.5 text-primary-foreground">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                <p className="text-sm text-foreground">jesnabeegum07@gmail.com</p>
              </div>
            </a>
            <a
              href="tel:+917907888165"
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/60"
            >
              <div className="rounded-lg bg-gradient-to-br from-primary to-secondary p-2.5 text-primary-foreground">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Phone</p>
                <p className="text-sm text-foreground">+91 79078 88165</p>
              </div>
            </a>
            <a
              href="https://linkedin.com/in/jesna-beegum-s-907b29364"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/60"
            >
              <div className="rounded-lg bg-gradient-to-br from-primary to-secondary p-2.5 text-primary-foreground">
                <ExternalLink size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">LinkedIn</p>
                <p className="text-sm text-foreground">jesna-beegum-s</p>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 3000);
            (e.target as HTMLFormElement).reset();
          }}
          className="space-y-4 rounded-2xl border border-border bg-card p-6"
        >
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
              Name
            </label>
            <input
              required
              type="text"
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
              Email
            </label>
            <input
              required
              type="email"
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
              Message
            </label>
            <textarea
              required
              rows={4}
              className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            {sent ? "Message Sent!" : (<><Send size={15} /> Send Message</>)}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}
