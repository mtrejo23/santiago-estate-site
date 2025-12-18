<script lang="ts">
     import Image from '$lib/components/Image.svelte';

     export let gallery: any;
</script>

<section class="gallery">
     <div class="container--full-width">
          <h2 class="gallery__title">
               {gallery?.gallery_title}
          </h2>
     </div>
     <div class="gallery__grid grid grid-cols-2 md:grid-cols-3">
          {#each gallery?.gallery_images as image}
               <div class="gallery__image">
                    <Image
                         image={image}
                         sizes="(max-width: 991px) 50vw, 33vw"
                         cover
                    />
               </div>
          {/each}
     </div>
</section>

<style lang="scss">

@use '$lib/styles/abstracts' as a;

.gallery {
    padding-bottom: 0;

    &__title {
        font-size: a.$fs-display-xl;
        font-style: italic;
        line-height: a.$lh-sm;
        text-transform: uppercase;
        color: a.$clr-tan;
        margin-bottom: 0;
    }
    &__image {
        aspect-ratio: 1/1;
        overflow: hidden;
    }
}

</style>