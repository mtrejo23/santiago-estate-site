<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import Image from '$lib/components/Image.svelte';

    export let hero: any;
    export let hero_video_url: string | null;
    export let full_video_url: string;

    import { onMount } from 'svelte';

    let lightbox: any;

    onMount(async () => {
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

<section class="hero">
    <div class="container">
        <div class="hero__content flex flex-column">
            <div>
                <h1 class="hero__title text-center">
                    {hero?.hero_title}
                </h1>
                <div class="hero__description text-center">
                    {@html hero?.hero_description}
                </div>
            </div>
            <div class="button-wrapper flex justify-center">
                <Button
                    type="button"
                    label={hero?.hero_button?.title}
                    url={hero?.hero_button?.url}
                    target={hero?.hero_button?.target}
                />
            </div>
        </div>
    </div>
    <div class="hero__video flex align-center justify-center">
        <div class="hero__video-poster">
            <Image
                image={hero?.hero_video_poster}
                sizes="100vw"
                loading="eager"
                fetchpriority="high"
                cover
            />
        </div>
        <video autoplay muted loop playsinline preload="metadata" class="hero__video-bg">
            <source
                src={hero_video_url}
                type="video/mp4"
            >
        </video>
        <div class="container--small">
            <div class="hero__video__content flex flex-column">
                <h2 class="text-center hero__video__title">
                    {hero?.hero_video_title}
                </h2>
                <div class="button-wrapper flex justify-center">
                    <Button
                        type="text-button"
                        classes="glightbox"
                        href={full_video_url}>
                        {hero?.hero_video_button_label}
                    </Button>
                </div>
            </div>
        </div>
    </div>
</section>


<style lang="scss">

@use '$lib/styles/abstracts' as a;

.hero {
    padding-top: a.$gap-6;
    padding-bottom: 0;
    &__content {
        gap: a.$gap-2;
    }
    &__description {
        margin-bottom: 0;
    }
    &__video {
        position: relative;
        margin-top: a.$gap-6;
        overflow: hidden;
        aspect-ratio: 1/1;
        color: a.$clr-white;
        @media (min-width: 992px) {
            aspect-ratio: 16/9;
        }
        &-poster {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
        }
        &-bg {
            position: absolute;
            height: 100%;
            object-fit: cover;
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
}

</style>