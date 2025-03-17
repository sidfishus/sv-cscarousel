
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
</style>

<div class="carousel-container">
    <Carousel files={filesMultiplied} autoLoadLeftAndRightFiles={true} />
</div>