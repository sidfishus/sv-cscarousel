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
        autoLoadLeftAndRightFiles, additionalFileClass, additionalFileContainerClass, onscroll: clientOnScroll } : {
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
        onscroll?: (idx: number) => void
    } = $props();

    let carousel:HTMLDivElement|null=null;

    let fileLoadingState=$state<FileLoadingState[]>(InitialiseFileLoadingState(files));

    // 1. on mount of parent, set a callback on this component.
    // 2. when index changes of file grid, call function on carousel to scroll to that index, that doesn't fire the callback.
    // 3. when user clicks left or right chevron: call the callback, that sets reactive which updates the parent.
    // 4. on scroll end, if the landed index !== selected index, fire the callback and conditional load the images


    // Or: don't hold selected index as state.

    let transitionToIndex=0;
    const SetTransitionToIndex = (newIdx: number) => transitionToIndex = newIdx;
    const GetTransitionToIndex = () => transitionToIndex;

    export const Scroll = (newIdx: number) =>
        ScrollToIndex(carousel, GetCarouselFileLeftIdx(GetTransitionToIndex(), files), "smooth",
            fileLoadingState, files, !!autoLoadLeftAndRightFiles, SetTransitionToIndex, filePath);

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

        ConditionalLoadFiles(newIndex, fileLoadingState, files, autoLoadLeftAndRightFiles===true, filePath);
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
    <div class="carousel" bind:this={carousel} onscroll={onScroll} onscrollend={onScrollEnd}>
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