<script lang="ts">
    export let block: any;
</script>

<section class="text-block">
    <div class="container">
        <div class="text-block__content grid md:grid-cols-2">
            <div class="flex flex-column justify-center">
                <h2>
                    {block?.text_block_with_list_title}
                </h2>
                {@html block?.text_block_with_list_description}
            </div>
            <ul class="text-block__list grid">
                {#each block?.text_block_with_list_items as item}
                    <li class="text-block__list-item">
                        {item.text_block_with_list_item}
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</section>

<style lang="scss">
    @use '$lib/styles/abstracts' as a;

    .text-block {
        &__content {
            gap: a.$gap-4;
        }
        &__list {
            list-style: none;
            padding-left: 0;
            background-color: a.$clr-light-tan;
            padding: a.$gap-2;
            &-item {
                font-family: a.$font-primary;
                font-size: a.$fs-h3;
                font-weight: a.$fw-light;
                border-bottom: 1px solid a.$clr-tan;
                padding-block: a.$gap-1_5;
                line-height: a.$lh-sm;
                &:first-child {
                    padding-top: 0;
                }
                &:last-child {
                    padding-bottom: 0;
                    border-bottom: none;
                }
            }
        }
    }
</style>