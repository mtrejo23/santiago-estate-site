<script lang="ts">
    import Hero from '$lib/components/Hero.svelte';
    import Events from '$lib/components/Events.svelte';
    import Highlights from '$lib/components/Highlights.svelte';

    export let data;
    const acf = data.acf;

    const hero = acf?.hero_section ?? {};
    const events = acf?.events_section ?? {};
    const venue_highlights = acf?.venue_highlights_section ?? {};

    const hero_video_url = hero?.hero_video ?? null;
    const full_video_url = hero?.full_video ?? null;

    const WP = import.meta.env.PUBLIC_WP_BASE;
</script>


<Hero {hero} {hero_video_url} {full_video_url} />
<Events {events} />
<Highlights {venue_highlights} />
