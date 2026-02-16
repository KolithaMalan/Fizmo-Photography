'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AlbumCard from '@/components/AlbumCard';
import CategoryFilter from '@/components/CategoryFilter';
import { getAlbumsByCategory } from '@/lib/albums';
import styles from './page.module.css';

const categoryBanners = {
    all: null,
    events: '/cat_Landscape/crop.jpg',
    graduations: '/cat_Landscape/Gra.JPEG',
    weddings: '/cat_Landscape/wedd.JPEG',
    birthdays: '/cat_Landscape/sas.JPEG',
};

const categoryTitles = {
    all: { title: 'Our Gallery', subtitle: 'Explore our collection of beautiful moments' },
    events: { title: 'Events', subtitle: 'Corporate events, parties & celebrations' },
    graduations: { title: 'Graduations', subtitle: 'Capturing academic milestones' },
    weddings: { title: 'Weddings', subtitle: 'Your special day, beautifully preserved' },
    birthdays: { title: 'Birthdays', subtitle: 'Birthday celebrations & parties' },
};

function GalleryContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'all';
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        setAlbums(getAlbumsByCategory(activeCategory));
    }, [activeCategory]);

    const bannerImage = categoryBanners[activeCategory];
    const headerInfo = categoryTitles[activeCategory] || categoryTitles.all;

    return (
        <>
            {/* Header */}
            <section className={styles.header}>
                {/* Default gradient background (for "All") */}
                <AnimatePresence mode="wait">
                    {!bannerImage && (
                        <motion.div
                            key="default-bg"
                            className={styles.headerBackground}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={styles.gradientOrb}></div>
                            <div className={styles.gradientOrb2}></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Category Banner Image */}
                <AnimatePresence mode="wait">
                    {bannerImage && (
                        <motion.div
                            key={activeCategory}
                            className={styles.bannerWrapper}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <img
                                src={bannerImage}
                                alt={headerInfo.title}
                                className={styles.bannerImage}
                            />
                            <div className={styles.bannerOverlay} />

                            {/* Text on banner */}
                            <motion.div
                                className={styles.bannerContent}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4 }}
                                >
                                    {headerInfo.title}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5 }}
                                >
                                    {headerInfo.subtitle}
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Default "All" text header */}
                <AnimatePresence mode="wait">
                    {!bannerImage && (
                        <div className="container">
                            <motion.div
                                key="default-header"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className={styles.headerContent}
                            >
                                <h1>{headerInfo.title}</h1>
                                <p>{headerInfo.subtitle}</p>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </section>

            {/* Filter & Albums */}
            <section className={`section ${styles.gallerySection}`}>
                <div className="container">
                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <CategoryFilter
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                        />
                    </motion.div>

                    {/* Albums Grid */}
                    <AnimatePresence mode="wait">
                        {albums.length > 0 ? (
                            <motion.div
                                key={activeCategory}
                                className={styles.albumsGrid}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {albums.map((album, index) => (
                                    <AlbumCard key={album.id} album={album} index={index} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={styles.emptyState}
                            >
                                <span className={styles.emptyIcon}>📷</span>
                                <h3>No albums yet</h3>
                                <p>We&apos;re working on adding amazing content. Check back soon!</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </>
    );
}

export default function GalleryPage() {
    return (
        <div className={styles.page}>
            <Suspense fallback={
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                </div>
            }>
                <GalleryContent />
            </Suspense>
        </div>
    );
}