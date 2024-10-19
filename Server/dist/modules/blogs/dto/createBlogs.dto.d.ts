export declare class CreateBlogDto {
    title: string;
    content: {
        text: string;
        richText: string;
    };
    dateWritten: Date;
    keywords: string[];
    originalPostLink?: string;
    authorId: string;
}
