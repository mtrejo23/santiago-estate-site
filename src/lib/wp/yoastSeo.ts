import { WP_BASE } from '$env/static/private';

const WP_API = `${WP_BASE.replace(/\/$/, '')}/wp-json`;

type GetPageArgs =
    | { id: number }
    | { slug: string };

export async function getPage(
    fetch: typeof globalThis.fetch,
    args: GetPageArgs
) {
    let url = '';

    if ('id' in args) {
        url = `${WP_API}/wp/v2/pages/${args.id}?_embed`;
    }

    if ('slug' in args) {
        url = `${WP_API}/wp/v2/pages?slug=${args.slug}&_embed`;
    }

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Page fetch failed');
    }

    const json = await res.json();
    const page = Array.isArray(json) ? json[0] : json;

    if (!page) {
        throw new Error('Page not found');
    }

    return {
        page,
        acf: page.acf ?? {},
        seo: page.yoast_head_json ?? null
    };
}