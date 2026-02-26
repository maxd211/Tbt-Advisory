import { siteContent } from "@/content/content";
import { Reveal } from "@/components/Reveal";

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink md:text-4xl">{siteContent.contact.title}</h2>
          <p className="mt-4 text-charcoal/80">{siteContent.contact.intro}</p>
          <div className="mt-8 rounded-xl border border-charcoal/10 bg-white/70 p-6 text-sm leading-relaxed text-charcoal/85">
            <p>
              <span className="text-charcoal/60">Email:</span>{" "}
              <a href={`mailto:${siteContent.contact.details.email}`} className="underline underline-offset-4">
                {siteContent.contact.details.email}
              </a>
            </p>
            <p className="mt-2 text-charcoal/60">Address:</p>
            {siteContent.contact.details.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={100}>
          <form
            action="https://formspree.io/f/xojnrpey"
            method="POST"
            className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-soft"
            aria-label="Contact form"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-charcoal/80">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-lg border border-charcoal/20 bg-ivory px-4 py-3 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-charcoal/80">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-charcoal/20 bg-ivory px-4 py-3 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-charcoal/80">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-charcoal/20 bg-ivory px-4 py-3 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition hover:bg-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Send message
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
