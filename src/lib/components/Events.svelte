<script lang="ts">
import Button from '$lib/components/Button.svelte';

export let events: any;
</script>

<section class="events">
    <div class="container">
        <div class="events__grid grid md:grid-cols-2">
            <div class="events__intro">
                <h2>
                    {events?.events_title}
                </h2>
                <div class="events__intro__description">
                    {@html events?.events_description}
                </div>
            </div>

            <!-- Event Cards -->
            {#each events?.events_card as card}
                <article class="events__event-card flex flex-column justify-between">
                    <div class="events__event-card__content flex flex-column">
                        <img
                            src={card.events_card_image.sizes["Medium Size"]}
                            alt={card.events_card_image.alt}
                            width={card.events_card_image.width}
                            height={card.events_card_image.height}
                            srcset={`
                                ${card.events_card_image.sizes["Thumb Size"]} ${card.events_card_image.sizes["Thumb Size-width"]}w,
                                ${card.events_card_image.sizes["Medium Size"]} ${card.events_card_image.sizes["Medium Size-width"]}w,
                                ${card.events_card_image.sizes["Large Size"]} ${card.events_card_image.sizes["Large Size-width"]}w,
                                ${card.events_card_image.sizes["2048x2048"]} ${card.events_card_image.sizes["2048x2048-width"]}w
                            `}
                            sizes="(max-width: 991px) 100vw, 50vw"
                            class="events__event-card__image"
                        />
                        <div>
                            <h3>
                                {card.events_card_title}
                            </h3>
                            <div class="events__event-card__description">
                                {@html card.events_card_description}
                            </div>
                        </div>
                    </div>
                    <div class="button-wrapper">
                        <Button
                            type="button"
                            label={card.events_card_link.title}
                            url={card.events_card_link.url}
                            target={card.events_card_link.target}
                        />
                    </div>
                </article>
            {/each}
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.events {
    background: a.$clr-light-tan;
    padding-block: a.$gap-6;
    &__grid {
        gap: a.$gap-4;
    }
    &__intro {
        &__description {
            margin-bottom: 0;
        }
    }
    &__event-card {
        gap: a.$gap-2;
        &__content {
            gap: a.$gap-2;
        }
        &__description {
            margin-bottom: 0;
        }
        &__image {
            aspect-ratio: 8/5;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>