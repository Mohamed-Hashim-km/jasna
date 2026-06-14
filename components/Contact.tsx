'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, ExternalLink, Send } from "lucide-react";
import { Section } from "./Section";
import { Magnetic } from "./Magnetic";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  required?: boolean;
}

function InputField({ label, type, name, required = false }: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const active = focused || value.length > 0;

  return (
    <div className="relative mt-5">
      <motion.label
        animate={{
          y: active ? -24 : 12,
          scale: active ? 0.85 : 1,
          color: active ? "oklch(0.55 0.22 235)" : "rgba(255, 255, 255, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="absolute left-4 top-0 origin-left pointer-events-none text-sm text-muted-foreground/60 select-none font-light"
      >
        {label}
      </motion.label>
      <input
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-xl border border-border/70 bg-background/20 px-4 py-3.5 text-sm text-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:bg-background/50"
      />
    </div>
  );
}

function TextAreaField({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const active = focused || value.length > 0;

  return (
    <div className="relative mt-5">
      <motion.label
        animate={{
          y: active ? -24 : 12,
          scale: active ? 0.85 : 1,
          color: active ? "oklch(0.55 0.22 235)" : "rgba(255, 255, 255, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="absolute left-4 top-0 origin-left pointer-events-none text-sm text-muted-foreground/60 select-none font-light"
      >
        {label}
      </motion.label>
      <textarea
        required={required}
        rows={4}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full resize-none rounded-xl border border-border/70 bg-background/20 px-4 py-3.5 text-sm text-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:bg-background/50"
      />
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Section id="contact" title="Get In Touch" kicker="Let's Connect">
      <div className="grid gap-12 md:grid-cols-2 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-muted-foreground/80 leading-relaxed font-light text-base md:text-lg">
            Open to internships, collaborations, and exciting opportunities. Drop a
            message — I usually respond within a day.
          </p>
          <div className="space-y-4">
            <Magnetic range={40} strength={0.2}>
              <a
                href="mailto:jesnabeegum07@gmail.com"
                className="group flex w-full items-center gap-4 rounded-xl border border-border/70 bg-card/20 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-card/40"
              >
                <div className="rounded-lg bg-gradient-to-br from-primary to-secondary p-3 text-primary-foreground shadow-md transition-transform group-hover:scale-110">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground/50 font-semibold font-mono">Email</p>
                  <p className="text-sm text-foreground/90 group-hover:text-primary transition-colors font-medium">jesnabeegum07@gmail.com</p>
                </div>
              </a>
            </Magnetic>

            <Magnetic range={40} strength={0.2}>
              <a
                href="tel:+917907888165"
                className="group flex w-full items-center gap-4 rounded-xl border border-border/70 bg-card/20 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-card/40"
              >
                <div className="rounded-lg bg-gradient-to-br from-primary to-secondary p-3 text-primary-foreground shadow-md transition-transform group-hover:scale-110">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground/50 font-semibold font-mono">Phone</p>
                  <p className="text-sm text-foreground/90 group-hover:text-primary transition-colors font-medium">+91 79078 88165</p>
                </div>
              </a>
            </Magnetic>

            <Magnetic range={40} strength={0.2}>
              <a
                href="https://linkedin.com/in/jesna-beegum-s-907b29364"
                target="_blank"
                rel="noreferrer"
                className="group flex w-full items-center gap-4 rounded-xl border border-border/70 bg-card/20 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-card/40"
              >
                <div className="rounded-lg bg-gradient-to-br from-primary to-secondary p-3 text-primary-foreground shadow-md transition-transform group-hover:scale-110">
                  <ExternalLink size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground/50 font-semibold font-mono">LinkedIn</p>
                  <p className="text-sm text-foreground/90 group-hover:text-primary transition-colors font-medium">jesna-beegum-s</p>
                </div>
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 3000);
            (e.target as HTMLFormElement).reset();
          }}
          className="space-y-5 rounded-2xl border border-border/70 bg-card/30 p-8 shadow-xl"
        >
          <InputField label="Name" type="text" name="name" required />
          <InputField label="Email" type="email" name="email" required />
          <TextAreaField label="Message" name="message" required />
          
          <div className="pt-2">
            <Magnetic range={40} strength={0.25}>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_35px_-8px_var(--color-primary)] transition-all hover:scale-[1.01]"
              >
                {sent ? "Message Sent!" : (
                  <>
                    <Send size={15} /> Send Message
                  </>
                )}
              </button>
            </Magnetic>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}
