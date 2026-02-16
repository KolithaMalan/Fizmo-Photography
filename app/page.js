'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HiArrowRight, HiLockClosed } from 'react-icons/hi';
import { FaCamera, FaHeart, FaGraduationCap, FaAward } from 'react-icons/fa';
import AlbumCard from '@/components/AlbumCard';
import StatsCounter from '@/components/StatsCounter';
import { getAllAlbums } from '@/lib/albums';
import { useIsTouchDevice } from '@/lib/useIsTouchDevice';
import styles from './page.module.css';

const categories = [
  {
    id: 'events',
    name: 'Events',
    image: '/event.JPEG',
    description: 'Corporate events, parties & celebrations',
  },
  {
    id: 'graduations',
    name: 'Graduations',
    image: '/graduation.JPEG',
    description: 'Capture your academic milestones',
  },
  {
    id: 'weddings',
    name: 'Weddings',
    image: '/wedding.JPEG',
    description: 'Your special day, beautifully preserved',
  },
  {
    id: 'birthdays',
    name: 'Birthdays',
    image: '/birthday.JPG',
    description: 'Birthday celebrations & parties',
  },
];

const orbitImages = [
  { src: '/Hero/H1.jpg', alt: 'Hero 1' },
  { src: '/Hero/H2.jpg', alt: 'Hero 2' },
  { src: '/Hero/H3.jpg', alt: 'Hero 3' },
  { src: '/Hero/H4.jpg', alt: 'Hero 4' },
  { src: '/Hero/H5.jpg', alt: 'Hero 5' },
  { src: '/Hero/H6.jpg', alt: 'Hero 6' },
  { src: '/Hero/H7.jpg', alt: 'Hero 7' },
  { src: '/Hero/H8.JPEG', alt: 'Hero 8' },
];

const stats = [
  { icon: <FaCamera />, value: '3+', label: 'Years Experience' },
  { icon: <FaHeart />, value: '500+', label: 'Happy Clients' },
  { icon: <FaGraduationCap />, value: '100+', label: 'Graduations' },
  { icon: <FaAward />, value: '1000+', label: 'Photos Delivered' },
];

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Text scramble hook
function useTextScramble(text, isActive) {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

  useEffect(() => {
    if (!isActive) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 40);

    return () => clearInterval(interval);
  }, [isActive, text]);

  return displayText;
}

// 3D Tilt Card wrapper
function TiltCard({ children, className, isTouch }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (y - 0.5) * -10,
      rotateY: (x - 0.5) * 10,
    });
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={!isTouch ? { scale: 1.03 } : undefined}
      whileTap={{ scale: 0.97 }}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const albums = getAllAlbums();
  const featuredAlbums = albums.slice(0, 4);
  const isTouch = useIsTouchDevice();

  const [phase, setPhase] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orbitRadius, setOrbitRadius] = useState(220);
  const [imageSize, setImageSize] = useState(84);

  // Use window-level scroll (no target ref to avoid hydration issues)
  const { scrollY } = useScroll();

  // Hero parallax — reduced on mobile
  const parallaxMultiplier = isTouch ? 0.15 : 0.35;
  const heroParallaxY = useTransform(scrollY, [0, 800], [0, 200 * parallaxMultiplier]);
  const heroParallaxOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const smoothY = useSpring(heroParallaxY, { stiffness: 100, damping: 30 });

  // Text scramble
  const scrambledText = useTextScramble('Photography', phase >= 1);

  useEffect(() => {
    const updateSizes = () => {
      const w = window.innerWidth;
      if (w <= 360) {
        setOrbitRadius(140);
        setImageSize(44);
      } else if (w <= 480) {
        setOrbitRadius(160);
        setImageSize(52);
      } else if (w <= 768) {
        setOrbitRadius(190);
        setImageSize(62);
      } else {
        setOrbitRadius(260);
        setImageSize(84);
      }
    };

    updateSizes();
    setIsLoaded(true);

    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isLoaded]);

  const getOrbitPosition = (index, total, radius) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <>
      {/* Loading Screen — overlay until mounted */}
      {!isLoaded && (
        <div className={styles.loadingScreen}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}

      <div className={styles.page} style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
        {/* Hero Section */}
        <section className={styles.hero}>
          {/* Particles — parallax */}
          <motion.div
            className={styles.particleField}
            style={{ y: smoothY, opacity: heroParallaxOpacity }}
          >
            {isLoaded && Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className={styles.particle}
                style={{
                  left: `${((i * 37 + 13) % 100)}%`,
                  top: `${((i * 53 + 7) % 100)}%`,
                  animationDelay: `${(i * 0.17) % 5}s`,
                  animationDuration: `${3 + (i * 0.13) % 4}s`,
                  width: `${2 + (i % 3)}px`,
                  height: `${2 + (i % 3)}px`,
                }}
              />
            ))}
          </motion.div>

          {/* Radial Glow */}
          <motion.div
            className={styles.radialGlow}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: phase >= 2 ? 0.5 : 0,
              scale: phase >= 2 ? 1 : 0,
            }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* Center Stage */}
          <motion.div
            className={styles.centerStage}
            style={{ y: smoothY }}
          >
            {/* FIZMO Text */}
            <motion.div
              className={styles.fizmoWrapper}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
            >
              {/* Glitch layer 1 */}
              <motion.h1
                className={`${styles.fizmoText} ${styles.glitchLayer1}`}
                initial={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
                animate={{
                  opacity: phase >= 1 ? [0, 0.8, 0, 0.5, 0] : 0,
                  scale: phase >= 1 ? [2, 1.02, 1.05, 0.98, 1] : 2,
                  filter: phase >= 1 ? ['blur(20px)', 'blur(0px)'] : 'blur(20px)',
                  x: phase >= 1 ? [0, -3, 5, -2, 0] : 0,
                }}
                transition={{
                  duration: 1.2,
                  times: [0, 0.3, 0.5, 0.7, 1],
                  ease: 'easeOut',
                }}
              >
                FIZMO
              </motion.h1>

              {/* Glitch layer 2 */}
              <motion.h1
                className={`${styles.fizmoText} ${styles.glitchLayer2}`}
                initial={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
                animate={{
                  opacity: phase >= 1 ? [0, 0.6, 0, 0.4, 0] : 0,
                  scale: phase >= 1 ? [2, 0.98, 1.03, 1.01, 1] : 2,
                  filter: phase >= 1 ? ['blur(20px)', 'blur(0px)'] : 'blur(20px)',
                  x: phase >= 1 ? [0, 4, -3, 2, 0] : 0,
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.05,
                  times: [0, 0.3, 0.5, 0.7, 1],
                  ease: 'easeOut',
                }}
              >
                FIZMO
              </motion.h1>

              {/* Main text */}
              <motion.h1
                className={styles.fizmoText}
                initial={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
                animate={{
                  opacity: phase >= 1 ? 1 : 0,
                  scale: phase >= 1 ? 1 : 2,
                  filter: phase >= 1 ? 'blur(0px)' : 'blur(20px)',
                }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                FIZMO
              </motion.h1>

              {/* Text Scramble Subtitle */}
              <motion.p
                className={styles.heroSubtitle}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: phase >= 1 ? 1 : 0,
                  y: phase >= 1 ? 0 : 10,
                }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {scrambledText}
              </motion.p>
            </motion.div>

            {/* Orbit Ring — Pulsing Glow */}
            <motion.div
              className={`${styles.orbitRing} ${phase >= 2 ? styles.orbitRingGlow : ''}`}
              style={{
                width: orbitRadius * 2 + imageSize,
                height: orbitRadius * 2 + imageSize,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: phase >= 2 ? 0.15 : 0,
                scale: phase >= 2 ? 1 : 0,
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />

            {/* Spinning Orbit Wrapper */}
            <motion.div
              className={styles.orbitSpin}
              animate={{ rotate: 360 }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {orbitImages.map((img, index) => {
                const pos = getOrbitPosition(index, orbitImages.length, orbitRadius);
                const delay = 0.1 * index;

                return (
                  <motion.div
                    key={index}
                    className={styles.orbitItem}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0,
                      x: -imageSize / 2,
                      y: -imageSize / 2,
                    }}
                    animate={{
                      opacity: phase >= 2 ? 1 : 0,
                      scale: phase >= 2 ? 1 : 0,
                      x: phase >= 2 ? pos.x - imageSize / 2 : -imageSize / 2,
                      y: phase >= 2 ? pos.y - imageSize / 2 : -imageSize / 2,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: delay,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    {/* Counter-rotate to keep images upright */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <div
                        className={styles.imageFrame}
                        style={{
                          width: imageSize,
                          height: imageSize,
                        }}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className={styles.orbitImage}
                          onError={(e) => {
                            console.log('Image failed to load:', img.src);
                            e.target.style.background = '#333';
                          }}
                        />
                        <div className={styles.imageShine} />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Counter Section */}
        <section className={styles.statsSection}>
          <div className="container">
            <motion.div
              className={styles.statsGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className={styles.statCard}
                  variants={cardVariants}
                >
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <div className={styles.statValue}>
                    <StatsCounter value={stat.value} />
                  </div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Categories Section — Staggered Reveal + Ken Burns + 3D Tilt */}
        <section className={`section ${styles.categoriesSection}`}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={styles.sectionHeader}
            >
              <h2>Our Services</h2>
              <p>Specialized photography for every occasion</p>
            </motion.div>

            <motion.div
              className={styles.categoriesGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {categories.map((category) => (
                <motion.div key={category.id} variants={cardVariants}>
                  <TiltCard isTouch={isTouch}>
                    <Link
                      href={`/gallery?category=${category.id}`}
                      className={styles.categoryCard}
                    >
                      <div className={styles.categoryIcon}>
                        <img
                          src={category.image}
                          alt={category.name}
                          className={`${styles.categoryImage} ${styles.kenBurns}`}
                        />
                      </div>
                      <h3>{category.name}</h3>
                      <p>{category.description}</p>
                      <span className={styles.categoryLink}>
                        View Gallery <HiArrowRight />
                      </span>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Albums Section — Staggered Reveal */}
        {featuredAlbums.length > 0 && (
          <section className={`section ${styles.albumsSection}`}>
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={styles.sectionHeaderWhite}
              >
                <h2>Recent Work</h2>
                <p>Browse through our latest photography sessions</p>
              </motion.div>

              <motion.div
                className={styles.albumsGrid}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {featuredAlbums.map((album, index) => (
                  <motion.div key={album.id} variants={cardVariants}>
                    <AlbumCard album={album} index={0} />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={styles.viewAllWrapper}
              >
                <Link href="/gallery" className="btn btn-secondary">
                  View All Albums <HiArrowRight />
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA Section — Gradient Border */}
        <section className={styles.ctaSection}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={styles.ctaOuter}
            >
              <div className={styles.ctaCard}>
                <h2>Ready to Capture Your Special Moments?</h2>
                <p>
                  Let us tell your story through stunning photographs.
                  Book your session today and create memories that last forever.
                </p>
                <div className={styles.ctaButtons}>
                  <Link
                    href="https://wa.me/94770168560"
                    target="_blank"
                    className="btn btn-primary"
                  >
                    Book via WhatsApp <HiArrowRight />
                  </Link>
                </div>
                <Link href="/admin" className={styles.adminLink}>
                  <HiLockClosed /> Admin Login
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}