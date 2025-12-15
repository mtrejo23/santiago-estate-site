import type { PageServerLoad } from './$types';
import { WP_BASE } from '$env/static/private';

// --- Normalize URLs
const localizeUrl = (url: string) => {
    if (!url || typeof url !== 'string') return url;
    if (url.startsWith('tel:') || url.startsWith('mailto:') || url.startsWith('sms:')) return url;
    return url.startsWith(WP_BASE) ? url.replace(WP_BASE, '') : url;
};

const normalizeUrls = (obj: any): any => {
    if (Array.isArray(obj)) return obj.map(normalizeUrls);
    if (obj && typeof obj === 'object') {
        const copy: any = {};
        for (const key in obj) {
            const val = obj[key];
            copy[key] = key.toLowerCase().includes('url') ? localizeUrl(val) : normalizeUrls(val);
        }
        return copy;
    }
    return obj;
};

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        // --- Fetch homepage ACF by post ID
        const res = await fetch(`${WP_BASE}/wp-json/acf/v3/posts/8`);
        if (!res.ok) throw new Response('Homepage not found', { status: 404 });

        const json = await res.json();
        const acf = normalizeUrls(json.acf ?? {});

        return { acf };
    } catch (err) {
        console.error('Homepage load error:', err);
        return { acf: {} }; // Always serializable
    }
};