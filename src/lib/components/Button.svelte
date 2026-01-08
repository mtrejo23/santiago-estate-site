<script lang="ts">
    export let type: 'button' | 'text-button' | 'submit';

    export let label: string = '';
    export let url: string = '#';
    export let target: string = '';
    export let classes: string = '';
</script>

{#if type === 'button'}
<a 
    href={url}
    target={target || undefined}
    class={`${type} ${classes}`}
    {...$$restProps}
>
    {#if label}
        {label}
    {/if}

    <slot />
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
        <path d="M13.3536 4.03568C13.5488 3.84042 13.5488 3.52384 13.3536 3.32858L10.1716 0.146596C9.97631 -0.0486663 9.65973 -0.0486663 9.46447 0.146596C9.2692 0.341858 9.2692 0.65844 9.46447 0.853703L12.2929 3.68213L9.46447 6.51056C9.2692 6.70582 9.2692 7.0224 9.46447 7.21766C9.65973 7.41293 9.97631 7.41293 10.1716 7.21766L13.3536 4.03568ZM0 3.68213L0 4.18213L13 4.18213L13 3.68213L13 3.18213L0 3.18213L0 3.68213Z" fill="black"/>
    </svg>
</a>
{:else if type === 'text-button'}
<a 
    href={url}
    target={target || undefined}
    class={`${type} ${classes}`}
    {...$$restProps}
>
    {#if label}
        {label}
    {/if}

    <slot />
    <svg xmlns="http://www.w3.org/2000/svg" width="62" height="32" viewBox="0 0 62 32" fill="none">
        <path d="M45 0.707031L60 15.707L45 30.707" stroke="currentColor" stroke-width="2"/>
        <path d="M60 15.7054L0 15.707" stroke="currentColor" stroke-width="2"/>
    </svg>
</a>
{:else if type === 'submit'}
<button
    class={`${type} ${classes}`}
>
    <slot />
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
        <path d="M13.3536 4.03568C13.5488 3.84042 13.5488 3.52384 13.3536 3.32858L10.1716 0.146596C9.97631 -0.0486663 9.65973 -0.0486663 9.46447 0.146596C9.2692 0.341858 9.2692 0.65844 9.46447 0.853703L12.2929 3.68213L9.46447 6.51056C9.2692 6.70582 9.2692 7.0224 9.46447 7.21766C9.65973 7.41293 9.97631 7.41293 10.1716 7.21766L13.3536 4.03568ZM0 3.68213L0 4.18213L13 4.18213L13 3.68213L13 3.18213L0 3.18213L0 3.68213Z" fill="black"/>
    </svg>
</button>
{/if}


<style lang="scss">

@use '$lib/styles/abstracts' as a;

.button, .submit {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: a.$fs-xs;
    line-height: a.$lh-sm;
    color: a.$clr-black;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: .75px;
    padding: 18px;
    border: 1px solid #000;
    background: a.$clr-white;
    box-shadow: 7px 7px 0 0 rgba(189, 159, 125, 0.25);
    transition: background 0.3s ease, color 0.3s ease, stroke 0.3s ease;
    cursor: pointer;

    &:hover {
        background: a.$clr-black;
        color: a.$clr-white;
        stroke: a.$clr-white;
    }
}
.text-button {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    color: inherit;
    font-family: a.$font-primary;
    font-size: a.$fs-text-button;
    font-weight: a.$fw-light;
    font-style: italic;
    line-height: a.$lh-sm;
    text-decoration: none;

    &--white {
        color: a.$clr-white;
    }
}

</style>
