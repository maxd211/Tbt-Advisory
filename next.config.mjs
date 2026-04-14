/** @type {import('next').NextConfig} */
const csp = [
    "default-src 'self'",
    // Cookiebot consent script + CDN; 'unsafe-inline' required by Next.js hydration
    "script-src 'self' 'unsafe-inline' https://consent.cookiebot.com https://consentcdn.cookiebot.com",
    // Next.js injects inline styles during hydration
    "style-src 'self' 'unsafe-inline'",
    // Profile image is served from same origin; data: for any base64 images
    "img-src 'self' data:",
    // Self-hosted fonts only (after next/font migration)
    "font-src 'self'",
    // Cookiebot telemetry endpoint
    "connect-src 'self' https://consent.cookiebot.com https://consentcdn.cookiebot.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
].join('; ');

const nextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                    { key: 'Content-Security-Policy', value: csp },
                    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
                ],
            },
        ];
    },
};

export default nextConfig;
