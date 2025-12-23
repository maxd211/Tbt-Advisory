import Header from '../components/Header';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <section id="home" className="hero">
                    <div className="hero-content-new">
                        <div className="hero-left">
                            <h1 className="hero-headline-new">
                                Commercial advisory and execution.
                            </h1>
                        </div>
                        <div className="hero-right">
                            <img src="/profile.png" alt="Professional headshot" className="hero-image" />
                        </div>
                    </div>
                </section>

                <section id="about" className="page-section about-section-wrapper">
                    <h1 className="page-title">About</h1>

                    <div className="about-section">
                        <h2 className="about-subtitle">Vita</h2>
                        <p className="about-text">
                            Ex Chief Commercial Officer at Project A, the VC and PE behind Trade Republic, Sennder, Quantum
                            Systems, Arx and 100+ other investments & €1B assets under management. In my role I ran due
                            diligences, sparred founders and scaled our portfolio with the help of the operational teams. I was
                            promoted from Director to VP after 4 mo. and to CCO after 8 mo.
                        </p>
                        <p className="about-text">
                            Prior I founded a music & blockchain SaaS with clients and investors incl. Payday (Label of Steve
                            Aoki & Jay-Z), CRO, Bausa, Lena etc., an NGO against extreme poverty and acted as Head of Business
                            Development of automotive marketplace caroobi ($20M funding).
                        </p>
                    </div>

                    <div className="about-section">
                        <h2 className="about-subtitle">Edge</h2>
                        <p className="about-text">
                            My edge is rooted in the breadth of my experience. My teams and I have built and scaled 20+
                            commercial strategies starting from 0€ revenue ideas to 250M+ € revenue companies - all of which
                            were VC or PE funded. Industries I worked in include logistics, defense, automotive, NGOs,
                            insurances, banking, music etc.
                        </p>
                    </div>
                </section>

                <section id="services" className="page-section services-section-wrapper">
                    <h1 className="page-title">Services</h1>

                    <div className="services-list">
                        <div className="service-item">
                            <h2 className="service-subtitle">Commercial Strategy & GTM Design</h2>
                            <p className="service-text">
                                Define ICP, positioning, pricing, and GTM model to create a repeatable revenue engine.
                            </p>
                        </div>

                        <div className="service-item">
                            <h2 className="service-subtitle">Revenue Organization & Scaling</h2>
                            <p className="service-text">
                                Design sales org, roles, incentives, and playbooks to move beyond founder-led sales.
                            </p>
                        </div>

                        <div className="service-item">
                            <h2 className="service-subtitle">International Expansion (Europe)</h2>
                            <p className="service-text">
                                Structure market entry and rollout to scale revenue across European markets without
                                fragmentation.
                            </p>
                        </div>

                        <div className="service-item">
                            <h2 className="service-subtitle">Investor & Board-Level Commercial Advisory</h2>
                            <p className="service-text">
                                Provide commercial diagnostics, diligence support, and execution plans for investors and
                                boards.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="contact" className="page-section contact-section-wrapper">
                    <h1 className="page-title">Imprint</h1>
                    <div className="contact-info">
                        <p className="contact-text">
                            <strong>TBT Consulting GmbH</strong><br />
                            Büchelgarten 37<br />
                            53225 Bonn<br />
                            Email: <a href="mailto:tb@tbt-advisory.com">tb@tbt-advisory.com</a><br /><br />
                            Geschäftsführer: Thanh Binh Tran<br />
                            Amtsgericht Berlin-Charlottenburg: HRB 218611 B
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}
