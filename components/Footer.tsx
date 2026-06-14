import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Jesna Beegum S. All rights reserved.</p>
        <p className="inline-flex items-center gap-1.5">
          Built with <Heart size={13} className="fill-primary text-primary" /> using
          React &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
