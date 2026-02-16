'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/about', label: 'About' },
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <video
                        src="/kkk.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={styles.logoVideo}
                    />
                    <span className={styles.logoText}>Fizmo Photography</span>
                </Link>

                <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={styles.navLink}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="https://wa.me/94770168560"
                        target="_blank"
                        className={`btn btn-primary ${styles.bookBtn}`}
                    >
                        Book Now
                    </Link>
                </nav>

                <button
                    className={styles.menuBtn}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                </button>
            </div>
        </header>
    );
}