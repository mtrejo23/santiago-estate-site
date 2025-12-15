<script lang="ts">
    import Button from '$lib/components/Button.svelte';

    export let about: any;

    // Map ACF fields inside the component
    const button = about?.about_us_button ?? {};
</script>

<section class="about">
    <div class="container">
        <div class="about__grid grid md:grid-cols-2">

            {#if about?.about_us_image.sizes}
            <img
                class="about__image"
                src={about?.about_us_image.sizes["Medium Size"]}
                alt={about?.about_us_image.alt ?? ''}
                srcset={`
                    ${about?.about_us_image.sizes["Thumb Size"]} ${about?.about_us_image.sizes["Thumb Size-width"]}w,
                    ${about?.about_us_image.sizes["Medium Size"]} ${about?.about_us_image.sizes["Medium Size-width"]}w,
                    ${about?.about_us_image.sizes["Large Size"]} ${about?.about_us_image.sizes["Large Size-width"]}w,
                    ${about?.about_us_image.sizes["2048x2048"]} ${about?.about_us_image.sizes["2048x2048-width"]}w
                `}
                sizes="(max-width: 768px) 100vw, 50vw"
            />
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
                    <Button type="button" href={about?.about_us_button.url} target={about?.about_us_button.target}>
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
        object-fit: cover;
    }
    &__content {
        gap: a.$gap-2;
    }
    &__description {
        margin-bottom: 0;
    }
}
</style>