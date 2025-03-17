<script lang="ts">
    import type {CarouselFileDetails} from "./index.js";
    import GalleryFileComponent from "./GalleryFileComponent.svelte";
    import {onMount} from "svelte";
    import {ConditionalLoadFiles, FileLoadingState, GetCurrentFileIndex} from "./Internal.js";

    let { files=$bindable(), autoLoadLeftAndRightFiles, filePath } : {
        files: CarouselFileDetails[];
        autoLoadLeftAndRightFiles?: boolean;
        filePath?: string;
    } = $props();

    let carousel:HTMLDivElement|null=null;

    //sidtodo - this doesn't need to map
    let fileLoadingState=$state<FileLoadingState[]>(files.map(file => FileLoadingState.initial));

    //sidtodo do we need the ID?

    //sidtodo what if a file is deleted?
    onMount(() => {
        ConditionalLoadFiles(0, autoLoadLeftAndRightFiles===true, files, fileLoadingState);
    });

    let currentIndex=$state<number>(0);

    const onScroll = () => {
        if(!carousel)
            return;

        const previousIndex=currentIndex;
        const newIndex=GetCurrentFileIndex(carousel.scrollLeft, carousel.offsetWidth);
        if(previousIndex === newIndex)
            return;

        currentIndex=newIndex;

        ConditionalLoadFiles(currentIndex, autoLoadLeftAndRightFiles===true, files, fileLoadingState, filePath);
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
            <GalleryFileComponent fileSrc={iterFile.src} loaded={fileLoadingState[i] === FileLoadingState.loaded} />
        {/each}
    </div>
</div>

<button onclick={()=>files=files.splice(currentIndex)}>DElete</button>