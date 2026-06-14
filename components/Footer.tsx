import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 px-6 py-10 bg-background/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 text-xs tracking-wider text-muted-foreground/60 md:flex-row font-mono">
        <p>© {new Date().getFullYear()} Jesna Beegum S. All rights reserved.</p>
       
      </div>
    </footer>
  );
}

