<script lang="ts">
    import faviconUrl from '$lib/assets/favicon.svg';
    import '$lib/styles/app.scss';

    import Header from '$lib/components/Header.svelte';
    import Gallery from '$lib/components/Gallery.svelte';
    import About from '$lib/components/About.svelte';
    import Contact from '$lib/components/Contact.svelte';
    import Footer from '$lib/components/Footer.svelte';

    export let data;

    const menuItems = data?.menuItems ?? [];
    const options = data?.options ?? {};
</script>

<svelte:head>
    <title>Santiago Vineyard & Estate</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="{faviconUrl}" type="image/svg+xml" />
</svelte:head>

<Header {menuItems} />

<main>
    <slot />

    <Gallery gallery={options} />
    <About about={options} />
    <Contact contact={options} />
</main>

<Footer {menuItems} />