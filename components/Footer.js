'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HiLockClosed } from 'react-icons/hi';
import styles from './Footer.module.css';

export default function Footer() {
    const [currentYear, setCurrentYear] = useState(2025);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                {/* Quote Section */}
                <div className={styles.quoteSection}>
                    <p className={styles.quote}>
                        ❝ Let your feelings shine through every frame. ❞
                    </p>
                </div>

                {/* Main Footer Content */}
                <div className={styles.content}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <img
                            src="/Untitled design.gif"
                            alt="Fizmo Photography"
                            className={styles.logoGif}
                        />
                        <h3 className={styles.brandName}>Fizmo Photography</h3>
                        <p className={styles.tagline}>Capturing moments that last forever</p>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.links}>
                        <h4>Quick Links</h4>
                        <Link href="/">Home</Link>
                        <Link href="/gallery">Gallery</Link>
                        <Link href="/about">About Us</Link>
                    </div>

                    {/* Categories */}
                    <div className={styles.links}>
                        <h4>Our Services</h4>
                        <Link href="/gallery?category=events">Events</Link>
                        <Link href="/gallery?category=graduations">Graduations</Link>
                        <Link href="/gallery?category=weddings">Weddings</Link>
                        <Link href="/gallery?category=birthdays">Birthdays</Link>
                    </div>

                    {/* Contact */}
                    <div className={styles.contact}>
                        <h4>Get in Touch</h4>
                        <Link
                            href="https://wa.me/94770168560"
                            target="_blank"
                            className={styles.whatsappLink}
                        >
                            <FaWhatsapp /> Book via WhatsApp
                        </Link>
                        <div className={styles.social}>
                            <Link
                                href="https://www.facebook.com/share/1DKQMQ36wV/?mibextid=wwXIfr"
                                target="_blank"
                                className={styles.socialLink}
                                aria-label="Facebook"
                            >
                                <FaFacebookF />
                            </Link>
                            <Link
                                href="https://www.instagram.com/fizmo_photography?igsh=dmUwOTlqZnVvcWp3&utm_source=qr"
                                target="_blank"
                                className={styles.socialLink}
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className={styles.copyright}>
                    <p>© {currentYear} Fizmo Photography. All rights reserved.</p>
                    <p>Founded by Kolitha & Pubudu</p>
                    <Link href="/admin" className={styles.adminLink}>
                        <HiLockClosed /> Admin Login
                    </Link>
                </div>
            </div>
        </footer>
    );
}