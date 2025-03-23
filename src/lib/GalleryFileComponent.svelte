
<script lang="ts" generics="DerivedFileDetails extends CarouselFileDetails">
    import {FileLoadingState, type GalleryFileProps} from "./Internal.js";
    import { type CarouselFileDetails } from "./index.js";

    const { mainProps, loadingState, fileSrc, additionalClass } = $props() as GalleryFileProps<CarouselFileDetails>;

    const getFileContainerClass = () => mainProps.additionalFileContainerClass
        ? "file-container " + mainProps.additionalFileContainerClass
        : "file-container";

    const getBaseFileClass = () =>  loadingState === FileLoadingState.loaded ? "file" : "file loading";
</script>

<style>
    .file-container {
        display: inline-block;
        scroll-snap-align: start;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        margin-bottom: -4px;
    }
    .file {
        box-sizing: border-box;

        aspect-ratio: 1/1;

        width: 100%;
        min-width: 100%;

        height: 100%;
        min-height: 100%;

        background-repeat: no-repeat;
        background-position: center center;
    }
    .file.loading {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' width='311' height='311' style='shape-rendering: auto; display: block; background: transparent;' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg%3E%3Cg transform='rotate(0 50 50)'%3E%3Crect fill='%23e77930' height='12' width='6' ry='6' rx='3' y='24' x='47'%3E%3Canimate repeatCount='indefinite' begin='-0.9166666666666666s' dur='1s' keyTimes='0;1' values='1;0' attributeName='opacity'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(30 50 50)'%3E%3Crect fill='%23e77930' height='12' width='6' ry='6' rx='3' y='24' x='47'%3E%3Canimate repeatCount='indefinite' begin='-0.8333333333333334s' dur='1s' keyTimes='0;1' values='1;0' attributeName='opacity'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(60 50 50)'%3E%3Crect fill='%23e77930' height='12' width='6' ry='6' rx='3' y='24' x='47'%3E%3Canimate repeatCount='indefinite' begin='-0.75s' dur='1s' keyTimes='0;1' values='1;0' attributeName='opacity'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(90 50 50)'%3E%3Crect fill='%23e77930' height='12' width='6' ry='6' rx='3' y='24' x='47'%3E%3Canimate repeatCount='indefinite' begin='-0.6666666666666666s' dur='1s' keyTimes='0;1' values='1;0' attributeName='opacity'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(120 50 50)'%3E%3Crect fill='%23e77930' height='12' width='6' ry='6' rx='3' y='24' x='47'%3E%3Canimate repeatCount='indefinite' begin='-0.5833333333333334s' dur='1s' keyTimes='0;1' values='1;0' attributeName='opacity'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(150 50 50)'%3E%3Crect fill='%23e77930' height='12' width='6' ry='6' rx='3' y='24' x='47'%3E%3Canimate repeatCount='indefinite' begin='-0.5s' dur='1s' keyTimes='0;1' values='1;0' attributeName='opacity'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(180 50 50)'%3E%3Crect fill='%23e77930' height='12' width='6' ry='6' rx='3' y='24' x='47'%3E%3Canimate repeatCount='indefinite' begin='-0.4166666666666667s' dur='1s' keyTimes='0;1' values='1;0' attributeName='opacity'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(210 50 50)'%3E%3Crect fill='%23e77930' height='12' width='6' ry='6' rx='3' y='24' x='47'%3E%3Canimate repeatCount='indefinite' begin='-0.3333333333333333s' dur='1s' keyTimes='0;1' values='1;0' attributeName='opacity'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(240 50 50)'%3E%3Crect fill='%23e77930' height='12' width='6' ry='6' rx='3' y='24' x='47'%3E%3Canimate repeatCount='indefinite' begin='-0.25s' dur='1s' keyTimes='0;1' values='1;0' attributeName='opacity'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(270 50 50)'%3E%3Crect fill='%23e77930' height='12' width='6' ry='6' rx='3' y='24' x='47'%3E%3Canimate repeatCount='indefinite' begin='-0.16666666666666666s' dur='1s' keyTimes='0;1' values='1;0' attributeName='opacity'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(300 50 50)'%3E%3Crect fill='%23e77930' height='12' width='6' ry='6' rx='3' y='24' x='47'%3E%3Canimate repeatCount='indefinite' begin='-0.08333333333333333s' dur='1s' keyTimes='0;1' values='1;0' attributeName='opacity'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(330 50 50)'%3E%3Crect fill='%23e77930' height='12' width='6' ry='6' rx='3' y='24' x='47'%3E%3Canimate repeatCount='indefinite' begin='0s' dur='1s' keyTimes='0;1' values='1;0' attributeName='opacity'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
</style>

<div class={getFileContainerClass()}>
    <div class={additionalClass ? getBaseFileClass() + " " + additionalClass : getBaseFileClass()}
         style={loadingState === FileLoadingState.loaded ? 'background-image: url(' + fileSrc +');' : ''}>
    </div>
</div>