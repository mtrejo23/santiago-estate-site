import type { PageServerLoad } from './$types';
import { WP_BASE } from '$env/static/private';
import { normalizeUrls } from '$lib/wp/normalizer';

/**
 * WordPress REST base
 * WP_BASE should be the site origin (NO /wp-json)
 */
const WP_API = `${WP_BASE.replace(/\/$/, '')}/wp-json`;

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        /**
         * Fetch homepage ACF by post ID
         */
        const res = await fetch(
            `${WP_API}/acf/v3/posts/8`
        );

        if (!res.ok) {
            throw new Response('Homepage not found', { status: 404 });
        }

        const json = await res.json();
        const acf = normalizeUrls(
            json.acf ?? {},
            WP_BASE
        );

        return { acf };
    } catch (err) {
        console.error('Homepage load error:', err);

        return {
            acf: {}
        };
    }
};