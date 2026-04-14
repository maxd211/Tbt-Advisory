const SERVICES = [
    {
        title: 'Commercial Strategy & GTM Design',
        description:
            'Define ICP, positioning, pricing, and GTM model to create a repeatable revenue engine.',
    },
    {
        title: 'Revenue Organization & Scaling',
        description:
            'Design sales org, roles, incentives, and playbooks to move beyond founder-led sales.',
    },
    {
        title: 'International Expansion (Europe)',
        description:
            'Structure market entry and rollout to scale revenue across European markets without fragmentation.',
    },
    {
        title: 'Investor & Board-Level Commercial Advisory',
        description:
            'Provide commercial diagnostics, diligence support, and execution plans for investors and boards.',
    },
];

export default function Services() {
    return (
        <div className="section-band band-services">
            <div className="section-inner">
                <section id="services">
                    <h2 className="section-title">Services</h2>
                    <div className="services-list">
                        {SERVICES.map(({ title, description }) => (
                            <div key={title} className="service-item">
                                <h3 className="service-title">{title}</h3>
                                <p className="service-desc">{description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
