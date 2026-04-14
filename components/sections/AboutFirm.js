const DETAILS = [
    { label: 'Founded', value: '2024, Bonn · Germany' },
    { label: 'Legal entity', value: 'TBT Consulting GmbH' },
    { label: 'Operating as', value: 'TBT Advisory' },
    { label: 'Focus', value: 'Europe — with global reach across VC and PE networks' },
    { label: 'Contact', value: 'tb@tbt-advisory.com' },
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
                        <p>
                            <strong>TBT Advisory</strong> is a boutique commercial advisory firm founded by Thanh Binh Tran.
                            It stems from a simple observation: most high-growth companies know what they want to build —
                            but lack the commercial architecture to scale it reliably.
                        </p>
                        <p>
                            Thanh Binh spent years at the intersection of venture capital and operating reality,
                            sitting on both sides of the table — as a founder navigating early-stage uncertainty,
                            as an operator scaling revenue from zero, and as a CCO at Project A advising 100+ portfolio
                            companies through the hardest commercial inflection points.
                        </p>
                        <p>
                            TBT Advisory distils that experience into a single focused offering: the kind of
                            senior commercial thinking that founders and investors need, without the overhead of a
                            large consulting firm.
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
        </section>
    );
}
