'use client';

import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getGoogleDriveThumbnailUrl } from '@/lib/albums';
import { useIsTouchDevice } from '@/lib/useIsTouchDevice';
import styles from './AlbumCard.module.css';

const categoryColors = {
    events: 'var(--primary)',
    graduations: 'var(--accent-teal)',
    weddings: 'var(--secondary)',
    birthdays: 'var(--accent-gold)',
};

const categoryGradients = {
    events: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    graduations: 'linear-gradient(135deg, #14B8A6 0%, #5EEAD4 100%)',
    weddings: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
    birthdays: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)',
};

export default function AlbumCard({ album, index = 0 }) {
    const coverUrl = getGoogleDriveThumbnailUrl(album.coverPhotoId, 600);
    const gradient = categoryGradients[album.category] || categoryGradients.events;
    const isTouch = useIsTouchDevice();
    const [imageLoaded, setImageLoaded] = useState(false);

    // 3D Tilt
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

    const handleMouseMove = useCallback((e) => {
        if (isTouch || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setTilt({
            rotateX: (y - 0.5) * -8,
            rotateY: (x - 0.5) * 8,
        });
    }, [isTouch]);

    const handleMouseLeave = useCallback(() => {
        setTilt({ rotateX: 0, rotateY: 0 });
    }, []);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={!isTouch ? { scale: 1.03 } : undefined}
            whileTap={{ scale: 0.97 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
            }}
            style={{ perspective: 800, transformStyle: 'preserve-3d' }}
        >
            <Link href={`/album/${album.id}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                    {/* Skeleton shimmer while loading */}
                    {!imageLoaded && coverUrl && (
                        <div className={styles.shimmer} />
                    )}
                    {coverUrl ? (
                        <img
                            src={coverUrl}
                            alt={album.title}
                            className={`${styles.image} ${imageLoaded ? styles.imageVisible : styles.imageHidden}`}
                            loading="lazy"
                            onLoad={() => setImageLoaded(true)}
                        />
                    ) : (
                        <div
                            className={styles.placeholder}
                            style={{ background: gradient }}
                        >
                            <span className={styles.placeholderIcon}>📷</span>
                        </div>
                    )}
                    <div className={styles.overlay}>
                        <span className={styles.viewBtn}>View Album</span>
                    </div>
                </div>
                <div className={styles.content}>
                    <span
                        className={`badge badge-${album.category} ${styles.badge}`}
                    >
                        {album.category}
                    </span>
                    <h3 className={styles.title}>{album.title}</h3>
                    {album.description && (
                        <p className={styles.description}>{album.description}</p>
                    )}
                    <span className={styles.date}>
                        {new Date(album.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}
