<script lang="ts">
    import Button from '$lib/components/Button.svelte'

    export let block: any;
</script>

<section class="card-grid-block">
    <div class="container">
        <div class="grid md:grid-cols-3">
            {#each block?.card_grid_block_card as card}
                <div class="card-grid-block__card flex flex-column">
                    <img
                        src={card.card_grid_block_card_image.sizes["Medium Size"]}
                        alt={card.card_grid_block_card_image.alt}
                        width={card.card_grid_block_card_image.width}
                        height={card.card_grid_block_card_image.height}
                        srcset={`
                            ${card.card_grid_block_card_image.sizes["Thumb Size"]} ${card.card_grid_block_card_image.sizes["Thumb Size-width"]}w,
                            ${card.card_grid_block_card_image.sizes["Medium Size"]} ${card.card_grid_block_card_image.sizes["Medium Size-width"]}w,
                            ${card.card_grid_block_card_image.sizes["Large Size"]} ${card.card_grid_block_card_image.sizes["Large Size-width"]}w,
                            ${card.card_grid_block_card_image.sizes["2048x2048"]} ${card.card_grid_block_card_image.sizes["2048x2048-width"]}w
                        `}
                        sizes="(max-width: 991px) 100vw, 33vw"
                        class="card-grid-block__card__image"
                    />
                    <div>
                        <h3>
                            {card.card_grid_block_card_title}
                        </h3>
                        {@html card.card_grid_block_card_description}
                    </div>
                    {#if card.card_grid_block_card_button}
                        <div class="button-wrapper">
                            <Button
                                type="button"
                                href={card.card_grid_block_card_button?.url} 
                                target={card.card_grid_block_card_button?.target}
                            >
                                {card.card_grid_block_card_button?.title}
                            </Button>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.card-grid-block {
    .grid {
        gap: a.$gap-2;
    }
    &__card {
        background-color: a.$clr-white;
        border: 1px solid a.$clr-tan;
        padding: a.$gap-1_5;
        gap: a.$gap-2;
        &__image {
            aspect-ratio: 8/5;
            width: 100%;
            height: auto;
            object-fit: cover;
        }
    }
}
</style>