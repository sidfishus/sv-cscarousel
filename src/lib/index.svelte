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

    let { files, autoChangeMs, chevronUrl, filePath, overrideLeftChevronClass, overrideRightChevronClass,
        autoLoadLeftAndRightFiles, additionalFileClass, additionalFileContainerClass, onscroll: clientOnScroll,
        onscrollend: clientOnScrollEnd} : {
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
        onscroll?: (idx: number) => void,
        onscrollend?: (idx: number) => void
    } = $props();

    let carousel:HTMLDivElement|null=null;

    let fileLoadingState=$state<FileLoadingState[]>(InitialiseFileLoadingState(files));

    let transitionToIndex=0;
    const SetTransitionToIndex = (newIdx: number) => transitionToIndex = newIdx;
    const GetTransitionToIndex = () => transitionToIndex;

    export const Scroll = (newIdx: number) =>
        ScrollToIndex(carousel, newIdx, "smooth", fileLoadingState, files, !!autoLoadLeftAndRightFiles,
            SetTransitionToIndex, filePath);

    const ScrollLeft = () => Scroll(GetCarouselFileLeftIdx(GetTransitionToIndex(), files));

    const ScrollRight = () => Scroll(GetCarouselFileRightIdx(GetTransitionToIndex(), files));

    onMount(() => {
        ConditionalLoadFiles(0, fileLoadingState, files, autoLoadLeftAndRightFiles===true, filePath);
        if(autoChangeMs) {
            const interval = setInterval(ScrollRight, autoChangeMs);
            return () => clearInterval(interval);
        }
    });

    const onScroll = clientOnScroll ? () => clientOnScroll(GetCurrentFileIndex(carousel!)) : undefined;

    const onScrollEnd = () => {
        if(!carousel)
            return;

        const newIndex=GetCurrentFileIndex(carousel);

        SetTransitionToIndex(newIndex);

        if(clientOnScrollEnd)
            clientOnScrollEnd(newIndex);

        ConditionalLoadFiles(newIndex, fileLoadingState, files, autoLoadLeftAndRightFiles===true, filePath);
    }

    const showChevrons = !!chevronUrl && files.length > 1;

    const getChevronClass = overrideLeftChevronClass
        ? (isLeft: boolean)=>
            (isLeft ? overrideLeftChevronClass : overrideRightChevronClass)
        : (isLeft: boolean)=> isLeft ? "CarouselChevronLeft" : "CarouselChevronRight";
</script>

<style>
    .carousel-wrapper {
        all: unset;
        box-sizing: border-box;
        position: relative;
        display: inline-block;

        width: 100%;
        height: 100%;
    }
    .carousel {
        all: unset;
        box-sizing: border-box;
        display: inline-block;

        position: relative;
        overflow-x: auto;
        scrollbar-width: none;
        white-space: nowrap;
        overflow-y: hidden;
        scroll-snap-type: x mandatory;
        width: 100%;
        height: 100%;
    }
    .CarouselChevronLeft,.CarouselChevronRight {
        all: unset;
        box-sizing: border-box;
        display: inline-block;

        width: 50px;
        position: absolute;
        z-index: 5;

        top: calc(50% - (50px / 2));

        cursor: pointer;
    }

    .CarouselChevronLeft {
        left: 30px;
    }

    .CarouselChevronRight {
        right: 30px;
        transform: rotate(-180deg);
    }

    .CarouselChevronLeft:active,.CarouselChevronRight:active {
        opacity: 25%;
    }
</style>

<div class="carousel-wrapper">
    <div class="carousel" bind:this={carousel} onscroll={onScroll} onscrollend={onScrollEnd}>
        {#each files as iterFile, i}
            <GalleryFileComponent
                fileSrc={GetFilePath(iterFile.src,filePath)} loadingState={fileLoadingState[i]}
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