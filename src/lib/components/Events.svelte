<script lang="ts">
import Button from '$lib/components/Button.svelte';
import Image from '$lib/components/Image.svelte';

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
                        <div class="events__event-card__image">
                            <Image
                                image={card.events_card_image}
                                sizes="(max-width: 991px) 100vw, 50vw"
                                cover
                            />
                        </div>
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
            overflow: hidden;
        }
    }
}
</style>