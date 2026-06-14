'use client';

import { ProximityText } from "./ProximityText";

export function Footer() {
  return (
    <footer className="bg-background/30 px-6 py-10 border-t border-border/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 font-mono text-xs tracking-wider text-muted-foreground/60 md:flex-row">
        <p>
          <ProximityText
            text={`© ${new Date().getFullYear()} Jesna Beegum S. All rights reserved.`}
            radius={95}
          />
        </p>
      </div>
    </footer>
  );
}
