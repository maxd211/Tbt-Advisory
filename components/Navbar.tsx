"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { siteContent } from "@/content/content";

const navItems = [
  { href: "#hero", label: "Home", id: "hero" },
  { href: "#about", label: "About", id: "about" },
  { href: "#services", label: "Services", id: "services" },
  { href: "#contact", label: "Contact", id: "contact" },
  { href: "#imprint", label: "Imprint", id: "imprint" }
] as const;

export function Navbar() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.35;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) {
          current = section.id;
        }
      }

      setActiveId(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  const linkClass = (id: string) =>
    clsx(
      "rounded-full px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
      activeId === id ? "text-ink bg-white/80" : "text-charcoal/75 hover:text-ink"
    );

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-ivory/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="#hero"
          className="font-serif text-lg tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {siteContent.brand}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href} className={linkClass(item.id)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-ink transition hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={clsx(
          "md:hidden overflow-hidden border-t border-charcoal/10 transition-all duration-300",
          menuOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-6 py-4" aria-label="Mobile">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={clsx("py-2 text-sm", activeId === item.id ? "text-ink" : "text-charcoal/75")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
