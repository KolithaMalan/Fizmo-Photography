// Albums data management
import albumsData from '@/data/albums.json';

export function getAllAlbums() {
  return albumsData.albums;
}

export function getAlbumById(id) {
  return albumsData.albums.find(album => album.id === id);
}

export function getAlbumsByCategory(category) {
  if (!category || category === 'all') {
    return albumsData.albums;
  }
  return albumsData.albums.filter(album => album.category === category);
}

export function getCategories() {
  return albumsData.categories;
}

export function getFeaturedAlbums(limit = 4) {
  return albumsData.albums.slice(0, limit);
}

// Google Drive image URL helper - use thumbnail at large size for reliable loading
export function getGoogleDriveImageUrl(fileId) {
  if (!fileId || fileId.includes('REPLACE')) {
    // Return a placeholder gradient for demo purposes
    return null;
  }
  // Use the same thumbnail endpoint at large size for reliable loading
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
}

// Get thumbnail URL (smaller size for grid views)
export function getGoogleDriveThumbnailUrl(fileId, size = 400) {
  if (!fileId || fileId.includes('REPLACE')) {
    return null;
  }
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}
