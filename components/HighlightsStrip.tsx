import { siteContent } from "@/content/content";
import { Reveal } from "@/components/Reveal";

export function HighlightsStrip() {
  return (
    <section aria-label="Trusted by and experience highlights" className="py-10">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="rounded-2xl border border-charcoal/10 bg-white/60 px-6 py-5">
            <p className="text-xs uppercase tracking-[0.16em] text-accent">Trusted by / Experience</p>
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-charcoal/80">
              {siteContent.highlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
