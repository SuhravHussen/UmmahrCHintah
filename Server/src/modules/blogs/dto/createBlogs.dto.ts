import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsDateString,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: {
    text: string;
    richText: string;
  };

  @IsDateString()
  @IsNotEmpty()
  dateWritten: Date;

  @IsArray()
  @IsNotEmpty()
  keywords: string[];

  @IsOptional()
  @IsString()
  originalPostLink?: string;

  @IsString()
  @IsNotEmpty()
  authorId: string;
}
