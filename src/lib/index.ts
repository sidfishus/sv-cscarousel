export type CarouselProps<FILE_T extends CarouselFileDetails> = {
    files: FILE_T[];
    autoLoadLeftAndRightFiles?: boolean;
    filePath?: string;
    shouldLoad: boolean;
}

export type CarouselFileDetails = {
    src: string;
    additionalClass?: string //sidtodo: needed?
}