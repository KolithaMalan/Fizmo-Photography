'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiLockClosed, HiEye, HiEyeOff, HiUser } from 'react-icons/hi';
import { verifyCredentials, setAuthenticated } from '@/lib/auth';
import styles from './page.module.css';

export default function AdminLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate a small delay for security
        await new Promise(resolve => setTimeout(resolve, 500));

        if (verifyCredentials(username, password)) {
            setAuthenticated();
            router.push('/admin/dashboard');
        } else {
            setError('Invalid username or password. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.background}>
                <div className={styles.gradientOrb1}></div>
                <div className={styles.gradientOrb2}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={styles.loginCard}
            >
                <div className={styles.logoSection}>
                    <video
    src="/kkk.mp4"
    autoPlay
    loop
    muted
    playsInline
    className={styles.logo}
/>
                    <h1>Admin Panel</h1>
                    <p>Enter your credentials to access the dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <HiUser className={styles.inputIcon} />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className={styles.input}
                            required
                            autoFocus
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <HiLockClosed className={styles.inputIcon} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className={styles.input}
                            required
                        />
                        <button
                            type="button"
                            className={styles.togglePassword}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <HiEyeOff /> : <HiEye />}
                        </button>
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={styles.error}
                        >
                            {error}
                        </motion.p>
                    )}

                    <button
                        type="submit"
                        className={`btn btn-primary ${styles.submitBtn}`}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Access Dashboard'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
