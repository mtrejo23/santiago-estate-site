<script lang="ts">
    import ContactFormBlock from '$lib/components/ContactFormBlock.svelte';
    import ScheduleTourFormBlock from '$lib/components/ScheduleTourFormBlock.svelte';
    import VideoBlock from '$lib/components/VideoBlock.svelte';
    import TextBlockWithListBlock from '$lib/components/TextBlockWithList.svelte';
    import TextWithLeftImageBlock from '$lib/components/TextWithLeftImageBlock.svelte';
    import TextWithRightImageBlock from '$lib/components/TextWithRightImageBlock.svelte';
    import CardGridBlock from '$lib/components/CardGridBlock.svelte';
    import LargeImageCardsBlock from '$lib/components/LargeImageCardsBlock.svelte';

    export let contentBlocks: any[] = [];
    export let form;

    const layoutMap: Record<string, any> = {
        contact_form_block: ContactFormBlock,
        schedule_tour_form_block: ScheduleTourFormBlock,
        video_block: VideoBlock,
        text_block_with_list: TextBlockWithListBlock,
        text_with_left_image_block: TextWithLeftImageBlock,
        text_with_right_image_block: TextWithRightImageBlock,
        card_grid_block: CardGridBlock,
        large_image_cards_block: LargeImageCardsBlock
    };
</script>

{#each contentBlocks as block, i (i)}
    {#if layoutMap[block.acf_fc_layout]}
        <svelte:component
            this={layoutMap[block.acf_fc_layout]}
            block={block}
            {form}
        />
    {/if}
{/each}