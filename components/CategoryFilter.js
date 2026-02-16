'use client';

import { motion } from 'framer-motion';
import styles from './CategoryFilter.module.css';

const categories = [
    { id: 'all', name: 'All', icon: '✨' },
    { id: 'events', name: 'Events', icon: '🎉' },
    { id: 'graduations', name: 'Graduations', icon: '🎓' },
    { id: 'weddings', name: 'Weddings', icon: '💒' },
    { id: 'birthdays', name: 'Birthdays', icon: '🎂' },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
    return (
        <div className={styles.container}>
            {categories.map((category) => (
                <button
                    key={category.id}
                    className={`${styles.button} ${activeCategory === category.id ? styles.active : ''}`}
                    onClick={() => onCategoryChange(category.id)}
                >
                    <span className={styles.icon}>{category.icon}</span>
                    <span className={styles.name}>{category.name}</span>
                    {activeCategory === category.id && (
                        <motion.div
                            className={styles.activeIndicator}
                            layoutId="activeCategory"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
