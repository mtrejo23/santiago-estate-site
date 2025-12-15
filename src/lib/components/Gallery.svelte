<script lang="ts">
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
               <img
                    src={image.sizes["Medium Size"]}
                    alt={image.alt || image.title}
                    srcset={`
                         ${image.sizes["Thumb Size"]} ${image.sizes["Thumb Size-width"]}w,
                         ${image.sizes["Medium Size"]} ${image.sizes["Medium Size-width"]}w,
                         ${image.sizes["Large Size"]} ${image.sizes["Large Size-width"]}w,
                         ${image.sizes["2048x2048"]} ${image.sizes["2048x2048-width"]}w
                    `}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    class="gallery__image"
               />
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
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

</style>