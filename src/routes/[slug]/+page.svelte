<script lang="ts">
    import PageHeader from '$lib/components/PageHeader.svelte';
    import FlexibleContent from '$lib/components/FlexibleContent.svelte';
    import Seo from '$lib/components/Seo.svelte'

    export let data;
    export let form;

    $: page = data.page;
    $: contentBlocks = page.acf?.content_blocks ?? [];
</script>

<Seo seo={data?.seo} />

<PageHeader {page} />
<FlexibleContent {contentBlocks} {form} />