import type { PageServerLoad } from './$types';
import { getPage } from '$lib/wp/yoastSeo';
import { normalizeUrls } from '$lib/wp/normalizer';
import { WP_BASE } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        const { acf, seo } = await getPage(fetch, { id: 8 });

        return {
            acf: normalizeUrls(acf, WP_BASE),
            seo
        };
    } catch (err) {
        console.error(err);

        return {
            acf: {},
            seo: null
        };
    }
};