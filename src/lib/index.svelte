<script lang="ts" generics="DerivedFileDetails extends CarouselFileDetails">
    import type {CarouselFileDetails} from "./index.js";
    import GalleryFileComponent from "./GalleryFileComponent.svelte";
    import {onMount} from "svelte";
    import {
        ConditionalLoadFiles,
        FileLoadingState,
        GetCarouselFileLeftIdx,
        GetCarouselFileRightIdx,
        GetCurrentFileIndex,
        GetFileClass,
        GetFilePath,
        InitialiseFileLoadingState,
        ScrollToIndex
    } from "./Internal.js";

    const { files, autoChangeMs, chevronUrl, filePath, overrideLeftChevronClass, overrideRightChevronClass,
        autoLoadLeftAndRightFiles, additionalFileClass, additionalFileContainerClass } : {
        files: DerivedFileDetails[],
        autoLoadLeftAndRightFiles?: boolean,
        filePath?: string,
        shouldLoad: boolean,
        autoChangeMs?: number,
        chevronUrl?: string,
        overrideLeftChevronClass?: string,
        overrideRightChevronClass?: string,
        additionalFileClass?: (isLoading: boolean)=>string,
        additionalFileContainerClass?: string,
    } = $props();

    let carousel:HTMLDivElement|null=null;

    let fileLoadingState=$state<FileLoadingState[]>(InitialiseFileLoadingState(files));

    const ScrollLeft = () => ScrollToIndex(carousel, curIdx => GetCarouselFileLeftIdx(curIdx, files), "smooth",
        fileLoadingState, files, !!autoLoadLeftAndRightFiles);

    const ScrollRight = () => ScrollToIndex(carousel, curIdx => GetCarouselFileRightIdx(curIdx, files), "smooth",
        fileLoadingState, files, !!autoLoadLeftAndRightFiles);

    onMount(() => {
        ConditionalLoadFiles(0, fileLoadingState, files, autoLoadLeftAndRightFiles===true, filePath);
        if(autoChangeMs) {
            const interval = setInterval(ScrollRight, autoChangeMs);
            return () => clearInterval(interval);
        }
    });

    let currentIndex=$state<number>(0);

    const onScrollEnd = () => {
        if(!carousel)
            return;

        const previousIndex=currentIndex;
        const newIndex=GetCurrentFileIndex(carousel);
        if(previousIndex === newIndex)
            return;

        currentIndex=newIndex;

        ConditionalLoadFiles(currentIndex, fileLoadingState, files, autoLoadLeftAndRightFiles===true, filePath);
    }

    const showChevrons = !!chevronUrl && files.length > 1;

    const getChevronClass = overrideLeftChevronClass
        ? (isLeft: boolean)=>
            (isLeft ? overrideLeftChevronClass : overrideRightChevronClass)
        : (isLeft: boolean)=> isLeft ? "CarouselChevronLeft" : "CarouselChevronRight";
</script>

<style>
    * {
        all: unset;
        box-sizing: border-box;
    }
    div {
        display: inline-block;
    }
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
    <div class="carousel" bind:this={carousel} onscrollend={onScrollEnd}>
        {#each files as iterFile, i}
            <GalleryFileComponent
                fileSrc={iterFile.src} loadingState={fileLoadingState[i]}
                additionalClass={GetFileClass<DerivedFileDetails>(iterFile, fileLoadingState[i], additionalFileClass)}
                additionalContainerClass={additionalFileContainerClass}
            />
        {/each}
    </div>

    {#if showChevrons}
        <input type="image" src={GetFilePath(chevronUrl, filePath)} class={getChevronClass(true)} onclick={ScrollLeft}
               alt="scroll left" />
        <input type="image" src={GetFilePath(chevronUrl, filePath)} class={getChevronClass(false)} onclick={ScrollRight}
               alt="scroll right" />
    {/if}
</div>