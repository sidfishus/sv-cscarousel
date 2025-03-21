<script lang="ts" generics="DerivedFileDetails extends CarouselFileDetails">
    import type {CarouselFileDetails, CarouselProps} from "./index.js";
    import GalleryFileComponent from "./GalleryFileComponent.svelte";
    import {onMount} from "svelte";
    import {
        ConditionalLoadFiles,
        FileLoadingState, GetCarouselFileLeftIdx, GetCarouselFileRightIdx,
        GetCurrentFileIndex, GetFileClass, GetFilePath,
        InitialiseFileLoadingState, ScrollToIndex
    } from "./Internal.js";

    const allProps: CarouselProps<DerivedFileDetails> = $props();

    const { files, autoChangeMs, chevronUrl, filePath, overrideLeftChevronClass, overrideRightChevronClass } = allProps;

    let carousel:HTMLDivElement|null=null;

    let fileLoadingState=$state<FileLoadingState[]>(InitialiseFileLoadingState(files));

    const ScrollLeft = () =>
        ScrollToIndex(carousel, curIdx => GetCarouselFileLeftIdx(curIdx, files), "smooth", allProps, fileLoadingState);

    const ScrollRight = () =>
        ScrollToIndex(carousel, curIdx => GetCarouselFileRightIdx(curIdx, files), "smooth", allProps, fileLoadingState);

    onMount(() => {
        ConditionalLoadFiles(0, allProps, fileLoadingState);
        if(autoChangeMs) {
            const interval = setInterval(ScrollRight, autoChangeMs);
            return () => clearInterval(interval);
        }
    });

    let currentIndex=$state<number>(0);

    const onScroll = () => {
        if(!carousel)
            return;

        const previousIndex=currentIndex;
        const newIndex=GetCurrentFileIndex(carousel);
        if(previousIndex === newIndex)
            return;

        currentIndex=newIndex;

        ConditionalLoadFiles(currentIndex, allProps, fileLoadingState);
    }

    const showChevrons = !!chevronUrl && files.length > 1;

    const getChevronClass = overrideLeftChevronClass
        ? (isLeft: boolean)=>
            (isLeft ? overrideLeftChevronClass : overrideRightChevronClass)
        : (isLeft: boolean)=> isLeft ? "CarouselChevronLeft" : "CarouselChevronRight";
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
            <GalleryFileComponent
                fileSrc={iterFile.src} loaded={fileLoadingState[i] === FileLoadingState.loaded} mainProps={allProps}
                additionalClass={GetFileClass(allProps, iterFile, fileLoadingState[i] === FileLoadingState.loaded)}
            />
        {/each}
    </div>

    {#if showChevrons}
        <a onclick={ScrollLeft}>
            <img src={GetFilePath(chevronUrl, filePath)} class={getChevronClass(true)} />
        </a>
        <a onclick={ScrollRight}>
            <img src={GetFilePath(chevronUrl, filePath)} class={getChevronClass(false)} />
        </a>
    {/if}
</div>