<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import Image from "$lib/components/Image.svelte";

    export let block: any;
</script>

<section class="large-image-cards-block">
    <div class="container">
        <div class="grid md:grid-cols-3">
            {#each block?.large_image_cards_block_cards as card}
                <div class="large-image-cards-block__card">
                    <div class="large-image-cards-block__card__image">
                        <Image
                            image={card.large_image_cards_block_cards_image}
                            sizes="(max-width: 991px) 100vw, 66vw"
                            cover
                        />
                    </div>
                    <div class="large-image-cards-block__card__content flex flex-column justify-center">
                        <div>
                            <h2 class="large-image-cards-block__card__title">
                                {card.large_image_cards_block_cards_title}
                            </h2>
                            {@html card.large_image_cards_block_cards_description}
                        </div>
                        {#if card.large_image_cards_block_cards_button}
                        <div class="button-wrapper">
                            <Button
                                type="button"
                                href={card.large_image_cards_block_cards_button?.url} 
                                target={card.large_image_cards_block_cards_button?.target}
                            >
                                {card.large_image_cards_block_cards_button?.title}
                            </Button>
                        </div>
                    {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.large-image-cards-block {
    .grid {
        gap: a.$gap-2;
        @media (min-width: 992px) {
            row-gap: a.$gap-4;
        }
    }
    &__card {
        display: grid;
        gap: inherit;
        @media (min-width: 992px) {
            grid-template-columns: subgrid;
            grid-column: 1 / -1;
        }
        &__image {
            aspect-ratio: 8 / 5;
            overflow: hidden;
            @media (min-width: 992px) {
                grid-column: 1 / span 2;
                grid-row: 1;
            }
        }
        &__content {
            @media (min-width: 992px) {
                grid-column: 3 / -1;
                grid-row: 1;
            }
        }
        &__title {
            font-size: a.$fs-h3;
        }
    }
    @media (min-width: 992px) {
        &__card:nth-child(even) {
            .large-image-cards-block__card__image {
                grid-column: 2 / -1;
                grid-row: 1;
            }
            .large-image-cards-block__card__content {
                grid-column: 1 / span 1;
                grid-row: 1;
            }
        }
    }
}
</style>