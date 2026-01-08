<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import Image from '$lib/components/Image.svelte';

    export let about: any;
</script>

<section class="about">
    <div class="container">
        <div class="about__grid grid md:grid-cols-2">

            {#if about?.about_us_image.sizes}
                <div class="about__image">
                    <Image
                        image={about?.about_us_image}
                        sizes="(max-wdth; 991px) 100vw, 50vw"
                        cover
                    />
                </div>
            {/if}

            <div class="about__content flex flex-column justify-center">
                <div>
                    <h2 class="about__title">{about?.about_us_title}</h2>
                    <div class="about__description">
                        {@html about?.about_us_description}
                    </div>
                </div>

                {#if about?.about_us_button.url}
                <div class="button-wrapper">
                    <Button
                        type="button"
                        href={about?.about_us_button.url}
                        target={about?.about_us_button.target}>
                        {about?.about_us_button.title}
                    </Button>
                </div>
                {/if}
            </div>
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.about {
    padding-block: a.$gap-6;
    &__grid {
        gap: a.$gap-4;
    }
    &__image {
        aspect-ratio: 4/5;
        overflow: hidden;
    }
    &__content {
        gap: a.$gap-2;
    }
    &__description {
        margin-bottom: 0;
    }
}
</style>