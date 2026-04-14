const SERVICES = [
    {
        number: '01',
        title: 'Commercial Strategy & GTM Design',
        desc: 'Define ICP, positioning, pricing, and go-to-market model to create a repeatable revenue engine — built for your specific stage and market.',
        visualClass: 'service-visual-1',
    },
    {
        number: '02',
        title: 'Revenue Organization & Scaling',
        desc: 'Design the sales org, roles, incentives, and playbooks needed to move beyond founder-led sales and scale with predictability.',
        visualClass: 'service-visual-2',
    },
    {
        number: '03',
        title: 'International Expansion (Europe)',
        desc: 'Structure market entry and cross-border rollout to scale revenue across European markets — without fragmentation or wasted headcount.',
        visualClass: 'service-visual-3',
    },
    {
        number: '04',
        title: 'Investor & Board-Level Advisory',
        desc: 'Provide commercial diagnostics, diligence support, and execution-ready plans for investors and boards navigating growth decisions.',
        visualClass: 'service-visual-4',
    },
];

export default function Services() {
    return (
        <section id="services" className="services-section">
            <div className="services-inner">
                <p className="section-eyebrow">Services</p>
                <h2 className="section-heading">
                    Four ways we create commercial value.
                </h2>

                <div className="services-grid">
                    {SERVICES.map(({ number, title, desc, visualClass }) => (
                        <div key={number} className="service-card">
                            <div className={`service-visual ${visualClass}`} />
                            <div className="service-content">
                                <span className="service-number">{number}</span>
                                <h3 className="service-title">{title}</h3>
                                <p className="service-desc">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
