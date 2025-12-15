<script lang="ts">
    export let venue_highlights: any;
</script>

<section class="highlights">
    <div class="container">
        <div class="highlights__grid grid md:grid-cols-6">
            <div class="highlights__intro">
                <h2>
                    {venue_highlights?.venue_highlights_title}
                </h2>
                {@html venue_highlights?.venue_highlights_description}
            </div>

            <!-- Venue Highlights Cards -->
            {#each venue_highlights?.venue_highlights_card as card}
                <div class="highlights__card flex flex-column justify-between">
                    <div>
                        <h3>
                            {card.venue_highlights_card_title}
                        </h3>
                        {@html card.venue_highlights_card_description}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style lang="scss">

@use '$lib/styles/abstracts' as a;

.highlights {
    padding-top: a.$gap-6;
    gap: a.$gap-2;
    &__grid {
        gap: a.$gap-2;
    }
    &__card {
        padding: a.$gap-2;
        background: a.$clr-white;
        border: 1px solid a.$clr-tan;
    }
    @media (min-width: 992px) {
        &__intro {
            grid-column: span 3;
        }
        &__card:nth-child(2) {
            grid-column: 1 / span 3;
            grid-row: 2;
        }
        &__card:nth-child(3) {
            grid-column: 4 / span 3;
            grid-row: 2;
        }
        &__card:nth-child(4) {
            grid-column: 1 / span 2;
            grid-row: 3;
        }
        &__card:nth-child(5) {
            grid-column: 3 / span 2;
            grid-row: 3;
        }
        &__card:nth-child(6) {
            grid-column: 5 / span 2;
            grid-row: 3;
        }
    }
}

</style>