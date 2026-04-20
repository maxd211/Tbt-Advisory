const DETAILS = [
    { label: 'Founder', value: 'Thanh Binh Tran' },
    { label: 'Founded', value: '2024, Bonn · Germany' },
    { label: 'Legal entity', value: 'TBT Consulting GmbH' },
    { label: 'Operating as', value: 'TBT Advisory' },
    { label: 'Focus', value: 'Europe, with global reach across VC and PE networks' },
    { label: 'Contact', value: 'tb@tbt-advisory.com' },
];

const STATS = [
    { number: '€1B+', label: 'Assets under management' },
    { number: '100+', label: 'Portfolio companies scaled' },
    { number: '20+', label: 'Commercial strategies from zero' },
    { number: '€250M+', label: 'Peak revenue built' },
];

export default function AboutFirm() {
    return (
        <section id="about" className="about-section">
            <div className="about-inner">
                {/* Left: narrative */}
                <div>
                    <p className="section-eyebrow">About</p>
                    <h2 className="section-heading" style={{ marginBottom: '40px' }}>
                        Where venture-backed insight meets operating discipline.
                    </h2>
                    <div className="about-body">
                        <p className="about-label">About our founder</p>
                        <p>
                            Former Chief Commercial Officer at Project A, the VC and PE fund behind Trade Republic,
                            sennder, Quantum Systems, voi, Spryker and 100+ other portfolio companies. Helped the
                            portfolio build their commercial strategies from zero to €250M revenue.
                        </p>
                        <p>
                            Prior to that: venture capital backed founder of a music SaaS with clients and investors
                            like the label of Jay-Z, Lena Meyer-Landrut, Bausa, CRO, Seedcamp and Head of Business
                            Development at a Series B platform backed by BMW and Cherry Ventures.
                        </p>
                    </div>
                </div>

                {/* Right: detail list */}
                <div className="about-detail-list">
                    {DETAILS.map(({ label, value }) => (
                        <div key={label} className="about-detail-item">
                            <span className="about-detail-label">{label}</span>
                            <span className="about-detail-value">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats bar at bottom of about section */}
            <div className="about-stats">
                {STATS.map(({ number, label }) => (
                    <div key={number} className="about-stat">
                        <span className="about-stat-number">{number}</span>
                        <span className="about-stat-label">{label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
