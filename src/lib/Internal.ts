import type {CarouselFileDetails} from "./index.js";

export enum FileLoadingState {
    initial,
    loading,
    loaded
}

export const GetCarouselFileLeftIdx = (idx: number, files: CarouselFileDetails[]): number => {
    return (idx === 0 ? files.length -1 : idx-1);
}

export const GetCarouselFileRightIdx = (idx: number, files: CarouselFileDetails[]): number => {
    return (idx === (files.length -1) ? 0 : idx+1);
}

export const GetCurrentFileIndex = (scrollLeft: number, offsetWidth: number) => {

    const scrollX=scrollLeft;
    const fileWidth=offsetWidth;

    let currentIdx=Math.round(scrollX/fileWidth);

    const diff=scrollX - (currentIdx * fileWidth);
    if(diff > (fileWidth / 2)) {
        currentIdx = currentIdx + 1;
    }

    return currentIdx;
}

const GetFilePath = (file: CarouselFileDetails, filePath?: string) => {
    return filePath ? filePath + file.src : file.src;
}

const ConditionalLoadFile = (idx: number, fileLoadingState: FileLoadingState[], files: CarouselFileDetails[],
                             filePath?: string) => {
    if(fileLoadingState[idx] !== FileLoadingState.initial)
        return;

    fileLoadingState[idx]=FileLoadingState.loading;

    const domFile = new Image();
    domFile.src = GetFilePath(files[idx], filePath);

    domFile.onload = () => {
        fileLoadingState[idx]=FileLoadingState.loaded;
    }
}

export const ConditionalLoadFiles =
    (idx: number, autoLoadLeftAndRightFiles: boolean, files: CarouselFileDetails[],
     fileLoadingState: FileLoadingState[], filePath?: string) => {
    ConditionalLoadFile(idx, fileLoadingState, files, filePath);
    if(autoLoadLeftAndRightFiles) {
        ConditionalLoadFile(GetCarouselFileLeftIdx(idx,files), fileLoadingState, files, filePath);
        ConditionalLoadFile(GetCarouselFileRightIdx(idx,files), fileLoadingState, files, filePath);
    }
};