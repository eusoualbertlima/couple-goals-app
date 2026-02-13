import { IsString, MinLength } from "class-validator";

export class OauthDto {
  @IsString()
  @MinLength(10)
  idToken!: string;
}
