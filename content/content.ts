export const siteContent = {
  brand: "TBT Advisory",
  hero: {
    headline: "Commercial advisory & execution.",
    subline:
      "Advisory across strategy, GTM execution, and commercial scaling for VC and PE-backed companies.",
    primaryCta: {
      label: "Get in touch",
      href: "#contact"
    }
  },
  about: {
    title: "About",
    blocks: [
      {
        title: "Vita",
        paragraphs: [
          "Ex Chief Commercial Officer at Project A, the VC and PE behind Trade Republic, Sennder, Quantum Systems, Arx and 100+ other investments & €1B assets under management. In my role I ran due diligences, sparred founders and scaled our portfolio with the help of the operational teams.",
          "Prior I founded a music & blockchain SaaS with clients and investors incl. Payday (Label of Steve Aoki & Jay-Z), CRO, Bausa, Lena etc., an NGO against extreme poverty and acted as Head of Business Development of automotive marketplace caroobi ($20M funding)."
        ]
      },
      {
        title: "Edge",
        paragraphs: [
          "My edge is rooted in the breadth of my experience. My teams and I have built and scaled 20+ commercial strategies starting from 0€ revenue ideas to 250M+ € revenue companies - all of which were VC or PE funded. Industries I worked in include logistics, defense, automotive, NGOs, insurances, banking, music etc."
        ]
      }
    ]
  },
  services: {
    title: "Services",
    items: [
      {
        title: "Commercial Strategy & GTM Design",
        description:
          "Define ICP, positioning, pricing, and GTM model to create a repeatable revenue engine."
      },
      {
        title: "Revenue Organization & Scaling",
        description:
          "Design sales org, roles, incentives, and playbooks to move beyond founder-led sales."
      },
      {
        title: "International Expansion (Europe)",
        description:
          "Structure market entry and rollout to scale revenue across European markets without fragmentation."
      },
      {
        title: "Investor & Board-Level Commercial Advisory",
        description:
          "Provide commercial diagnostics, diligence support, and execution plans for investors and boards."
      }
    ]
  },
  contact: {
    title: "Contact",
    intro: "Share your context and current commercial priority.",
    details: {
      email: "tb@tbt-advisory.com",
      address: ["Büchelgarten 37", "53225 Bonn"]
    }
  },
  imprint: {
    title: "Imprint",
    lines: [
      "TBT Consulting GmbH",
      "",
      "Büchelgarten 37",
      "53225 Bonn",
      "Email: tb@tbt-advisory.com",
      "",
      "Geschäftsführer: Thanh Binh Tran",
      "Amtsgericht Berlin-Charlottenburg: HRB 218611 B"
    ]
  }
} as const;

export type SiteContent = typeof siteContent;
