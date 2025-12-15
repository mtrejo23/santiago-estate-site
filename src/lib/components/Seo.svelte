<script lang="ts">
    export let seo: any;
</script>

<svelte:head>
    {#if seo?.title}
        <title>{seo.title}</title>
    {/if}

    {#if seo?.description}
        <meta name="description" content={seo.description} />
    {/if}

    {#if seo?.canonical}
        <link rel="canonical" href={seo.canonical} />
    {/if}
</svelte:head>