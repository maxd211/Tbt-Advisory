import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/content";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section id="hero" className="mx-auto grid max-w-6xl gap-14 px-6 pb-20 pt-16 md:grid-cols-[1.15fr_0.85fr] md:items-center">
      <Reveal>
        <p className="mb-6 text-sm uppercase tracking-[0.18em] text-accent">{siteContent.brand}</p>
        <h1 className="max-w-xl font-serif text-4xl leading-tight text-ink md:text-6xl">
          {siteContent.hero.headline}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/80">{siteContent.hero.subline}</p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Link
            href={siteContent.hero.primaryCta.href}
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition hover:bg-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {siteContent.hero.primaryCta.label}
          </Link>
        </div>
      </Reveal>

      <Reveal className="relative mx-auto w-full max-w-md" delayMs={120}>
        <div className="absolute inset-0 -z-10 -rotate-6 rounded-[2.5rem] bg-gradient-to-br from-accent/25 via-accent/5 to-transparent blur-2xl" />
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-soft">
          <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-accent/15 to-transparent" />
          <Image
            src="/founder.png"
            alt="Founder portrait"
            fill
            sizes="(max-width: 768px) 90vw, 420px"
            className="object-cover object-[50%_50%]"
            priority
          />
        </div>
      </Reveal>
    </section>
  );
}
