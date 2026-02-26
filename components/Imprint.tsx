import { siteContent } from "@/content/content";
import { Reveal } from "@/components/Reveal";

type ImprintProps = {
  standalone?: boolean;
};

export function Imprint({ standalone = false }: ImprintProps) {
  return (
    <section id="imprint" className={standalone ? "py-28" : "border-t border-charcoal/10 py-24"}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink md:text-4xl">{siteContent.imprint.title}</h2>
          <div className="mt-8 max-w-md text-charcoal/85">
            {siteContent.imprint.lines.map((line, index) =>
              line.length ? (
                <p key={`${line}-${index}`} className="leading-relaxed">
                  {line}
                </p>
              ) : (
                <div key={`spacer-${index}`} className="h-5" aria-hidden="true" />
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
