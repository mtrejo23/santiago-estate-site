import type { LayoutServerLoad } from './$types';
import { WP_BASE } from '$env/static/private';

type MenuItem = {
    id: number;
    title?: { rendered: string };
    url?: string;
    target?: string;
};

/**
 * WordPress REST base
 * WP_BASE should be the site origin (NO /wp-json)
 */
const WP_API = `${WP_BASE.replace(/\/$/, '')}/wp-json`;

/**
 * Normalize URLs coming from WordPress
 */
const localizeUrl = (url?: string) => {
    if (!url || typeof url !== 'string') return url;

    if (
        url.startsWith('tel:') ||
        url.startsWith('mailto:') ||
        url.startsWith('sms:')
    ) {
        return url;
    }

    // Convert absolute WP URLs → relative
    return url.startsWith(WP_BASE)
        ? url.replace(WP_BASE, '')
        : url;
};

const normalizeUrls = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(normalizeUrls);
    }

    if (obj && typeof obj === 'object') {
        const copy: any = {};
        for (const key in obj) {
            const val = obj[key];
            copy[key] = key.toLowerCase().includes('url')
                ? localizeUrl(val)
                : normalizeUrls(val);
        }
        return copy;
    }

    return obj;
};

/**
 * Safe JSON fetch helper
 * Prevents HTML / 404 responses from crashing the layout
 */
const safeJson = async (res: Response) => {
    const text = await res.text();

    if (!res.ok) {
        console.error('WP fetch failed:', res.status, text.slice(0, 200));
        return null;
    }

    try {
        return JSON.parse(text);
    } catch {
        console.error('Invalid JSON from WP:', text.slice(0, 200));
        return null;
    }
};

export const load: LayoutServerLoad = async ({ fetch }) => {
    try {
        /**
         * ACF Options
         */
        const optionsRes = await fetch(
            `${WP_API}/acf/v3/options/options`
        );

        const optionsJson = await safeJson(optionsRes);
        const options = normalizeUrls(optionsJson?.acf ?? {});

        /**
         * Menu
         */
        const menuRes = await fetch(
            `${WP_API}/wp/v2/menu-items?menus=3`
        );

        const menuJson = await safeJson(menuRes);

        const menuItems = Array.isArray(menuJson)
            ? menuJson.map((item: MenuItem) => ({
                ...item,
                url: localizeUrl(item.url)
            }))
            : [];

        return {
            menuItems,
            options
        };
    } catch (err) {
        console.error('Layout load error:', err);

        return {
            menuItems: [],
            options: {}
        };
    }
};