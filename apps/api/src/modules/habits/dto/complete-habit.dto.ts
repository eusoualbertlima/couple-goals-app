import { IsISO8601, IsOptional } from "class-validator";

export class CompleteHabitDto {
  @IsOptional()
  @IsISO8601()
  completedAt?: string;
}
