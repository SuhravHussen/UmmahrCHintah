import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateAuthorDto {
  @IsString()
  @IsOptional() // Mark as optional, so it can be omitted during an update
  @IsNotEmpty() // Ensures that if provided, the value is not empty
  name?: string; // Optional name field

  @IsString()
  @IsOptional() // Mark as optional, so it can be omitted during an update
  @IsNotEmpty() // Ensures that if provided, the value is not empty
  image?: string; // Optional image field
}
