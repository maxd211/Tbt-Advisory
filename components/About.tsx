import { siteContent } from "@/content/content";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="border-t border-charcoal/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink md:text-4xl">{siteContent.about.title}</h2>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-8 md:grid-cols-2">
          {siteContent.about.blocks.map((block, index) => (
            <Reveal key={block.title} delayMs={index * 90} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-charcoal/10 bg-white/75 p-8 shadow-soft">
                <p className="text-xs uppercase tracking-[0.16em] text-accent">0{index + 1}</p>
                <h3 className="mt-3 font-serif text-2xl text-ink">{block.title}</h3>
                <div className="mt-5 space-y-5 text-[1.02rem] leading-relaxed text-charcoal/85">
                  {block.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
