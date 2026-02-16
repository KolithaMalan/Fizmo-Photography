'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    HiPlus,
    HiPencil,
    HiTrash,
    HiLogout,
    HiExternalLink,
    HiPhotograph,
    HiFolder,
    HiCalendar,
    HiTag,
    HiClipboardCopy
} from 'react-icons/hi';
import { isAuthenticated, logout } from '@/lib/auth';
import { getAllAlbums } from '@/lib/albums';
import styles from './page.module.css';

export default function AdminDashboard() {
    const router = useRouter();
    const [albums, setAlbums] = useState([]);
    const [showGuide, setShowGuide] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/admin');
            return;
        }
        setAlbums(getAllAlbums());
    }, [router]);

    const handleLogout = () => {
        logout();
        router.push('/admin');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const sampleAlbum = `{
  "id": "wedding-john-sarah-2024",
  "title": "John & Sarah Wedding",
  "category": "weddings",
  "date": "2024-01-15",
  "description": "A beautiful ceremony",
  "coverPhotoId": "YOUR_COVER_PHOTO_FILE_ID",
  "folderLink": "https://drive.google.com/drive/folders/YOUR_FOLDER_ID",
  "photos": [
    { "id": "PHOTO_FILE_ID_1", "caption": "First dance" },
    { "id": "PHOTO_FILE_ID_2", "caption": "Ceremony" }
  ]
}`;

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div className={`container ${styles.headerContent}`}>
                    <div className={styles.headerLeft}>
                        <video
                            src="/kkk.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={styles.logoVideo}
                        />
                        <div>
                            <h1>Admin Dashboard</h1>
                            <p>Manage your albums and photos</p>
                        </div>
                    </div>
                    <div className={styles.headerRight}>
                        <Link href="/" target="_blank" className={styles.viewSiteBtn}>
                            View Site <HiExternalLink />
                        </Link>
                        <button onClick={handleLogout} className={styles.logoutBtn}>
                            <HiLogout /> Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className={styles.main}>
                <div className="container">
                    {/* Stats */}
                    <div className={styles.statsGrid}>
                        <motion.div
                            className={styles.statCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className={styles.statIconWrap}>
                                <HiFolder className={styles.statIcon} />
                            </div>
                            <div>
                                <span className={styles.statValue}>{albums.length}</span>
                                <span className={styles.statLabel}>Albums</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className={styles.statCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className={styles.statIconWrap}>
                                <HiPhotograph className={styles.statIcon} />
                            </div>
                            <div>
                                <span className={styles.statValue}>
                                    {albums.reduce((acc, album) => acc + (album.photos?.length || 0), 0)}
                                </span>
                                <span className={styles.statLabel}>Photos</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <h2>Album Management</h2>
                        <button
                            onClick={() => setShowGuide(!showGuide)}
                            className={styles.addAlbumBtn}
                        >
                            <HiPlus /> How to Add Album
                        </button>
                    </div>

                    {/* Guide Section */}
                    {showGuide && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className={styles.guideSection}
                        >
                            <h3>📋 Step-by-Step Guide to Add a New Album</h3>

                            <div className={styles.guideSteps}>
                                <div className={styles.step}>
                                    <span className={styles.stepNumber}>1</span>
                                    <div>
                                        <h4>Create a Google Drive Folder</h4>
                                        <p>Create a new folder in your Google Drive for this album (e.g., &quot;Wedding - John &amp; Sarah 2024&quot;)</p>
                                    </div>
                                </div>

                                <div className={styles.step}>
                                    <span className={styles.stepNumber}>2</span>
                                    <div>
                                        <h4>Upload Your Photos</h4>
                                        <p>Upload all photos from the event to this folder</p>
                                    </div>
                                </div>

                                <div className={styles.step}>
                                    <span className={styles.stepNumber}>3</span>
                                    <div>
                                        <h4>Make Folder Public</h4>
                                        <p>Right-click the folder → Share → Change to &quot;Anyone with the link&quot;</p>
                                    </div>
                                </div>

                                <div className={styles.step}>
                                    <span className={styles.stepNumber}>4</span>
                                    <div>
                                        <h4>Get File IDs</h4>
                                        <p>For each photo, right-click → Get link. The File ID is the part after /d/ and before /view</p>
                                        <code>drive.google.com/file/d/<strong>FILE_ID_HERE</strong>/view</code>
                                    </div>
                                </div>

                                <div className={styles.step}>
                                    <span className={styles.stepNumber}>5</span>
                                    <div>
                                        <h4>Edit albums.json</h4>
                                        <p>Open <code>data/albums.json</code> in VS Code and add your new album:</p>
                                        <div className={styles.codeBlock}>
                                            <button
                                                className={styles.copyBtn}
                                                onClick={() => copyToClipboard(sampleAlbum)}
                                            >
                                                <HiClipboardCopy /> {copied ? 'Copied!' : 'Copy'}
                                            </button>
                                            <pre>{sampleAlbum}</pre>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.step}>
                                    <span className={styles.stepNumber}>6</span>
                                    <div>
                                        <h4>Save and Refresh</h4>
                                        <p>Save the file and refresh your website to see the new album!</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.categories}>
                                <h4>Available Categories:</h4>
                                <div className={styles.categoryTags}>
                                    <span className={`badge badge-events`}>events</span>
                                    <span className={`badge badge-graduations`}>graduations</span>
                                    <span className={`badge badge-weddings`}>weddings</span>
                                    <span className={`badge badge-birthdays`}>birthdays</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Albums List */}
                    <div className={styles.albumsList}>
                        <h3>Current Albums</h3>
                        {albums.length > 0 ? (
                            <div className={styles.albumsGrid}>
                                {albums.map((album, index) => (
                                    <motion.div
                                        key={album.id}
                                        className={styles.albumCard}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className={styles.albumHeader}>
                                            <span className={`badge badge-${album.category}`}>
                                                {album.category}
                                            </span>
                                            <span className={styles.photoCount}>
                                                <HiPhotograph /> {album.photos?.length || 0} photos
                                            </span>
                                        </div>
                                        <h4>{album.title}</h4>
                                        <div className={styles.albumMeta}>
                                            <span><HiCalendar /> {album.date}</span>
                                            <span><HiTag /> {album.id}</span>
                                        </div>
                                        <div className={styles.albumActions}>
                                            <Link
                                                href={`/album/${album.id}`}
                                                target="_blank"
                                                className={styles.actionBtn}
                                            >
                                                <HiExternalLink /> View
                                            </Link>
                                            <span className={styles.editHint}>
                                                Edit in albums.json
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.emptyState}>
                                <HiFolder className={styles.emptyIcon} />
                                <h4>No Albums Yet</h4>
                                <p>Click &quot;How to Add Album&quot; above to get started!</p>
                            </div>
                        )}
                    </div>

                    {/* Quick Tips */}
                    <div className={styles.tips}>
                        <h3>💡 Quick Tips</h3>
                        <ul>
                            <li><strong>Cover Photo:</strong> Use the File ID of your best photo as the coverPhotoId</li>
                            <li><strong>Album ID:</strong> Use lowercase with hyphens (e.g., &quot;wedding-john-sarah-2024&quot;)</li>
                            <li><strong>Date Format:</strong> Use YYYY-MM-DD format (e.g., &quot;2024-01-15&quot;)</li>
                            <li><strong>Photos Array:</strong> Add as many photos as you want with their File IDs</li>
                            <li><strong>Captions:</strong> Optional but recommended for better context</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}