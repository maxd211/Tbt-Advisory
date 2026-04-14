'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header({ onGetInTouch }) {
    const [menuOpen, setMenuOpen] = useState(false);

    // Prevent body scroll when mobile nav is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const close = () => setMenuOpen(false);

    return (
        <>
            <header className="site-header">
                {/* Left: Logo */}
                <Link href="/" className="header-logo" onClick={close}>
                    <span className="header-logo-tbt">TBT</span>
                    <span className="header-logo-sep">—</span>
                    <span className="header-logo-advisory">Advisory</span>
                </Link>

                {/* Center: Nav */}
                <div className="header-nav-wrapper">
                    <ul className="header-nav">
                        <li><Link href="#track-record">Work</Link></li>
                        <li><Link href="#about">About</Link></li>
                        <li><Link href="#services">Services</Link></li>
                    </ul>
                </div>

                {/* Right: CTA + Hamburger */}
                <div className="header-cta">
                    <button className="btn-get-in-touch" onClick={onGetInTouch}>
                        Get in touch
                    </button>
                </div>

                <button
                    className={`mobile-menu-toggle${menuOpen ? ' active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </header>

            {/* Mobile Nav Overlay */}
            <nav className={`mobile-nav-overlay${menuOpen ? ' active' : ''}`} aria-hidden={!menuOpen}>
                <button className="mobile-nav-close-btn" onClick={close} aria-label="Close menu">✕</button>
                <Link href="#track-record" onClick={close}>Work</Link>
                <Link href="#about" onClick={close}>About</Link>
                <Link href="#services" onClick={close}>Services</Link>
                <div className="mobile-get-in-touch">
                    <button className="btn-get-in-touch" onClick={() => { close(); onGetInTouch(); }}>
                        Get in touch
                    </button>
                </div>
            </nav>
        </>
    );
}
