<script lang="ts">
    import Button from '$lib/components/Button.svelte'

    export let block: any;
</script>

<section class="text-with-left-image-block">
    <div class="container">
        <div class="grid md:grid-cols-2">
            {#if block?.text_with_left_image_block_image}
            <img
                class="text-with-left-image-block__image"
                src={block?.text_with_left_image_block_image.sizes["Medium Size"]}
                alt={block?.text_with_left_image_block_image.alt ?? ''}
                srcset={`
                    ${block?.text_with_left_image_block_image.sizes["Thumb Size"]} ${block?.text_with_left_image_block_image.sizes["Thumb Size-width"]}w,
                    ${block?.text_with_left_image_block_image.sizes["Medium Size"]} ${block?.text_with_left_image_block_image.sizes["Medium Size-width"]}w,
                    ${block?.text_with_left_image_block_image.sizes["Large Size"]} ${block?.text_with_left_image_block_image.sizes["Large Size-width"]}w,
                    ${block?.text_with_left_image_block_image.sizes["2048x2048"]} ${block?.text_with_left_image_block_image.sizes["2048x2048-width"]}w
                `}
                sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/if}
            <div class="text-with-left-image-block__content flex flex-column justify-center">
                <div>
                    <h2 class="text-with-left-image-block__title">
                        {block?.text_with_left_image_block_title}
                    </h2>
                    {@html block?.text_with_left_image_block_description}
                </div>
                {#if block?.text_with_left_image_block_button}
                <div class="button-wrapper">
                    <Button type="button"
                        href={block?.text_with_left_image_block_button.url}
                        target={block?.text_with_left_image_block_button.target}
                    >
                        {block?.text_with_left_image_block_button.title}
                    </Button>
                </div>
                {/if}
            </div>
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.text-with-left-image-block {
    &__image {
        aspect-ratio: 4/5;
        object-fit: cover;
    }
    .grid {
        gap: a.$gap-4;
    }
}
</style>