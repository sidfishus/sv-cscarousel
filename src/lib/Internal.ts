import type {CarouselFileDetails, CarouselProps} from "./index.js";

export enum FileLoadingState {
    initial,
    loading,
    loaded
}

export type GalleryFileProps<FILE_T extends CarouselFileDetails> = {
    mainProps: CarouselProps<FILE_T>;
    loadingState: FileLoadingState;
    fileSrc: string;
    additionalClass?: string;
}

export const GetCarouselFileLeftIdx = (idx: number, files: CarouselFileDetails[]): number => {
    return (idx === 0 ? files.length -1 : idx-1);
}

export const GetCarouselFileRightIdx = (idx: number, files: CarouselFileDetails[]): number => {
    return (idx === (files.length -1) ? 0 : idx+1);
}

export const GetCurrentFileIndex = (carousel: HTMLDivElement) => {

    const scrollX=carousel.scrollLeft;
    const fileWidth=carousel.offsetWidth;

    let currentIdx=Math.round(scrollX/fileWidth);

    const diff=scrollX - (currentIdx * fileWidth);
    if(diff > (fileWidth / 2)) {
        currentIdx = currentIdx + 1;
    }

    return currentIdx;
}

export const GetFilePath = (fileSrc: string, filePath?: string) => {
    return filePath ? filePath + fileSrc : fileSrc;
}

const ConditionalLoadFile = <DerivedFileDetails extends CarouselFileDetails>(
    idx: number, props: CarouselProps<DerivedFileDetails>, fileLoadingState: FileLoadingState[]) => {

    if(fileLoadingState[idx] !== FileLoadingState.initial)
        return;

    fileLoadingState[idx]=FileLoadingState.loading;

    const { files, filePath } = props;

    const domFile = new Image();
    domFile.src = GetFilePath(files[idx].src, filePath);

    domFile.onload = () => {
        fileLoadingState[idx]=FileLoadingState.loaded;
    }
    domFile.onerror = () => {
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

export const ScrollToIndex = <DerivedFileDetails extends CarouselFileDetails>
    (carousel: HTMLDivElement|null,getIdx: (curIndex: number) => number, scrollBehaviour: ScrollBehavior,
     mainProps: CarouselProps<DerivedFileDetails>, fileLoadingState: FileLoadingState[]) => {

    if(!carousel)
        return;

    const curIdx=GetCurrentFileIndex(carousel);
    const newIdx=getIdx(curIdx);

    const scrollX=GetClientXInRelationToFileIndex(0,newIdx,carousel);

    carousel.scrollTo({
        left: scrollX,
        top: 0,
        behavior: scrollBehaviour
    });

    ConditionalLoadFiles(newIdx, mainProps, fileLoadingState);
}

const GetClientXInRelationToFileIndex = (x: number, fileIndex: number, carousel: HTMLDivElement) => {

    return (fileIndex*carousel.offsetWidth) + x;
}

export const GetFileClass = <DerivedFileDetails extends CarouselFileDetails>(
    mainProps: CarouselProps<DerivedFileDetails>, file: DerivedFileDetails, loadingState: FileLoadingState) => {

    const { additionalFileClass } = mainProps;

    let classWip="";
    if(additionalFileClass)
        classWip=additionalFileClass(loadingState === FileLoadingState.loaded);

    if(file.additionalClass) {
        if(classWip.length>0)
            classWip += " ";

        classWip += file.additionalClass;
    }

    return classWip;
}