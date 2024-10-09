import {
  IsString,
  IsOptional,
  IsArray,
  IsDateString,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';

export class UpdateBlogDto {
  @IsOptional() // Making this field optional for updates
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional() // Making this field optional for updates
  @IsNotEmpty()
  content?: {
    text?: string; // Making fields within content optional
    richText?: string;
  };

  @IsOptional() // Making this field optional for updates
  @IsDateString()
  @IsNotEmpty()
  dateWritten?: Date;

  @IsOptional() // Making this field optional for updates
  @IsArray()
  @IsNotEmpty()
  keywords?: string[];

  @IsOptional() // Making this field optional for updates
  @IsString()
  @IsNotEmpty()
  originalPostLink?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  authorId?: string;

  @ValidateIf((o) => o.id !== undefined)
  id?: string;
}
