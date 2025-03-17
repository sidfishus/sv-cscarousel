import type {CarouselFileDetails, CarouselProps} from "./index.js";

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

const ConditionalLoadFile = <DerivedFileDetails extends CarouselFileDetails>(
    idx: number, props: CarouselProps<DerivedFileDetails>, fileLoadingState: FileLoadingState[]) => {

    if(fileLoadingState[idx] !== FileLoadingState.initial)
        return;

    fileLoadingState[idx]=FileLoadingState.loading;

    const { files, filePath } = props;

    const domFile = new Image();
    domFile.src = GetFilePath(files[idx], filePath);

    domFile.onload = () => {
        fileLoadingState[idx]=FileLoadingState.loaded;
    }
}

export const ConditionalLoadFiles = <DerivedFileDetails extends CarouselFileDetails>(
    idx: number, props: CarouselProps<DerivedFileDetails>, fileLoadingState: FileLoadingState[]) => {

    const { files, autoLoadLeftAndRightFiles } = props;

    ConditionalLoadFile(idx, props, fileLoadingState);
    if(autoLoadLeftAndRightFiles) {
        ConditionalLoadFile(GetCarouselFileLeftIdx(idx,files), props, fileLoadingState);
        ConditionalLoadFile(GetCarouselFileRightIdx(idx,files), props, fileLoadingState);
    }
};

export const InitialiseFileLoadingState = (files: CarouselFileDetails[]) => {

    const arr=new Array<FileLoadingState>(files.length);
    for(let i=0;i<arr.length;i++)
        arr[i]=FileLoadingState.initial;

    return arr;
}