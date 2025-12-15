/**
 * Normalize URLs coming from WordPress
 * - Converts absolute URLs → relative
 * - Handles Flywheel placeholders like
 * - Preserves tel:, mailto:, sms:
 */
export const localizeUrl = (
    url?: string,
    wpBase?: string
) => {
    if (!url || typeof url !== 'string') return url;

    if (
        url.startsWith('tel:') ||
        url.startsWith('mailto:') ||
        url.startsWith('sms:')
    ) {
        return url;
    }

    // Handle Flywheel placeholders
    if (url.includes('{') && url.includes('}')) {
        try {
            if (!wpBase) return '/';

            const parsed = new URL(
                url.replace(/\{.*?\}/g, wpBase)
            );

            return (
                parsed.pathname +
                parsed.search +
                parsed.hash
            );
        } catch {
            return '/';
        }
    }

    // Convert absolute WP URLs → relative
    if (wpBase && url.startsWith(wpBase)) {
        return url.replace(wpBase, '');
    }

    // Already relative
    if (url.startsWith('/')) {
        return url;
    }

    return url;
};

/**
 * Recursively normalize all URL-like values in an object
 */
export const normalizeUrls = (
    obj: any,
    wpBase?: string
): any => {
    if (Array.isArray(obj)) {
        return obj.map((item) =>
            normalizeUrls(item, wpBase)
        );
    }

    if (obj && typeof obj === 'object') {
        const copy: any = {};
        for (const key in obj) {
            const val = obj[key];
            copy[key] =
                key.toLowerCase().includes('url')
                    ? localizeUrl(val, wpBase)
                    : normalizeUrls(val, wpBase);
        }
        return copy;
    }

    return obj;
};