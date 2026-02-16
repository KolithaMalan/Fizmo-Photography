'use client';

import { FaWhatsapp } from 'react-icons/fa';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/94770168560"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
            aria-label="Contact us on WhatsApp"
        >
            <FaWhatsapp className={styles.icon} />
            <span className={styles.tooltip}>Book Now</span>
        </a>
    );
}
