import { siteContent } from "@/content/content";
import { Reveal } from "@/components/Reveal";
import { BriefcaseBusiness, Globe2, Target, Users } from "lucide-react";

const serviceIcons = [Target, Users, Globe2, BriefcaseBusiness] as const;

export function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-52 bg-gradient-to-b from-accent/10 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink md:text-4xl">{siteContent.services.title}</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {siteContent.services.items.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <Reveal key={service.title} delayMs={index * 80} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-2xl border border-charcoal/10 bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(20,24,30,0.16)]">
                  <div
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/30 via-accent to-accent/30"
                    aria-hidden="true"
                  />
                  <div className="flex min-h-[4.25rem] items-start justify-between gap-4">
                    <h3 className="font-serif text-2xl leading-snug text-ink">{service.title}</h3>
                    <div className="mt-1 inline-flex shrink-0 rounded-full border border-accent/30 bg-accent/10 p-2.5 text-accent">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                  </div>
                  <p className="mt-4 text-charcoal/80">{service.description}</p>
                  <div
                    className="mt-8 h-px w-16 bg-charcoal/15 transition-all duration-300 group-hover:w-24 group-hover:bg-accent"
                    aria-hidden="true"
                  />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
