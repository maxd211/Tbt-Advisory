const STATS = [
    { number: '€1B+', label: 'Assets under management at Project A' },
    { number: '100+', label: 'Portfolio companies scaled across Europe' },
    { number: '20+', label: 'Commercial strategies built from zero revenue' },
    { number: '250M+', label: 'Peak revenue reached by portfolio companies (€)' },
];

const MILESTONES = [
    {
        tag: 'Venture & Private Equity',
        title: 'Chief Commercial Officer — Project A',
        desc: 'Ran commercial due diligences, sparred founders, and scaled portfolio companies at one of Europe\'s leading VC/PE firms — backers of Trade Republic, Sennder, Quantum Systems, and 100+ others with €1B AUM.',
        meta: 'Berlin · 2020–2024',
    },
    {
        tag: 'Entrepreneurship',
        title: 'Founder — Music & Blockchain SaaS',
        desc: 'Built and scaled a music-tech platform from zero with clients and investors including Payday (label of Steve Aoki & Jay-Z), CRO, Bausa, and Lena. Combined music-industry distribution with blockchain-based rights management.',
        meta: 'Germany · 2017–2020',
    },
    {
        tag: 'Commercial Growth',
        title: 'Head of Business Development — Caroobi',
        desc: 'Drove B2B expansion at Germany\'s funded automotive marketplace, building partnerships and revenue channels from scratch within a company that raised $20M in venture funding.',
        meta: 'Berlin · 2016–2017',
    },
];

export default function TrackRecord() {
    return (
        <section id="track-record" className="track-section">
            <div className="track-inner">
                <p className="section-eyebrow">Track Record</p>
                <h2 className="section-heading">
                    A decade building revenue at the intersection of venture and execution.
                </h2>

                {/* Stats */}
                <div className="stats-row">
                    {STATS.map(({ number, label }) => (
                        <div key={number} className="stat-item">
                            <div className="stat-number">{number}</div>
                            <div className="stat-label">{label}</div>
                        </div>
                    ))}
                </div>

                {/* Milestone cards */}
                <div className="milestones-grid">
                    {MILESTONES.map(({ tag, title, desc, meta }) => (
                        <div key={title} className="milestone-card">
                            <span className="milestone-tag">{tag}</span>
                            <h3 className="milestone-title">{title}</h3>
                            <p className="milestone-desc">{desc}</p>
                            <span className="milestone-meta">{meta}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
