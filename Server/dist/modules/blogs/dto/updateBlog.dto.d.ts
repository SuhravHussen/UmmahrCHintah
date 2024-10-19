export declare class UpdateBlogDto {
    title?: string;
    content?: {
        text?: string;
        richText?: string;
    };
    dateWritten?: Date;
    keywords?: string[];
    originalPostLink?: string;
    authorId?: string;
    id?: string;
}
