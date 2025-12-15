import type { LayoutServerLoad } from './$types';
import { WP_BASE } from '$env/static/private';
import { localizeUrl, normalizeUrls } from '$lib/wp/normalizer';

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
        const options = normalizeUrls(
            optionsJson?.acf ?? {},
            WP_BASE
        );

        /**
         * Menu (CPT-based)
         */
        const menuRes = await fetch(
            `${WP_API}/wp/v2/menu-items?menus=3`
        );

        const menuJson = await safeJson(menuRes);

        const menuItems = Array.isArray(menuJson)
            ? menuJson.map((item: MenuItem) => ({
                ...item,
                url: localizeUrl(item.url, WP_BASE)
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