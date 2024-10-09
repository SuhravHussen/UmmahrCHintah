import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
