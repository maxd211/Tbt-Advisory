'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header>
            <Link href="/" className="logo">
                TBT <span>Advisory</span>
            </Link>
            <button
                className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
                aria-label="Toggle menu"
                onClick={toggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav className={isMenuOpen ? 'active' : ''}>
                <ul>
                    <li><Link href="#home" onClick={closeMenu}>Home</Link></li>
                    <li><Link href="#about" onClick={closeMenu}>About</Link></li>
                    <li><Link href="#services" onClick={closeMenu}>Services</Link></li>
                    <li><Link href="#contact" onClick={closeMenu}>Imprint</Link></li>
                </ul>
            </nav>
        </header>
    );
}
