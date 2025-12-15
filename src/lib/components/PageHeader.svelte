<script lang="ts">
    export let page;
    //console.log('Page data:', page);
</script>

<section class="page-header">
    <div class="container">
        <div class="grid md:grid-cols-3">
            <div class="page-header__content">
                <h1>{@html page?.title?.rendered}</h1>
                {#if page?.acf?.page_header_description}
                    {@html page.acf.page_header_description}
                {/if}
            </div>
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.page-header {
    padding-top: a.$gap-6;
    padding-bottom: a.$gap-3;
    &__content {
        grid-column: span 2;
    }
}
</style>