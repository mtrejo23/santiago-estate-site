import type { LayoutServerLoad } from './$types';
import { WP_BASE } from '$env/static/private';
import { localizeUrl, normalizeUrls } from '$lib/wp/normalizer';

type MenuItem = {
    id: number;
    title?: { rendered: string };
    url?: string;
    target?: string;
};

const WP_API = `${WP_BASE.replace(/\/$/, '')}/wp-json`;

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

export const load: LayoutServerLoad = async ({ fetch, parent }) => {
    // ✅ THIS LINE IS THE FIX
    const parentData = await parent();

    try {
        const optionsRes = await fetch(
            `${WP_API}/acf/v3/options/options`
        );

        const optionsJson = await safeJson(optionsRes);
        const options = normalizeUrls(
            optionsJson?.acf ?? {},
            WP_BASE
        );

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

        // ✅ MERGE PAGE DATA BACK IN
        return {
            ...parentData,
            menuItems,
            options
        };
    } catch (err) {
        console.error('Layout load error:', err);

        return {
            ...parentData,
            menuItems: [],
            options: {}
        };
    }
};