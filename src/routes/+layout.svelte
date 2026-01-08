<script lang="ts">
    import { page } from '$app/stores';

    import faviconUrl from '$lib/assets/favicon.svg';
    import '$lib/styles/app.scss';

    import Header from '$lib/components/Header.svelte';
    import Gallery from '$lib/components/Gallery.svelte';
    import About from '$lib/components/About.svelte';
    import Contact from '$lib/components/Contact.svelte';
    import Footer from '$lib/components/Footer.svelte';

    export let data: {
        menuItems: any[];
        options: any;
        seo?: any;
    };

    const header = data?.options ?? {};
    const menuItems = data?.menuItems ?? [];
    const options = data?.options ?? {};
</script>

<svelte:head>
    <link rel="icon" href="{faviconUrl}" type="image/svg+xml" />
</svelte:head>

<Header {menuItems} {header}/>

<main>
    <slot />

    <Gallery gallery={options} />
    <About about={options} />

    {#if $page.url.pathname !== '/contact'}
        <Contact contact={options} />
    {/if}
</main>

<Footer {menuItems} />