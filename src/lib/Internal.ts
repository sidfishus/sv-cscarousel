import type {CarouselFileDetails} from "./index.js";

export enum FileLoadingState {
    loading,
    loaded
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
    idx: number, fileLoadingState: FileLoadingState[], files: DerivedFileDetails[], filePath?: string) => {

    if(fileLoadingState[idx] === FileLoadingState.loaded)
        return;

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
    idx: number, fileLoadingState: FileLoadingState[], files: DerivedFileDetails[],
    autoLoadLeftAndRightFiles: boolean, filePath?: string) => {

    ConditionalLoadFile(idx, fileLoadingState, files, filePath);
    if(autoLoadLeftAndRightFiles) {
        ConditionalLoadFile(GetCarouselFileLeftIdx(idx,files), fileLoadingState, files, filePath);
        ConditionalLoadFile(GetCarouselFileRightIdx(idx,files), fileLoadingState, files, filePath);
    }
};

export const InitialiseFileLoadingState = (files: CarouselFileDetails[]) => {

    const arr=new Array<FileLoadingState>(files.length);
    for(let i=0;i<arr.length;i++)
        arr[i]=FileLoadingState.loading;

    return arr;
}

export const ScrollToIndex = <DerivedFileDetails extends CarouselFileDetails>
    (carousel: HTMLDivElement|null,index: number, scrollBehaviour: ScrollBehavior,
     fileLoadingState: FileLoadingState[], files: DerivedFileDetails[], autoLoadLeftAndRightFiles: boolean,
     setScrollToIndex: (newIdx: number) => void, filePath?: string) => {

    if(!carousel)
        return;

    const scrollX=GetClientXInRelationToFileIndex(0,index,carousel);

    carousel.scrollTo({
        left: scrollX,
        top: 0,
        behavior: scrollBehaviour
    });
    setScrollToIndex(index);

    ConditionalLoadFiles(index, fileLoadingState, files, autoLoadLeftAndRightFiles, filePath);
}

const GetClientXInRelationToFileIndex = (x: number, fileIndex: number, carousel: HTMLDivElement) => {

    return (fileIndex*carousel.offsetWidth) + x;
}

export const GetFileClass = <DerivedFileDetails extends CarouselFileDetails>(
    file: DerivedFileDetails, loadingState: FileLoadingState, additionalFileClass?: (isLoading: boolean)=>string) => {

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