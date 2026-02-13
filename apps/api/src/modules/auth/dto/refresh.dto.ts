import { IsString, MinLength } from "class-validator";

export class RefreshDto {
  @IsString()
  @MinLength(24)
  refreshToken!: string;
}
