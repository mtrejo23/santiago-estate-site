import type { PageServerLoad } from './$types';
import { WP_BASE } from '$env/static/private';

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

async function renderShortcode(shortcode: string) {
    const res = await fetch(`${WP_BASE}/wp-json/acf/v3/render_form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shortcode })
    });

    return await res.text();
}

export const load: PageServerLoad = async ({ params, fetch }) => {
    const slug = params.slug;

    const res = await fetch(`${WP_BASE}/wp-json/wp/v2/pages?slug=${slug}`);
    const json = await res.json();

    if (!json || json.length === 0) {
        throw new Response('Page not found', { status: 404 });
    }

    const page = json[0];

    if (page?.acf) {
        page.acf = normalizeUrls(page.acf);

        if (page.acf.content_blocks) {
            for (const block of page.acf.content_blocks) {
                if (block.acf_fc_layout === 'contact_form_block') {
                    if (block.contact_form_block_form_shortcode) {
                        block.formHtml = await renderShortcode(
                            block.contact_form_block_form_shortcode
                        );
                    }
                }
            }
        }
    }

    return { page };

};

// Jotform integration

import type { Actions } from "./$types";
import { JOTFORM_API_KEY, JOTFORM_FORM_ID } from "$env/static/private";

export const actions: Actions = {
	default: async ({ request }) => {
		const fd = await request.formData();

		const urlEncoded = new URLSearchParams();

        urlEncoded.append("submission[3][first]", fd.get("first_name") as string);
        urlEncoded.append("submission[3][last]", fd.get("last_name") as string);
        urlEncoded.append("submission[4]", fd.get("email") as string);
        urlEncoded.append("submission[5][full]", fd.get("phone") as string);
        urlEncoded.append("submission[6]", fd.get("event_date") as string);
        urlEncoded.append("submission[7]", fd.get("message") as string);

        // JotForm system flags that force notification emails
        urlEncoded.append("systemSource", "web");
        urlEncoded.append("sendNotification", "1");
        urlEncoded.append("system", "email");

        const res = await fetch(
            `https://api.jotform.com/form/${JOTFORM_FORM_ID}/submissions?apiKey=${JOTFORM_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: urlEncoded.toString()
            }
        );

		if (!res.ok) {
			console.error(await res.text());
			return { error: true };
		}

		return { success: true };
	},
};
