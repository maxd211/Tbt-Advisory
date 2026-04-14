export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer id="contact" className="site-footer">
            <div>
                <div className="footer-inner">
                    {/* Col 1: Brand */}
                    <div>
                        <div>
                            <span className="footer-brand-tbt">TBT</span>
                            {' '}
                            <span className="footer-brand-advisory">Advisory</span>
                        </div>
                        <p className="footer-tagline">
                            Commercial advisory &amp; execution<br />
                            for high-growth companies.
                        </p>
                    </div>

                    {/* Col 2: Contact */}
                    <div>
                        <p className="footer-col-heading">Contact</p>
                        <p className="footer-contact-text">
                            <a href="mailto:tb@tbt-advisory.com">tb@tbt-advisory.com</a><br />
                            Büchelgarten 37<br />
                            53225 Bonn, Germany
                        </p>
                    </div>

                    {/* Col 3: Legal */}
                    <div>
                        <p className="footer-col-heading">Legal</p>
                        <p className="footer-legal">
                            TBT Consulting GmbH<br />
                            Geschäftsführer: Thanh Binh Tran<br />
                            Amtsgericht Berlin-Charlottenburg<br />
                            HRB 218611 B
                        </p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer-bottom">
                    <span className="footer-copyright">&copy; {year} TBT Consulting GmbH. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
