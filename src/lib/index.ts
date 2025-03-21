export type CarouselProps<FILE_T extends CarouselFileDetails> = {
    files: FILE_T[];
    autoLoadLeftAndRightFiles?: boolean;
    filePath?: string;
    shouldLoad: boolean;
    autoChangeMs?: number;
    chevronUrl?: string;
    overrideLeftChevronClass?: string;
    overrideRightChevronClass?: string;
    additionalFileClass?: (isLoading: boolean)=>string;
    additionalFileContainerClass?: string;
}

export type CarouselFileDetails = {
    src: string;
    additionalClass?: string //sidtodo: needed?
}