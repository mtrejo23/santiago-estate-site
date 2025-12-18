<script lang="ts">
    import { normalizeImage } from '$lib/utils/normalizeImage';

    export let image;
    export let sizes = '100vw';
    export let loading: 'lazy' | 'eager' = 'lazy';
    export let fetchpriority: 'auto' | 'high' | 'low' = 'auto';
    export let cover = false;

    const normalized = normalizeImage(image);
</script>

{#if normalized}
<picture class:cover>
    <source
        type="image/webp"
        srcset={normalized.webpSrcset}
        sizes={sizes}
    />

    <img
        src={normalized.src}
        srcset={normalized.jpgSrcset}
        sizes={sizes}
        alt={normalized.alt}
        width={normalized.width}
        height={normalized.height}
        loading={loading}
        decoding="async"
        fetchpriority={fetchpriority}
    />
</picture>
{/if}

<style lang="scss">

picture {
    display: block;
    &.cover {
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

</style>