const SERVICES = [
    {
        number: '01',
        title: 'Sales Strategy & GTM Design',
        desc: 'Define your ideal customer profile, build repeatable go-to-market motions, and establish the pricing and channel architecture needed for sustained revenue growth.',
    },
    {
        number: '02',
        title: 'Marketing Steering',
        desc: 'Develop integrated marketing strategies and steer execution across channels: demand generation, brand positioning, and content that converts at every stage of the funnel.',
    },
    {
        number: '03',
        title: 'Conversion Rate Optimization',
        desc: 'Diagnose where your funnel leaks and implement systematic improvements across acquisition, activation, and retention to maximise revenue from existing traffic.',
    },
    {
        number: '04',
        title: 'Investor Advisory',
        desc: 'Commercial diagnostics, diligence support, and investor-ready narratives for founders and boards navigating fundraising, portfolio decisions, or growth inflection points.',
    },
];

export default function Services() {
    return (
        <section id="services" className="services-section">
            <div className="services-inner">

                {/* Section header */}
                <div className="services-header">
                    <p className="section-eyebrow">Services</p>
                    <h2 className="section-heading" style={{ marginBottom: 0 }}>
                        Our disciplines behind value creation.
                    </h2>
                </div>

                {/* Service rows */}
                <div className="services-list">
                    {SERVICES.map(({ number, title, desc }) => (
                        <div key={number} className="service-row">
                            <span className="service-row-number">{number}</span>
                            <h3 className="service-row-title">{title}</h3>
                            <p className="service-row-desc">{desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
