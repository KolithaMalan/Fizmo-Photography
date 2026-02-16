'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouchDevice } from '@/lib/useIsTouchDevice';
import styles from './MagneticCursor.module.css';

export default function MagneticCursor() {
    const isTouch = useIsTouchDevice();
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200, restDelta: 0.001 };
    const x = useSpring(cursorX, springConfig);
    const y = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (isTouch) return;

        const moveCursor = (e) => {
            cursorX.set(e.clientX - 10);
            cursorY.set(e.clientY - 10);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [isTouch, cursorX, cursorY]);

    if (isTouch) return null;

    return (
        <motion.div
            className={styles.cursor}
            style={{ x, y }}
        />
    );
}
