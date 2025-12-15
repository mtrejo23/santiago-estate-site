export const localizeUrl = (
    url?: string,
    _wpBase?: string
) => {
    if (!url || typeof url !== 'string') return url;

    // Allow special protocols
    if (
        url.startsWith('tel:') ||
        url.startsWith('mailto:') ||
        url.startsWith('sms:')
    ) {
        return url;
    }

    // Already relative
    if (url.startsWith('/')) {
        return url;
    }

    try {
        // Normalize ANY absolute URL to relative
        const parsed = new URL(url);

        return (
            parsed.pathname +
            parsed.search +
            parsed.hash
        );
    } catch {
        // If it's not a valid URL, return as-is
        return url;
    }
};

// Recursively normalize all URL-like values in an object
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