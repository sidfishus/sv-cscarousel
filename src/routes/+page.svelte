
<script lang="ts">
    import Carousel from "$lib/index.svelte";
    import type {CarouselFileDetails} from "$lib/index.js";

    type ExtendedCarouselFileDetails = CarouselFileDetails & {
        id: bigint;
    }

    const files: ExtendedCarouselFileDetails[] = [
        {
            src: "IMG_1397.jpg",
            id: 1n,
        },
        {
            src: "IMG_002.jpg",
            id: 2n,
        },
        {
            src: "IMG_0024.jpg",
            id: 3n,
        },
        {
            src: "IMG_0040.jpg",
            id: 4n,
        },
        {
            src: "IMG_0042.jpg",
            id: 5n,
        },
        {
            src: "IMG_0117.jpg",
            id: 6n,
        },
        {
            src: "IMG_0786.jpg",
            id: 7n,
        },
        {
            src: "IMG_001.jpg",
            id: 8n,
        },
        {
            src: "IMG_0117.jpg",
            id: 9n,
        },
        {
            src: "IMG_006.jpg",
            id: 10n,
        },
        {
            src: "IMG_0029.jpg",
            id: 11n,
        },
        {
            src: "IMG_0035.jpg",
            id: 12n,
        },
        {
            src: "IMG_0077.jpg",
            id: 13n,
        },
        {
            src: "IMG_0319.jpg",
            id: 14n,
        },
        {
            src: "IMG_0711.jpg",
            id: 15n,
        }
    ];

    // Yes this is slow.
    let filesMultipliedTest=[...files];
    for(let i=0;i<18;++i) {
        filesMultipliedTest = [...filesMultipliedTest,...files];
    }

    let filesMultiplied=$state<ExtendedCarouselFileDetails[]>(filesMultipliedTest);
</script>

<style>
    .carousel-container {
        height: 300px;
        width: 300px;
    }

    :global(.BMSFileLeftChevron,.BMSFileRightChevron) {
        width: 100px;
        position: absolute;
        z-index: 5;

        top: calc(50% - (100px / 2));

        cursor: pointer;
    }

    :global(.BMSFileLeftChevron) {
        left: 30px;
    }

    :global(.BMSFileRightChevron) {
        right: 30px;
        transform: rotate(-180deg);
    }

    :global(.BMSFileLeftChevron:active,.BMSFileRightChevron:active) {
        opacity: 25%;
    }

    :global(.BMSFileContainer) {
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 2px;
        padding-bottom: 2px;
    }

    :global(.BMSFile) {
        border-radius: 5px;

        border: white solid 1.5px;
        box-shadow: 0 0 0 1px black;
    }
</style>

<div class="carousel-container">
    <Carousel files={filesMultiplied} autoLoadLeftAndRightFiles={true} shouldLoad={true} autoChangeMs={3000}
              chevronUrl="orange-chevron-left.svg" overrideLeftChevronClass="BMSFileLeftChevron"
              overrideRightChevronClass="BMSFileRightChevron"
              additionalFileClass={()=> "BMSFile"}
              additionalFileContainerClass={"BMSFileContainer"}
    />
</div>