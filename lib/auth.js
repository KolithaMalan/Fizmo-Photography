// Simple authentication for admin panel
// Change these credentials to your own secure credentials
const ADMIN_USERNAME = 'koliyx856@#Leo';
const ADMIN_PASSWORD = '434bLeoKolla@32';

export function verifyCredentials(username, password) {
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

// Legacy function for backward compatibility
export function verifyPassword(password) {
    return password === ADMIN_PASSWORD;
}

export function setAuthenticated() {
    if (typeof window !== 'undefined') {
        localStorage.setItem('fizmo_admin_auth', 'true');
        localStorage.setItem('fizmo_admin_auth_time', Date.now().toString());
    }
}

export function isAuthenticated() {
    if (typeof window !== 'undefined') {
        const auth = localStorage.getItem('fizmo_admin_auth');
        const authTime = localStorage.getItem('fizmo_admin_auth_time');

        if (auth === 'true' && authTime) {
            // Session expires after 24 hours
            const elapsed = Date.now() - parseInt(authTime);
            const twentyFourHours = 24 * 60 * 60 * 1000;

            if (elapsed < twentyFourHours) {
                return true;
            }
        }

        // Clear expired or invalid auth
        logout();
    }
    return false;
}

export function logout() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('fizmo_admin_auth');
        localStorage.removeItem('fizmo_admin_auth_time');
    }
}
