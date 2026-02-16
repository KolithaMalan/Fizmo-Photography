'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { getAlbumById, getGoogleDriveImageUrl, getGoogleDriveThumbnailUrl } from '@/lib/albums';
import styles from './page.module.css';

export default function AlbumPage() {
    const params = useParams();
    const router = useRouter();
    const [album, setAlbum] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [imageLoading, setImageLoading] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const albumData = getAlbumById(params.id);
        if (albumData) {
            setAlbum(albumData);
        }
    }, [params.id]);

    // Disable right-click on entire page
    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);
        return () => document.removeEventListener('contextmenu', handleContextMenu);
    }, []);

    const navigatePhoto = useCallback((direction) => {
        if (!album?.photos?.length) return;
        const newIndex = currentPhotoIndex + direction;
        if (newIndex >= 0 && newIndex < album.photos.length) {
            setCurrentPhotoIndex(newIndex);
            setImageLoading(true);
            setImageError(false);
        }
    }, [album, currentPhotoIndex]);

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigatePhoto(-1);
            if (e.key === 'ArrowRight') navigatePhoto(1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, navigatePhoto]);

    const openLightbox = (index) => {
        setCurrentPhotoIndex(index);
        setLightboxOpen(true);
        setImageLoading(true);
        setImageError(false);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setImageLoading(false);
        setImageError(false);
        document.body.style.overflow = '';
    };

    if (!album) {
        return (
            <div className={styles.notFound}>
                <h2>Album Not Found</h2>
                <p>The album you're looking for doesn't exist.</p>
                <Link href="/gallery" className="btn btn-primary">
                    Back to Gallery
                </Link>
            </div>
        );
    }

    const categoryColors = {
        events: 'var(--primary)',
        graduations: 'var(--accent-teal)',
        weddings: 'var(--secondary)',
        birthdays: 'var(--accent-gold)',
    };

    return (
        <div className={styles.page}>
            {/* Header */}
            <section className={styles.header}>
                <div className={styles.headerBackground}></div>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={styles.headerContent}
                    >
                        <button onClick={() => router.back()} className={styles.backBtn}>
                            <HiArrowLeft /> Back to Gallery
                        </button>
                        <span className={`badge badge-${album.category}`}>
                            {album.category}
                        </span>
                        <h1>{album.title}</h1>
                        {album.description && <p className={styles.description}>{album.description}</p>}
                        <span className={styles.date}>
                            {new Date(album.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* Photos Grid */}
            <section className={`section ${styles.photosSection}`}>
                <div className="container">
                    {album.photos && album.photos.length > 0 ? (
                        <div className={styles.photosGrid}>
                            {album.photos.map((photo, index) => {
                                const thumbnailUrl = getGoogleDriveThumbnailUrl(photo.id, 600);
                                return (
                                    <motion.div
                                        key={photo.id}
                                        className={styles.photoCard}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-50px' }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        onClick={() => openLightbox(index)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {thumbnailUrl ? (
                                            <img
                                                src={thumbnailUrl}
                                                alt={photo.caption || `Photo ${index + 1}`}
                                                className={styles.photo}
                                                loading="lazy"
                                                draggable="false"
                                            />
                                        ) : (
                                            <div className={styles.photoPlaceholder}>
                                                <span>📷</span>
                                            </div>
                                        )}
                                        {photo.caption && (
                                            <div className={styles.photoCaption}>
                                                {photo.caption}
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <span className={styles.emptyIcon}>📷</span>
                            <h3>Photos Coming Soon</h3>
                            <p>This album is being prepared. Check back soon!</p>
                            <Link href={album.folderLink || '#'} target="_blank" className={styles.driveLink}>
                                View on Google Drive
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && album.photos && (
                    <motion.div
                        className={styles.lightbox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <button className={styles.closeBtn} onClick={closeLightbox}>
                            <HiX size={24} />
                        </button>

                        {currentPhotoIndex > 0 && (
                            <button
                                className={`${styles.navBtn} ${styles.prevBtn}`}
                                onClick={(e) => { e.stopPropagation(); navigatePhoto(-1); }}
                            >
                                <HiChevronLeft size={32} />
                            </button>
                        )}

                        <motion.div
                            className={styles.lightboxContent}
                            onClick={(e) => e.stopPropagation()}
                            key={currentPhotoIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {imageLoading && !imageError && (
                                <div className={styles.lightboxLoading}>
                                    <div className={styles.lightboxSpinner}></div>
                                    <p>Loading photo...</p>
                                </div>
                            )}
                            {imageError ? (
                                <div className={styles.lightboxError}>
                                    <p>Failed to load image</p>
                                    <button
                                        className={styles.retryBtn}
                                        onClick={() => {
                                            setImageError(false);
                                            setImageLoading(true);
                                        }}
                                    >
                                        Retry
                                    </button>
                                </div>
                            ) : (
                                <img
                                    src={getGoogleDriveImageUrl(album.photos[currentPhotoIndex].id)}
                                    alt={album.photos[currentPhotoIndex].caption || ''}
                                    className={styles.lightboxImage}
                                    draggable="false"
                                    style={{ display: imageLoading ? 'none' : 'block' }}
                                    onLoad={() => setImageLoading(false)}
                                    onError={() => {
                                        setImageLoading(false);
                                        setImageError(true);
                                    }}
                                />
                            )}
                            {album.photos[currentPhotoIndex].caption && !imageLoading && !imageError && (
                                <div className={styles.lightboxCaption}>
                                    {album.photos[currentPhotoIndex].caption}
                                </div>
                            )}
                        </motion.div>

                        {currentPhotoIndex < album.photos.length - 1 && (
                            <button
                                className={`${styles.navBtn} ${styles.nextBtn}`}
                                onClick={(e) => { e.stopPropagation(); navigatePhoto(1); }}
                            >
                                <HiChevronRight size={32} />
                            </button>
                        )}

                        <div className={styles.counter}>
                            {currentPhotoIndex + 1} / {album.photos.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

