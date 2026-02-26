import { siteContent } from "@/content/content";
import { Reveal } from "@/components/Reveal";

export function Process() {
  return (
    <section id="process" className="border-t border-charcoal/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink md:text-4xl">{siteContent.process.title}</h2>
        </Reveal>

        <ol className="mt-12 grid gap-6 md:grid-cols-2">
          {siteContent.process.steps.map((step, index) => (
            <Reveal key={step.title} delayMs={index * 70}>
              <li className="rounded-2xl border border-charcoal/10 bg-white/80 p-7">
                <p className="text-sm text-accent">0{index + 1}</p>
                <h3 className="mt-3 font-serif text-2xl text-ink">{step.title}</h3>
                <p className="mt-3 text-charcoal/80">{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
