<script lang="ts">
    import Button from '$lib/components/Button.svelte'

    export let block: any;
    export let form;
</script>

<section class="contact-form-block">
    <div class="container">
        <div class="grid gap-2 md:grid-cols-2">

            {#if block?.contact_form_block_image.sizes}
            <img
                class="contact-form-block__image"
                src={block?.contact_form_block_image.sizes["Medium Size"]}
                alt={block?.contact_form_block_image.alt ?? ''}
                srcset={`
                    ${block?.contact_form_block_image.sizes["Thumb Size"]} ${block?.contact_form_block_image.sizes["Thumb Size-width"]}w,
                    ${block?.contact_form_block_image.sizes["Medium Size"]} ${block?.contact_form_block_image.sizes["Medium Size-width"]}w,
                    ${block?.contact_form_block_image.sizes["Large Size"]} ${block?.contact_form_block_image.sizes["Large Size-width"]}w,
                    ${block?.contact_form_block_image.sizes["2048x2048"]} ${block?.contact_form_block_image.sizes["2048x2048-width"]}w
                `}
                sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/if}

            <div class="contact-form-block__content flex flex-column justify-center">
                <div>
                    <h2 class="contact-form-block__title">{block.contact_form_block_title}</h2>
                    <div>{@html block.contact_form_block_description}</div>
                </div>
                <div class="contact-form-block__form-wrapper">
                    <form method="POST">
                        <div class="form-field">
                            <label>
                                <span class="visually-hidden">First Name:</span>
                                <input name="first_name" placeholder="First Name" required>
                            </label>
                        </div>

                        <div class="form-field">
                            <label>
                                <span class="visually-hidden">Last Name:</span>
                                <input name="last_name" placeholder="Last Name" required>
                            </label>
                        </div>

                        <div class="form-field">
                            <label>
                                <span class="visually-hidden">Email:</span>
                                <input type="email" name="email" placeholder="Email" required>
                            </label>
                        </div>

                        <div class="form-field">
                            <label>
                                <span class="visually-hidden">Phone:</span>
                                <input type="tel" name="phone"placeholder="Phone" required>
                            </label>
                        </div>

                        <div class="form-field">
                            <label>
                                Event Date:
                                <input type="date" name="event_date" required>
                            </label>
                        </div>

                        <div class="form-field">
                            <label>
                                <span class="visually-hidden">Message:</span>
                                <textarea name="message" placeholder="Your message" required></textarea>
                            </label>
                        </div>

                        <Button type="submit">Submit</Button>
                    </form>

                    {#if form?.error}
                        <p class="error text-center">Something went wrong. Please try again.</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</section>


<style lang="scss">
@use '$lib/styles/abstracts' as a;

.contact-form-block {
    padding-block: a.$gap-3;
    &__image {
        aspect-ratio: 4/5;
        overflow: hidden;
        object-fit: cover;
    }
    &__content {
        gap: a.$gap-2;
    }
    &__title {
        font-size: a.$fs-h3;
    }
    .grid {
        gap: a.$gap-4;
    }
    .form-field {
        input, textarea {
            width: 100%;
            padding: a.$gap-0_75;
            font-size: a.$fs-sm;
            font-family: inherit;
            margin-bottom: a.$gap-0_5;
            border: 1px solid a.$clr-tan;
        }
        textarea {
            min-height: 6rem;
        }
    }
    .visually-hidden {
        position: absolute !important;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
    }
    .success, .error {
        padding: a.$gap-1;
        color: a.$clr-white;
        margin-block: a.$gap-1;
    }
    /*.success {
        background-color: a.$clr-black;
    }*/
    .error {
        background-color: a.$clr-red;
    }
}
</style>