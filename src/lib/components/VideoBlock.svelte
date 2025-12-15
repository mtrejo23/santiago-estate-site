<script lang="ts">
    import Button from '$lib/components/Button.svelte'

    export let block: any;

    import { onMount } from 'svelte';

    let lightbox: any;

    onMount(async () => {
        // Dynamically import only in the browser
        const GLightbox = (await import('glightbox')).default;
        await import('glightbox/dist/css/glightbox.css');

        lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
        });
    });
</script>

<section class="video-block">

    <div class="video-block__video flex align-center justify-center">
        <video autoplay muted loop playsinline class="video-block__video-bg">
            <source src={block?.video_block_bg_video} type="video/mp4">
        </video>
        <div class="container--small">
            <div class="video-block__content flex flex-column">
                <h2 class="text-center video-block__title">
                    {block?.video_block_title}
                </h2>
                <div class="button-wrapper flex justify-center">
                    <Button
                        type="text-button"
                        classes="glightbox"
                        href={block?.video_block_full_video}>
                        {block?.video_block_button_label}
                    </Button>
                </div>
            </div>
        </div>
    </div>

</section>

<style lang="scss">

@use '$lib/styles/abstracts' as a;

.video-block {
    padding-block: a.$gap-3;
    &__video {
        position: relative;
        overflow: hidden;
        aspect-ratio: 1/1;
        height: 100%;
        color: a.$clr-white;
        @media (min-width: 992px) {
            aspect-ratio: 16/9;
        }
        &-bg {
            position: absolute;
            height: 100%;
            object-fit: cover;
        }
    }
    &__content {
        gap: a.$gap-2;
    }
    &__title {
        font-size: a.$fs-display;
        color: a.$clr-white;
        margin-bottom: 0;
    }
}

</style>