<script lang="ts">
    import type {CarouselFileDetails} from "./index.js";
    import GalleryFileComponent from "./GalleryFileComponent.svelte";
    import type {FileNonState} from "$lib/InternalTypes.js";
    import {onMount} from "svelte";

    let { files } : {
        files: CarouselFileDetails[];
    } = $props();


    // const fileNonState: FileNonState = {
    //     selectedId: (selectedId === null || selectedId === undefined ? files[0].id : selectedId),
    //     loadingIdList: new Set<bigint>()
    // }

    let mounted=$state<boolean>(false);

    let scrollLeft=$state<number>(0);

    let carousel=null;

    onMount(() => {
        mounted=true; //sidtodo do we need this? or can we just use the presence of carousel?
    });

    const GetCarouselWidth = () => carousel?.offsetWidth ?? 0;

    const GetCurrentFileIndex = () => {

        const scrollX=scrollLeft;
        const fileWidth=GetCarouselWidth();

        if(fileWidth === 0)
            return 0;

        let currentIdx=Math.round(scrollX/fileWidth);

        const diff=scrollX - (currentIdx * fileWidth);
        if(diff > (fileWidth / 2)) {
            currentIdx = currentIdx + 1;
        }

        return currentIdx;
    }

    const selectedIndex=$derived.by(GetCurrentFileIndex);

    const onScroll = () => {
        scrollLeft = carousel.scrollLeft;
    }
</script>

<style>
    .carousel-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .carousel {
        position: relative;
        overflow-x: auto;
        scrollbar-width: none;
        white-space: nowrap;
        overflow-y: hidden;
        scroll-snap-type: x mandatory;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
</style>

<div class="carousel-wrapper">
    <div class="carousel" onscroll={onScroll} bind:this={carousel}>
        {#each files as iterFile, i}
            <GalleryFileComponent idx={i} mounted={mounted} />
        {/each}
    </div>

    <div>{scrollLeft}</div>
    <div>{selectedIndex}</div>
</div>