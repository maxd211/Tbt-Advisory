import Link from "next/link";
import { siteContent } from "@/content/content";

export function Footer() {
  return (
    <footer className="border-t border-charcoal/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-6 text-sm text-charcoal/75 md:flex-row md:items-center">
        <p>{siteContent.brand}</p>
        <div className="flex items-center gap-5">
          <Link href="/imprint" className="underline underline-offset-4">
            Imprint
          </Link>
          <a href={`mailto:${siteContent.contact.details.email}`} className="underline underline-offset-4">
            {siteContent.contact.details.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
