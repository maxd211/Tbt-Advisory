import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Imprint } from "@/components/Imprint";
import { Navbar } from "@/components/Navbar";

export default function ImprintPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto max-w-6xl px-6 pt-10">
          <Link href="/#imprint" className="text-sm text-charcoal/75 underline underline-offset-4">
            Back to one-page view
          </Link>
        </div>
        <Imprint standalone />
      </main>
      <Footer />
    </>
  );
}
