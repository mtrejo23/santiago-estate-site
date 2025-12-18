type SrcCandidate = {
    url: string;
    width: number;
};

function toWebp(url: string) {
    return url.endsWith('.webp') ? url : `${url}.webp`;
}

export function normalizeImage(image: any) {
    if (!image) return null;

    const candidates: SrcCandidate[] = [];

    // ACF Image Array format
    if (image.sizes && typeof image.sizes === 'object') {
        for (const [key, value] of Object.entries(image.sizes)) {
            if (
                typeof value === 'string' &&
                !key.endsWith('-width') &&
                !key.endsWith('-height')
            ) {
                const width = image.sizes[`${key}-width`];
                if (typeof width === 'number') {
                    candidates.push({ url: value, width });
                }
            }
        }
    }

    // WP REST media format
    if (image.media_details?.sizes) {
        for (const size of Object.values(image.media_details.sizes)) {
            if (
                size &&
                typeof size === 'object' &&
                'source_url' in size &&
                'width' in size &&
                typeof size.source_url === 'string' &&
                typeof size.width === 'number'
            ) {
                candidates.push({
                    url: size.source_url,
                    width: size.width
                });
            }
        }
    }

    // Deduplicate & sort
    const unique = new Map<number, string>();
    for (const c of candidates) {
        unique.set(c.width, c.url);
    }

    const sorted = [...unique.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([width, url]) => ({ width, url }));

    if (!sorted.length) return null;

    const jpgSrcset = sorted
        .map((c) => `${c.url} ${c.width}w`)
        .join(', ');

    const webpSrcset = sorted
        .map((c) => `${toWebp(c.url)} ${c.width}w`)
        .join(', ');

    return {
        jpgSrcset,
        webpSrcset,
        src: sorted.at(-1)?.url,
        alt: image.alt || image.alt_text || '',
        width: image.width || image.media_details?.width,
        height: image.height || image.media_details?.height
    };
}