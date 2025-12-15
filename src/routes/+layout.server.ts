import type { LayoutServerLoad } from './$types';
import { WP_BASE } from '$env/static/private';

type MenuItem = {
    id: number;
    title: { rendered: string };
    url: string;
    target?: string;
};

// Normalize URLs
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
            copy[key] = key.toLowerCase().includes('url')
                ? localizeUrl(val)
                : normalizeUrls(val);
        }
        return copy;
    }
    return obj;
};

export const load: LayoutServerLoad = async ({ fetch }) => {
    try {
        // Load ACF options
        const optionsRes = await fetch(`${WP_BASE}/wp-json/acf/v3/options/options`);
        const optionsJson = await optionsRes.json();
        const normalizedOptions = normalizeUrls(optionsJson?.acf ?? {});

        // Load menu
        const menuRes = await fetch(`${WP_BASE}/wp-json/wp/v2/menu-items?menus=3`);
        
        let menuJson: unknown = null;
        try {
            menuJson = await menuRes.json();
        } catch (e) {
            console.error("Menu JSON parse failed:", e);
        }

        if (!Array.isArray(menuJson)) {
            console.error("Menu response is not an array:", menuJson);
            menuJson = [];
            console.log('MENU RESPONSE:', menuJson);
        }

        const menuItems = (menuJson as MenuItem[]).map(item => ({
            ...item,
            url: localizeUrl(item.url)
        }));

        return {
            menuItems,
            options: normalizedOptions
        };

    } catch (err) {
        console.error("Layout load error:", err);
        return {
            menuItems: [],
            options: {}
        };
    }
};