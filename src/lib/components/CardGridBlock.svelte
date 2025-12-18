<script lang="ts">
    import Button from '$lib/components/Button.svelte'
    import Image from '$lib/components/Image.svelte'

    export let block: any;
</script>

<section class="card-grid-block">
    <div class="container">
        <div class="grid md:grid-cols-3">
            {#each block?.card_grid_block_card as card}
                <div class="card-grid-block__card flex flex-column">
                    <div class="card-grid-block__card__image">
                        <Image
                            image={card.card_grid_block_card_image}
                            sizes="(max-width: 991px) 100vw, 33vw"
                            cover
                        />
                    </div>
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
            overflow: hidden;
        }
    }
}
</style>