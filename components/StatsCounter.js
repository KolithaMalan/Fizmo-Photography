'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useTransform, motion, animate } from 'framer-motion';

export default function StatsCounter({ value, suffix = '' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [hasAnimated, setHasAnimated] = useState(false);

    // Parse numeric part from value like "500+" or "3+"
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
    const prefix = value.match(/^[^0-9]*/)?.[0] || '';
    const valueSuffix = value.match(/[^0-9]*$/)?.[0] || '';

    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        const num = Math.round(latest);
        if (num >= 1000) {
            return `${prefix}${num.toLocaleString()}${valueSuffix}`;
        }
        return `${prefix}${num}${valueSuffix}`;
    });

    useEffect(() => {
        if (isInView && !hasAnimated) {
            setHasAnimated(true);
            animate(count, numericValue, {
                duration: 2,
                ease: [0.25, 0.46, 0.45, 0.94],
            });
        }
    }, [isInView, hasAnimated, count, numericValue]);

    return (
        <motion.span ref={ref}>
            {hasAnimated ? <motion.span>{rounded}</motion.span> : '0' + valueSuffix}
        </motion.span>
    );
}
