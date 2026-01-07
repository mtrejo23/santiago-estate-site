import type { PageServerLoad } from './$types';
import { getPage } from '$lib/wp/yoastSeo';
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

    try {
        const { page, seo } = await getPage(fetch, { slug });

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

        return {
            page,
            seo
        };
    } catch (err) {
        throw new Response('Page not found', { status: 404 });
    }
};

// Jotform integration

import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { JOTFORM_FORM_ID } from "$env/static/private";

function splitYmd(value: string) {
    const m = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return null;
    return { year: m[1], month: m[2], day: m[3] };
}

export const actions: Actions = {
    default: async ({ request, fetch }) => {
        const fd = await request.formData();

        const body = new URLSearchParams();
        body.set("formID", JOTFORM_FORM_ID);

        body.set("q3_name[first]", String(fd.get("first_name") ?? "").trim());
        body.set("q3_name[last]", String(fd.get("last_name") ?? "").trim());
        body.set("q4_email", String(fd.get("email") ?? "").trim());
        body.set("q5_phoneNumber[full]", String(fd.get("phone") ?? "").trim());
        body.set("q7_message", String(fd.get("message") ?? "").trim());

        body.set("q8_typeA", "web");
        body.set("website", "");
        body.set("simple_spc", `${JOTFORM_FORM_ID}-${JOTFORM_FORM_ID}`);

        const dateParts = splitYmd(String(fd.get("event_date") ?? "").trim());
        if (dateParts) {
            body.set("q6_date[month]", dateParts.month);
            body.set("q6_date[day]", dateParts.day);
            body.set("q6_date[year]", dateParts.year);
        }

        // IMPORTANT: manual so we can capture Location
        const res = await fetch(`https://submit.jotform.com/submit/${JOTFORM_FORM_ID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: body.toString(),
            redirect: "manual"
        });

        // Jotform success is usually a redirect
        if (res.status === 302 || res.status === 303) {
            const loc = res.headers.get("location");
            if (loc) {
                // Location can be relative; make it absolute
                const thankYouUrl = new URL(loc, "https://submit.jotform.com").toString();
                throw redirect(303, thankYouUrl);
            }
        }

        if (!res.ok) {
            console.error("Jotform submit failed:", res.status, await res.text());
            return { error: true };
        }

        // Fallback: if Jotform returns 200, just stay put
        return { success: true };
    }
};