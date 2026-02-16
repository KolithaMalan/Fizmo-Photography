'use client';

import { motion } from 'framer-motion';
import { FaCamera, FaHeart, FaGraduationCap, FaAward } from 'react-icons/fa';
import StatsCounter from '@/components/StatsCounter';
import styles from './page.module.css';

const founders = [
    {
        name: 'Kolitha',
        role: 'Co-Founder & Photographer',
        image: '/kolitha.JPG',
        description: 'Passionate about capturing the perfect moment. Specializes in event and graduation photography.',
    },
    {
        name: 'Pubudu',
        role: 'Co-Founder & Photographer',
        image: '/pubudu.JPG',
        description: 'Expert in wedding and Landscape photography. Brings creativity and attention to detail to every shot.',
    },
];

const stats = [
    { icon: <FaCamera />, value: '3+', label: 'Years Experience' },
    { icon: <FaHeart />, value: '500+', label: 'Happy Clients' },
    { icon: <FaGraduationCap />, value: '100+', label: 'Graduations' },
    { icon: <FaAward />, value: '1000+', label: 'Photos Delivered' },
];

export default function AboutPage() {
    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <div className={styles.gradientOrb1}></div>
                    <div className={styles.gradientOrb2}></div>
                </div>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className={styles.heroContent}
                    >
                        <h1>
                            About <span className="text-gradient">Fizmo Photography</span>
                        </h1>
                        <p className={styles.heroDescription}>
                            We are a passionate team of photographers dedicated to capturing
                            life's most precious moments. With over 3 years of experience,
                            we specialize in Events, Graduations, Weddings, and Birthday photography.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section — Animated Counter */}
            <section className={styles.statsSection}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className={styles.statCard}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className={styles.statIcon}>{stat.icon}</div>
                                <div className={styles.statValue}>
                                    <StatsCounter value={stat.value} />
                                </div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className={`section ${styles.storySection}`}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={styles.storyContent}
                    >
                        <h2>Our Story</h2>
                        <p>
                            Fizmo Photography was born from a shared passion between two friends,
                            Kolitha and Pubudu. What started as a hobby has grown into a professional
                            photography service that has touched the lives of hundreds of clients.
                        </p>
                        <p>
                            We believe that every event tells a unique story, and our mission is to
                            capture those stories in the most beautiful and authentic way possible.
                            Whether it's the joy of graduation, the love at a wedding, the excitement
                            of a birthday, or the energy of a special event — we're here to preserve
                            those memories forever.
                        </p>
                        <p>
                            With 3 years of dedicated experience in event photography, we've developed
                            a keen eye for detail and a deep understanding of what makes each moment
                            special. We pride ourselves on our ability to blend into any event while
                            capturing the most candid and memorable shots.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Founders Section */}
            <section className={`section ${styles.foundersSection}`}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={styles.sectionHeader}
                    >
                        <h2>Meet the Founders</h2>
                        <p>The creative minds behind Fizmo Photography</p>
                    </motion.div>

                    <div className={styles.foundersGrid}>
                        {founders.map((founder, index) => (
                            <motion.div
                                key={founder.name}
                                className={styles.founderCard}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <div className={styles.founderImage}>
                                    <img
                                        src={founder.image}
                                        alt={founder.name}
                                    />
                                </div>
                                <div className={styles.founderInfo}>
                                    <h3>{founder.name}</h3>
                                    <span className={styles.founderRole}>{founder.role}</span>
                                    <p>{founder.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specialization Section */}
            <section className={`section ${styles.specializationSection}`}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={styles.sectionHeader}
                    >
                        <h2>Our Specialization</h2>
                        <p>What we do best</p>
                    </motion.div>

                    <div className={styles.specializationGrid}>
                        <motion.div
                            className={styles.specializationCard}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className={styles.specializationIcon}>🎓</div>
                            <h3>Graduation Photography</h3>
                            <p>
                                We prioritize graduation photography and understand the importance
                                of this milestone. Our team captures every proud moment — from the
                                cap toss to the diploma handover — ensuring you have beautiful
                                memories to cherish forever.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.specializationCard}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className={styles.specializationIcon}>🎉</div>
                            <h3>Event Photography</h3>
                            <p>
                                From corporate gatherings to family celebrations, we bring our
                                expertise in event photography to capture the essence of every
                                occasion. We focus on candid moments, group shots, and the
                                small details that make each event unique.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className={styles.quoteSection}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={styles.quoteCard}
                    >
                        <p className={styles.quote}>
                            ❝ Let your feelings shine through every frame. ❞
                        </p>
                        <span className={styles.quoteAuthor}>— Fizmo Photography —</span>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
