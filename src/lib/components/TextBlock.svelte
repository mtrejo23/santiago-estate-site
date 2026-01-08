<script lang="ts">
    export let block: any;
</script>

<section class="text-block">
    <div class="container">
        {#if block?.text_block_title}
            <h2>
                {block?.text_block_title}
            </h2>
        {/if}
        <div>
            {@html block?.text_block_description}
        </div>
    </div>
</section>